package com.incomm.cca.model.view.external.vms;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VmsProductTypeView implements Serializable {

    private Long id;
    private Boolean isEnabled = false;
    private String name;
    private String vmsId;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(final Boolean enabled) {
        isEnabled = enabled;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getVmsId() {
        return vmsId;
    }

    public void setVmsId(final String vmsId) {
        this.vmsId = vmsId;
    }
}
