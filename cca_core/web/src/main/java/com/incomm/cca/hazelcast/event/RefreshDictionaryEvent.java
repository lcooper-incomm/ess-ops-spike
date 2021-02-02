package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("refresh-dictionary")
public class RefreshDictionaryEvent extends ServerEvent  {

    public RefreshDictionaryEvent(String topic) {
        super(topic);
    }
}
