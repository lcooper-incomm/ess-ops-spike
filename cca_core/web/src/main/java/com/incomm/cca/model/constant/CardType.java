package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class CardType extends PseudoEnum {

    public static final String ACTIVE = "ACTIVE";
    public static final String INACTIVE = "INACTIVE";
    public static final String REPLACEMENT = "REPLACEMENT";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(ACTIVE);
        values.add(INACTIVE);
        values.add(REPLACEMENT);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static Set<String> values() {
        return values;
    }

    public static String valueOf(String value) {
        return new CardType().validateValue(value);
    }
}
