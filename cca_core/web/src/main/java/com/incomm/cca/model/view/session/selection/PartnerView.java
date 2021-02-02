package com.incomm.cca.model.view.session.selection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.PermissionView;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PartnerView implements Serializable {

    private Long id;
    private String ivrDnis;
    private String name;
    private PermissionView permission;
    private String platform;
    private String type;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getIvrDnis() {
        return ivrDnis;
    }

    public void setIvrDnis(final String ivrDnis) {
        this.ivrDnis = ivrDnis;
    }

    public PermissionView getPermission() {
        return permission;
    }

    public void setPermission(final PermissionView permission) {
        this.permission = permission;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }
}
