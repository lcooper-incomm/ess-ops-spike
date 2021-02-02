package com.incomm.cca.qa.pageObject.details.model;

/**
 * Created by svukkadapu on 2/3/2017.
 */
public class ExpandedProductTransactionHistory extends ExpandedTransactionHistory {

    private String location;
    private String acquirerId;
    private String requested;
    private String authorized;
    private String fXSurcharge;
    private String balance;
    private String onHold;
    private String availableBalance;
    private String expirationDate;
    private String x95MessageCode;
    private String x95ProcessCode;
    private String sICCode;
    private String pINTransaction;

    public ExpandedProductTransactionHistory(ExpandedTransactionHistory expandedTransactionHistory) {
        this.setLocation(expandedTransactionHistory.getLocation());
        this.setAddress(expandedTransactionHistory.getAddress());
        this.setAddress2(expandedTransactionHistory.getAddress2());
        this.setCity(expandedTransactionHistory.getCity());
        this.setPostalCode(expandedTransactionHistory.getPostalCode());
        this.setState(expandedTransactionHistory.getState());
        this.setCurrencyCode(expandedTransactionHistory.getCurrencyCode());
        this.setResponse(expandedTransactionHistory.getResponse());
        this.setSettlementDate(expandedTransactionHistory.getSettlementDate());
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAcquirerId() {
        return acquirerId;
    }

    public void setAcquirerId(String acquirerId) {
        this.acquirerId = acquirerId;
    }

    public String getRequested() {
        return requested;
    }

    public void setRequested(String requested) {
        this.requested = requested;
    }

    public String getAuthorized() {
        return authorized;
    }

    public void setAuthorized(String authorized) {
        this.authorized = authorized;
    }

    public String getfXSurcharge() {
        return fXSurcharge;
    }

    public void setfXSurcharge(String fXSurcharge) {
        this.fXSurcharge = fXSurcharge;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getOnHold() {
        return onHold;
    }

    public void setOnHold(String onHold) {
        this.onHold = onHold;
    }

    public String getAvailableBalance() {
        return availableBalance;
    }

    public void setAvailableBalance(String availableBalance) {
        this.availableBalance = availableBalance;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getX95MessageCode() {
        return x95MessageCode;
    }

    public void setX95MessageCode(String x95MessageCode) {
        this.x95MessageCode = x95MessageCode;
    }

    public String getX95ProcessCode() {
        return x95ProcessCode;
    }

    public void setX95ProcessCode(String x95ProcessCode) {
        this.x95ProcessCode = x95ProcessCode;
    }

    public String getsICCode() {
        return sICCode;
    }

    public void setsICCode(String sICCode) {
        this.sICCode = sICCode;
    }

    public String getpINTransaction() {
        return pINTransaction;
    }

    public void setpINTransaction(String pINTransaction) {
        this.pINTransaction = pINTransaction;
    }
}
