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
@Table(name = "audit_balance_adjustment_activity")
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuditBalanceAdjustmentActivity {

    private Long id;
    private String identifierType;
    private String identifier;
    private String platform;
    private Double amount;
    private String transactionType;
    private String productDescription;
    private Date adjustedDate;
    private String adjustedBy;

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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getAdjustedDate() {
        return adjustedDate;
    }

    public void setAdjustedDate(Date adjustedDate) {
        this.adjustedDate = adjustedDate;
    }

    public String getAdjustedBy() {
        return adjustedBy;
    }

    public void setAdjustedBy(String adjustedBy) {
        this.adjustedBy = adjustedBy;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(final String productDescription) {
        this.productDescription = productDescription;
    }
}
