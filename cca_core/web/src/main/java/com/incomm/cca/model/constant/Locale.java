package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class Locale extends PseudoEnum {

    public static final String FRAUD = "FRAUD";
    public static final String GLOBAL = "GLOBAL";
    public static final String JAX = "JAX";
    public static final String NONE = "NONE";
    public static final String NOR = "NOR";
    public static final String RBC = "RBC";
    public static final String SYSTEM = "SYSTEM";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(FRAUD);
        values.add(GLOBAL);
        values.add(JAX);
        values.add(NONE);
        values.add(NOR);
        values.add(RBC);
        values.add(SYSTEM);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new Locale().validateValue(value);
    }
}
