package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReceiptComponentCardView implements Serializable {

    private Long id;
    private String van;
    private CsCoreCurrency initialLoadAmount;
    private String productType;
    private String packageVan;
    private String serialNumber;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getVan() {
        return van;
    }

    public void setVan(final String van) {
        this.van = van;
    }

    public CsCoreCurrency getInitialLoadAmount() {
        return initialLoadAmount;
    }

    public void setInitialLoadAmount(final CsCoreCurrency initialLoadAmount) {
        this.initialLoadAmount = initialLoadAmount;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(final String productType) {
        this.productType = productType;
    }

    public String getPackageVan() {
        return packageVan;
    }

    public void setPackageVan(final String packageVan) {
        this.packageVan = packageVan;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(final String serialNumber) {
        this.serialNumber = serialNumber;
    }
}
