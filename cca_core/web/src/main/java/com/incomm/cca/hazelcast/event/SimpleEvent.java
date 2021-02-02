package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("simple")
public class SimpleEvent extends ServerEvent {

    private String message;

    public SimpleEvent(String username, String message) {
        super(username);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return String.format("SimpleEvent[message=%s]", message);
    }
}
