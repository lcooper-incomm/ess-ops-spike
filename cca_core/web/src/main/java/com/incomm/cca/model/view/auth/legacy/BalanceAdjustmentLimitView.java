package com.incomm.cca.model.view.auth.legacy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.PermissionView;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BalanceAdjustmentLimitView implements Serializable {

    private Long id;
    private Double min;
    private Double max;
    private Double allowed_max;
    private Double allowed_min;
    private String limitLevel;
    private String systemName;
    private String displayName;
    private PermissionView permission;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMin() {
        return min;
    }

    public void setMin(Double min) {
        this.min = min;
    }

    public Double getMax() {
        return max;
    }

    public void setMax(Double max) {
        this.max = max;
    }

    public Double getAllowed_max() {
        return allowed_max;
    }

    public void setAllowed_max(Double allowed_max) {
        this.allowed_max = allowed_max;
    }

    public Double getAllowed_min() {
        return allowed_min;
    }

    public void setAllowed_min(Double allowed_min) {
        this.allowed_min = allowed_min;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public PermissionView getPermission() {
        return permission;
    }

    public void setPermission(final PermissionView permission) {
        this.permission = permission;
    }

    public String getLimitLevel() {
        return limitLevel;
    }

    public void setLimitLevel(final String limitLevel) {
        this.limitLevel = limitLevel;
    }
}
