package com.incomm.cca.model.view.i3;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.xml.bind.annotation.XmlRootElement;

@JsonIgnoreProperties(ignoreUnknown = true)
@XmlRootElement(name = "calldetail")
public class IVRCallDetailView {

    private String accountNumber;
    private String accountId;
    private String ani;
    private String dnis;
    private String lastFour;
    private String min;
    private String orderNumber;
    private String pin;
    private String platform;
    private String proxyNumber;
    private String serialNumber;
    private Long sessionId;
    private String uid;
    private String van16;
    private boolean isCardVerified;
    private boolean isDateOfBirthVerified;
    private boolean isLastFourSsnVerified;

    public IVRCallDetailView() {
    }

    public IVRCallDetailView(I3CallRequestView i3CallRequestView) {
        this.ani = i3CallRequestView.getAni();
        this.dnis = i3CallRequestView.getDnis();
        this.uid = i3CallRequestView.getUid();
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(final String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAni() {
        return ani;
    }

    public void setAni(String ani) {
        this.ani = ani;
    }

    public String getDnis() {
        return dnis;
    }

    public void setDnis(String dnis) {
        this.dnis = dnis;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(final String lastFour) {
        this.lastFour = lastFour;
    }

    public String getMin() {
        return min;
    }

    public void setMin(String min) {
        this.min = min;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(final String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getVan16() {
        return van16;
    }

    public void setVan16(String van16) {
        this.van16 = van16;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getProxyNumber() {
        return proxyNumber;
    }

    public void setProxyNumber(String proxyNumber) {
        this.proxyNumber = proxyNumber;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public boolean getIsCardVerified() {
        return isCardVerified;
    }

    public void setIsCardVerified(boolean cardVerfied) {
        isCardVerified = cardVerfied;
    }

    public boolean getIsDateOfBirthVerified() {
        return isDateOfBirthVerified;
    }

    public void setIsDateOfBirthVerified(boolean dateOfBirthVerified) {
        isDateOfBirthVerified = dateOfBirthVerified;
    }

    public boolean getIsLastFourSsnVerified() {
        return isLastFourSsnVerified;
    }

    public void setIsLastFourSsnVerified(boolean lastFourSsnVerfied) {
        isLastFourSsnVerified = lastFourSsnVerfied;
    }

    @Override
    public String toString() {
        return "IVRCallDetailView{" +
                "accountNumber='" + accountNumber + '\'' +
                ", ani='" + ani + '\'' +
                ", dnis='" + dnis + '\'' +
                ", lastFour='" + lastFour + '\'' +
                ", min='" + min + '\'' +
                ", orderNumber='" + orderNumber + '\'' +
                ", pin='" + pin + '\'' +
                ", platform='" + platform + '\'' +
                ", proxyNumber='" + proxyNumber + '\'' +
                ", serialNumber='" + serialNumber + '\'' +
                ", sessionId=" + sessionId +
                ", uid='" + uid + '\'' +
                ", van16='" + van16 + '\'' +
                '}';
    }

}
