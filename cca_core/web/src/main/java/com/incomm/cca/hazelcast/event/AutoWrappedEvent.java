package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("auto-wrapped")
public class AutoWrappedEvent extends ServerEvent {

    private String session;

    public AutoWrappedEvent(String username, String serializedSession) {
        super(username);
        this.session = serializedSession;
    }

    public String getSession() {
        return session;
    }
}
