package com.incomm.cca.model.view.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PermissionCategoryView implements Serializable {

    private Long id;
    protected UserView createdBy;
    protected CsCoreTimestamp createdDate;
    private String description;
    private String displayName;
    private Boolean locked = false;
    protected UserView modifiedBy;
    protected CsCoreTimestamp modifiedDate;
    private String systemName;
    protected List<PermissionView> permissions = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public UserView getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final UserView createdBy) {
        this.createdBy = createdBy;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(final Boolean locked) {
        this.locked = locked;
    }

    public UserView getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final UserView modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public CsCoreTimestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final CsCoreTimestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(final String systemName) {
        this.systemName = systemName;
    }

    public List<PermissionView> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<PermissionView> permissions) {
        this.permissions = permissions;
    }
}
