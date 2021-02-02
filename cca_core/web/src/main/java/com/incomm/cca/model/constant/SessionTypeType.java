package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class SessionTypeType extends PseudoEnum {

    public static final String BAD_CREDIT = "BAD_CREDIT";
    public static final String CALL = "CALL";
    public static final String CONSUMED_CARD = "CONSUMED_CARD";
    public static final String COMPLAINT = "COMPLAINT";
    public static final String DAMAGED_PINS = "DAMAGED_PINS";
    public static final String DISPUTE = "DISPUTE";
    public static final String ECOMM_FRAUD = "ECOMM_FRAUD";
    public static final String GENERAL = "GENERAL";
    public static final String LAW_ENFORCEMENT = "LAW_ENFORCEMENT";
    public static final String LEGACY = "LEGACY";
    public static final String MERCHANT_FRAUD = "MERCHANT_FRAUD";
    public static final String OTHER_FRAUD = "OTHER_FRAUD";
    public static final String PAYPAL_REDEMPTION_ISSUE = "PAYPAL_REDEMPTION_ISSUE";
    public static final String PRIVACY_REQUEST = "PRIVACY_REQUEST";
    public static final String REWARDS = "REWARDS";
    public static final String REWARDS_TRAINING = "REWARDS_TRAINING";
    public static final String SYSTEM = "SYSTEM";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(BAD_CREDIT);
        values.add(CALL);
        values.add(COMPLAINT);
        values.add(CONSUMED_CARD);
        values.add(DAMAGED_PINS);
        values.add(DISPUTE);
        values.add(ECOMM_FRAUD);
        values.add(GENERAL);
        values.add(LAW_ENFORCEMENT);
        values.add(LEGACY);
        values.add(MERCHANT_FRAUD);
        values.add(OTHER_FRAUD);
        values.add(PAYPAL_REDEMPTION_ISSUE);
        values.add(PRIVACY_REQUEST);
        values.add(REWARDS);
        values.add(REWARDS_TRAINING);
        values.add(SYSTEM);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static Set<String> getAllValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new SessionTypeType().validateValue(value);
    }
}
