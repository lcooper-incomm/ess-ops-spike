package com.incomm.cca.model.domain.audit;

import com.incomm.cca.model.domain.User;

import javax.persistence.Entity;
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
@Table
public class AuditActivity implements Serializable {

    private Long id;
    private String type;
    private User user;
    private Long sessionId;
    private Long selectionId;
    private Date activityDate;
    private Date responseSuccessDate;
    private Date responseFailureDate;
    private String clientIpAddress;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(Date actionDate) {
        this.activityDate = actionDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getResponseSuccessDate() {
        return responseSuccessDate;
    }

    public void setResponseSuccessDate(Date responseSuccessDate) {
        this.responseSuccessDate = responseSuccessDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getResponseFailureDate() {
        return responseFailureDate;
    }

    public void setResponseFailureDate(Date responseFailureDate) {
        this.responseFailureDate = responseFailureDate;
    }

    public String getClientIpAddress() {
        return clientIpAddress;
    }

    public void setClientIpAddress(String clientIpAddress) {
        this.clientIpAddress = clientIpAddress;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(final Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getSelectionId() {
        return selectionId;
    }

    public void setSelectionId(final Long selectionId) {
        this.selectionId = selectionId;
    }

    @Override
    public String toString() {
        return "AuditActivity{" +
                "id=" + id +
                ", type=" + type +
                ", user=" + user +
                ", sessionId=" + sessionId +
                ", selectionId=" + selectionId +
                ", activityDate=" + activityDate +
                ", responseSuccessDate=" + responseSuccessDate +
                ", responseFailureDate=" + responseFailureDate +
                ", clientIpAddress='" + clientIpAddress + '\'' +
                '}';
    }
}
