package com.incomm.cca.model.view.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.PseudoHateoasView;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;

@JsonIgnoreProperties
public class AuditActivityView implements Serializable {

    protected Long id;
    protected String type;
    protected CsCoreTimestamp activityDate;
    protected CsCoreTimestamp responseSuccessDate;
    protected CsCoreTimestamp responseFailureDate;
    protected String clientIpAddress;
    protected UserView user;
    protected PseudoHateoasView session;
    protected PseudoHateoasView selection;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public CsCoreTimestamp getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(final CsCoreTimestamp activityDate) {
        this.activityDate = activityDate;
    }

    public CsCoreTimestamp getResponseSuccessDate() {
        return responseSuccessDate;
    }

    public void setResponseSuccessDate(final CsCoreTimestamp responseSuccessDate) {
        this.responseSuccessDate = responseSuccessDate;
    }

    public CsCoreTimestamp getResponseFailureDate() {
        return responseFailureDate;
    }

    public void setResponseFailureDate(final CsCoreTimestamp responseFailureDate) {
        this.responseFailureDate = responseFailureDate;
    }

    public String getClientIpAddress() {
        return clientIpAddress;
    }

    public void setClientIpAddress(final String clientIpAddress) {
        this.clientIpAddress = clientIpAddress;
    }

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public PseudoHateoasView getSession() {
        return session;
    }

    public void setSession(final PseudoHateoasView session) {
        this.session = session;
    }

    public PseudoHateoasView getSelection() {
        return selection;
    }

    public void setSelection(final PseudoHateoasView selection) {
        this.selection = selection;
    }
}
