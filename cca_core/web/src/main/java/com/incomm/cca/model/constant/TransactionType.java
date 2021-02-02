package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class TransactionType extends PseudoEnum {

    public static final String CREDIT = "CREDIT";
    public static final String DEBIT = "DEBIT";
    public static final String OTHER = "OTHER";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(CREDIT);
        values.add(DEBIT);
        values.add(OTHER);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new TransactionType().validateValue(value);
    }
}
