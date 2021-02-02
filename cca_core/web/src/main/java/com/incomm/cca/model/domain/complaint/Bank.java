package com.incomm.cca.model.domain.complaint;

import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.User;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Where;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class Bank extends AuditableEntity implements CrudEntity<Long> {

    private Long id;
    private User deletedBy;
    private Date deletedDate;
    private String displayValue;
    private String systemValue;
    private List<ComplaintCategory> complaintCategories = new ArrayList<>();
    private List<ComplaintCause> complaintCauses = new ArrayList<>();
    private List<ComplaintDepartment> complaintDepartments = new ArrayList<>();
    private List<ComplaintDiscriminationType> complaintDiscriminationTypes = new ArrayList<>();
    private List<ComplaintSource> complaintSources = new ArrayList<>();
    private List<ComplaintType> complaintTypes = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @ManyToOne(cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "deleted_by")
    public User getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(final User deletedBy) {
        this.deletedBy = deletedBy;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getDeletedDate() {
        return deletedDate;
    }

    public void setDeletedDate(final Date deletedDate) {
        this.deletedDate = deletedDate;
    }

    public String getDisplayValue() {
        return displayValue;
    }

    public void setDisplayValue(final String displayValue) {
        this.displayValue = displayValue;
    }

    public String getSystemValue() {
        return systemValue;
    }

    public void setSystemValue(final String systemValue) {
        this.systemValue = systemValue;
    }

    @OneToMany(mappedBy = "bank", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    @Where(clause = "is_inactive != 1")
    public List<ComplaintCategory> getComplaintCategories() {
        return complaintCategories;
    }

    public void setComplaintCategories(final List<ComplaintCategory> complaintCategories) {
        this.complaintCategories = complaintCategories;
    }

    @OneToMany(mappedBy = "bank", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<ComplaintCause> getComplaintCauses() {
        return complaintCauses;
    }

    public void setComplaintCauses(final List<ComplaintCause> complaintCauses) {
        this.complaintCauses = complaintCauses;
    }

    @OneToMany(mappedBy = "bank", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<ComplaintDepartment> getComplaintDepartments() {
        return complaintDepartments;
    }

    public void setComplaintDepartments(final List<ComplaintDepartment> complaintDepartments) {
        this.complaintDepartments = complaintDepartments;
    }

    @OneToMany(mappedBy = "bank", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<ComplaintDiscriminationType> getComplaintDiscriminationTypes() {
        return complaintDiscriminationTypes;
    }

    public void setComplaintDiscriminationTypes(final List<ComplaintDiscriminationType> complaintDiscriminationTypes) {
        this.complaintDiscriminationTypes = complaintDiscriminationTypes;
    }

    @OneToMany(mappedBy = "bank", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<ComplaintSource> getComplaintSources() {
        return complaintSources;
    }

    public void setComplaintSources(final List<ComplaintSource> complaintSources) {
        this.complaintSources = complaintSources;
    }

    @OneToMany(mappedBy = "bank", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<ComplaintType> getComplaintTypes() {
        return complaintTypes;
    }

    public void setComplaintTypes(final List<ComplaintType> complaintTypes) {
        this.complaintTypes = complaintTypes;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(this.systemValue)) {
            throw new IllegalArgumentException("Bank systemValue must be provided");
        } else if (StringUtils.isBlank(this.displayValue)) {
            throw new IllegalArgumentException("Bank name must be provided");
        }
    }
}
