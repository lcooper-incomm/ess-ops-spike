package com.incomm.cca.model.domain.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "audit_card_replacement_activity")
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuditCardReplacementActivity {

    private Long id;
    private String identifierType;
    private String identifier;
    private String platform;
    private Date lastReplacedDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifierType() {
        return identifierType;
    }

    public void setIdentifierType(String identifierType) {
        this.identifierType = identifierType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getLastReplacedDate() {
        return lastReplacedDate;
    }

    public void setLastReplacedDate(Date lastReplacedDate) {
        this.lastReplacedDate = lastReplacedDate;
    }
}
