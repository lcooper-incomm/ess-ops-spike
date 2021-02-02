package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CaseSearchRequest implements Serializable {

    private String serialNumber;
    private String sessionType;
    private String sid;
    private String status;
    private Long queueId;
    private Long teamId;
    private Long userId;
    private String van;

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(final String sessionType) {
        this.sessionType = sessionType;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(final String sid) {
        this.sid = sid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public Long getQueueId() {
        return queueId;
    }

    public void setQueueId(final Long queueId) {
        this.queueId = queueId;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(final Long teamId) {
        this.teamId = teamId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(final Long userId) {
        this.userId = userId;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(final String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getVan() {
        return van;
    }

    public void setVan(final String van) {
        this.van = van;
    }
}
