package com.incomm.cca.model.view.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationSearchRequest implements Serializable {

    private String address;
    private String city;
    private String legacyLocationId;
    private String locationId;
    private String locationName;
    private String merchantName;
    private String phoneNumber;
    private String postalCode;
    private String state;
    private String terminalID;

    public String getAddress() {
        return address;
    }

    public void setAddress(final String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(final String city) {
        this.city = city;
    }

    public String getLegacyLocationId() {
        return legacyLocationId;
    }

    public void setLegacyLocationId(final String legacyLocationId) {
        this.legacyLocationId = legacyLocationId;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(final String locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(final String locationName) {
        this.locationName = locationName;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(final String merchantName) {
        this.merchantName = merchantName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(final String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(final String postalCode) {
        this.postalCode = postalCode;
    }

    public String getState() {
        return state;
    }

    public void setState(final String state) {
        this.state = state;
    }

    public String getTerminalID() {
        return terminalID;
    }

    public void setTerminalID(final String terminalID) {
        this.terminalID = terminalID;
    }
}
