package com.incomm.cca.service.session;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.exception.DuplicateI3ConnectionException;
import com.incomm.cca.exception.UnsupportedI3ConnectionException;
import com.incomm.cca.exception.UnsupportedIVRRequestException;
import com.incomm.cca.hazelcast.HazelcastManager;
import com.incomm.cca.hazelcast.event.AutoWrappedEvent;
import com.incomm.cca.hazelcast.event.CallConnectEvent;
import com.incomm.cca.hazelcast.event.DisconnectEvent;
import com.incomm.cca.model.constant.AutoWrapType;
import com.incomm.cca.model.constant.I3DisconnectType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.converter.SessionConverter;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.domain.session.CallComponent;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.enums.I3ConnectType;
import com.incomm.cca.model.view.i3.I3CallRequestView;
import com.incomm.cca.model.view.i3.I3CallResponseView;
import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cca.model.view.session.SessionView;
import com.incomm.cca.repository.SessionRepository;
import com.incomm.cca.service.PropertyService;
import com.incomm.cca.service.QueueService;
import com.incomm.cca.service.SessionFactory;
import com.incomm.cca.service.WrapUpCodeService;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NonUniqueResultException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

/**
 * This service manages changes to a session required by IVR/I3 functionality,
 * including the connecting and disconnecting of calls, handling I3 wrap-up,
 * and conversion between CALL_CENTER and GENERAL type sessions (adding/removing
 * call details).
 * <p>
 * Created by Allen on 6/9/2016.
 */
@Service
public class I3SessionService {

    @Autowired
    private SessionConverter sessionConverter;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SessionFactory sessionFactory;
    @Autowired
    private QueueService queueService;
    @Autowired
    private CallComponentService detailCallInfoService;
    @Autowired
    private HazelcastManager hazelcastManager;
    @Autowired
    private WrapUpCodeService wrapUpCodeService;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SessionStatusHistoryService statusHistoryService;
    @Autowired
    private EncryptionService encryptionService;

