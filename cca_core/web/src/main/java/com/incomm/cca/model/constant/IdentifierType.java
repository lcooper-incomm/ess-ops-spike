package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class IdentifierType extends PseudoEnum {

    public static final String ACCOUNT_ID = "ACCOUNT_ID";
    public static final String ACCOUNT_NUMBER = "ACCOUNT_NUMBER";
    public static final String ANI = "ANI";
    public static final String CONTROLNUMBER = "CONTROLNUMBER";
    public static final String CUSTOMERID = "CUSTOMERID";
    public static final String ISSUEID = "ISSUEID";
    public static final String LOCATIONID = "LOCATIONID";
    public static final String MEMBER_NUMBER = "MEMBER_NUMBER";
    public static final String ORDER_ID = "ORDER_ID";
    public static final String ORDER_NUMBER = "ORDER_NUMBER";
    public static final String PIN = "PIN";
    public static final String PROXYNUMBER = "PROXYNUMBER";
    public static final String REVERSEVRN = "REVERSEVRN";
    public static final String REVERSEVRNBYCONTROLNUMBER = "REVERSEVRNBYCONTROLNUMBER";
    public static final String SERIALNUMBER = "SERIALNUMBER";
    public static final String TRANSACTIONID = "TRANSACTIONID";
    public static final String VAN = "VAN";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(ANI);
        values.add(ACCOUNT_ID);
        values.add(ACCOUNT_NUMBER);
        values.add(CONTROLNUMBER);
        values.add(CUSTOMERID);
        values.add(ISSUEID);
        values.add(LOCATIONID);
        values.add(MEMBER_NUMBER);
        values.add(ORDER_ID);
        values.add(ORDER_NUMBER);
        values.add(PIN);
        values.add(PROXYNUMBER);
        values.add(REVERSEVRN);
        values.add(REVERSEVRNBYCONTROLNUMBER);
        values.add(SERIALNUMBER);
        values.add(TRANSACTIONID);
        values.add(VAN);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new IdentifierType().validateValue(value);
    }
}
