package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class SelectionType extends PseudoEnum {

    public static final String ACCOUNT = "ACCOUNT";
    public static final String CUSTOMER = "CUSTOMER";
    public static final String CUSTOMER_ACCOUNT = "CUSTOMER_ACCOUNT";
    public static final String JIRA = "JIRA";
    public static final String LOCATION = "LOCATION";
    public static final String MAPLES_CUSTOMER = "MAPLES_CUSTOMER";
    public static final String ORDER = "ORDER";
    public static final String CARD = "CARD";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(ACCOUNT);
        values.add(CUSTOMER);
        values.add(CUSTOMER_ACCOUNT);
        values.add(JIRA);
        values.add(LOCATION);
        values.add(MAPLES_CUSTOMER);
        values.add(ORDER);
        values.add(CARD);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new SelectionType().validateValue(value);
    }
}
