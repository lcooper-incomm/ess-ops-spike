package com.incomm.cca.controller;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.model.constant.SelectionType;
import com.incomm.cca.model.converter.CallComponentConverter;
import com.incomm.cca.model.converter.CardComponentConverter;
import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.converter.CustomerComponentConverter;
import com.incomm.cca.model.converter.DocumentComponentConverter;
import com.incomm.cca.model.converter.LawEnforcementComponentConverter;
import com.incomm.cca.model.converter.MerchantComponentConverter;
import com.incomm.cca.model.converter.QueueConverter;
import com.incomm.cca.model.converter.ReceiptComponentConverter;
import com.incomm.cca.model.converter.RefundRequestComponentConverter;
import com.incomm.cca.model.converter.SelectionConverter;
import com.incomm.cca.model.converter.SessionConverter;
import com.incomm.cca.model.converter.SessionHistoryConverter;
import com.incomm.cca.model.converter.WrapUpCodeCategoryConverter;
import com.incomm.cca.model.converter.WrapUpCodeConverter;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.session.PrivacyRequestComponent;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.UpdateSession;
import com.incomm.cca.model.view.response.GenericMessageView;
import com.incomm.cca.model.view.session.EncorComponentView;
import com.incomm.cca.model.view.session.NewSessionRequestView;
import com.incomm.cca.model.view.session.PrivacyRequestComponentView;
import com.incomm.cca.model.view.session.SessionHistoryItemView;
import com.incomm.cca.model.view.session.SessionSearchRequest;
import com.incomm.cca.model.view.session.dispute.DisputeComponentView;
import com.incomm.cca.model.view.session.dispute.DisputeTransactionView;
import com.incomm.cca.model.view.session.selection.SelectionView;
import com.incomm.cca.service.CommentService;
import com.incomm.cca.service.QueueService;
import com.incomm.cca.service.SessionService;
import com.incomm.cca.service.VmsSessionService;
import com.incomm.cca.service.WrapUpCodeCategoryService;
import com.incomm.cca.service.WrapUpCodeService;
import com.incomm.cca.service.session.I3SessionService;
import com.incomm.cca.service.session.SessionHistoryService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/session")
public class SessionController extends RestResponseHandler {

    @Autowired
    private CallComponentConverter callComponentConverter;
    @Autowired
    private CardComponentConverter cardComponentConverter;
    @Autowired
    private CustomerComponentConverter customerComponentConverter;
    @Autowired
    private DocumentComponentConverter documentComponentConverter;
    @Autowired
    private LawEnforcementComponentConverter lawEnforcementComponentConverter;
    @Autowired
    private MerchantComponentConverter merchantComponentConverter;
    @Autowired
    private ReceiptComponentConverter receiptComponentConverter;
    @Autowired
    private RefundRequestComponentConverter refundRequestComponentConverter;
    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private QueueConverter queueConverter;
    @Autowired
    private SelectionConverter selectionConverter;
    @Autowired
    private SessionConverter sessionConverter;
    @Autowired
    private SessionHistoryConverter sessionHistoryConverter;
    @Autowired
    private WrapUpCodeConverter wrapUpCodeConverter;
    @Autowired
    private WrapUpCodeCategoryConverter wrapUpCodeCategoryConverter;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private SessionHistoryService sessionHistoryService;
    @Autowired
    private I3SessionService i3SessionService;
    @Autowired
    private VmsSessionService vmsSessionService;
    @Autowired
    private QueueService queueService;
    @Autowired
    private WrapUpCodeCategoryService categoryService;
    @Autowired
    private WrapUpCodeService codeService;
    @Autowired
    private CommentService commentService;

    @PostMapping(value = "/search")
    public ResponseEntity search(@RequestBody SessionSearchRequest request) {
        List<Session> domainModels = new ArrayList<>();
        if (request.getSid() != null) {
            try {
                Session result = sessionService.findOne(request.getSid());
                if (result != null) {
                    domainModels.add(result);
                }
            } catch (NotFoundException e) {
                //Do nothing
            }
        } else if (StringUtils.isNotBlank(request.getIdentifier()) && StringUtils.isNotBlank(request.getIdentifierType())) {
            domainModels.addAll(sessionService.findAllByIdentifier(request.getIdentifier(), request.getIdentifierType()));
        }

        return ok(domainModels
                .stream()
                .filter(session -> request.getSessionClass()
                                          .equalsIgnoreCase("ALL") || session.getSessionClass()
                                                                             .equalsIgnoreCase(request.getSessionClass()))
                .map(sessionConverter::convert)
                .collect(Collectors.toList()));
    }

    @PostMapping(value = "/{sessionId}/comment")
    public ResponseEntity addOneComment(@PathVariable("sessionId") Long sessionId, @RequestBody Comment comment) {
        Comment domainModel = commentService.addOneComment(sessionId, comment);
        return ok(commentConverter.convert(domainModel));
    }

    @PostMapping
    public ResponseEntity createNewSession(@RequestBody NewSessionRequestView request) {
        Session session = sessionService.createNewSession(request);
        return ok(sessionConverter.convert(session));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getSession(@PathVariable("id") Long id, @RequestParam(value = "skipActivate", defaultValue = "false") Boolean skipActivate) {
        Session session = null;
        if (skipActivate) {
            session = sessionService.findOne(id);
        } else {
            session = sessionService.getSessionAndActivate(id);
        }
        return ok(sessionConverter.convert(session));
    }

    @GetMapping(value = "/{id}/history")
    public ResponseEntity getSessionHistory(
            @PathVariable("id") Long id,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "50") int limit
    ) {
        Page<SessionHistoryItemView> items = sessionHistoryService.findBySessionId(id, page, limit);
        return ok(items);
    }

