package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReceiptComponentRequestView implements Serializable {

    private Long id;
    private String paymentMethod;
    private String receiptId;
    private String totalAmount;
    private String transactionAmount;
    private String transactionDate;
    private String transactionTime;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(final String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getReceiptId() {
        return receiptId;
    }

    public void setReceiptId(final String receiptId) {
        this.receiptId = receiptId;
    }

    public String getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(final String totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(final String transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(final String transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(final String transactionTime) {
        this.transactionTime = transactionTime;
    }
}
