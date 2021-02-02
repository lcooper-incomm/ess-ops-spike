package com.incomm.cca.model.domain.session;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "cca_session")
public class UpdateSession {

    private Long id;
    private Long categoryId;
    private Date closedDate;
    private Long modifiedBy;
    private Date modifiedDate;
    private Long queueId;
    private String sessionType;
    private String status;
    private Long teamId;
    private Long userId;
    private Long wrapUpCodeId;
    private String summary;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @Column(name = "wrap_up_code_category_id")
    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(final Long categoryId) {
        this.categoryId = categoryId;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(final Date closedDate) {
        this.closedDate = closedDate;
    }

    @Column(name = "modified_by")
    public Long getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final Long modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    @Column(name = "session_queue_id")
    public Long getQueueId() {
        return queueId;
    }

    public void setQueueId(final Long queueId) {
        this.queueId = queueId;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(final String sessionType) {
        this.sessionType = sessionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    @Column(name = "team_id")
    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(final Long teamId) {
        this.teamId = teamId;
    }

    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(final Long userId) {
        this.userId = userId;
    }

    @Column(name = "wrap_up_code_id")
    public Long getWrapUpCodeId() {
        return wrapUpCodeId;
    }

    public void setWrapUpCodeId(final Long wrapUpCodeId) {
        this.wrapUpCodeId = wrapUpCodeId;
    }

    @Column(name = "summary")
    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
