package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.PermissionView;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SessionTypeView implements Serializable {

    private String name;
    private PermissionView permission;
    private List<String> components = new ArrayList<>();
    private List<String> statuses = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public PermissionView getPermission() {
        return permission;
    }

    public void setPermission(final PermissionView permission) {
        this.permission = permission;
    }

    public List<String> getComponents() {
        return components;
    }

    public void setComponents(final List<String> components) {
        this.components = components;
    }

    public List<String> getStatuses() {
        return statuses;
    }

    public void setStatuses(final List<String> statuses) {
        this.statuses = statuses;
    }
}
