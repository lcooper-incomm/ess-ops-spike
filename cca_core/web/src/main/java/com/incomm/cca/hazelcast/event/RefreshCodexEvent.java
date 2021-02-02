package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("refresh-codex")
public class RefreshCodexEvent extends ServerEvent {

    private String codex;

    public RefreshCodexEvent(String topic, String serializedCodex) {
        super(topic);
        this.codex = serializedCodex;
    }

    public String getCodex() {
        return codex;
    }
}
