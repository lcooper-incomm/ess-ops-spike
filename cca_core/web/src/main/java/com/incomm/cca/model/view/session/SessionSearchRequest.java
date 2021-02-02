package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SessionSearchRequest {

    private String identifier;
    private String identifierType;
    private String sessionClass;
    private Long sid;

    public Long getSid() {
        return sid;
    }

    public void setSid(final Long sid) {
        this.sid = sid;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(final String identifier) {
        this.identifier = identifier;
    }

    public String getIdentifierType() {
        return identifierType;
    }

    public void setIdentifierType(final String identifierType) {
        this.identifierType = identifierType;
    }

    public String getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(final String sessionClass) {
        this.sessionClass = sessionClass;
    }
}
