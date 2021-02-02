package com.incomm.cca.model.view.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GroupView implements Serializable {

    private Long id;
    private UserView createdBy;
    private CsCoreTimestamp createdDate;
    private String description;
    private String displayName;
    private Boolean isActive = false;
    private Boolean isLocked = false;
    private UserView modifiedBy;
    private CsCoreTimestamp modifiedDate;
    private String systemName;
    private List<UserView> owners = new ArrayList<>();
    private List<PermissionView> permissions = new ArrayList<>();
    private List<RoleView> roles = new ArrayList<>();

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

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(final Boolean active) {
        isActive = active;
    }

    public Boolean getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(final Boolean locked) {
        isLocked = locked;
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

    public List<UserView> getOwners() {
        return owners;
    }

    public void setOwners(final List<UserView> owners) {
        this.owners = owners;
    }

    public List<PermissionView> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<PermissionView> permissions) {
        this.permissions = permissions;
    }

    public List<RoleView> getRoles() {
        return roles;
    }

    public void setRoles(final List<RoleView> roles) {
        this.roles = roles;
    }
}
