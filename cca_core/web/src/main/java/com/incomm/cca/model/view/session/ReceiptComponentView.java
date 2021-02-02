package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReceiptComponentView implements Serializable {

    private Long id;
    private String paymentMethod;
    private String receiptId;
    private CsCoreCurrency totalAmount;
    private CsCoreCurrency transactionAmount;
    private CsCoreTimestamp transactionDate;
    private String transactionTime;
    private List<ReceiptComponentCardView> cards = new ArrayList<>();

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

    public CsCoreCurrency getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(final CsCoreCurrency totalAmount) {
        this.totalAmount = totalAmount;
    }

    public CsCoreCurrency getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(final CsCoreCurrency transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public CsCoreTimestamp getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(final CsCoreTimestamp transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(final String transactionTime) {
        this.transactionTime = transactionTime;
    }

    public List<ReceiptComponentCardView> getCards() {
        return cards;
    }

    public void setCards(final List<ReceiptComponentCardView> cards) {
        this.cards = cards;
    }
}
