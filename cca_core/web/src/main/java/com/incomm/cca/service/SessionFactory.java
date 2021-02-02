package com.incomm.cca.service;

import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.constant.SessionTypeType;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.domain.WrapUpCodeCategory;
import com.incomm.cca.model.domain.session.CardsComponent;
import com.incomm.cca.model.domain.session.ComplaintComponent;
import com.incomm.cca.model.domain.session.DocumentsComponent;
import com.incomm.cca.model.domain.session.EncorComponent;
import com.incomm.cca.model.domain.session.CallComponent;
import com.incomm.cca.model.domain.session.CustomerComponent;
import com.incomm.cca.model.domain.session.LawEnforcementComponent;
import com.incomm.cca.model.domain.session.MerchantComponent;
import com.incomm.cca.model.domain.session.ReceiptComponent;
import com.incomm.cca.model.domain.session.RefundRequestComponent;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.enums.session.SessionComponentType;
import com.incomm.cca.model.view.i3.I3CallRequestView;
import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cca.model.view.session.NewSessionRequestView;
import com.incomm.cca.repository.SessionRepository;
import com.incomm.cca.service.session.CallComponentService;
import com.incomm.cca.service.session.SessionTypeService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * This service manages the creation or changing of structure (not just the data)
 * of a session. This includes converting a session from one class or type to another
 * as those actions will usually entail the adding/removing of various detail objects.
 */
@Service
public class SessionFactory {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private QueueService queueService;
    @Autowired
    private UserService userService;
    @Autowired
    private CallComponentService detailCallInfoService;
    @Autowired
    private SessionTypeService sessionTypeService;

    @Transactional
    public Session newSession(NewSessionRequestView request) {
        //Validate
        if (request == null) {
            throw new IllegalArgumentException("Request must not be null");
        } else if (request.getSessionClass() == null) {
            throw new IllegalArgumentException("Session Class must be specified");
        } else if (request.getSessionType() == null) {
            throw new IllegalArgumentException("Session Type must be specified");
        }

        //Default status to ACTIVE
        if (request.getStatus() == null) {
            request.setStatus(SessionStatus.ACTIVE);
        }

        Session session = new Session(request.getStatus());
        session.setSessionClass(request.getSessionClass());
        session.setSessionType(request.getSessionType());
        session.setPrivacyRequestComponent(request.getPrivacyRequestComponent());
        if (session.getPrivacyRequestComponent() != null) {
            session.getPrivacyRequestComponent().setSession(session);

            Comment comment = new Comment();
            comment.getSourceSessions().add(session);
            comment.setContent(request.getPrivacyRequestComponent().getComment());
            comment.setCreatedBy(this.userService.currentPersistentUser());
            comment.setModifiedBy(this.userService.currentPersistentUser());

            session.getComments().add(comment);
        }

        populateUser(session);
        populateQueue(session);
        populateDefaultNote(session);
        populateCategory(session);
        populateCode(session);
        populateDetails(session);

        sessionRepository.saveAndFlush(session);

        return session;
    }

