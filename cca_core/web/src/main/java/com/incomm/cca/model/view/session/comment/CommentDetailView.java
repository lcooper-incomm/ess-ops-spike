package com.incomm.cca.model.view.session.comment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.model.view.session.queue.SessionQueueView;
import com.incomm.cca.model.view.session.queue.WrapUpCodeCategoryView;
import com.incomm.cca.model.view.session.queue.WrapUpCodeView;
import com.incomm.cca.model.view.session.selection.IdentifierView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentDetailView implements Serializable {

    //Session details
    private Long sessionId;
    private UserView createdBy;
    private CsCoreTimestamp createdDate;
    private CsCoreTimestamp closedDate;
    private SessionQueueView queue;
    private WrapUpCodeCategoryView wrapUpCodeCategory;
    private WrapUpCodeView wrapUpCode;
    //CallDetail details
    private String callerName;
    private String callbackNumber;
    private String dnis;
    private String ani;
    private List<IdentifierView> identifiers = new ArrayList<>();

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(final Long sessionId) {
        this.sessionId = sessionId;
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

    public CsCoreTimestamp getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(final CsCoreTimestamp closedDate) {
        this.closedDate = closedDate;
    }

    public SessionQueueView getQueue() {
        return queue;
    }

    public void setQueue(final SessionQueueView queue) {
        this.queue = queue;
    }

    public WrapUpCodeCategoryView getWrapUpCodeCategory() {
        return wrapUpCodeCategory;
    }

    public void setWrapUpCodeCategory(final WrapUpCodeCategoryView wrapUpCodeCategory) {
        this.wrapUpCodeCategory = wrapUpCodeCategory;
    }

    public WrapUpCodeView getWrapUpCode() {
        return wrapUpCode;
    }

    public void setWrapUpCode(final WrapUpCodeView wrapUpCode) {
        this.wrapUpCode = wrapUpCode;
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

    public String getDnis() {
        return dnis;
    }

    public void setDnis(final String dnis) {
        this.dnis = dnis;
    }

    public String getAni() {
        return ani;
    }

    public void setAni(final String ani) {
        this.ani = ani;
    }

    public List<IdentifierView> getIdentifiers() {
        return identifiers;
    }

    public void setIdentifiers(final List<IdentifierView> identifiers) {
        this.identifiers = identifiers;
    }
}
