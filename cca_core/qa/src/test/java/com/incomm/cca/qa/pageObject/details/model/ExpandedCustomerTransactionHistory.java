package com.incomm.cca.qa.pageObject.details.model;

/**
 * Created by svukkadapu on 2/3/2017.
 */
public class ExpandedCustomerTransactionHistory extends ExpandedTransactionHistory {

    private String merchantId;
    private String transactionId;
    private String international;
    private String creditOrDebit;
    private String originalTransId;
    private String originalTransDate;
    private String originalTransTerminalId;
    private String request;
    private String mCCCode;
    private String preAuthReleaseDate;
    private String authenticationType;

    public ExpandedCustomerTransactionHistory(ExpandedTransactionHistory expandedTransactionHistory) {
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

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getInternational() {
        return international;
    }

    public void setInternational(String international) {
        this.international = international;
    }

    public String getCreditOrDebit() {
        return creditOrDebit;
    }

    public void setCreditOrDebit(String creditOrDebit) {
        this.creditOrDebit = creditOrDebit;
    }

    public String getOriginalTransId() {
        return originalTransId;
    }

    public void setOriginalTransId(String originalTransId) {
        this.originalTransId = originalTransId;
    }

    public String getOriginalTransDate() {
        return originalTransDate;
    }

    public void setOriginalTransDate(String originalTransDate) {
        this.originalTransDate = originalTransDate;
    }

    public String getOriginalTransTerminalId() {
        return originalTransTerminalId;
    }

    public void setOriginalTransTerminalId(String originalTransTerminalId) {
        this.originalTransTerminalId = originalTransTerminalId;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getmCCCode() {
        return mCCCode;
    }

    public void setmCCCode(String mCCCode) {
        this.mCCCode = mCCCode;
    }

    public String getPreAuthReleaseDate() {
        return preAuthReleaseDate;
    }

    public void setPreAuthReleaseDate(String preAuthReleaseDate) {
        this.preAuthReleaseDate = preAuthReleaseDate;
    }

    public String getAuthenticationType() {
        return authenticationType;
    }

    public void setAuthenticationType(String authenticationType) {
        this.authenticationType = authenticationType;
    }
}
