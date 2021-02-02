package com.incomm.cca.model.view.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.PermissionView;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReportView implements Serializable {

    private Long id;
    private Boolean isActive = false;
    private String link;
    private String name;
    private PermissionView permission;
    private String snippet;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(final Boolean isActive) {
        this.isActive = isActive;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

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

    public String getSnippet() {
        return snippet;
    }

    public void setSnippet(final String snippet) {
        this.snippet = snippet;
    }
}
