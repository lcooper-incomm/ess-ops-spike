package com.incomm.cca.model.view.session.comment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExternalCommentRequestView implements Serializable {

    private String identifierType;
    private String identifier;
    private String note;
    private String username;

    public String getIdentifierType() {
        return identifierType;
    }

    public void setIdentifierType(String identifierType) {
        this.identifierType = identifierType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "ExternalCommentRequestView{" +
                "identifierType=" + identifierType +
                ", identifier='" + identifier + '\'' +
                ", note='" + note + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
