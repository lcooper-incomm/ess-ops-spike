package com.incomm.cca.model.domain.order;

import com.incomm.cca.model.domain.User;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import com.incomm.minion.model.scheduler.enums.JobStatusType;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Entity
@Table
public class OrderRelatedJob implements CrudEntity<Long> {

    private Long id;
    private Long orderId;
    private Long jobId;
    private String targetStatus;
    private Date createdDate;
    private User createdBy;
    private Boolean isJobComplete = false;
    private JobStatusType currentJobStatus;
    private String partner;
    private String platform;

    @PrePersist
    protected void prePersist() {
        this.createdDate = new Date();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(final Long orderId) {
        this.orderId = orderId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(final Long jobId) {
        this.jobId = jobId;
    }

    public String getTargetStatus() {
        return targetStatus;
    }

    public void setTargetStatus(final String targetStatus) {
        this.targetStatus = targetStatus;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Date createdDate) {
        this.createdDate = createdDate;
    }

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "created_by")
    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final User createdBy) {
        this.createdBy = createdBy;
    }

    @Transient
    public Boolean getIsJobComplete() {
        return isJobComplete;
    }

    public void setIsJobComplete(Boolean isJobComplete) {
        this.isJobComplete = isJobComplete;
    }

    @Transient
    public JobStatusType getCurrentJobStatus() {
        return this.currentJobStatus;
    }

    public void setCurrentJobStatus(JobStatusType currentJobStatus) {
        this.currentJobStatus = currentJobStatus;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(final String partner) {
        this.partner = partner;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.getOrderId() == null) {
            throw new IllegalArgumentException("OrderRelatedJob must have an orderId");
        } else if (this.getJobId() == null) {
            throw new IllegalArgumentException("OrderRelatedJob must have a jobId");
        } else if (StringUtils.isBlank(this.getTargetStatus())) {
            throw new IllegalArgumentException("OrderRelatedJob must have a targetStatus");
        }
    }
}
