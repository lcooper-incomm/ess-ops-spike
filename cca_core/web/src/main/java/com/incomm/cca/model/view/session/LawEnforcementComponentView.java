package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LawEnforcementComponentView implements Serializable {

    private Long id;
    private String caseNumber;
    private String badgeNumber;
    private String agency;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
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
