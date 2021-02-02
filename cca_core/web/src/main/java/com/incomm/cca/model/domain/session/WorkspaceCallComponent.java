package com.incomm.cca.model.domain.session;

import org.hibernate.annotations.ColumnTransformer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "call_component")
public class WorkspaceCallComponent implements Serializable {

    protected Long id;
    protected String callerName;
    protected Date connectedDate;
    protected Date disconnectedDate;
    protected String uid;
    private WorkspaceSession session;

    @OneToOne
    @JoinColumn(name = "session_id")
    public WorkspaceSession getSession() {
        return session;
    }

    public void setSession(final WorkspaceSession session) {
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

    @Column(name = "encrypted_caller_name")
    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([encrypted_caller_name]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getCallerName() {
        return callerName;
    }

    public void setCallerName(String callerName) {
        this.callerName = callerName;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getConnectedDate() {
        return connectedDate;
    }

    public void setConnectedDate(Date connectedDate) {
        this.connectedDate = connectedDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getDisconnectedDate() {
        return disconnectedDate;
    }

    public void setDisconnectedDate(Date disconnectedDate) {
        this.disconnectedDate = disconnectedDate;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

}
