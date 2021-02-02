package com.incomm.cca.model.domain.session;

import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 * Since this is a write-only operation right now, we don't need to actually join this to sessions or users. We can fix
 * the relationships later if needed.
 */
@Entity
@Table
public class SessionStatusHistory implements Serializable, CrudEntity<Long> {

    private Long id;
    private Date createdDate;
    private String fromStatus;
    private SessionWithHistory session;
    private String toStatus;
    private Long userId;

    @PrePersist
    protected void prePersist() {
        this.createdDate = new Date();
    }

    @Id
    @Override
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getFromStatus() {
        return fromStatus;
    }

    public void setFromStatus(final String fromStatus) {
        this.fromStatus = fromStatus;
    }

    @ManyToOne
    @JoinColumn(name = "session_id")
    public SessionWithHistory getSession() {
        return session;
    }

    public void setSession(final SessionWithHistory session) {
        this.session = session;
    }

    public String getToStatus() {
        return toStatus;
    }

    public void setToStatus(final String toStatus) {
        this.toStatus = toStatus;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(final Long userId) {
        this.userId = userId;
    }

    @Override
    public void validate() {
		/*
		This can be done later if we end up needing to create a full CrudService for this. Until then, this is not
		necessary.
		 */
    }
}
