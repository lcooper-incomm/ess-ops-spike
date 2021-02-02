package com.incomm.cca.model.converter;

import com.incomm.cca.model.converter.complaint.ComplaintComponentConverter;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.WorkspaceSession;
import com.incomm.cca.model.view.session.SessionView;
import com.incomm.cca.model.view.session.WorkspaceSessionView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SessionConverter {

    @Autowired
    private CallComponentConverter callComponentConverter;
    @Autowired
    private CardComponentConverter cardComponentConverter;
    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private ComplaintComponentConverter complaintComponentConverter;
    @Autowired
    private CustomerComponentConverter customerComponentConverter;
    @Autowired
    private DisputeComponentConverter disputeComponentConverter;
    @Autowired
    private DocumentComponentConverter documentComponentConverter;
    @Autowired
    private EncorComponentConverter encorComponentConverter;
    @Autowired
    private LawEnforcementComponentConverter lawEnforcementComponentConverter;
    @Autowired
    private MerchantComponentConverter merchantComponentConverter;
    @Autowired
    private PrivacyRequestComponentConverter privacyRequestComponentConverter;
    @Autowired
    private QueueConverter queueConverter;
    @Autowired
    private ReceiptComponentConverter receiptComponentConverter;
    @Autowired
    private RefundRequestComponentConverter refundRequestComponentConverter;
    @Autowired
    private SelectionConverter selectionConverter;
    @Autowired
    private TeamConverter teamConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private WrapUpCodeConverter wrapUpCodeConverter;
    @Autowired
    private WrapUpCodeCategoryConverter wrapUpCodeCategoryConverter;

    public List<SessionView> convert(Collection<Session> request) {
        List<SessionView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(session -> views.add(this.convert(session)));
        }

        return views;
    }

    public SessionView convert(Session request) {
        SessionView view = null;

        if (request != null) {
            view = this.convertSimple(request);

            this.mapSessionComponents(request, view);

            view.getComments()
                .addAll(commentConverter.convert(request.getComments()));
            view.getSelections()
                .addAll(selectionConverter.convert(request.getSelections()));
        }

        return view;
    }

    public SessionView convertSimple(Session request) {
        SessionView view = null;

        if (request != null) {
            view = new SessionView();
            view.setId(request.getId());
			view.setCallComponent(callComponentConverter.convert(request.getCallComponent()));
            view.setClosedDate(timestampConverter.convert(request.getClosedDate()));
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setModifiedBy(userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(timestampConverter.convert(request.getModifiedDate()));
            view.setQueue(queueConverter.convertSimple(request.getQueue()));
            view.setSessionClass(request.getSessionClass());
            view.setSessionType(request.getSessionType());
            view.setStatus(request.getStatus());
            view.setTeam(teamConverter.convert(request.getTeam()));
            view.setUser(userConverter.convertSimple(request.getUser()));
            view.setWrapUpCode(wrapUpCodeConverter.convert(request.getWrapUpCode()));
            view.setWrapUpCodeCategory(wrapUpCodeCategoryConverter.convertSimple(request.getWrapUpCodeCategory()));
            view.setSummary(request.getSummary());
        }

        return view;
    }

    public SessionView convertSummary(Session request) {
        SessionView view = this.convertSimple(request);
        this.mapSessionComponents(request, view);

        return view;
    }

    public List<WorkspaceSessionView> convertForWorkspace(Collection<WorkspaceSession> request) {
        List<WorkspaceSessionView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(session -> views.add(this.convert(session)));
        }

        return views;
    }

    public WorkspaceSessionView convert(WorkspaceSession request) {
        WorkspaceSessionView view = null;

        if (request != null) {
            view = new WorkspaceSessionView();
            view.setId(request.getId());
			view.setCallComponent(callComponentConverter.convert(request.getCallComponent()));
            view.setClosedDate(timestampConverter.convert(request.getClosedDate()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setQueue(queueConverter.convert(request.getQueue()));
            view.setSessionClass(request.getSessionClass());
            view.setSessionType(request.getSessionType());
            view.setStatus(request.getStatus());
            view.setSummary(request.getSummary());
            view.setUser(userConverter.convertSimple(request.getUser()));
            view.getSelections()
                .addAll(selectionConverter.convertForWorkspace(request.getSelections()));
        }

        return view;
    }

    private void mapSessionComponents(Session request, SessionView view) {
        view.setCardsComponent(cardComponentConverter.convert(request.getCardsComponent()));
        view.setComplaintComponent(this.complaintComponentConverter.convert(request.getComplaintComponent()));
        view.setCustomerComponent(customerComponentConverter.convert(request.getCustomerComponent()));
        view.setDisputeComponent(this.disputeComponentConverter.convert(request.getDisputeComponent()));
        view.setDocumentsComponent(documentComponentConverter.convert(request.getDocumentsComponent()));
        view.setEncorComponent(encorComponentConverter.convert(request.getEncorComponent()));
        view.setLawEnforcementComponent(lawEnforcementComponentConverter.convert(request.getLawEnforcementComponent()));
        view.setMerchantComponent(merchantComponentConverter.convert(request.getMerchantComponent()));
        view.setPrivacyRequestComponent(this.privacyRequestComponentConverter.convert(request.getPrivacyRequestComponent()));
        view.setReceiptComponent(receiptComponentConverter.convert(request.getReceiptComponent()));
        view.setRefundRequestComponent(refundRequestComponentConverter.convert(request.getRefundRequestComponent()));
    }
}
