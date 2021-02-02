package com.incomm.cca.model.view;

import com.incomm.cca.model.view.auth.PermissionView;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class TeamView implements Serializable {

    private Long id;
    private UserView createdBy;
    private CsCoreTimestamp createdDate;
    private String description;
    private String displayName;
    private UserView modifiedBy;
    private CsCoreTimestamp modifiedDate;
    private String systemName;
    private PermissionView casePermission;
    private List<UserView> members = new ArrayList<>();

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

    public PermissionView getCasePermission() {
        return casePermission;
    }

    public void setCasePermission(PermissionView casePermission) {
        this.casePermission = casePermission;
    }

    public List<UserView> getMembers() {
        return members;
    }

    public void setMembers(final List<UserView> members) {
        this.members = members;
    }
}
