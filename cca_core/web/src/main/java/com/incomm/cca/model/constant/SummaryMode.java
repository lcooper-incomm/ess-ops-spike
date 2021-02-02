package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class SummaryMode extends PseudoEnum {

    public static final String LEFT = "LEFT";
    public static final String TOP = "TOP";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(LEFT);
        values.add(TOP);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new SummaryMode().validateValue(value);
    }
}
