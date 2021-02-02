package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class CardField extends PseudoEnum {

    public static final String IS_ACTIVATED = "IS_ACTIVATED";
    public static final String IS_APPROVED = "IS_APPROVED";
    public static final String IS_AWAITING_IT_ACTIVATION = "IS_AWAITING_IT_ACTIVATION";
    public static final String IS_CHECK_ISSUED = "IS_CHECK_ISSUED";
    public static final String IS_DEACTIVATED = "IS_DEACTIVATED";
    public static final String IS_DENIED = "IS_DENIED";
    public static final String IS_FUNDS_REMOVED = "IS_FUNDS_REMOVED";
    public static final String IS_IT_ACTIVATED = "IS_IT_ACTIVATED";
    public static final String IS_LOADED = "IS_LOADED";
    public static final String IS_NEEDING_CHECK_ISSUED = "IS_NEEDING_CHECK_ISSUED";
    public static final String IS_NEEDING_REPLACEMENT = "IS_NEEDING_REPLACEMENT";
    public static final String IS_REPLACED = "IS_REPLACED";
    public static final String IS_SEEKING_APPROVAL = "IS_SEEKING_APPROVAL";
    public static final String IS_SHIPPED = "IS_SHIPPED";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(IS_ACTIVATED);
        values.add(IS_APPROVED);
        values.add(IS_AWAITING_IT_ACTIVATION);
        values.add(IS_CHECK_ISSUED);
        values.add(IS_DEACTIVATED);
        values.add(IS_DENIED);
        values.add(IS_FUNDS_REMOVED);
        values.add(IS_IT_ACTIVATED);
        values.add(IS_LOADED);
        values.add(IS_NEEDING_CHECK_ISSUED);
        values.add(IS_NEEDING_REPLACEMENT);
        values.add(IS_REPLACED);
        values.add(IS_SEEKING_APPROVAL);
        values.add(IS_SHIPPED);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static Set<String> values() {
        return values;
    }

    public static String valueOf(String value) {
        return new CardField().validateValue(value);
    }
}
