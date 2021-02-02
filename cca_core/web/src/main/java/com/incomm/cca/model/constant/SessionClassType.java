package com.incomm.cca.model.constant;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SessionClassType extends PseudoEnum {

    public static final String CALL_CENTER = "CALL_CENTER";
    public static final String GENERAL = "GENERAL";
    public static final String LEGACY = "LEGACY";
    public static final String SYSTEM = "SYSTEM";
    public static final String CASE = "CASE";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(CALL_CENTER);
        values.add(GENERAL);
        values.add(LEGACY);
        values.add(SYSTEM);
        values.add(CASE);
    }

    public static List<String> getSessionTypesForClass(String sessionClass) {
        List<String> types = new ArrayList<>();

        switch (sessionClass) {
            case "CASE":
                types.add(SessionTypeType.BAD_CREDIT);
                types.add(SessionTypeType.CONSUMED_CARD);
                types.add(SessionTypeType.DISPUTE);
                types.add(SessionTypeType.ECOMM_FRAUD);
                types.add(SessionTypeType.LAW_ENFORCEMENT);
                types.add(SessionTypeType.DAMAGED_PINS);
                types.add(SessionTypeType.PAYPAL_REDEMPTION_ISSUE);
                types.add(SessionTypeType.MERCHANT_FRAUD);
                types.add(SessionTypeType.OTHER_FRAUD);
                break;
        }

        return types;
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new SessionClassType().validateValue(value);
    }
}
