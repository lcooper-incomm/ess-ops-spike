package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("connect-troubleshooting-user")
public class ConnectTroubleshootingUserEvent extends ServerEvent {

    public ConnectTroubleshootingUserEvent(String username) {
        super(username);
    }
}
