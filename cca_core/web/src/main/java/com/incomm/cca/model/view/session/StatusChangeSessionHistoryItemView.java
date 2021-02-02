package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StatusChangeSessionHistoryItemView extends SessionHistoryItemView {

    private String fromStatus;
    private String toStatus;

    public String getFromStatus() {
        return fromStatus;
    }

    public void setFromStatus(final String fromStatus) {
        this.fromStatus = fromStatus;
    }

    public String getToStatus() {
        return toStatus;
    }

    public void setToStatus(final String toStatus) {
        this.toStatus = toStatus;
    }
}
