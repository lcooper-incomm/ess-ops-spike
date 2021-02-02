package com.incomm.cca.model.view.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.User;

import java.io.Serializable;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AuditActivityRequestView implements Serializable {

    private Long id;
    private String type;
    private User user;
    private Long sessionId;
    private Long selectionId;
    private Date activityDate;
    private Date responseSuccessDate;
    private Date responseFailureDate;
    private String systemNote;
    private String clientIpAddress;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(Date actionDate) {
        this.activityDate = actionDate;
    }

    public Date getResponseSuccessDate() {
        return responseSuccessDate;
    }

    public void setResponseSuccessDate(Date responseSuccessDate) {
        this.responseSuccessDate = responseSuccessDate;
    }

    public Date getResponseFailureDate() {
        return responseFailureDate;
    }

    public void setResponseFailureDate(Date responseFailureDate) {
        this.responseFailureDate = responseFailureDate;
    }

    public String getSystemNote() {
        return systemNote;
    }

    public void setSystemNote(String systemNote) {
        this.systemNote = systemNote;
    }

    public String getClientIpAddress() {
        return clientIpAddress;
    }

    public void setClientIpAddress(String clientIpAddress) {
        this.clientIpAddress = clientIpAddress;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(final Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getSelectionId() {
        return selectionId;
    }

    public void setSelectionId(final Long selectionId) {
        this.selectionId = selectionId;
    }

}
