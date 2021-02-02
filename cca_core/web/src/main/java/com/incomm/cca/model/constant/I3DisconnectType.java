package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class I3DisconnectType extends PseudoEnum {

    public static final String REMOTE = "REMOTE";
    public static final String LOCAL = "LOCAL";
    public static final String CONSULT_ACCEPT = "CONSULT_ACCEPT";
    public static final String CONSULT_REQUEST = "CONSULT_REQUEST";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(REMOTE);
        values.add(LOCAL);
        values.add(CONSULT_ACCEPT);
        values.add(CONSULT_REQUEST);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new I3DisconnectType().validateValue(value);
    }
}
