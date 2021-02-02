package com.incomm.cca.hazelcast.event;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.incomm.cca.model.domain.troubleshooting.TroubleshootingEntry;

import java.util.List;

@JsonTypeName("troubleshooting-entries")
public class TroubleshootingEntriesEvent extends ServerEvent {

    private List<TroubleshootingEntry> entries;

    public TroubleshootingEntriesEvent(String connector, List<TroubleshootingEntry> entries) {
        super(connector);
        this.entries = entries;
    }

    public List<TroubleshootingEntry> getEntries() {
        return entries;
    }

    public void setEntries(List<TroubleshootingEntry> entries) {
        this.entries = entries;
    }
}
