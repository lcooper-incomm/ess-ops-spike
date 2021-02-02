package com.incomm.cca.model.domain.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.CascadeType;
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
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class MerchantComponent implements Serializable {

    private Long id;
    private Session session;
    private String merchantName;
    private String merchantLegacyId;
    private String locationName;
    private String contactName;
    private String contactTitle;
    private String contactPhone;
    private String line1;
    private String line2;
    private String city;
    private String state;
    private String postalCode;
    private Date purchasedDate;
    private Date firstRedemptionAttemptedDate;
    private Date deactivatedDate;
    private Date lastReloadedDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactTitle() {
        return contactTitle;
    }

    public void setContactTitle(String contactTitle) {
        this.contactTitle = contactTitle;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    @Column(name = "line_1")
    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    @Column(name = "line_2")
    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getPurchasedDate() {
        return purchasedDate;
    }

    public void setPurchasedDate(Date purchasedDate) {
        this.purchasedDate = purchasedDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getFirstRedemptionAttemptedDate() {
        return firstRedemptionAttemptedDate;
    }

    public void setFirstRedemptionAttemptedDate(Date firstRedemptionAttemptedDate) {
        this.firstRedemptionAttemptedDate = firstRedemptionAttemptedDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getDeactivatedDate() {
        return deactivatedDate;
    }

    public void setDeactivatedDate(Date deactivatedDate) {
        this.deactivatedDate = deactivatedDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getLastReloadedDate() {
        return lastReloadedDate;
    }

    public void setLastReloadedDate(Date lastReloadedDate) {
        this.lastReloadedDate = lastReloadedDate;
    }

    public String getMerchantLegacyId() {
        return merchantLegacyId;
    }

    public void setMerchantLegacyId(final String merchantLegacyId) {
        this.merchantLegacyId = merchantLegacyId;
    }
}
