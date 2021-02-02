package com.incomm.cca.model.view;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.ShortPay;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SimpleShortPayView implements Serializable {

    protected Long id;
    protected String merchantId;
    protected String merchantName;
    protected String locationId;
    protected String locationName;
    protected String terminalNumber;
    protected String terminalId;

    public SimpleShortPayView() {
    }

    public SimpleShortPayView(ShortPay shortPay) {
        this.id = shortPay.getId();
        this.merchantId = shortPay.getMerchantId();
        this.merchantName = shortPay.getMerchantName();
        this.locationId = shortPay.getLocationId();
        this.locationName = shortPay.getLocationName();
        this.terminalId = shortPay.getTerminalId();
        this.terminalNumber = shortPay.getTerminalNumber();
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(final String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(final String merchantName) {
        this.merchantName = merchantName;
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

    public String getTerminalNumber() {
        return terminalNumber;
    }

    public void setTerminalNumber(final String terminalNumber) {
        this.terminalNumber = terminalNumber;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(final String terminalId) {
        this.terminalId = terminalId;
    }
}
