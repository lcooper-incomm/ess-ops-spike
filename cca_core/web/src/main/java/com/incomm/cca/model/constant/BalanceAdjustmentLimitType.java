package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class BalanceAdjustmentLimitType extends PseudoEnum {

    public static final String CREDIT_DEBIT_AMOUNTS_ALLOWED = "CREDIT_DEBIT_AMOUNTS_ALLOWED";
    public static final String ALLOW_CREDIT_OVER_INITIAL_BALANCE = "ALLOW_CREDIT_OVER_INITIAL_BALANCE";
    public static final String DAILY_ADJUSTMENT_LIMIT = "DAILY_ADJUSTMENT_LIMIT";
    public static final String DAILY_CREDIT_ADJUSTMENT_AMOUNT = "DAILY_CREDIT_ADJUSTMENT_AMOUNT";
    public static final String DAILY_DEBIT_ADJUSTMENT_AMOUNT = "DAILY_DEBIT_ADJUSTMENT_AMOUNT";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(CREDIT_DEBIT_AMOUNTS_ALLOWED);
        values.add(ALLOW_CREDIT_OVER_INITIAL_BALANCE);
        values.add(DAILY_ADJUSTMENT_LIMIT);
        values.add(DAILY_CREDIT_ADJUSTMENT_AMOUNT);
        values.add(DAILY_DEBIT_ADJUSTMENT_AMOUNT);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new BalanceAdjustmentLimitType().validateValue(value);
    }
}
