package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.model.view.session.queue.SessionQueueView;
import com.incomm.cca.model.view.session.selection.SelectionView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkspaceSessionView implements Serializable {

    private Long id;
    private CallComponentView callComponent;
    private CsCoreTimestamp closedDate;
    private CsCoreTimestamp createdDate;
    private SessionQueueView queue;
    private String sessionClass;
    private String sessionType;
    private String status;
    private String summary;
    private UserView user;
    private List<SelectionView> selections = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public CallComponentView getCallComponent() {
        return callComponent;
    }

    public void setCallComponent(final CallComponentView callComponent) {
        this.callComponent = callComponent;
    }

    public CsCoreTimestamp getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(final CsCoreTimestamp closedDate) {
        this.closedDate = closedDate;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public SessionQueueView getQueue() {
        return queue;
    }

    public void setQueue(final SessionQueueView queue) {
        this.queue = queue;
    }

    public String getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(final String sessionClass) {
        this.sessionClass = sessionClass;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(final String sessionType) {
        this.sessionType = sessionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public List<SelectionView> getSelections() {
        return selections;
    }

    public void setSelections(final List<SelectionView> selections) {
        this.selections = selections;
    }
}
