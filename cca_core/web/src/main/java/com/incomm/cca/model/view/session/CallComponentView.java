package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CallComponentView implements Serializable {

    private Long id;
    private String accountNumber;
    private String ani;
    private String callerName;
    private String callbackNumber;
    private String callId;
    private String callIdKey;
    private CsCoreTimestamp connectedDate;
    private CsCoreTimestamp createdDate;
    private CsCoreTimestamp disconnectedDate;
    private String disconnectType;
    private String dnis;
    private String lastFour;
    private String orderNumber;
    private String originalAni;
    private String originalDnis;
    private String pin;
    private String platform;
    private String proxyNumber;
    private String serialNumber;
    private String uid;
    private String van;
    private String accountId;
    private Boolean isCardVerified;
    private Boolean isDateOfBirthVerified;
    private Boolean isLastFourSsnVerified;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getAni() {
        return ani;
    }

    public void setAni(final String ani) {
        this.ani = ani;
    }

    public String getCallerName() {
        return callerName;
    }

    public void setCallerName(final String callerName) {
        this.callerName = callerName;
    }

    public String getCallbackNumber() {
        return callbackNumber;
    }

    public void setCallbackNumber(final String callbackNumber) {
        this.callbackNumber = callbackNumber;
    }

    public String getCallId() {
        return callId;
    }

    public void setCallId(final String callId) {
        this.callId = callId;
    }

    public String getCallIdKey() {
        return callIdKey;
    }

    public void setCallIdKey(final String callIdKey) {
        this.callIdKey = callIdKey;
    }

    public CsCoreTimestamp getConnectedDate() {
        return connectedDate;
    }

    public void setConnectedDate(final CsCoreTimestamp connectedDate) {
        this.connectedDate = connectedDate;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public CsCoreTimestamp getDisconnectedDate() {
        return disconnectedDate;
    }

    public void setDisconnectedDate(final CsCoreTimestamp disconnectedDate) {
        this.disconnectedDate = disconnectedDate;
    }

    public String getDisconnectType() {
        return disconnectType;
    }

    public void setDisconnectType(final String disconnectType) {
        this.disconnectType = disconnectType;
    }

    public String getDnis() {
        return dnis;
    }

    public void setDnis(final String dnis) {
        this.dnis = dnis;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(final String lastFour) {
        this.lastFour = lastFour;
    }

    public String getOriginalAni() {
        return originalAni;
    }

    public void setOriginalAni(final String originalAni) {
        this.originalAni = originalAni;
    }

    public String getOriginalDnis() {
        return originalDnis;
    }

    public void setOriginalDnis(final String originalDnis) {
        this.originalDnis = originalDnis;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(final String pin) {
        this.pin = pin;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getProxyNumber() {
        return proxyNumber;
    }

    public void setProxyNumber(final String proxyNumber) {
        this.proxyNumber = proxyNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(final String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(final String uid) {
        this.uid = uid;
    }

    public String getVan() {
        return van;
    }

    public void setVan(final String van) {
        this.van = van;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(final String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(final String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public Boolean getIsCardVerified() {
        return isCardVerified;
    }

    public void setIsCardVerified(Boolean isCardVerified) {
        this.isCardVerified = isCardVerified;
    }

    public Boolean getIsDateOfBirthVerified() {
        return isDateOfBirthVerified;
    }

    public void setIsDateOfBirthVerified(Boolean isDateOfBirthVerified) {
        this.isDateOfBirthVerified = isDateOfBirthVerified;
    }

    public Boolean getIsLastFourSsnVerified() {
        return isLastFourSsnVerified;
    }

    public void setIsLastFourSsnVerified(Boolean isLastFourSsnVerified) {
        this.isLastFourSsnVerified = isLastFourSsnVerified;
    }
}
