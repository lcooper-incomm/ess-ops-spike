package com.incomm.cca.service;

import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.*;
import com.incomm.cca.model.domain.session.ReceiptCard;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.dispute.DisputeProbingQuestion;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.model.view.CaseRequest;
import com.incomm.cca.repository.SessionRepository;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class CaseService {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private QueueService queueService;
    @Autowired
    private UserService userService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private SessionFactory sessionFactory;
    @Autowired
    private VmsSessionService vmsSessionService;
    @Autowired
    private WrapUpCodeCategoryService wrapUpCodeCategoryService;
    @Autowired
    private WrapUpCodeService wrapUpCodeService;
    @Autowired
    private EncryptionService encryptionService;

    @Transactional
    public Session addOne(CaseRequest request) {
        encryptionService.openSymmetricKey();
        try {
            validateRequest(request);

            Session sourceSession = sessionRepository.findById(request.getSourceSessionId())
                    .orElse(null);
            if (sourceSession == null) {
                throw new IllegalArgumentException("Source session not found");
            }

            Session caseSession = convertRequestToSession(request, sourceSession);
            return sessionRepository.save(caseSession);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to create new Case")
                    .keyValue("cause", e.getMessage())
                    .json("request", request)
                    .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create new Case")
                    .json("request", request)
                    .build();
            throw e;
        }
    }

    public List<Session> findAllOpenByIdentifierId(Long identifierId) {
        return sessionRepository.findAllOpenCasesByIdentifierId(identifierId);
    }

    public List<Session> findAllRelatedByIdentifierId(Long identifierId) {
        return sessionRepository.findAllRelatedCasesByIdentifierId(identifierId);
    }

    private Session convertRequestToSession(CaseRequest request, Session sourceSession) {
        SessionQueue queue = queueService.findOne(request.getQueueId());
        if (queue == null) {
            throw new IllegalArgumentException("Queue not found");
        }

        WrapUpCodeCategory category = null;
        if (request.getWrapUpCategoryId() != null) {
            category = this.wrapUpCodeCategoryService.findOne(request.getWrapUpCategoryId());
        }

        WrapUpCode code = null;
        if (request.getWrapUpCodeId() != null) {
            code = this.wrapUpCodeService.findOne(request.getWrapUpCodeId());
        }

        Session caseSession = new Session();
        caseSession.setSessionClass(SessionClassType.CASE);
        caseSession.setSessionType(request.getSessionType());
        caseSession.setQueue(queue);
        caseSession.setWrapUpCodeCategory(category);
        caseSession.setWrapUpCode(code);
        caseSession.setStatus(StringUtils.isNotBlank(request.getStatus()) ? request.getStatus() : SessionStatus.ACTIVE);
        caseSession.setCreatedBy(userService.currentPersistentUser());
        caseSession.setModifiedBy(userService.currentPersistentUser());
        caseSession.setSummary(request.getSummary());

        sessionFactory.populateDetails(caseSession);

        if (request.getComplaintComponent() != null) {
            request.getComplaintComponent()
                    .setSession(caseSession);
            caseSession.setComplaintComponent(request.getComplaintComponent());
            request.getComplaintComponent()
                    .setCreatedBy(this.userService.currentPersistentUser());
            request.getComplaintComponent()
                    .setModifiedBy(this.userService.currentPersistentUser());

            //Automatically close the case if the complaint is already resolved
            if (StringUtils.isNotBlank(request.getComplaintComponent()
                    .getResolution())) {
                caseSession.setStatus(SessionStatus.CLOSED);
                caseSession.setClosedDate(new Date());
            }
        }

        if (request.getCustomerComponent() != null) {
            request.getCustomerComponent()
                    .setSession(caseSession);
            caseSession.setCustomerComponent(request.getCustomerComponent());
        }

        if (request.getMerchantComponent() != null) {
            request.getMerchantComponent()
                    .setSession(caseSession);
            caseSession.setMerchantComponent(request.getMerchantComponent());
        }

        if (request.getReceiptComponent() != null) {
            request.getReceiptComponent()
                    .setSession(caseSession);
            caseSession.setReceiptComponent(request.getReceiptComponent());

            for (ReceiptCard card : request.getReceiptComponent()
                    .getCards()) {
                card.setReceiptComponent(request.getReceiptComponent());
            }
        }

        if (request.getDisputeComponent() != null) {
            request.getDisputeComponent()
                    .setSession(caseSession);
            caseSession.setDisputeComponent(request.getDisputeComponent());
            caseSession.getDisputeComponent()
                    .setCreatedDate(new Date());

            for (DisputeProbingQuestion question : request.getDisputeComponent()
                    .getProbingQuestions()) {
                question.setDisputeComponent(request.getDisputeComponent());
                question.setCreatedBy(this.userService.currentPersistentUser());
            }

            for (DisputedTransaction transaction : request.getDisputeComponent()
                    .getTransactions()) {
                transaction.setDisputeComponent(request.getDisputeComponent());
            }
        }

        if (request.getEncorComponent() != null) {
            request.getEncorComponent().setSession(caseSession);
            caseSession.setEncorComponent(request.getEncorComponent());
        }

        this.convertRequestedSelections(sourceSession, caseSession);

        Comment comment = new Comment();
        comment.setCreatedBy(userService.currentPersistentUser());
        comment.setModifiedBy(userService.currentPersistentUser());
        comment.setContent(request.getComment());

        commentService.preprocessComment(caseSession, comment);

        return caseSession;
    }

    private void convertRequestedSelections(Session sourceSession, Session caseSession) {
        for (Selection selection : sourceSession.getSelections()) {
            if (selection.getDeletedDate() == null) {
                Selection newSelection = new Selection();
                newSelection.setSession(caseSession);
                newSelection.getIdentifiers()
                        .addAll(selection.getIdentifiers());
                newSelection.setPlatform(selection.getPlatform());
                newSelection.setPartner(selection.getPartner());
                newSelection.setType(selection.getType());
                newSelection.setSimplePartner(selection.getSimplePartner());
                newSelection.setDescription(selection.getDescription());

                if (selection.getPlatform()
                        .equals(AplsPlatform.VMS.toString())) {
                    Identifier customerIdIdentifer = selection.getIdentifiers()
                            .stream()
                            .filter(identifier -> identifier.getIdentifierType()
                                    .equals(IdentifierType.CUSTOMERID))
                            .findFirst()
                            .orElse(null);
                    if (customerIdIdentifer != null) {
                        String platform = selection.getPlatform();
                        String partner = selection.getPartner() != null ? selection.getPartner()
                                .getType() : null;

                        FsapiRequestSupport support = new FsapiRequestSupport();
                        if (StringUtils.isNotBlank(platform)) {
                            support.setPlatform(AplsPlatform.valueOf(platform));
                        }
                        support.setPartner(partner);

                        String vmsSessionId = this.vmsSessionService.createSessionForCustomer("999999", customerIdIdentifer.getValue(), support);
                        newSelection.setExternalSessionId(vmsSessionId);
                    }
                }

                caseSession.getSelections()
                        .add(newSelection);
            }
        }
    }

    private void validateRequest(CaseRequest request) {
        if (request.getSourceSessionId() == null) {
            throw new IllegalArgumentException("sourceSessionId must be provided");
        } else if (StringUtils.isBlank(request.getSessionType())) {
            throw new IllegalArgumentException("sessionType must be provided");
        } else if (request.getQueueId() == null) {
            throw new IllegalArgumentException("queueId must be provided");
        } else if (StringUtils.isBlank(request.getComment())) {
            throw new IllegalArgumentException("comment must be provided");
        }
    }
}
