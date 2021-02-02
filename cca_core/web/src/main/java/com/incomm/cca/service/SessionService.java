package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.exception.SessionAlreadyClosedValidationException;
import com.incomm.cca.exception.SessionAlreadyWrappedValidationException;
import com.incomm.cca.model.constant.C2CRequestStatus;
import com.incomm.cca.model.constant.SelectionType;
import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.constant.SessionTypeType;
import com.incomm.cca.model.converter.DisputeComponentConverter;
import com.incomm.cca.model.converter.EncorComponentConverter;
import com.incomm.cca.model.converter.PrivacyRequestComponentConverter;
import com.incomm.cca.model.domain.C2CRequest;
import com.incomm.cca.model.domain.session.CallComponent;
import com.incomm.cca.model.domain.session.CardsComponent;
import com.incomm.cca.model.domain.session.CustomerComponent;
import com.incomm.cca.model.domain.session.EncorComponent;
import com.incomm.cca.model.domain.session.LawEnforcementComponent;
import com.incomm.cca.model.domain.session.MerchantComponent;
import com.incomm.cca.model.domain.session.PrivacyRequestComponent;
import com.incomm.cca.model.domain.session.ReceiptComponent;
import com.incomm.cca.model.domain.session.RefundRequestComponent;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.SessionType;
import com.incomm.cca.model.domain.session.UpdateSession;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.session.SessionComponentType;
import com.incomm.cca.model.view.session.EncorComponentView;
import com.incomm.cca.model.view.session.NewSessionRequestView;
import com.incomm.cca.model.view.session.PrivacyRequestComponentView;
import com.incomm.cca.model.view.session.dispute.DisputeTransactionView;
import com.incomm.cca.repository.DisputedTransactionRepository;
import com.incomm.cca.repository.SessionRepository;
import com.incomm.cca.repository.action.C2CRequestRepository;
import com.incomm.cca.repository.session.EncorComponentRepository;
import com.incomm.cca.repository.session.PrivacyRequestComponentRepository;
import com.incomm.cca.repository.session.SessionComponentRepository;
import com.incomm.cca.repository.session.UpdateSessionRepository;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cca.service.session.CallComponentService;
import com.incomm.cca.service.session.I3SessionService;
import com.incomm.cca.service.session.SessionClassService;
import com.incomm.cca.service.session.SessionStatusHistoryService;
import com.incomm.cca.service.session.SessionTypeService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * This service manages general CCA session handling (and should not
 * directly manage IVR/I3-related session handling), including creating
 * new sessions, wrapping up, and closing.
 * <p>
 * Created by Allen on 5/16/2014.
 */
