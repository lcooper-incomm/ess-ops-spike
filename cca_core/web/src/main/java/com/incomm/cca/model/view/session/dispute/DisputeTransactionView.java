package com.incomm.cca.model.view.session.dispute;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DisputeTransactionView implements Serializable {

    private Long id;
    private String transactionId;
    private String sourceRefNum;
    private String deliveryChannelCode;
    private String request;
    private String requestCode;
    private String response;
    private String responseCode;
    private CsCoreTimestamp businessDate;
    private CsCoreCurrency amount;
    private String merchantName;
    private String cardNumber;
    private String disputeId;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(final String transactionId) {
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

    public void setDeliveryChannelCode(final String deliveryChannelCode) {
        this.deliveryChannelCode = deliveryChannelCode;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(final String request) {
        this.request = request;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(final String requestCode) {
        this.requestCode = requestCode;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(final String response) {
        this.response = response;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(final String responseCode) {
        this.responseCode = responseCode;
    }

    public CsCoreTimestamp getBusinessDate() {
        return businessDate;
    }

    public void setBusinessDate(final CsCoreTimestamp businessDate) {
        this.businessDate = businessDate;
    }

    public CsCoreCurrency getAmount() {
        return amount;
    }

    public void setAmount(final CsCoreCurrency amount) {
        this.amount = amount;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(final String merchantName) {
        this.merchantName = merchantName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(final String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getDisputeId() {
        return disputeId;
    }

    public void setDisputeId(String disputeId) {
        this.disputeId = disputeId;
    }
}
