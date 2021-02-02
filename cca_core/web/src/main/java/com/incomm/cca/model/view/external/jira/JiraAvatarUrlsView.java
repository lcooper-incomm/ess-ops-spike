package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraAvatarUrlsView implements Serializable {

    @JsonProperty("48x48")
    private String x48;
    @JsonProperty("32x32")
    private String x32;
    @JsonProperty("24x24")
    private String x24;
    @JsonProperty("16x16")
    private String x16;

    public String getX48() {
        return x48;
    }

    public void setX48(String x48) {
        this.x48 = x48;
    }

    public String getX32() {
        return x32;
    }

    public void setX32(String x32) {
        this.x32 = x32;
    }

    public String getX24() {
        return x24;
    }

    public void setX24(String x24) {
        this.x24 = x24;
    }

    public String getX16() {
        return x16;
    }

    public void setX16(String x16) {
        this.x16 = x16;
    }
}
