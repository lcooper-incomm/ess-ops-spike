package com.incomm.cca.model.view.external.apls.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CardTransferRequestView implements Serializable {

    private String parentSerialNumber;
    private String childSerialNumber;
    private String childCardType;
    private String notes;
    private String fees;

    public String getParentSerialNumber() {
        return parentSerialNumber;
    }

    public void setParentSerialNumber(String parentSerialNumber) {
        this.parentSerialNumber = parentSerialNumber;
    }

    public String getChildSerialNumber() {
        return childSerialNumber;
    }

    public void setChildSerialNumber(String childSerialNumber) {
        this.childSerialNumber = childSerialNumber;
    }

    public String getChildCardType() {
        return childCardType;
    }

    public void setChildCardType(String childCardType) {
        this.childCardType = childCardType;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getFees() {
        return fees;
    }

    public void setFees(String fees) {
        this.fees = fees;
    }

    @Override
    public String toString() {
        return "CardTransferRequestView{" +
                "parentSerialNumber='" + parentSerialNumber + '\'' +
                ", childSerialNumber='" + childSerialNumber + '\'' +
                ", childCardType='" + childCardType + '\'' +
                ", notes='" + notes + '\'' +
                ", fees='" + fees + '\'' +
                '}';
    }
}
