package com.incomm.cca.model.domain.session.dispute;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.incomm.minion.model.scheduler.enums.DisputedTransactionType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table
public class DisputedTransaction implements Serializable {

    private Long id;
	private DisputeComponent disputeComponent;
    private String transactionId;
    private String sourceRefNum;
    private String deliveryChannelCode;
    private String request;
    private String requestCode;
    private String response;
    private String responseCode;
    private Date businessDate;
    private String amount;
    private String merchantName;
    private String cardNumber;
    private String disputeId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    @ManyToOne
	@JoinColumn(name = "dispute_component_id")
	public DisputeComponent getDisputeComponent() {
		return disputeComponent;
    }

	public void setDisputeComponent(DisputeComponent disputeComponent) {
		this.disputeComponent = disputeComponent;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getSourceRefNum() {
        return sourceRefNum;
    }

    public void setSourceRefNum(String sourceRefNum) {
        this.sourceRefNum = sourceRefNum;
    }

    public String getDeliveryChannelCode() {
        return deliveryChannelCode;
    }

    public void setDeliveryChannelCode(String deliveryChannelCode) {
        this.deliveryChannelCode = deliveryChannelCode;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(String requestCode) {
        this.requestCode = requestCode;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getBusinessDate() {
        return businessDate;
    }

    public void setBusinessDate(Date businessDate) {
        this.businessDate = businessDate;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getDisputeId() {
        return disputeId;
    }

    public void setDisputeId(String disputeId) {
        this.disputeId = disputeId;
    }

    @Transient
    @JsonIgnore
	public com.incomm.minion.model.scheduler.support.DisputedTransaction toMinionTransaction() {
		com.incomm.minion.model.scheduler.support.DisputedTransaction disputedTransaction = new com.incomm.minion.model.scheduler.support.DisputedTransaction();
        disputedTransaction.setTransactionDate(this.businessDate);
        disputedTransaction.setAmount(this.amount);
        disputedTransaction.setMerchantName(this.merchantName);

        if (this.deliveryChannelCode.equals("01")) {
            disputedTransaction.setType(DisputedTransactionType.ATM_WITHDRAWAL);
        } else if (this.deliveryChannelCode.equals("02")) {
            disputedTransaction.setType(DisputedTransactionType.POINT_OF_SALE);
        }

        return disputedTransaction;
    }
}
