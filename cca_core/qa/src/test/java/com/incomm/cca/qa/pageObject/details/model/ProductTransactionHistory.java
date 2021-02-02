package com.incomm.cca.qa.pageObject.details.model;

/**
 * Created by svukkadapu on 2/3/2017.
 */
public class ProductTransactionHistory extends TransactionHistory {

    private String transactionId;

    public ProductTransactionHistory(TransactionHistory transactionHistory) {
        this.setSelected(transactionHistory.isSelected());
        this.setDate(transactionHistory.getDate());
        this.setEntity(transactionHistory.getEntity());
        this.setRequest(transactionHistory.getRequest());
        this.setResponse(transactionHistory.getResponse());
        this.setAmount(transactionHistory.getAmount());
        this.setHolds(transactionHistory.getHolds());
        this.setAmount(transactionHistory.getAmount());
    }

    public ProductTransactionHistory() {
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
