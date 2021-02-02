package com.incomm.cca.model.domain.troubleshooting;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "troubleshooting_session")
public class TroubleshootingSession {

    private Long id;
    private String connector;
    private String connectee;
    private Date startDate;
    private Date expirationDate;

    public TroubleshootingSession() {
    }

    public TroubleshootingSession(String connector, String connectee, Long configuredDurationInMinutes) {
        this.connector = connector.toLowerCase();
        this.connectee = connectee.toLowerCase();
        this.startDate = new Date();
        this.expirationDate = new Date(this.startDate.getTime() + (configuredDurationInMinutes * 60 * 1000));
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConnector() {
        return connector;
    }

    public void setConnector(String connector) {
        this.connector = connector;
    }

    public String getConnectee() {
        return connectee;
    }

    public void setConnectee(String connectee) {
        this.connectee = connectee;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    @Override
    public String toString() {
        return "TroubleshootingSession{" +
                "id=" + id +
                ", connector='" + connector + '\'' +
                ", connectee='" + connectee + '\'' +
                ", startDate=" + startDate +
                ", expirationDate=" + expirationDate +
                '}';
    }
}
