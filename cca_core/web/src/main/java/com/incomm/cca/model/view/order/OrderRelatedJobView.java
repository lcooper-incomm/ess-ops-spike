package com.incomm.cca.model.view.order;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.minion.model.scheduler.enums.JobStatusType;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRelatedJobView implements Serializable {

    private Long id;
    private Long orderId;
    private Long jobId;
    private String targetStatus;
    private CsCoreTimestamp createdDate;
    private UserView createdBy;
    private Boolean isJobComplete = false;
    private JobStatusType currentJobStatus;

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

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public UserView getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final UserView createdBy) {
        this.createdBy = createdBy;
    }

    public Boolean getIsJobComplete() {
        return isJobComplete;
    }

    public void setIsJobComplete(Boolean isJobComplete) {
        this.isJobComplete = isJobComplete;
    }

    public JobStatusType getCurrentJobStatus() {
        return this.currentJobStatus;
    }

    public void setCurrentJobStatus(JobStatusType currentJobStatus) {
        this.currentJobStatus = currentJobStatus;
    }
}
