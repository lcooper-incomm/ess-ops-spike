package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.User;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cca_session")
public class WorkspaceSession extends AuditableEntity {

    protected Long id;
    protected Date closedDate;
    protected WorkspaceSessionQueue queue;
    protected String sessionClass;
    protected String sessionType;
    protected String status;
    protected String summary;
    protected User user;
    private WorkspaceCallComponent callComponent;

    private Set<WorkspaceSelection> selections = new HashSet<>();

    @OneToOne(mappedBy = "session")
    public WorkspaceCallComponent getCallComponent() {
        return callComponent;
    }

    public void setCallComponent(final WorkspaceCallComponent callComponent) {
        this.callComponent = callComponent;
    }

    @OneToMany(mappedBy = "session")
    public Set<WorkspaceSelection> getSelections() {
        return selections;
    }

    public void setSelections(Set<WorkspaceSelection> selections) {
        this.selections = selections;
    }

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

    public void setClosedDate(Date closedDate) {
        this.closedDate = closedDate;
    }

    @ManyToOne
    @JoinColumn(name = "session_queue_id")
    public WorkspaceSessionQueue getQueue() {
        return queue;
    }

    public void setQueue(WorkspaceSessionQueue queue) {
        this.queue = queue;
    }

    public String getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(String sessionClass) {
        this.sessionClass = sessionClass;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
