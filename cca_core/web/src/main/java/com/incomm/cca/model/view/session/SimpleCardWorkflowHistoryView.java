package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SimpleCardWorkflowHistoryView implements Serializable {

    private Long id;
    private CsCoreTimestamp createdDate;
    private String field;
    private Boolean fromValue;
    private Boolean toValue;
    private UserView user;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public String getField() {
        return field;
    }

    public void setField(final String field) {
        this.field = field;
    }

    public Boolean getFromValue() {
        return fromValue;
    }

    public void setFromValue(final Boolean fromValue) {
        this.fromValue = fromValue;
    }

    public Boolean getToValue() {
        return toValue;
    }

    public void setToValue(final Boolean toValue) {
        this.toValue = toValue;
    }

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }
}
