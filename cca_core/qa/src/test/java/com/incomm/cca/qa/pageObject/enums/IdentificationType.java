package com.incomm.cca.qa.pageObject.enums;

/**
 * Created by Allen on 2/3/2017.
 */
public enum IdentificationType {
    DRIVERS_LICENSE("Driver's License"),
    PASSPORT("Passport"),
    SOCIAL_INSURANCE_NUMBER("Social Insurance Number"),
    SOCIAL_SECURITY_NUMBER("Social Security Number");
    private String label;

    IdentificationType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return this.label;
    }
}