@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ApplicationContext appContext;
    @Autowired
    private SelectionService selectionService;
    @Autowired
    private VmsSessionService vmsSessionService;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private C2CRequestRepository c2CRequestRepository;
    @Autowired
    private I3SessionService i3SessionService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private SessionFactory sessionFactory;
    @Autowired
    private CallComponentService callComponentService;
    @Autowired
    private UpdateSessionRepository updateSessionRepository;
    @Autowired
    private SessionClassService sessionClassService;
    @Autowired
    private SessionStatusHistoryService statusHistoryService;
    @Autowired
    private SessionComponentRepository sessionComponentRepository;
    @Autowired
    private SessionTypeService sessionTypeService;
    @Autowired
    private PrivacyRequestComponentRepository privacyRequestComponentRepository;
    @Autowired
    private PrivacyRequestComponentConverter privacyRequestComponentConverter;
    @Autowired
    private DisputedTransactionRepository disputedTransactionRepository;
    @Autowired
    private DisputeComponentConverter disputeComponentConverter;
    @Autowired
    private EncorComponentRepository encorComponentRepository;
    @Autowired
    private EncorComponentConverter encorComponentConverter;
    @Autowired
    private EncryptionService encryptionService;

    private static final String UPDATE_SESSION_TYPE_WHERE_NOT_WRAPPED_OR_CLOSED = "" +
            "UPDATE cca_session " +
            "SET session_type = :sessionType, " +
            "session_queue_id = NULL, " +
            "wrap_up_code_category_id = NULL, " +
            "wrap_up_code_id = NULL " +
            "WHERE id = :sessionId " +
            "AND status != 'WRAPPEDUP' " +
            "AND closed_date IS NULL";
    private static final String UPDATE_SESSION_QUEUE_WHERE_NOT_WRAPPED_OR_CLOSED = "" +
            "UPDATE cca_session " +
            "SET session_queue_id = :queueId, " +
            "wrap_up_code_category_id = :categoryId, " +
            "wrap_up_code_id = :codeId " +
            "WHERE id = :sessionId " +
            "AND status != 'WRAPPEDUP' " +
            "AND closed_date IS NULL";
    private static final String UPDATE_SESSION_WRAP_UP_CODE_CATEGORY_WHERE_NOT_WRAPPED_OR_CLOSED = "" +
            "UPDATE cca_session " +
            "SET wrap_up_code_category_id = :categoryId, " +
            "wrap_up_code_id = NULL " +
            "WHERE id = :sessionId " +
            "AND status != 'WRAPPEDUP' " +
            "AND closed_date IS NULL";
    private static final String UPDATE_SESSION_WRAP_UP_CODE_WHERE_NOT_WRAPPED_OR_CLOSED = "" +
            "UPDATE cca_session " +
            "SET wrap_up_code_id = :codeId " +
            "WHERE id = :sessionId " +
            "AND status != 'WRAPPEDUP' " +
            "AND closed_date IS NULL";
    private static final String UPDATE_SESSION_STATUS_TO_ACTIVE_WHERE_AWAITING_DOCS = "" +
            "UPDATE cca_session " +
            "SET status = 'ACTIVE' " +
            "WHERE id = :sessionId " +
            "AND status == 'AWAITING_DOCS' " +
            "AND closed_date IS NULL";

    @Transactional
    public Session createNewSession(NewSessionRequestView request) {
        try {
            if (request.getSessionType() == null) {
                throw new IllegalArgumentException("'sessionType' is required");
            } else if (request.getStatus() == null) {
                throw new IllegalArgumentException("'status' is required");
            }
            this.encryptionService.openSymmetricKey();

            //GENERAL sessions are always allowed, but check all else
            if (!request.getSessionType()
                        .equals(SessionTypeType.GENERAL)) {
                ManagedPermission permission = securityService.findPermissionForSessionType(request.getSessionType());
                if (permission == null || !securityService.hasPermission(permission)) {
                    throw new SecurityViolationException();
                }
            }

            if (request.getSessionClass() == null) {
                com.incomm.cca.model.domain.session.SessionClass sessionClass = this.sessionClassService.findOneBySessionType(request.getSessionType());
                request.setSessionClass(sessionClass.getName());
            }

            return sessionFactory.newSession(request);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to create new session")
                        .keyValue("cause", e.getMessage())
                        .json("request", request)
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to create new session")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create new session")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Session> findAllByIdentifier(String identifier, String identifierType) {
        Page<Session> page = findAllByIdentifier(identifier, identifierType, PageRequest.of(0, 1000));
        return page.getContent();
    }

    public Page<Session> findAllByIdentifier(String identifier, String identifierType, Pageable pageable) {
        List<String> allowedSessionTypes = sessionTypeService.findAll()
                                                             .stream()
                                                             .map(SessionType::getName)
                                                             .filter(securityService::hasCaseSearchSessionTypePermission)
                                                             .collect(Collectors.toList());
        return sessionRepository.findAllByIdentifier(identifier, identifierType, allowedSessionTypes, pageable);
    }

    /**
     * Retrieves the session, and validates that the session is in an editable state.
     *
     * @throws IllegalStateException if session not found or not editable
     */
    public Session findSessionForEditing(Long id) {
        Session session = sessionRepository.findById(id)
                                           .orElse(null);
        if (session == null) {
            throw new IllegalArgumentException("Session not found");
        }

        if (session.isClosed()) {
            throw new IllegalStateException("Session is already closed");
        }

        return session;
    }

    @Transactional
    public Session getSessionAndActivate(Long id) throws NotFoundException {
        try {
            Session session = findOne(id);

            if (Objects.equals(session.getStatus(), SessionStatus.QUEUED)) {
                statusHistoryService.addOneByCurrentUser(id, session.getStatus(), SessionStatus.ACTIVE);
                session.setStatus(SessionStatus.ACTIVE);
            }

            session.setUser(userService.currentPersistentUser());

            return session;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn(String.format("Bad attempt to retrieve and activate session for user=%s sessionId=%s cause=%s", userService.currentUser()
                                                                                                                                         .getUsername(), id, e.getMessage()));
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve and activate session")
                        .keyValue("sessionId", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Session findOne(Long id) throws NotFoundException {
        try {
            this.encryptionService.openSymmetricKey();
            Session session = sessionRepository.findOneWithFetch(id);
            if (session == null) {
                throw new NotFoundException("Session not found");
            }

            return session;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to retrieve session")
                        .keyValue("sessionId", id)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve session")
                        .keyValue("sessionId", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Session> findAllForTeamWorkspace() {
        List<Session> sessions = sessionRepository.findAllBySessionClassAndClosedDateIsNullOrderByIdAsc(SessionClassType.CASE);
        return sessions.stream()
                       .filter(session -> session.getQueue() != null && securityService.hasPermission(session.getQueue()
                                                                                                             .getPermission()
                                                                                                             .getSystemName())
                       )
                       .collect(Collectors.toList());
    }

    public Session findOneByCommentId(Long commentId) {
        try {
            return sessionRepository.findOneByCommentsId(commentId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve session")
                        .keyValue("commentId", commentId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Selection addSelectionToSession(Long sessionId, Selection request) {
        try {
            selectionService.validateSelection(request);

            Session session = sessionRepository.findById(sessionId)
                                               .orElse(null);

            //We must have a valid session match
            if (session == null) {
                throw new NotFoundException();
            }
            //And that session must not have been closed
            else if (session.getClosedDate() != null) {
                throw new SessionAlreadyClosedValidationException();
            }

            //Only add selection if it doesn't already exist for this session
            Selection selection = session.getSelectionMatchingRequest(request);
            if (selection == null) {
                selection = selectionService.createSelection(session, request);
                session.getSelections()
                       .add(selection);
            } else if (selection.getDeletedDate() != null) {
                selection.setDeletedDate(null);
            }

            SelectionTrackingService selectionTrackingService = (SelectionTrackingService) appContext.getBean("SelectionTrackingService");
            selectionTrackingService.setDefaultSelectionId(String.valueOf(selection.getId()));

            return selection;
        } catch (SessionAlreadyWrappedValidationException | SessionAlreadyClosedValidationException e) {
            CsCoreLogger.warn("Attempted to add selection to session that was already wrapped up or closed")
                        .keyValue("sessionId", sessionId)
                        .json("request", request)
                        .build();
            throw e;
        } catch (IllegalArgumentException | NotFoundException e) {
            CsCoreLogger.warn("Bad attempt to add selection to session")
                        .keyValue("sessionId", sessionId)
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add selection to session")
                        .keyValue("sessionId", sessionId)
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void updateSessionType(Long sessionId, String sessionType) {
        try {
			/*
			Use targeted UPDATE statement, not JPA, to make this change. This is to prevent
            JPA from saving stale data back to the database due to the high volume of asynchronous
            requests to update a session record.
             */
            Map<String, Object> params = new HashMap<>();
            params.put("sessionId", sessionId);
            params.put("sessionType", sessionType);

            jdbcTemplate.update(UPDATE_SESSION_TYPE_WHERE_NOT_WRAPPED_OR_CLOSED, params);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update session type")
                        .keyValue("sessionId", sessionId)
                        .keyValue("sessionType", sessionType)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void updateSessionQueue(Long sessionId, Long queueId) {
        try {
		    /*
            Use targeted UPDATE statement, not JPA, to make this change. This is to prevent
            JPA from saving stale data back to the database due to the high volume of asynchronous
            requests to update a session record.
             */
            Map<String, Object> params = new HashMap<>();
            params.put("sessionId", sessionId);
            params.put("queueId", queueId);
            params.put("categoryId", null);
            params.put("codeId", null);

            jdbcTemplate.update(UPDATE_SESSION_QUEUE_WHERE_NOT_WRAPPED_OR_CLOSED, params);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update session queue")
                        .keyValue("sessionId", sessionId)
                        .keyValue("queueId", queueId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void updateSessionWrapUpCodeCategory(Long sessionId, Long wrapUpCodeCategoryId) {
        try {
	        /*
            Use targeted UPDATE statement, not JPA, to make this change. This is to prevent
            JPA from saving stale data back to the database due to the high volume of asynchronous
            requests to update a session record.
             */
            Map<String, Object> params = new HashMap<>();
            params.put("sessionId", sessionId);
            params.put("categoryId", wrapUpCodeCategoryId);

            jdbcTemplate.update(UPDATE_SESSION_WRAP_UP_CODE_CATEGORY_WHERE_NOT_WRAPPED_OR_CLOSED, params);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update session wrap up code category")
                        .keyValue("sessionId", sessionId)
                        .keyValue("wrapUpCodeCategoryId", wrapUpCodeCategoryId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void updateSessionWrapUpCode(Long sessionId, Long wrapUpCodeId) {
        try {
	        /*
            Use targeted UPDATE statement, not JPA, to make this change. This is to prevent
            JPA from saving stale data back to the database due to the high volume of asynchronous
            requests to update a session record.
             */
            Map<String, Object> params = new HashMap<>();
            params.put("sessionId", sessionId);
            params.put("codeId", wrapUpCodeId);

            jdbcTemplate.update(UPDATE_SESSION_WRAP_UP_CODE_WHERE_NOT_WRAPPED_OR_CLOSED, params);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update session wrap up code")
                        .keyValue("sessionId", sessionId)
                        .keyValue("wrapUpCodeId", wrapUpCodeId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * Allow the session creating user to switch the session status from awaiting docs to active.  This is if there is
     * a failure in sending dispute forms, the status should not be in awaiting docs.  For security, it can only go
     * from one state to the other and it must be the same user that just created the session.
     *
     * @param sessionId
     * @throws Exception
     */
    @Transactional
    public void updateSessionStatusActiveWhereAwaitingDocs(Long sessionId) throws Exception {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("sessionId", sessionId);

            Long userId = userService.currentPersistentUser()
                                     .getId();
            Session session = findOne(sessionId);
            if (!session.getCreatedBy()
                        .getId()
                        .equals(userId)) {
                throw new Exception("Only the creating user can change the status.");
            }

            jdbcTemplate.update(UPDATE_SESSION_STATUS_TO_ACTIVE_WHERE_AWAITING_DOCS, params);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update session status to open")
                        .keyValue("sessionId", sessionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void cancelSession(long sessionId) {
        try {
            Session session = this.findOne(sessionId);
            if (session == null) {
                throw new IllegalArgumentException("No session found with this ID");
            }
            statusHistoryService.addOneByCurrentUser(sessionId, session.getStatus(), SessionStatus.CANCELLED);
            session.setClosedDate(new Date());
            session.setStatus(SessionStatus.CANCELLED);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to cancel session")
                        .keyValue("sessionId", sessionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Session closeSession(Long sessionId) {
        Session session = findOne(sessionId);

        try {
            if (session == null) {
                throw new NotFoundException("Session not found");
            }

            //Ensure session is wrapped up first
            if (validateSessionNeedsWrapUp(session)) {
                session = i3SessionService.wrapUpI3Session(session, false, null, true);
            }

            validateSessionForClose(session);

            //Process pending C2CRequests, if any
            List<C2CRequest> pendingRequests = c2CRequestRepository.findAllPendingForSessionId(sessionId);
            for (C2CRequest request : pendingRequests) {
                request.setStatus(C2CRequestStatus.ABANDONED);
                request.setModifiedBy(userService.currentPersistentUser());
                request.setModifiedDate(new Date());
            }

            //Process selections
            for (Selection selection : session.getSelections()) {

                //If CUSTOMER, close the VMS session
                if (Objects.equals(selection.getType(), SelectionType.CUSTOMER) && StringUtils.isNotBlank(selection.getExternalSessionId())) {
                    try {
                        vmsSessionService.closeSessionForSelection(session, selection);
                    } catch (Exception e) {
                        //Fail silently
                    }
                }
            }

            statusHistoryService.addOneByCurrentUser(session.getId(), session.getStatus(), SessionStatus.CLOSED);
            session.setClosedDate(new Date());
            session.setStatus(SessionStatus.CLOSED);

            return session;
        } catch (SessionAlreadyWrappedValidationException | SessionAlreadyClosedValidationException e) {
            CsCoreLogger.warn("Attempt to close session that was already closed")
                        .keyValue("sessionId", sessionId)
                        .build();
            return session;
        } catch (IllegalArgumentException | NotFoundException e) {
            CsCoreLogger.warn("Bad attempt to close session")
                        .keyValue("sessionId", sessionId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to close session")
                        .keyValue("sessionId", sessionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void changeSessionType(Long sessionId, String sessionType) {
        try {
            encryptionService.openSymmetricKey();
            //Must have permission for new type
            if (!Objects.equals(sessionType, SessionTypeType.GENERAL)) {
                ManagedPermission permission = securityService.findPermissionForSessionType(sessionType);
                if (permission == null || !securityService.hasPermission(permission)) {
                    throw new SecurityViolationException();
                }
            }

            //Cannot set to LEGACY or SYSTEM type
            if (Objects.equals(sessionType, SessionTypeType.LEGACY) || Objects.equals(sessionType, SessionTypeType.SYSTEM)) {
                throw new IllegalArgumentException("Cannot change type to LEGACY or SYSTEM");
            }

            Session session = findOne(sessionId);
            if (session == null) {
                throw new NotFoundException("Session not found");
            }

            if (!Objects.equals(session.getSessionType(), sessionType)) {
                //Update class and type
                session.setSessionClass(getSessionClassForSessionType(sessionType));
                session.setSessionType(sessionType);

                //Clear queue, category, and code
                session.setQueue(null);
                session.setWrapUpCodeCategory(null);
                session.setWrapUpCode(null);

                List<SessionComponentType> components = getComponentsForSessionType(sessionType);

                //Remove components as needed
                if (session.getCallComponent() != null && !components.contains(SessionComponentType.CALL_COMPONENT)) {
                    session.setCallComponent(null);
                }
                if (session.getCustomerComponent() != null && !components.contains(SessionComponentType.CUSTOMER_COMPONENT)) {
                    session.setCustomerComponent(null);
                }
                if (session.getMerchantComponent() != null && !components.contains(SessionComponentType.MERCHANT_COMPONENT)) {
                    session.setMerchantComponent(null);
                }
                if (session.getReceiptComponent() != null && !components.contains(SessionComponentType.RECEIPT_COMPONENT)) {
                    session.setReceiptComponent(null);
                }
                if (session.getCardsComponent() != null && !components.contains(SessionComponentType.CARDS_COMPONENT)) {
                    session.setCardsComponent(null);
                }
                if (session.getLawEnforcementComponent() != null && !components.contains(SessionComponentType.LAW_ENFORCEMENT_COMPONENT)) {
                    session.setLawEnforcementComponent(null);
                }
                if (session.getRefundRequestComponent() != null && !components.contains(SessionComponentType.REFUND_REQUEST_COMPONENT)) {
                    session.setRefundRequestComponent(null);
                }

                //Add components as needed
                if (session.getCallComponent() == null && components.contains(SessionComponentType.CALL_COMPONENT)) {
                    CallComponent callComponent = callComponentService.newCallDetail(session);
                    session.setCallComponent(callComponent);
                }
                if (session.getCustomerComponent() == null && components.contains(SessionComponentType.CUSTOMER_COMPONENT)) {
                    CustomerComponent customerComponent = new CustomerComponent();
                    customerComponent.setSession(session);
                    session.setCustomerComponent(customerComponent);
                }
                if (session.getMerchantComponent() == null && components.contains(SessionComponentType.MERCHANT_COMPONENT)) {
                    MerchantComponent merchantComponent = new MerchantComponent();
                    merchantComponent.setSession(session);
                    session.setMerchantComponent(merchantComponent);
                }
                if (session.getReceiptComponent() == null && components.contains(SessionComponentType.RECEIPT_COMPONENT)) {
                    ReceiptComponent receiptComponent = new ReceiptComponent();
                    receiptComponent.setSession(session);
                    session.setReceiptComponent(receiptComponent);
                }
                if (session.getCardsComponent() == null && components.contains(SessionComponentType.CARDS_COMPONENT)) {
                    CardsComponent cardsComponent = new CardsComponent();
                    cardsComponent.setSession(session);
                    session.setCardsComponent(cardsComponent);
                }
                if (session.getLawEnforcementComponent() == null && components.contains(SessionComponentType.LAW_ENFORCEMENT_COMPONENT)) {
                    LawEnforcementComponent lawEnforcementComponent = new LawEnforcementComponent();
                    lawEnforcementComponent.setSession(session);
                    session.setLawEnforcementComponent(lawEnforcementComponent);
                }
                if (session.getRefundRequestComponent() == null && components.contains(SessionComponentType.REFUND_REQUEST_COMPONENT)) {
                    RefundRequestComponent refundRequestComponent = new RefundRequestComponent();
                    refundRequestComponent.setSession(session);
                    session.setRefundRequestComponent(refundRequestComponent);
                }
            }
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to change session type")
                        .keyValue("sessionId", sessionId)
                        .keyValue("sessionType", sessionType)
                        .build();
            throw e;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to change session type")
                        .keyValue("sessionId", sessionId)
                        .keyValue("sessionType", sessionType)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to change session type")
                        .keyValue("sessionId", sessionId)
                        .keyValue("sessionType", sessionType)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public UpdateSession updateOne(UpdateSession request) {
        UpdateSession existing = updateSessionRepository.findById(request.getId())
                                                        .orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("No Session found with this ID");
        }

        existing.setCategoryId(request.getCategoryId());
        existing.setModifiedBy(userService.currentPersistentUser()
                                          .getId());
        existing.setModifiedDate(new Date());
        existing.setQueueId(request.getQueueId());
        existing.setSessionType(request.getSessionType());
        existing.setTeamId(request.getTeamId());
        existing.setUserId(request.getUserId());
        existing.setWrapUpCodeId(request.getWrapUpCodeId());
        existing.setSummary(request.getSummary());

        if (StringUtils.isNotBlank(request.getStatus()) && !request.getStatus()
                                                                   .equals(existing.getStatus())) {
            statusHistoryService.addOneByCurrentUser(existing.getId(), existing.getStatus(), request.getStatus());
            existing.setStatus(request.getStatus());
        }

        if (!StringUtils.equals(request.getStatus(), "CLOSED")) {
            existing.setClosedDate(null);
        }

        return existing;
    }

    /**
     * Update an existing encor component.  Fetch existing then update form fields.
     *
     * @param encorComponent
     * @return The updated view.
     */
    @Transactional
    public EncorComponentView updateEncorComponent(EncorComponentView encorComponent) {
        EncorComponent existing = encorComponentRepository.findById(encorComponent.getId())
                                                          .orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Encor Component not found");
        }

        existing.setPriority(encorComponent.getPriority());
        existing.setCustomerId(encorComponent.getCustomerId());
        existing.setOrderId(encorComponent.getOrderId());
        existing.setIssueType(encorComponent.getIssueType());
        existing.setComplaintType(encorComponent.getComplaintType());

        existing = this.encorComponentRepository.saveAndFlush(existing);
        return this.encorComponentConverter.convert(existing);
    }

    /**
     * Just allow updating disputeId for now.  Only works for SERVE.
     *
     * @param disputeTransactionView
     * @return
     */
    @Transactional
    public DisputeTransactionView updateDisputeTransaction(DisputeTransactionView disputeTransactionView) {
        securityService.validateHasPermission(ManagedPermission.SERVE_RAISE_DISPUTE);

        DisputedTransaction existing = disputedTransactionRepository.findById(disputeTransactionView.getId())
                                                                    .orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Dispute Transaction Component not found");
        }

        existing.setDisputeId(disputeTransactionView.getDisputeId());

        existing = this.disputedTransactionRepository.saveAndFlush(existing);
        return this.disputeComponentConverter.convertTransaction(existing);
    }

    /**
     * Update an existing privacy request component.  Fetch existing then update form fields.
     *
     * @param privacyRequestComponent
     * @return The updated view.
     */
    @Transactional
    public PrivacyRequestComponentView updatePrivacyRequestComponent(PrivacyRequestComponentView privacyRequestComponent) {
        PrivacyRequestComponent existing = privacyRequestComponentRepository.findById(privacyRequestComponent.getId())
                                                                            .orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Privacy Request Component not found");
        }

        existing.setAccount(privacyRequestComponent.getAccount());
        existing.setComment(privacyRequestComponent.getComment());
        existing.setEmail(privacyRequestComponent.getEmail());
        existing.setFirstName(privacyRequestComponent.getFirstName());
        existing.setJobTitle(privacyRequestComponent.getJobTitle());
        existing.setPhoneNumber(privacyRequestComponent.getPhoneNumber());
        existing.setEmail(privacyRequestComponent.getEmail());
        existing.setProductId(privacyRequestComponent.getProductId());
        if (privacyRequestComponent.getAddress() != null) {
            existing.setCity(privacyRequestComponent.getAddress()
                                                    .getCity());
            existing.setLine1(privacyRequestComponent.getAddress()
                                                     .getLine1());
            existing.setLine2(privacyRequestComponent.getAddress()
                                                     .getLine2());
            existing.setPostalCode(privacyRequestComponent.getAddress()
                                                          .getPostalCode());
            existing.setState(privacyRequestComponent.getAddress()
                                                     .getState());
        }

        existing = this.privacyRequestComponentRepository.saveAndFlush(existing);
        return this.privacyRequestComponentConverter.convert(existing);
    }

    private String getSessionClassForSessionType(String sessionType) {
        com.incomm.cca.model.domain.session.SessionClass sessionClass = this.sessionClassService.findOneBySessionType(sessionType);
        if (sessionClass != null) {
            return sessionClass.getName();
        } else {
            throw new IllegalStateException("SessionType not configured");
        }
    }

    private List<SessionComponentType> getComponentsForSessionType(String sessionType) {
        return this.sessionComponentRepository.findAllBySessionTypesName(sessionType)
                                              .stream()
                                              .map(sessionComponent -> SessionComponentType.valueOf(sessionComponent.getName()))
                                              .collect(Collectors.toList());
    }

    private void validateSessionForClose(Session session) throws SessionAlreadyClosedValidationException {
        //If session has a call detail, validate it
		if (session.getCallComponent() != null) {
			if (StringUtils.isBlank(session.getCallComponent()
                                           .getCallerName())) {
                throw new IllegalArgumentException("Session must have a caller name before closing");
            }
        }

        //Validate remainder
        if (session.getQueue() == null) {
            throw new IllegalArgumentException("Session must have a queue before closing");
        } else if (session.getWrapUpCodeCategory() == null) {
            throw new IllegalArgumentException("Session must have a wrapUpCategory before closing");
        } else if (session.getWrapUpCode() == null) {
            throw new IllegalArgumentException("Session must have a wrapUpCode before closing");
        } else if (session.getClosedDate() != null) {
            throw new SessionAlreadyClosedValidationException();
        }
    }

    private boolean validateSessionNeedsWrapUp(Session session) {
        return session != null
				&& session.getCallComponent() != null;
    }
}
