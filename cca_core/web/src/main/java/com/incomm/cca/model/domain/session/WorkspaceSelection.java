package com.incomm.cca.model.domain.session;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "selection")
public class WorkspaceSelection implements Serializable {

    protected Long id;
    protected Date deletedDate;
    protected String platform;
    protected String type;
    private WorkspaceSession session;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    public WorkspaceSession getSession() {
        return session;
    }

    public void setSession(WorkspaceSession session) {
        this.session = session;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getDeletedDate() {
        return deletedDate;
    }

    public void setDeletedDate(final Date deletedDate) {
        this.deletedDate = deletedDate;
    }
}
