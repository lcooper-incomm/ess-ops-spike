package com.incomm.cca.model.domain.audit;

public class UnmaskPanRequestsData {

    private String customerId;
    private String pan;

    public UnmaskPanRequestsData() {
    }

    public UnmaskPanRequestsData(String customerId, String pan) {
        this.customerId = customerId;
        this.pan = pan;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getPan() {
        return pan;
    }

    public void setPan(String pan) {
        this.pan = pan;
    }
}