    @PostMapping(value = "/vms/{customerId}")
    public ResponseEntity createVmsSession(@PathVariable("customerId") String customerId) {
        String vmsSessionId = vmsSessionService.createSessionForCustomer("9999999", customerId);
        return ok(new GenericMessageView(vmsSessionId));
    }

    @GetMapping(value = "/team-workspace")
    public ResponseEntity findAllForTeamWorkspace() {
        List<Session> sessions = sessionService.findAllForTeamWorkspace();
        return ok(sessionConverter.convert(sessions));
    }

    @PostMapping(value = "/{id}/close")
    public ResponseEntity closeSession(@PathVariable("id") Long id) {
        Session session = sessionService.closeSession(id);
        return ok(sessionConverter.convertSimple(session));
    }

    @PostMapping(value = "/{id}/selection")
    public ResponseEntity addSelectionToSession(
            @PathVariable("id") Long sessionId,
            @RequestBody SelectionView requestView) {
        Selection request = selectionConverter.convert(requestView);
        Selection selection = sessionService.addSelectionToSession(sessionId, request);
        if (Objects.equals(selection.getType(), SelectionType.CUSTOMER) && StringUtils.isBlank(selection.getExternalSessionId())) {
            try {
                vmsSessionService.createSessionForSelection(selection);
            } catch (Exception e) {
                //Fail silently, we'll try this again later if needed
            }
        }
        return ok(selectionConverter.convert(selection));
    }

    @PutMapping(value = "/{id}/cancel")
    public ResponseEntity cancelSession(@PathVariable("id") Long id) {
        sessionService.cancelSession(id);
        return noContent();
    }

    @PutMapping(value = "/{sessionId}/session-type/{sessionType}")
    public ResponseEntity updateSessionType(@PathVariable("sessionId") Long sessionId, @PathVariable("sessionType") String sessionType) {
        sessionService.updateSessionType(sessionId, sessionType);
        return ok(queueService.findAllForSessionType(sessionType));
    }

    @PutMapping(value = "/{sessionId}")
    public ResponseEntity updateSession(@PathVariable("sessionId") Long sessionId, @RequestBody UpdateSession request) {
        sessionService.updateOne(request);
        return ok(sessionConverter.convert(sessionService.findOne(sessionId)));
    }

    @PutMapping(value = "/{sessionId}/queue/{queueId}")
    public ResponseEntity updateSessionQueue(
            @PathVariable("sessionId") Long sessionId,
            @PathVariable("queueId") Long queueId) {
        sessionService.updateSessionQueue(sessionId, queueId);
        return ok(queueConverter.convert(queueService.findOneWithFetch(queueId)));
    }

    @PutMapping(value = "/{sessionId}/category/{categoryId}")
    public ResponseEntity updateSessionCategory(
            @PathVariable("sessionId") Long sessionId,
            @PathVariable("categoryId") Long categoryId) {
        sessionService.updateSessionWrapUpCodeCategory(sessionId, categoryId);
        return ok(wrapUpCodeCategoryConverter.convert(categoryService.findOneWithFetch(categoryId)));
    }

    @PutMapping(value = "/{sessionId}/code/{codeId}")
    public ResponseEntity updateSessionCode(
            @PathVariable("sessionId") Long sessionId,
            @PathVariable("codeId") Long codeId) {
        sessionService.updateSessionWrapUpCode(sessionId, codeId);
        return ok(wrapUpCodeConverter.convert(codeService.findOne(codeId)));
    }

    @PutMapping(value = "/{sessionId}/type/{type}")
    public ResponseEntity changeSessionType(@PathVariable("sessionId") Long sessionId, @PathVariable("type") String sessionType) {
        sessionService.changeSessionType(sessionId, sessionType);
        return noContent();
    }

    /**
     * Update an existing privacy request component.
     *
     * @param privacyRequestComponent
     * @return Response containing the privacy request view.
     */
    @PutMapping(value = "/privacy-request")
    public ResponseEntity updatePrivacyRequestComponent(@RequestBody PrivacyRequestComponentView privacyRequestComponent) {
        return ok(sessionService.updatePrivacyRequestComponent(privacyRequestComponent));
    }

    /**
     * Update an existing encor component.
     *
     * @param encorComponent
     * @return Response containing the encorview.
     */
    @PutMapping(value = "/encor")
    public ResponseEntity updateEncorComponent(@RequestBody EncorComponentView encorComponent) {
        return ok(sessionService.updateEncorComponent(encorComponent));
    }

    @PutMapping(value = "/dispute-transaction")
    public ResponseEntity updateDisputeTransaction(@RequestBody DisputeTransactionView disputeTransaction) {
        return ok(sessionService.updateDisputeTransaction(disputeTransaction));
    }

    @PutMapping(value = "/{sessionId}/status/awaiting-to-active")
    public ResponseEntity changeStatusAwaitingDocsToActive(@PathVariable("sessionId") Long sessionId) {
        try {
            sessionService.updateSessionStatusActiveWhereAwaitingDocs(sessionId);
        } catch (Exception e) {
            // Fail silently to user.
        }
        return noContent();
    }
}
