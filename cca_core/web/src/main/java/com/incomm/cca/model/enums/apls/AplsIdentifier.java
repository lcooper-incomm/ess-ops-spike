package com.incomm.cca.model.enums.apls;

import org.apache.commons.lang3.StringUtils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * The aplsPath and aplsPathTemplate fields here are used by the Apls<Something>Service's
 * WebTarget REST Client to build the proper path to search. Null values indicate that
 * the identifier is not currently supported for search in APLS.
 * <p>
 */
public enum AplsIdentifier {
    ACCOUNT_NUMBER("accountNumber/{accountNumber}", "accountNumber", false),
    CAN("can/{can}", "can", false),
    CONTROLNUMBER("controlNumber/{controlNumber}", "controlNumber", false),
    CUSTOMERID("customerId/{customerId}", "customerId", false),
    DCMSID(null, null, false),
    DISTRIBUTOR(null, null, false),
    GLOBAL(null, null, false),
    HEADERID(null, null, false),
    LOCATIONID("location/{id}", "id", false),
    LOCATION("{id}", "id", false),
    MERCHANT(null, null, false),
    PAN("pan/{pan}", "pan", true),
    PIN("pin/{pin}", "pin", false),
    PREAUTHKEY("preauthKey/{preauthKey}", "preauthKey", false),
    PROXYNUMBER("proxyNumber/{proxyNumber}", "proxyNumber", false),
    REVERSEVRNBYCONTROLNUMBER("controlNumber/{controlNumber}", "controlNumber", false),
    REVERSEVRN("pan/{pan}", "pan", true),
    SERIALNUMBER("serialNumber/{serialNumber}", "serialNumber", false),
    TERMINAL(null, null, false),
    TRANSACTIONID("transactionId/{transactionId}", "transactionId", false),
    GREENCARDEPAN("pan/{pan}", "pan", false),
    GREENCARDPREAUTHKEY("preauthKey/{key}", "key", false),
    UPC(null, null, false),
    VAN("van16/{van}", "van", false),
    VENDOR(null, null, false),
    VENDORID(null, null, false),
    VENDORPIN(null, null, false),
    VENDORSPN(null, null, false),
    PROMOCODE("promo/{promo}", "promo", false),
    ORDERID("promo/{promo}", "promo", false),
    VENDORSERIALNUMBER("serialNumber/{serialNumber}", "serialNumber", false);
    private String aplsPath;
    private String aplsPathTemplate;
    private boolean encrypted;

    AplsIdentifier(String aplsPath, String aplsPathTemplate, boolean encrypted) {
        this.aplsPath = aplsPath;
        this.aplsPathTemplate = aplsPathTemplate;
        this.encrypted = encrypted;
    }

    public String getAplsPathTemplate() {
        return aplsPathTemplate;
    }

    public String formatPath(String value) {
        try {
            return this.aplsPath.replace("{" + this.aplsPathTemplate + "}", URLEncoder.encode(value, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            return this.aplsPath.replace("{" + this.aplsPathTemplate + "}", value);
        }
    }

    public boolean needsEncryption() {
        return encrypted;
    }

    public String getIdentifierTypeString() {
        String type = null;

        switch (this) {
            case LOCATION:
            case MERCHANT:
            case TERMINAL:
            case GLOBAL:
                type = this.toString()
                           .toUpperCase();
                break;
            default:
                if (StringUtils.isNotBlank(this.aplsPath)) {
                    type = this.aplsPath;
                    if (this.aplsPath.contains("/")) {
                        String[] parts = this.aplsPath.split("/");
                        type = parts[0];
                    }
                }
                break;
        }

        return type;
    }
}
