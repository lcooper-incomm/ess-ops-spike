package com.incomm.cca.model.view.complaint;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BankView implements Serializable {

    private Long id;
    private UserView createdBy;
    private CsCoreTimestamp createdDate;
    private UserView deletedBy;
    private CsCoreTimestamp deletedDate;
    private String displayValue;
    private UserView modifiedBy;
    private CsCoreTimestamp modifiedDate;
    private String systemValue;
    private List<ComplaintOptionView> complaintCategories = new ArrayList<>();
    private List<ComplaintOptionView> complaintCauses = new ArrayList<>();
    private List<ComplaintOptionView> complaintDepartments = new ArrayList<>();
    private List<ComplaintOptionView> complaintDiscriminationTypes = new ArrayList<>();
    private List<ComplaintOptionView> complaintSources = new ArrayList<>();
    private List<ComplaintOptionView> complaintTypes = new ArrayList<>();

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

    public UserView getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(final UserView deletedBy) {
        this.deletedBy = deletedBy;
    }

    public CsCoreTimestamp getDeletedDate() {
        return deletedDate;
    }

    public void setDeletedDate(final CsCoreTimestamp deletedDate) {
        this.deletedDate = deletedDate;
    }

    public String getDisplayValue() {
        return displayValue;
    }

    public void setDisplayValue(final String displayValue) {
        this.displayValue = displayValue;
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

    public String getSystemValue() {
        return systemValue;
    }

    public void setSystemValue(final String systemValue) {
        this.systemValue = systemValue;
    }

    public List<ComplaintOptionView> getComplaintCategories() {
        return complaintCategories;
    }

    public void setComplaintCategories(final List<ComplaintOptionView> complaintCategories) {
        this.complaintCategories = complaintCategories;
    }

    public List<ComplaintOptionView> getComplaintCauses() {
        return complaintCauses;
    }

    public void setComplaintCauses(final List<ComplaintOptionView> complaintCauses) {
        this.complaintCauses = complaintCauses;
    }

    public List<ComplaintOptionView> getComplaintDepartments() {
        return complaintDepartments;
    }

    public void setComplaintDepartments(final List<ComplaintOptionView> complaintDepartments) {
        this.complaintDepartments = complaintDepartments;
    }

    public List<ComplaintOptionView> getComplaintDiscriminationTypes() {
        return complaintDiscriminationTypes;
    }

    public void setComplaintDiscriminationTypes(final List<ComplaintOptionView> complaintDiscriminationTypes) {
        this.complaintDiscriminationTypes = complaintDiscriminationTypes;
    }

    public List<ComplaintOptionView> getComplaintSources() {
        return complaintSources;
    }

    public void setComplaintSources(final List<ComplaintOptionView> complaintSources) {
        this.complaintSources = complaintSources;
    }

    public List<ComplaintOptionView> getComplaintTypes() {
        return complaintTypes;
    }

    public void setComplaintTypes(final List<ComplaintOptionView> complaintTypes) {
        this.complaintTypes = complaintTypes;
    }
}
