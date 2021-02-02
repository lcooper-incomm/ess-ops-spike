package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class CodexRuleFlow extends PseudoEnum {

    public static final String CONTINUE = "CONTINUE";
    public static final String STOP = "STOP";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(CONTINUE);
        values.add(STOP);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static Set<String> values() {
        return values;
    }

    public static String valueOf(String value) {
        return new CodexRuleFlow().validateValue(value);
    }
}
