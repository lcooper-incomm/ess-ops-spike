package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("call-connect")
public class CallConnectEvent extends ServerEvent {

    private String session;

    public CallConnectEvent(String username, String serializedSession) {
        super(username);
        this.session = serializedSession;
    }

    public String getSession() {
        return session;
    }
}
