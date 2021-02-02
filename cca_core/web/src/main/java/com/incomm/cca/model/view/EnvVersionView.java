package com.incomm.cca.model.view;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnvVersionView {

    private String version;
    private List<String> activeProfiles = new ArrayList<>();

    public String getVersion() {
        return version;
    }

    public void setVersion(final String version) {
        this.version = version;
    }

    public List<String> getActiveProfiles() {
        return activeProfiles;
    }

    public void setActiveProfiles(final List<String> activeProfiles) {
        this.activeProfiles = activeProfiles;
    }
}
