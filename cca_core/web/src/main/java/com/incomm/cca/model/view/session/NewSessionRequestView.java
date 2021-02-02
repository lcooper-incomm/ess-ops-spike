package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.session.PrivacyRequestComponent;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NewSessionRequestView implements Serializable {

    private String sessionClass;
    private String sessionType;
    private String status;
    private PrivacyRequestComponent privacyRequestComponent;

    public String getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(String sessionClass) {
        this.sessionClass = sessionClass;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public PrivacyRequestComponent getPrivacyRequestComponent() {
        return privacyRequestComponent;
    }

    public void setPrivacyRequestComponent(PrivacyRequestComponent privacyRequestComponent) {
        this.privacyRequestComponent = privacyRequestComponent;
    }

    @Override
    public String toString() {
        return "NewSessionRequestView{" +
                "sessionClass=" + sessionClass +
                ", sessionType=" + sessionType +
                ", status=" + status +
                '}';
    }

}