    @Transactional
    public IVRCallDetailView processIVRCallDetail(IVRCallDetailView request, String remoteAddress) {
        try {
            validateIVRRequest(request);

            Session session = sessionFactory.newIVRSession(request, remoteAddress);
            request.setSessionId(session.getId());

            CsCoreLogger.info("Successfully processed IVR request")
                        .keyValue("sessionId", session.getId())
                        .json("request", request)
                        .build();

            return request;
        } catch (UnsupportedIVRRequestException e) {
            CsCoreLogger.warn("Ignoring IVR request")
                        .json("request", request)
                        .keyValue("remoteAddress", remoteAddress)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create IVR session")
                        .json("request", request)
                        .keyValue("remoteAddress", remoteAddress)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public I3CallResponseView connectI3Call(I3CallRequestView i3CallRequestView) {
        try {
            encryptionService.openSymmetricKey();
            validateI3ConnectRequest(i3CallRequestView);

            SessionQueue queue = queueService.findQueueForI3Connect(i3CallRequestView.getQueue());
            Session session = getOrCreateIVRSessionForI3Connection(i3CallRequestView);

            sessionFactory.completeI3Connection(session, queue, i3CallRequestView);

            broadcastI3Connection(session);

            I3CallResponseView responseDto = new I3CallResponseView(session);

            CsCoreLogger.info("Successfully connected I3 call")
                        .keyValue("sessionId", session.getId())
                        .keyValue("callId", session.getCallComponent()
                                                   .getCallId())
                        .keyValue("callIdKey", session.getCallComponent()
                                                      .getCallIdKey())
                        .keyValue("uid", session.getCallComponent()
                                                .getUid())
                        .json("request", i3CallRequestView)
                        .build();

            return responseDto;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Failed to connect I3 call")
                        .json("request", i3CallRequestView)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (UnsupportedI3ConnectionException e) {
            CsCoreLogger.warn("Ignoring I3 connection")
                        .json("request", i3CallRequestView)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (DuplicateI3ConnectionException e) {
            CsCoreLogger.warn(e.getMessage())
                        .json("request", i3CallRequestView)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to connect I3 call")
                        .json("request", i3CallRequestView)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public I3CallResponseView disconnectI3Call(String callId, String disconnectTypeString, String username) {
        try {
            encryptionService.openSymmetricKey();
            validateI3DisconnectRequest(callId, disconnectTypeString, username);

            CallComponent callComponent = getCallInfoForDisconnect(callId, username);
            disconnectCallInfo(callComponent, disconnectTypeString);

            Session session = disconnectSessionForCallInfo(callComponent);
            handleWrapUpForDisconnectedSession(session, callComponent);

            I3CallResponseView responseDto = new I3CallResponseView(session);

            CsCoreLogger.info("Successfully disconnected I3 call")
                        .keyValue("sessionId", session.getId())
                        .keyValue("callId", session.getCallComponent()
                                                   .getCallId())
                        .keyValue("callIdKey", session.getCallComponent()
                                                      .getCallIdKey())
                        .keyValue("uid", session.getCallComponent()
                                                .getUid())
                        .keyValue("disconnectType", disconnectTypeString)
                        .keyValue("username", username)
                        .build();

            return responseDto;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Failed to disconnect I3 call")
                        .keyValue("callId", callId)
                        .keyValue("disconnectType", disconnectTypeString)
                        .keyValue("username", username)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (UnsupportedI3ConnectionException e) {
            CsCoreLogger.warn("Ignoring I3 disconnect")
                        .keyValue("callId", callId)
                        .keyValue("disconnectType", disconnectTypeString)
                        .keyValue("username", username)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to disconnect I3 call")
                        .keyValue("callId", callId)
                        .keyValue("disconnectType", disconnectTypeString)
                        .keyValue("username", username)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Session wrapUpI3Session(Long sessionId, boolean autoWrapped, String autoWrapType, boolean skipBroadcast) {
        Session session = sessionRepository.findById(sessionId)
                                           .orElse(null);
        return wrapUpI3Session(session, autoWrapped, autoWrapType, skipBroadcast);
    }

    public Session wrapUpI3Session(Session session, boolean autoWrapped, String autoWrapType, boolean skipBroadcast) {
        try {
            encryptionService.openSymmetricKey();
            //If not autowrapped, user must have provided wrap up code
            if (!autoWrapped && !Objects.equals(autoWrapType, AutoWrapType.SERVER)) {
                validateSessionForWrapUp(session);
            }

            updateSessionIfDroppedCall(session);
            updateSessionIfAutoWrapped(session);

            if (validateSessionNotPastWrappedUpStatus(session)) {
                session.setStatus(SessionStatus.WRAPPEDUP);
            }

            //CCA-3368 Only broadcast if session was in fact connected in the first place
            if (session.getCallComponent()
                       .getConnectedDate() != null && !skipBroadcast) {
                broadcastAutoWrap(session, autoWrapType);
            }

            CsCoreLogger.info("Successfully handled wrap-up")
                        .keyValue("sessionId", session.getId())
                        .keyValue("callId", session.getCallComponent()
                                                   .getCallId())
                        .keyValue("callIdKey", session.getCallComponent()
                                                      .getCallIdKey())
                        .keyValue("autoWrapped", autoWrapped)
                        .keyValue("autoWrapType", autoWrapType)
                        .build();

            return session;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to wrap-up session")
                        .keyValue("sessionId", session.getId())
                        .keyValue("callId", session.getCallComponent()
                                                   .getCallId())
                        .keyValue("callIdKey", session.getCallComponent()
                                                      .getCallIdKey())
                        .keyValue("autoWrapped", autoWrapped)
                        .keyValue("autoWrapType", autoWrapType)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private void validateSessionForWrapUp(Session session) {
        if (session == null) {
            throw new IllegalArgumentException("Session not found");
        } else if (session.getQueue() == null) {
            throw new IllegalArgumentException("Session must have a queue before wrapping up");
        } else if (session.getWrapUpCodeCategory() == null) {
            throw new IllegalArgumentException("Session must have a wrapUpCategory before wrapping up");
        } else if (session.getWrapUpCode() == null) {
            throw new IllegalArgumentException("Session must have a wrapUpCode before wrapping up");
        }
    }

    /**
     * Disconnects that are not of type CONSULT_ACCEPT should trigger either an immediate wrap-up
     * of the associated session (if the user has already wrapped up the session, for example),
     * or should trigger an auto-wrap timer. If the session's already wrapped up, we should
     * immediately send the wrap-up code to I3.
     */
    private void handleWrapUpForDisconnectedSession(Session session, CallComponent callComponent) {
        if (session != null
                && callComponent != null
                && !Objects.equals(callComponent.getDisconnectType(), I3DisconnectType.CONSULT_ACCEPT)) {
            try {
                //Auto-wrap session if dropped call
                if (callComponent.isDroppedCall()) {
                    wrapUpI3Session(session, false, AutoWrapType.SERVER, true);
                }
                //Or if session was never connected
                else if (callComponent.getConnectedDate() == null) {
                    CsCoreLogger.warn("Handling disconnect for a session that was never connected!")
                                .keyValue("sessionId", session.getId())
                                .keyValue("callId", callComponent.getCallId())
                                .keyValue("callIdKey", callComponent.getCallIdKey())
                                .keyValue("uid", callComponent.getUid())
                                .build();

                    wrapUpI3Session(session, true, AutoWrapType.SERVER, true);
                    statusHistoryService.addOneBySystemUser(session.getId(), session.getStatus(), SessionStatus.CLOSED);
                    session.setClosedDate(new Date());
                    session.setStatus(SessionStatus.CLOSED);
                    return;
                }

                broadcastI3Disconnect(session);
            } catch (Exception e) {
                CsCoreLogger.error("Failed to handle wrap-up on disconnect")
                            .keyValue("sessionId", session.getId())
                            .keyValue("callId", callComponent.getCallId())
                            .keyValue("callIdKey", callComponent.getCallIdKey())
                            .keyValue("uid", callComponent.getUid())
                            .exception(e)
                            .build();
                throw e;
            }
        }
    }

    private void broadcastAutoWrap(Session session, String autoWrapType) {
        try {
            if (Objects.equals(autoWrapType, AutoWrapType.SERVER)) {
                SessionView view = sessionConverter.convertSimple(session);
                hazelcastManager.broadcast(new AutoWrappedEvent(view.getUser()
                                                                    .getUsername(), objectMapper.writeValueAsString(view)));
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to notify client of auto-wrapped session")
                        .keyValue("sessionId", session.getId())
                        .keyValue("callId", session.getCallComponent()
                                                   .getCallId())
                        .keyValue("callIdKey", session.getCallComponent()
                                                      .getCallIdKey())
                        .keyValue("uid", session.getCallComponent()
                                                .getUid())
                        .exception(e)
                        .build();
        }
    }

    private boolean validateSessionNotPastWrappedUpStatus(Session session) {
        return session != null
                && !Objects.equals(session.getStatus(), SessionStatus.CLOSED)
                && !Objects.equals(session.getStatus(), SessionStatus.FORCED_CLOSED)
                && !Objects.equals(session.getStatus(), SessionStatus.CANCELLED)
                && !Objects.equals(session.getStatus(), SessionStatus.VMS_SESSION_FAILED);
    }

    private void updateSessionIfDroppedCall(Session session) {
        if (session != null && session.getCallComponent() != null && session.getCallComponent()
                                                                         .isDroppedCall()) {
            session.getCallComponent()
                   .setCallerName("Unknown");
            WrapUpCode droppedCallCode = wrapUpCodeService.getCallDroppedWrapUpCode();
            session.setWrapUpCode(droppedCallCode);
            session.setWrapUpCodeCategory(droppedCallCode.getCategories()
                                                         .get(0));
        }
    }

    private void updateSessionIfAutoWrapped(Session session) {
        if (session.getWrapUpCode() == null) {
            WrapUpCode autoWrapCode = wrapUpCodeService.getAutoWrapWrapUpCode();
            session.setWrapUpCode(autoWrapCode);
            session.setWrapUpCodeCategory(autoWrapCode.getCategories()
                                                      .get(0));
        }
    }

    @Transactional
    protected void disconnectCallInfo(CallComponent callComponent, String disconnectTypeString) throws IllegalArgumentException {
        if (callComponent != null && callComponent.getConnectedDate() != null) {
            String disconnectType = getDisconnectType(disconnectTypeString);

            callComponent.setDisconnectedDate(new Date());
            callComponent.setDisconnectType(disconnectType);
        }
    }

    @Transactional
    protected Session disconnectSessionForCallInfo(CallComponent callComponent) {
        Session session = null;

        if (callComponent != null) {
            session = callComponent.getSession();
        }

        if (session != null) {
            if (!Objects.equals(callComponent.getDisconnectType(), I3DisconnectType.CONSULT_ACCEPT)
                    && !Objects.equals(session.getStatus(), SessionStatus.WRAPPEDUP)
                    && !Objects.equals(session.getStatus(), SessionStatus.CANCELLED)
                    && !Objects.equals(session.getStatus(), SessionStatus.CLOSED)) {
                statusHistoryService.addOneBySystemUser(session.getId(), session.getStatus(), SessionStatus.DISCONNECTED);
                session.setStatus(SessionStatus.DISCONNECTED);
            }
        }

        return session;
    }

    private CallComponent getCallInfoForDisconnect(String callId, String username) throws UnsupportedI3ConnectionException {
        return getCallInfoForDisconnect(callId, username, 1);
    }

    private CallComponent getCallInfoForDisconnect(String callId, String username, int attempt) throws UnsupportedI3ConnectionException {
        CallComponent callComponent = detailCallInfoService.findNewestByCallIdAndUsername(callId, username);
        if (callComponent == null) {
            //Retry up to 3 times total (it's possible the connect is still processing)
            if (attempt <= 3) {
                CsCoreLogger.warn("No call info found, waiting and retrying")
                            .keyValue("callId", callId)
                            .keyValue("username", username)
                            .keyValue("attempt", attempt)
                            .build();
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new UnsupportedI3ConnectionException("No call info found");
                }
                return getCallInfoForDisconnect(callId, username, ++attempt);
            }
            throw new UnsupportedI3ConnectionException("No call info found after multiple attempts (or retry mechanism disabled), aborting disconnect");
        }
        return callComponent;
    }

    private String getDisconnectType(String disconnectTypeString) throws IllegalArgumentException {
        if (StringUtils.isBlank(disconnectTypeString)) {
            throw new IllegalArgumentException("'disconnectType' must be provided");
        }

        try {
            return I3DisconnectType.valueOf(disconnectTypeString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("'disconnectType' is invalid");
        }
    }

    /**
     * If we didn't find a quick and easy unclaimed IVR session to use,
     * we have some scenarios to test:
     * * Is this a duplicate connection attempt? (same uid and username as an existing session)
     * * If so, we ignore this connection attempt for all intents and purposes, and return a 204 to I3
     * * Is this a transfer call? (session exists for same uid but different username)
     * * If so, we addOne a new session and copy some data from the session we're being transferred from
     * * Is this a direct I3 call? (no IVR request came in before hand)
     * * If so, we addOne a new session from scratch
     */
    private Session getOrCreateIVRSessionForI3Connection(I3CallRequestView i3CallRequestView) {
        try {
            Session session = findUnclaimedIvrSessionByUid(i3CallRequestView.getUid());
            if (session == null) {
                validateNotDuplicateConnectionRequest(i3CallRequestView.getUid(), i3CallRequestView.getAgentUserId());
                Session transferSession = findNewestClaimedIvrSessionForTransfer(i3CallRequestView.getUid());
                if (transferSession != null) {
                    session = sessionFactory.newI3SessionFromTransfer(transferSession, i3CallRequestView, null);
                } else {
                    session = sessionFactory.newIVRSession(new IVRCallDetailView(i3CallRequestView), null);
                }
            }

            return session;
        } catch (DuplicateI3ConnectionException e) {
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to find or create IVR session")
                        .json("request", i3CallRequestView)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * When connecting an I3 call, most will have a session created
     * by IVR that is "unclaimed", meaning there is no user associated
     * to it yet. If we find one, we claim it and use it for this connection.
     */
    private Session findUnclaimedIvrSessionByUid(String uid) {
        try {
            return sessionRepository.findUnclaimedIvrSessionByUid(uid);
        } catch (NonUniqueResultException | IncorrectResultSizeDataAccessException e) {
            CsCoreLogger.warn("Attempted to connect with a non-unique UID (multiple IVR sessions for same UID)")
                        .keyValue("uid", uid)
                        .build();
            throw new DuplicateI3ConnectionException();
        }
    }

    /**
     * I3 sometimes attempts to connect the same uid and username multiple times
     * (perhaps one or another type of transfer call?). If we couldn't find the
     * original, unclaimed IVR session, we test for this duplicate connection
     * attempt, and ignore it, returning a 204 to I3.
     */
    private void validateNotDuplicateConnectionRequest(String uid, String username) throws DuplicateI3ConnectionException {
        Session match = sessionRepository.findIvrSessionByUidAndUsername(uid, username);
        if (match != null) {
            throw new DuplicateI3ConnectionException(uid, username);
        }
    }

    /**
     * When connecting an I3 call and we did NOT find an unclaimed IVR
     * session to link to and did NOT find that the connection attempt
     * was a duplicate attempt, then we check to see if a session exists
     * for this uid, and belongs to another user. If we find a match this
     * way, it indicates that this is most likely a transfer call, and
     * we'll need to copy data over from the original IVR session.
     */
    private Session findNewestClaimedIvrSessionForTransfer(String uid) {
        //Get all candidates
        List<Session> candidates = sessionRepository.findClaimedIvrSessionsByUid(uid);
        if (candidates != null && !candidates.isEmpty()) {
            return candidates.get(0);
        }
        return null;
    }

    private void broadcastI3Connection(Session session) {
        try {
            SessionView view = sessionConverter.convertSimple(session);
            String serializedSession = objectMapper.writeValueAsString(view);
            hazelcastManager.broadcast(new CallConnectEvent(view.getUser()
                                                                .getUsername(), serializedSession));
        } catch (Exception e) {
            CsCoreLogger.error("Failed to broadcast I3 connection")
                        .exception(e)
                        .build();
        }
    }

    private void broadcastI3Disconnect(Session session) {
        try {
            SessionView view = sessionConverter.convertSimple(session);
            hazelcastManager.broadcast(new DisconnectEvent(view.getUser()
                                                               .getUsername(), objectMapper.writeValueAsString(view)));
        } catch (Exception e) {
            CsCoreLogger.error("Failed to broadcast I3 disconnect")
                        .exception(e)
                        .build();
        }
    }

    private void validateI3ConnectRequest(I3CallRequestView i3CallRequestView) throws IllegalArgumentException, UnsupportedI3ConnectionException {
        if (i3CallRequestView == null) {
            throw new IllegalArgumentException("No POST body found");
        } else if (StringUtils.isBlank(i3CallRequestView.getAgentUserId())) {
            throw new IllegalArgumentException("'agentUserId' must be provided");
        } else if (StringUtils.isBlank(i3CallRequestView.getConnectType())) {
            throw new IllegalArgumentException("'connectType' must be provided");
        } else if (i3CallRequestView.getConnectTypeValue() == null) {
            throw new IllegalArgumentException("'connectType' must be provided or is invalid");
        } else if (i3CallRequestView.getConnectTypeValue() == I3ConnectType.CONSULT_REQUEST) {
            throw new UnsupportedI3ConnectionException("Unsupported connectType CONSULT_REQUEST");
        }

        //If no uid is present, generate a CCA-generated uid
        if (StringUtils.isBlank(i3CallRequestView.getUid())) {
            i3CallRequestView.setUid(String.format("CCA-%s", UUID.randomUUID()
                                                                 .toString()));
        }
    }

    private void validateI3DisconnectRequest(String callId, String disconnectType, String username) throws UnsupportedI3ConnectionException, IllegalArgumentException {
        if (StringUtils.isBlank(callId)) {
            throw new IllegalArgumentException("'callId' must be provided");
        } else if (StringUtils.isBlank(disconnectType)) {
            throw new IllegalArgumentException("'disconnectType' must be provided");
        } else if (StringUtils.isBlank(username)) {
            throw new IllegalArgumentException("'username' must be provided");
        } else if (disconnectType.equalsIgnoreCase("CONSULT_REQUEST")) {
            throw new UnsupportedI3ConnectionException("Unsupported disconnectType CONSULT_REQUEST");
        }
    }

    private void validateIVRRequest(IVRCallDetailView ivrCallDetailView) throws IllegalArgumentException {
        if (ivrCallDetailView == null) {
            throw new IllegalArgumentException("No POST body found");
        } else if (StringUtils.isBlank(ivrCallDetailView.getUid())) {
            throw new IllegalArgumentException("'uid' must be provided");
        }

        //Set default
        if (StringUtils.isBlank(ivrCallDetailView.getPlatform())) {
            ivrCallDetailView.setPlatform("INCOMM");
        }
    }

}
