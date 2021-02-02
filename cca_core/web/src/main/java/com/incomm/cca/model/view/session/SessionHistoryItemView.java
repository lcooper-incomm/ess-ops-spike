package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SessionHistoryItemView implements Serializable {

    private CsCoreTimestamp date;
    private String description;
    private SessionHistoryItemType type;
    private UserView user;

    public CsCoreTimestamp getDate() {
        return date;
    }

    public void setDate(final CsCoreTimestamp date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public SessionHistoryItemType getType() {
        return type;
    }

    public void setType(final SessionHistoryItemType type) {
        this.type = type;
    }

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }
}
