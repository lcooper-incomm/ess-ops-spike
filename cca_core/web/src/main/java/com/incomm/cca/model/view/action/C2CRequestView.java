package com.incomm.cca.model.view.action;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class C2CRequestView implements Serializable {

    private Long id;
    private CsCoreCurrency amount;
    private String comment;
    private UserView createdBy;
    private CsCoreTimestamp createdDate;
    private String fromCardholder;
    private String fromCustomerId;
    private String fromPan;
    private UserView modifiedBy;
    private CsCoreTimestamp modifiedDate;
    private AplsPlatform platform;
    private String reason;
    private Long sessionId;
    private String status;
    private String toCustomerId;
    private String toCardholder;
    private String toPan;
    private CsCoreCurrency transferFee;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public CsCoreCurrency getAmount() {
        return amount;
    }

    public void setAmount(final CsCoreCurrency amount) {
        this.amount = amount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(final String comment) {
        this.comment = comment;
    }

    public UserView getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final UserView createdBy) {
        this.createdBy = createdBy;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public String getFromCardholder() {
        return fromCardholder;
    }

    public void setFromCardholder(final String fromCardholder) {
        this.fromCardholder = fromCardholder;
    }

    public String getFromCustomerId() {
        return fromCustomerId;
    }

    public void setFromCustomerId(final String fromCustomerId) {
        this.fromCustomerId = fromCustomerId;
    }

    public String getFromPan() {
        return fromPan;
    }

    public void setFromPan(final String fromPan) {
        this.fromPan = fromPan;
    }

    public UserView getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final UserView modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public CsCoreTimestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final CsCoreTimestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public AplsPlatform getPlatform() {
        return platform;
    }

    public void setPlatform(final AplsPlatform platform) {
        this.platform = platform;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(final String reason) {
        this.reason = reason;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(final Long sessionId) {
        this.sessionId = sessionId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public String getToCustomerId() {
        return toCustomerId;
    }

    public void setToCustomerId(final String toCustomerId) {
        this.toCustomerId = toCustomerId;
    }

    public String getToCardholder() {
        return toCardholder;
    }

    public void setToCardholder(final String toCardholder) {
        this.toCardholder = toCardholder;
    }

    public String getToPan() {
        return toPan;
    }

    public void setToPan(final String toPan) {
        this.toPan = toPan;
    }

    public CsCoreCurrency getTransferFee() {
        return transferFee;
    }

    public void setTransferFee(final CsCoreCurrency transferFee) {
        this.transferFee = transferFee;
    }
}