    @Transactional
    public Session newIVRSession(IVRCallDetailView ivrCallDetailView, String ivrRemoteAddress) {
        validateIVRCallDetailDtoNotNull(ivrCallDetailView);

        try {
            Session session = new Session(SessionStatus.QUEUED);

            session.setSessionClass(SessionClassType.CALL_CENTER);
            session.setSessionType(SessionTypeType.CALL);
            populateQueue(session, "IVR");

            sessionRepository.saveAndFlush(session);

            User ccaAdmin = userService.findCCAAdmin();
            session.setCreatedBy(ccaAdmin);
            session.setModifiedBy(ccaAdmin);

            populateCallDetail(session, ivrCallDetailView, ivrRemoteAddress);

            return session;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.error("Failed to create new IVR session")
                        .json("request", ivrCallDetailView)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create new IVR session")
                        .json("request", ivrCallDetailView)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Session newI3SessionFromTransfer(Session transferSession, I3CallRequestView i3CallRequestView, String ivrRemoteAddress) {
        if (transferSession == null) {
            throw new IllegalArgumentException("Original session cannot be null!");
        } else if (i3CallRequestView == null) {
            throw new IllegalArgumentException("I3 request cannot be null!");
        }

        Session session = newIVRSession(new IVRCallDetailView(i3CallRequestView), ivrRemoteAddress);

        if (transferSession.getSelections() != null && !transferSession.getSelections()
                                                                       .isEmpty()) {
            session.getSelections()
                   .addAll(transferSession.getSelections());
        }

        return session;
    }

    @Transactional
    public void completeI3Connection(Session session, SessionQueue queue, I3CallRequestView i3CallRequestView) {
        validateSessionNotNull(session);

        populateUser(session, i3CallRequestView);
        populateQueue(session, queue);
        populateDefaultNote(session);
        populateCallConnectionInfo(session, i3CallRequestView);
    }

    public void populateDetails(Session session) {
        com.incomm.cca.model.domain.session.SessionType sessionType = this.sessionTypeService.findOneByName(session.getSessionType());
        List<SessionComponentType> componentTypes = sessionType.getComponents()
                                                               .stream()
                                                               .map(component -> SessionComponentType.valueOf(component.getName()))
                                                               .collect(Collectors.toList());
        for (SessionComponentType componentType : componentTypes) {
            switch (componentType) {
                case CALL_COMPONENT:
					CallComponent callComponent = new CallComponent();
					callComponent.setSession(session);

					session.setCallComponent(callComponent);
                    break;
                case CARDS_COMPONENT:
                    CardsComponent cardsComponent = new CardsComponent();
                    cardsComponent.setSession(session);

                    session.setCardsComponent(cardsComponent);
                    break;
                case COMPLAINT_COMPONENT:
                    ComplaintComponent complaintComponent = new ComplaintComponent();
                    complaintComponent.setSession(session);

                    session.setComplaintComponent(complaintComponent);
                    break;
                case CUSTOMER_COMPONENT:
					CustomerComponent customerComponent = new CustomerComponent();
					customerComponent.setSession(session);

					session.setCustomerComponent(customerComponent);
                    break;
                case DISPUTE_COMPONENT:
					DisputeComponent disputeComponent = new DisputeComponent();
					disputeComponent.setSession(session);

					session.setDisputeComponent(disputeComponent);
                    break;
                case DOCUMENTS_COMPONENT:
                    DocumentsComponent documentsComponent = new DocumentsComponent();
                    documentsComponent.setSession(session);

                    session.setDocumentsComponent(documentsComponent);
                    break;
                case ENCOR_COMPONENT:
                    EncorComponent encorComponent = new EncorComponent();
                    encorComponent.setSession(session);

                    session.setEncorComponent(encorComponent);
                    break;
                case LAW_ENFORCEMENT_COMPONENT:
					LawEnforcementComponent lawEnforcementComponent = new LawEnforcementComponent();
					lawEnforcementComponent.setSession(session);

					session.setLawEnforcementComponent(lawEnforcementComponent);
                    break;
                case MERCHANT_COMPONENT:
					MerchantComponent merchantComponent = new MerchantComponent();
					merchantComponent.setSession(session);

					session.setMerchantComponent(merchantComponent);
                    break;
                case RECEIPT_COMPONENT:
					ReceiptComponent receiptComponent = new ReceiptComponent();
					receiptComponent.setSession(session);

					session.setReceiptComponent(receiptComponent);
                    break;
                case REFUND_REQUEST_COMPONENT:
					RefundRequestComponent refundRequestComponent = new RefundRequestComponent();
					refundRequestComponent.setSession(session);

					session.setRefundRequestComponent(refundRequestComponent);
                    break;
            }
        }
    }

    private void populateQueue(Session session) {
        SessionQueue queue = null;

        //If GENERAL type, set GENERAL queue
        if (Objects.equals(session.getSessionType(), SessionTypeType.GENERAL)) {
            queue = queueService.findOneBySystemName("GENERAL");
        } else if (Objects.equals(session.getSessionType(), SessionTypeType.PRIVACY_REQUEST)) {
            queue = queueService.findOneBySystemName("003_PERSONAL_INFO_REQUESTED");
        }

        session.setQueue(queue);
    }

    private void populateCategory(Session session) {
        WrapUpCodeCategory category = null;

        //If the session has a queue, and it has only one category, set it
        if (session.getQueue() != null && session.getQueue()
                                                 .getWrapUpCodeCategories()
                                                 .size() == 1) {
            category = session.getQueue()
                              .getWrapUpCodeCategories()
                              .get(0);
        }

        session.setWrapUpCodeCategory(category);
    }

    private void populateCode(Session session) {
        WrapUpCode code = null;

        //If the session has a category, and it has only one code, set it
        if (session.getWrapUpCodeCategory() != null && session.getWrapUpCodeCategory()
                                                              .getWrapUpCodes()
                                                              .size() == 1) {
            code = session.getWrapUpCodeCategory()
                          .getWrapUpCodes()
                          .get(0);
        }

        session.setWrapUpCode(code);
    }

    private void populateCallDetail(Session session, IVRCallDetailView ivrCallDetailView, String ivrRemoteAddress) {
        validateIVRRequirementsNotNull(session, ivrCallDetailView);

		CallComponent callComponent = detailCallInfoService.newCallDetail(session, ivrCallDetailView, ivrRemoteAddress);
		session.setCallComponent(callComponent);
    }

    private void populateCallConnectionInfo(Session session, I3CallRequestView i3CallRequestView) {
        validateI3RequirementsNotNull(session, i3CallRequestView);

		session.getCallComponent()
               .setCallId(i3CallRequestView.getCallId());
		session.getCallComponent()
               .setCallIdKey(i3CallRequestView.getCallIdKey());
		session.getCallComponent()
               .setConnectedDate(new Date());

		if (StringUtils.isBlank(session.getCallComponent()
                                       .getOriginalAni())) {
			session.getCallComponent()
                   .setAni(i3CallRequestView.getAni());
			session.getCallComponent()
                   .setOriginalAni(i3CallRequestView.getAni());
        }
		if (StringUtils.isBlank(session.getCallComponent()
                                       .getOriginalDnis())) {
			session.getCallComponent()
                   .setDnis(i3CallRequestView.getDnis());
			session.getCallComponent()
                   .setOriginalDnis(i3CallRequestView.getDnis());
        }
    }

    private void populateUser(Session session) {
        User user = userService.currentPersistentUser();
        session.setUser(user);
        session.setCreatedBy(user);
        session.setModifiedBy(user);
    }

    private void populateUser(Session session, I3CallRequestView i3CallRequestView) {
        validateSessionNotNull(session);

        User user = userService.findOneByUsername(i3CallRequestView.getAgentUserId());
        session.setUser(user);
    }

    private void populateQueue(Session session, String systemName) {
        validateSessionNotNull(session);

        if (StringUtils.isBlank(systemName)) {
            throw new IllegalArgumentException("systemName must not be null");
        }

        SessionQueue queue = queueService.findOneBySystemName(systemName);
        populateQueue(session, queue);
    }

    private void populateQueue(Session session, SessionQueue queue) {
        validateSessionNotNull(session);
        session.setQueue(queue);
        autoSelectWrapUpCategory(session);
    }

    /**
     * After a queue is selected, we can attempt to auto-select a category,
     * *IF* there is only one category to select from.
     */
    private void autoSelectWrapUpCategory(Session session) {
        validateSessionNotNull(session);

        if (session.getQueue() != null && validateListHasOneItem(session.getQueue()
                                                                        .getWrapUpCodeCategories())) {
            session.setWrapUpCodeCategory(session.getQueue()
                                                 .getWrapUpCodeCategories()
                                                 .get(0));
            autoSelectWrapUpCode(session);
        }
    }

    /**
     * After a category is selected, we can attempt to auto-select a wrap up code,
     * *IF* there is only one code to select from.
     */
    private void autoSelectWrapUpCode(Session session) {
        validateSessionNotNull(session);

        if (session.getWrapUpCodeCategory() != null && validateListHasOneItem(session.getWrapUpCodeCategory()
                                                                                     .getWrapUpCodes())) {
            session.setWrapUpCode(session.getWrapUpCodeCategory()
                                         .getWrapUpCodes()
                                         .get(0));
        }
    }

    private void populateDefaultNote(Session session) {
        /*
        If the session has a queue and that queue has a default note,
        populate the new note with that value
         */
        if (session.getQueue() != null && StringUtils.isNotBlank(session.getQueue()
                                                                        .getDefaultNote())) {
            Comment comment = new Comment(session.getUser());
			comment.setContent(session.getQueue()
                                   .getDefaultNote());

			if (StringUtils.isNotBlank(comment.getContent())) {
                session.getComments()
                       .add(comment);
            }
        }
    }

    private void validateSessionNotNull(Session session) throws IllegalArgumentException {
        if (session == null) {
            throw new IllegalArgumentException("Session cannot be null");
        }
    }

    private void validateIVRRequirementsNotNull(Session session, IVRCallDetailView ivrCallDetailView) throws IllegalArgumentException {
        validateSessionNotNull(session);
        validateIVRCallDetailDtoNotNull(ivrCallDetailView);
    }

    private void validateI3RequirementsNotNull(Session session, I3CallRequestView i3CallRequestView) throws IllegalArgumentException {
        validateSessionNotNull(session);
        validateI3CallDtoNotNull(i3CallRequestView);
    }

    private void validateIVRCallDetailDtoNotNull(IVRCallDetailView ivrCallDetailView) throws IllegalArgumentException {
        if (ivrCallDetailView == null) {
            throw new IllegalArgumentException("IVRCallDetailView cannot be null");
        }
    }

    private void validateI3CallDtoNotNull(I3CallRequestView i3CallRequestView) throws IllegalArgumentException {
        if (i3CallRequestView == null) {
            throw new IllegalArgumentException("I3CallRequestView cannot be null");
        }
    }

    private boolean validateListHasOneItem(List<? extends Object> list) throws IllegalArgumentException {
        return list != null
                && list.size() == 1;
    }
}
