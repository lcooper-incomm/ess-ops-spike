package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class DockMode extends PseudoEnum {

    public static final String PINNED = "PINNED";
    public static final String UNPINNED = "UNPINNED";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(PINNED);
        values.add(UNPINNED);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new DockMode().validateValue(value);
    }
}
