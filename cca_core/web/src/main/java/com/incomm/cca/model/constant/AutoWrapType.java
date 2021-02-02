package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class AutoWrapType extends PseudoEnum {

    public static final String CLIENT = "CLIENT";
    public static final String SERVER = "SERVER";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(CLIENT);
        values.add(SERVER);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new AutoWrapType().validateValue(value);
    }
}
