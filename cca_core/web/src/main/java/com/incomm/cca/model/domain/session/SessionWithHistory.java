package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cscore.mvcutils.model.CrudEntity;

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

/**
 * This entity is used in one or more cron jobs, and is a minimal view of what's needed there to keep performance optimal.
 */
@Entity
@Table(name = "cca_session")
public class SessionWithHistory extends AuditableEntity implements CrudEntity<Long> {

    private Long id;
    private Date closedDate;
    private String status;
    private String sessionClass;
    private SessionQueue sessionQueue;
    private String sessionType;
    private List<SessionStatusHistory> statusHistories = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(final Date closedDate) {
        this.closedDate = closedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public String getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(final String sessionClass) {
        this.sessionClass = sessionClass;
    }

    @ManyToOne
    @JoinColumn(name = "session_queue_id")
    public SessionQueue getSessionQueue() {
        return sessionQueue;
    }

    public void setSessionQueue(SessionQueue sessionQueue) {
        this.sessionQueue = sessionQueue;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(final String sessionType) {
        this.sessionType = sessionType;
    }

    @OneToMany(mappedBy = "session", fetch = FetchType.EAGER)
    public List<SessionStatusHistory> getStatusHistories() {
        return statusHistories;
    }

    public void setStatusHistories(final List<SessionStatusHistory> statusHistories) {
        this.statusHistories = statusHistories;
    }

    @Override
    public void validate() {
        //We don't need to put anything here yet
    }
}
