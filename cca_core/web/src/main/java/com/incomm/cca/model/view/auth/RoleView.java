package com.incomm.cca.model.view.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RoleView implements Serializable {

    protected Long id;
    protected UserView createdBy;
    protected CsCoreTimestamp createdDate;
    protected String description;
    protected String displayName;
    protected GroupView group;
    protected Boolean isActive = false;
    protected Boolean isLocked = false;
    protected MembershipType membershipType;
    protected UserView modifiedBy;
    protected CsCoreTimestamp modifiedDate;
    protected String systemName;
    protected List<UserView> admins = new ArrayList<>();
    protected List<UserView> members = new ArrayList<>();
    protected List<PermissionView> permissions = new ArrayList<>();

    public enum MembershipType {
        ADMINISTRATOR,
        MEMBER
    }

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

    public GroupView getGroup() {
        return group;
    }

    public void setGroup(final GroupView group) {
        this.group = group;
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

    public MembershipType getMembershipType() {
        return membershipType;
    }

    public void setMembershipType(final MembershipType membershipType) {
        this.membershipType = membershipType;
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

    public List<UserView> getAdmins() {
        return admins;
    }

    public void setAdmins(final List<UserView> admins) {
        this.admins = admins;
    }

    public List<UserView> getMembers() {
        return members;
    }

    public void setMembers(final List<UserView> members) {
        this.members = members;
    }
}
