package com.incomm.cca.model.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "session_queue_session_type")
public class SessionQueueSessionType implements Serializable {

    private Long id;
    private SessionQueue sessionQueue;
    private String sessionType;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "session_queue_id")
    public SessionQueue getSessionQueue() {
        return sessionQueue;
    }

    public void setSessionQueue(final SessionQueue sessionQueue) {
        this.sessionQueue = sessionQueue;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(final String sessionType) {
        this.sessionType = sessionType;
    }
}
