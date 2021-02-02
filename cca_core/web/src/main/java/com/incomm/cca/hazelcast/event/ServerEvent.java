package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

import java.io.Serializable;

/**
 * Used to push server events to the client. Subclasses need to add a @JsonTypeName annotation to
 * distinguish it from other server events, and it must be a unique logical name.
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "event")
public abstract class ServerEvent implements Serializable {

    private String topic;

    public ServerEvent(String topic) {
        this.topic = topic;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(final String topic) {
        this.topic = topic;
    }
}
