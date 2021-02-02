package com.incomm.cca.model.domain.session;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table
public class LawEnforcementComponent implements Serializable {

    private Long id;
    private Session session;
    private String caseNumber;
    private String badgeNumber;
    private String agency;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(final Session session) {
        this.session = session;
    }

    public String getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(final String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getBadgeNumber() {
        return badgeNumber;
    }

    public void setBadgeNumber(final String badgeNumber) {
        this.badgeNumber = badgeNumber;
    }

    public String getAgency() {
        return agency;
    }

    public void setAgency(final String agency) {
        this.agency = agency;
    }
}
