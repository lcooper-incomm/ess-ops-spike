package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class VmsResponseType extends PseudoEnum {

    public static final String SUCCESS = "SUCCESS";
    public static final String ERROR = "ERROR";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(SUCCESS);
        values.add(ERROR);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new VmsResponseType().validateValue(value);
    }
}
