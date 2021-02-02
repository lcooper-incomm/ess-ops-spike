package com.incomm.cca.model.view;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.session.ComplaintComponent;
import com.incomm.cca.model.domain.session.EncorComponent;
import com.incomm.cca.model.domain.session.CustomerComponent;
import com.incomm.cca.model.domain.session.MerchantComponent;
import com.incomm.cca.model.domain.session.ReceiptComponent;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CaseRequest implements Serializable {

    private String comment;
    private ComplaintComponent complaintComponent;
    private EncorComponent encorComponent;
	private CustomerComponent customerComponent;
	private DisputeComponent disputeComponent;
	private MerchantComponent merchantComponent;
    private Long queueId;
	private ReceiptComponent receiptComponent;
    private String sessionType;
    private Long sourceSessionId;
    private String status;
    private Long wrapUpCategoryId;
    private Long wrapUpCodeId;
    private String summary;

    public Long getSourceSessionId() {
        return sourceSessionId;
    }

    public void setSourceSessionId(final Long sourceSessionId) {
        this.sourceSessionId = sourceSessionId;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(final String sessionType) {
        this.sessionType = sessionType;
    }

    public Long getQueueId() {
        return queueId;
    }

    public void setQueueId(final Long queueId) {
        this.queueId = queueId;
    }

    public ComplaintComponent getComplaintComponent() {
        return complaintComponent;
    }

    public void setComplaintComponent(final ComplaintComponent complaintComponent) {
        this.complaintComponent = complaintComponent;
    }

	public CustomerComponent getCustomerComponent() {
        return customerComponent;
    }

	public void setCustomerComponent(final CustomerComponent customerComponent) {
        this.customerComponent = customerComponent;
    }

	public MerchantComponent getMerchantComponent() {
        return merchantComponent;
    }

	public void setMerchantComponent(final MerchantComponent merchantComponent) {
        this.merchantComponent = merchantComponent;
    }

	public ReceiptComponent getReceiptComponent() {
        return receiptComponent;
    }

	public void setReceiptComponent(final ReceiptComponent receiptComponent) {
        this.receiptComponent = receiptComponent;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(final String comment) {
        this.comment = comment;
    }

	public DisputeComponent getDisputeComponent() {
        return disputeComponent;
    }

	public void setDisputeComponent(final DisputeComponent disputeComponent) {
        this.disputeComponent = disputeComponent;
    }

    public Long getWrapUpCategoryId() {
        return wrapUpCategoryId;
    }

    public void setWrapUpCategoryId(final Long wrapUpCategoryId) {
        this.wrapUpCategoryId = wrapUpCategoryId;
    }

    public Long getWrapUpCodeId() {
        return wrapUpCodeId;
    }

    public void setWrapUpCodeId(final Long wrapUpCodeId) {
        this.wrapUpCodeId = wrapUpCodeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public EncorComponent getEncorComponent() {
        return encorComponent;
    }

    public void setEncorComponent(EncorComponent encorComponent) {
        this.encorComponent = encorComponent;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
