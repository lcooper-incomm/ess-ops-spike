package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class SessionMode extends PseudoEnum {

    public static final String CARD = "CARD";
    public static final String DOCKED = "DOCKED";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(CARD);
        values.add(DOCKED);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new SessionMode().validateValue(value);
    }
}
