package com.incomm.cca.model.domain.audit;

public class PinLookupRequestData {

    private String systemType;
    private String identifier;

    public PinLookupRequestData(String systemType, String identifier) {
        this.systemType = systemType;
        this.identifier = identifier;
    }

    public String getSystemType() {
        return systemType;
    }

    public void setSystemType(String systemType) {
        this.systemType = systemType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    @Override
    public String toString() {
        return "PinLookupRequestData{" +
                "systemType='" + systemType + '\'' +
                ", identifier='" + identifier + '\'' +
                '}';
    }
}
