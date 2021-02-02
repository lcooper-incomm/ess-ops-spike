package com.incomm.cca.model.domain.troubleshooting;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TroubleshootingEntry implements Serializable {

    private String username;
    private String level;
    private String message;
    private Date timestamp;
    private List<String> additionalArgs;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public List<String> getAdditionalArgs() {
        return additionalArgs;
    }

    public void setAdditionalArgs(List<String> additionalArgs) {
        this.additionalArgs = additionalArgs;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(final Date timestamp) {
        this.timestamp = timestamp;
    }
}
