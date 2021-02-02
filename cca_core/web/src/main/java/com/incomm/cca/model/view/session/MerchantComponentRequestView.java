package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreAddress;

import java.io.Serializable;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MerchantComponentRequestView implements Serializable {

    private Long id;
    private CsCoreAddress address;
    private String contactName;
    private String contactPhone;
    private String contactTitle;
    private Date deactivatedDate;
    private Date firstRedemptionAttemptedDate;
    private Date lastReloadedDate;
    private String locationName;
    private String merchantLegacyId;
    private String merchantName;
    private Date purchasedDate;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public CsCoreAddress getAddress() {
        return address;
    }

    public void setAddress(final CsCoreAddress address) {
        this.address = address;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(final String contactName) {
        this.contactName = contactName;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(final String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getContactTitle() {
        return contactTitle;
    }

    public void setContactTitle(final String contactTitle) {
        this.contactTitle = contactTitle;
    }

    public Date getDeactivatedDate() {
        return deactivatedDate;
    }

    public void setDeactivatedDate(final Date deactivatedDate) {
        this.deactivatedDate = deactivatedDate;
    }

    public Date getFirstRedemptionAttemptedDate() {
        return firstRedemptionAttemptedDate;
    }

    public void setFirstRedemptionAttemptedDate(final Date firstRedemptionAttemptedDate) {
        this.firstRedemptionAttemptedDate = firstRedemptionAttemptedDate;
    }

    public Date getLastReloadedDate() {
        return lastReloadedDate;
    }

    public void setLastReloadedDate(final Date lastReloadedDate) {
        this.lastReloadedDate = lastReloadedDate;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(final String locationName) {
        this.locationName = locationName;
    }

    public String getMerchantLegacyId() {
        return merchantLegacyId;
    }

    public void setMerchantLegacyId(final String merchantLegacyId) {
        this.merchantLegacyId = merchantLegacyId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(final String merchantName) {
        this.merchantName = merchantName;
    }

    public Date getPurchasedDate() {
        return purchasedDate;
    }

    public void setPurchasedDate(final Date purchasedDate) {
        this.purchasedDate = purchasedDate;
    }
}
