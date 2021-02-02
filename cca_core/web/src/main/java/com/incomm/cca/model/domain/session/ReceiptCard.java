package com.incomm.cca.model.domain.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReceiptCard implements Serializable {

    private Long id;
    private ReceiptComponent receiptComponent;
    private String van;
    private String initialLoadAmount;
    private String productType;
    private String packageVan;
    private String serialNumber;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "receipt_component_id")
    public ReceiptComponent getReceiptComponent() {
        return receiptComponent;
    }

    public void setReceiptComponent(ReceiptComponent receiptComponent) {
        this.receiptComponent = receiptComponent;
    }

    @Column(name = "van_16")
    public String getVan() {
        return van;
    }

    public void setVan(String van) {
        this.van = van;
    }

    public String getInitialLoadAmount() {
        return initialLoadAmount;
    }

    public void setInitialLoadAmount(String initialLoadAmount) {
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
