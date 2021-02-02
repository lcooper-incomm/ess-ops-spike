package com.incomm.cca.model.view.i3;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.session.Session;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class I3CallResponseView implements Serializable {

    private String uid;
    private Long sessionId;

    public I3CallResponseView() {
    }

    public I3CallResponseView(Session session) {
        this.sessionId = session.getId();
        if (session.getCallComponent() != null) {
            this.uid = session.getCallComponent()
                              .getUid();
        }
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public String toString() {
        return "I3CallResponseView{" +
                "uid='" + uid + '\'' +
                ", sessionId=" + sessionId +
                '}';
    }
}
