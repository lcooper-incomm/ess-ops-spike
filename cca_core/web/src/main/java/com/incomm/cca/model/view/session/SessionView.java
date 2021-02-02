package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.TeamView;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.model.view.session.comment.CommentView;
import com.incomm.cca.model.view.session.dispute.DisputeComponentView;
import com.incomm.cca.model.view.session.queue.SessionQueueView;
import com.incomm.cca.model.view.session.queue.WrapUpCodeCategoryView;
import com.incomm.cca.model.view.session.queue.WrapUpCodeView;
import com.incomm.cca.model.view.session.selection.SelectionView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SessionView implements Serializable {

    private Long id;
    private CallComponentView callComponent;
    private CardComponentView cardsComponent;
    private ComplaintComponentView complaintComponent;
    private CustomerComponentView customerComponent;
    private CsCoreTimestamp closedDate;
    private UserView createdBy;
    private CsCoreTimestamp createdDate;
    private DisputeComponentView disputeComponent;
    private DocumentsComponentView documentsComponent;
    private EncorComponentView encorComponent;
    private LawEnforcementComponentView lawEnforcementComponent;
    private MerchantComponentView merchantComponent;
    private UserView modifiedBy;
    private CsCoreTimestamp modifiedDate;
    private SessionQueueView queue;
    private PrivacyRequestComponentView privacyRequestComponent;
    private ReceiptComponentView receiptComponent;
    private RefundRequestComponentView refundRequestComponent;
    private String sessionClass;
    private String sessionType;
    private String status;
    private TeamView team;
    private UserView user;
    private String summary;
    private WrapUpCodeView wrapUpCode;
    private WrapUpCodeCategoryView wrapUpCodeCategory;
    private List<CommentView> comments = new ArrayList<>();
    private List<SelectionView> selections = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public CallComponentView getCallComponent() {
        return callComponent;
    }

    public void setCallComponent(final CallComponentView callComponent) {
        this.callComponent = callComponent;
    }

    public CardComponentView getCardsComponent() {
        return cardsComponent;
    }

    public void setCardsComponent(final CardComponentView cardsComponent) {
        this.cardsComponent = cardsComponent;
    }

    public ComplaintComponentView getComplaintComponent() {
        return complaintComponent;
    }

    public void setComplaintComponent(final ComplaintComponentView complaintComponent) {
        this.complaintComponent = complaintComponent;
    }

    public CustomerComponentView getCustomerComponent() {
        return customerComponent;
    }

    public void setCustomerComponent(final CustomerComponentView customerComponent) {
        this.customerComponent = customerComponent;
    }

    public CsCoreTimestamp getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(final CsCoreTimestamp closedDate) {
        this.closedDate = closedDate;
    }

    public UserView getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final UserView createdBy) {
        this.createdBy = createdBy;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public DisputeComponentView getDisputeComponent() {
        return disputeComponent;
    }

    public void setDisputeComponent(final DisputeComponentView disputeComponent) {
        this.disputeComponent = disputeComponent;
    }

    public DocumentsComponentView getDocumentsComponent() {
        return documentsComponent;
    }

    public void setDocumentsComponent(final DocumentsComponentView documentsComponent) {
        this.documentsComponent = documentsComponent;
    }

    public LawEnforcementComponentView getLawEnforcementComponent() {
        return lawEnforcementComponent;
    }

    public void setLawEnforcementComponent(final LawEnforcementComponentView lawEnforcementComponent) {
        this.lawEnforcementComponent = lawEnforcementComponent;
    }

    public MerchantComponentView getMerchantComponent() {
        return merchantComponent;
    }

    public void setMerchantComponent(final MerchantComponentView merchantComponent) {
        this.merchantComponent = merchantComponent;
    }

    public UserView getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final UserView modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public CsCoreTimestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final CsCoreTimestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public SessionQueueView getQueue() {
        return queue;
    }

    public void setQueue(final SessionQueueView queue) {
        this.queue = queue;
    }

    public ReceiptComponentView getReceiptComponent() {
        return receiptComponent;
    }

    public void setReceiptComponent(final ReceiptComponentView receiptComponent) {
        this.receiptComponent = receiptComponent;
    }

    public RefundRequestComponentView getRefundRequestComponent() {
        return refundRequestComponent;
    }

    public void setRefundRequestComponent(final RefundRequestComponentView refundRequestComponent) {
        this.refundRequestComponent = refundRequestComponent;
    }

    public String getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(final String sessionClass) {
        this.sessionClass = sessionClass;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(final String sessionType) {
        this.sessionType = sessionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public TeamView getTeam() {
        return team;
    }

    public void setTeam(final TeamView team) {
        this.team = team;
    }

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public WrapUpCodeView getWrapUpCode() {
        return wrapUpCode;
    }

    public void setWrapUpCode(final WrapUpCodeView wrapUpCode) {
        this.wrapUpCode = wrapUpCode;
    }

    public WrapUpCodeCategoryView getWrapUpCodeCategory() {
        return wrapUpCodeCategory;
    }

    public void setWrapUpCodeCategory(final WrapUpCodeCategoryView wrapUpCodeCategory) {
        this.wrapUpCodeCategory = wrapUpCodeCategory;
    }

    public List<CommentView> getComments() {
        return comments;
    }

    public void setComments(final List<CommentView> comments) {
        this.comments = comments;
    }

    public List<SelectionView> getSelections() {
        return selections;
    }

    public void setSelections(final List<SelectionView> selections) {
        this.selections = selections;
    }

    public PrivacyRequestComponentView getPrivacyRequestComponent() {
        return privacyRequestComponent;
    }

    public void setPrivacyRequestComponent(PrivacyRequestComponentView privacyRequestComponent) {
        this.privacyRequestComponent = privacyRequestComponent;
    }

    public EncorComponentView getEncorComponent() {
        return encorComponent;
    }

    public void setEncorComponent(EncorComponentView encorComponent) {
        this.encorComponent = encorComponent;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
