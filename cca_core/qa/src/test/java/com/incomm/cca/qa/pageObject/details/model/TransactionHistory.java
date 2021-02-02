package com.incomm.cca.qa.pageObject.details.model;

/**
 * Created by svukkadapu on 2/1/2017.
 */
public class TransactionHistory {

    private boolean selected;
    private String date;
    private String entity;
    private String request;
    private String response;
    private String amount;
    private String holds;
    private String available;

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getHolds() {
        return holds;
    }

    public void setHolds(String holds) {
        this.holds = holds;
    }

    public String getAvailable() {
        return available;
    }

    public void setAvailable(String available) {
        this.available = available;
    }
}
