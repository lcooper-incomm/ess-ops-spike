package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class C2CRequestStatus extends PseudoEnum {

    public static final String PENDING = "PENDING";
    public static final String APPROVED = "APPROVED";
    public static final String REJECTED = "REJECTED";
    public static final String ABANDONED = "ABANDONED";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(PENDING);
        values.add(APPROVED);
        values.add(REJECTED);
        values.add(ABANDONED);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new C2CRequestStatus().validateValue(value);
    }
}
