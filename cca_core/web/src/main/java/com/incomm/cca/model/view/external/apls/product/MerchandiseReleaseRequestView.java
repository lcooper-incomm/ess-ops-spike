package com.incomm.cca.model.view.external.apls.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MerchandiseReleaseRequestView implements Serializable {

    private String comment;
    private boolean approved;
    private String reason;
    private String serialNumber;

    public String getComment() {
        return comment;
    }

    public void setComment(final String comment) {
        this.comment = comment;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(final boolean approved) {
        this.approved = approved;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(final String reason) {
        this.reason = reason;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(final String serialNumber) {
        this.serialNumber = serialNumber;
    }

    @Override
    public String toString() {
        return "MerchandiseReleaseRequestView{" +
                "serialNumber='" + serialNumber + '\'' +
                ", comment='" + comment + '\'' +
                '}';
    }
}
