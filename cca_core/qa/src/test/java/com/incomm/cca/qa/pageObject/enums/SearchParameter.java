package com.incomm.cca.qa.pageObject.enums;

/**
 * Created by Allen on 2/3/2017.
 */
public enum SearchParameter {
    ACCOUNT_NUMBER("Account Number", SearchParameterType.TEXT, "div#ACCOUNT_NUMBER"),
    ADDRESS("Address", SearchParameterType.TEXT, ""),
    ADDRESS_1("Address Line 1", SearchParameterType.TEXT, "div#ADDRESS1"),
    ADDRESS_2("Address Line 2", SearchParameterType.TEXT, "div#ADDRESS2"),
    CAN("CAN", SearchParameterType.TEXT, "div#CAN"),
    CARD_ID("Card ID", SearchParameterType.TEXT, "div#CARD_ID"),
    CARD_NUMBER("Card Number", SearchParameterType.TEXT, "div#PAN"),
    CITY("City", SearchParameterType.TEXT, "div#CITY"),
    CONTROL_NUMBER("Control Number", SearchParameterType.TEXT, "div#CONTROL_NUMBER"),
    CUSTOMER_NAME("Customer Name", SearchParameterType.TEXT, "div#CUSTOMER_NAME"),
    CUSTOMER_PHONE("Customer Phone", SearchParameterType.TEXT, "div#CUSTOMER_PHONE"),
    DATE_OF_BIRTH("Date of Birth", SearchParameterType.DATE, "div#DATE_OF_BIRTH"),
    DESCRIPTION("Description", SearchParameterType.TEXT, "div#DESCRIPTION"),
    EMAIL_ADDRESS("Email Address", SearchParameterType.TEXT, "div#EMAIL_ADDRESS"),
    END_DATE("End Date", SearchParameterType.DATE, "div#END_DATE"),
    FIRST_NAME("First Name", SearchParameterType.TEXT, "div#FIRST_NAME"),
    IDENTIFICATION_ID("Identification", SearchParameterType.TEXT, "input.mat-input-element[ng-reflect-name='identificationId"),
    IDENTIFICATION_TYPE("ICON", SearchParameterType.MENU, ""),
    ISSUE_ID("Issue ID", SearchParameterType.TEXT, "div#ISSUE_ID"),
    LAST_FOUR("Last Four", SearchParameterType.TEXT, "div#LAST_FOUR"),
    LAST_NAME("Last Name", SearchParameterType.TEXT, "div#LAST_NAME"),
    LOCATION_NAME("Location", SearchParameterType.TEXT, "div#LOCATION"),
    MERCHANT_NAME("Merchant", SearchParameterType.TEXT, "div#MERCHANT"),
    ONLINE_USER_ID("Online User ID", SearchParameterType.TEXT, "div#ONLINE_USER_ID"),
    ORDER_ID("Order ID", SearchParameterType.TEXT, ""),
    ORDER_NUMBER("Order Number", SearchParameterType.TEXT, "div#ORDER_NUMBER"),
    PAN("PAN", SearchParameterType.TEXT, "div#PAN"),
    PARTNER("Partner", SearchParameterType.TEXT, "mat-select.partner-field"),
    PHONE_NUMBER("Phone Number", SearchParameterType.TEXT, "div#PHONE_NUMBER"),
    PIN("PIN", SearchParameterType.TEXT, "div#PIN"),
    POSTAL_CODE("Postal Code", SearchParameterType.TEXT, "div#POSTAL_CODE"),
    PREAUTH_KEY("Pre-Auth Key", SearchParameterType.TEXT, "div#PRE_AUTH_KEY"),
    PROXY_NUMBER("Proxy Number", SearchParameterType.TEXT, "div#PROXY_NUMBER"),
    RECENT_ONLY("Recent Activity Only", SearchParameterType.CHECK_BOX, "input#search-recent-activity-only-input"),
    SERIAL_NUMBER("Serial Number", SearchParameterType.TEXT, "div#SERIAL_NUMBER"),
    SHIPMENT_NUMBER("Shipment Number", SearchParameterType.TEXT, "div#SHIPMENT_NUMBER"),
    SID("SID", SearchParameterType.TEXT, "div#SESSION_ID"),
    SESSION_ID("Session ID", SearchParameterType.TEXT, "div#SESSION_ID"),
    START_DATE("Start Date", SearchParameterType.DATE, "div#START_DATE"),
    STATE("State", SearchParameterType.TEXT, ""),
    STATE_PROVINCE("State/Province", SearchParameterType.SELECT, "div#STATE_PROVINCE"),
    SUMMARY("Summary", SearchParameterType.TEXT, "div#SUMMARY"),
    TERMINAL_ID("Terminal ID", SearchParameterType.TEXT, "div#TERMINAL_ID"),
    TRANSACTION_ID("Transaction ID", SearchParameterType.TEXT, "div#TRANSACTION_ID"),
    VAN("VAN", SearchParameterType.TEXT, "div#VAN"),
    VENDOR_SERIAL_NUMBER("Vendor Serial Number", SearchParameterType.TEXT, "div#VENDOR_SERIAL_NUMBER");
    private SearchParameterType type;
    private String label;
    private String locator;

    SearchParameter(String label, SearchParameterType type, String locator) {
        this.label = label;
        this.type = type;
        this.locator = locator;
    }

    public SearchParameterType getType() {
        return type;
    }

    public String getLabel() {
        return label;
    }

    // TODO: 3/28/2019 May not need this field.
    public String getLocator() {
        return locator;
    }
}
