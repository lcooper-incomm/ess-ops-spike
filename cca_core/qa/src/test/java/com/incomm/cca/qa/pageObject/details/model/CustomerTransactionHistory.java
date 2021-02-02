package com.incomm.cca.qa.pageObject.details.model;

/**
 * Created by svukkadapu on 2/3/2017.
 */
public class CustomerTransactionHistory extends TransactionHistory {

    private String card;
    private String fee;
    private String source;

    public CustomerTransactionHistory(TransactionHistory transactionHistory) {
        this.setSelected(transactionHistory.isSelected());
        this.setDate(transactionHistory.getDate());
        this.setEntity(transactionHistory.getEntity());
        this.setRequest(transactionHistory.getRequest());
        this.setResponse(transactionHistory.getResponse());
        this.setAmount(transactionHistory.getAmount());
        this.setHolds(transactionHistory.getHolds());
        this.setAmount(transactionHistory.getAmount());
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}