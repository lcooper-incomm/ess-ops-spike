package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("disconnect-troubleshooting-user")
public class DisconnectTroubleshootingUserEvent extends ServerEvent {

    public DisconnectTroubleshootingUserEvent(String username) {
        super(username);
    }
}
