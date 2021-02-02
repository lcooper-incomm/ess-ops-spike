package com.incomm.cca.model.view.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AuditCardReplacementActivityView implements Serializable {

    protected Long id;
    protected String identifierType;
    protected String identifier;
    protected String platform;
    protected CsCoreTimestamp lastReplacedDate;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getIdentifierType() {
        return identifierType;
    }

    public void setIdentifierType(final String identifierType) {
        this.identifierType = identifierType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(final String identifier) {
        this.identifier = identifier;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public CsCoreTimestamp getLastReplacedDate() {
        return lastReplacedDate;
    }

    public void setLastReplacedDate(final CsCoreTimestamp lastReplacedDate) {
        this.lastReplacedDate = lastReplacedDate;
    }
}
