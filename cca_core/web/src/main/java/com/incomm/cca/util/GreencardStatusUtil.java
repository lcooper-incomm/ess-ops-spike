package com.incomm.cca.util;

import com.incomm.cca.model.enums.GreencardStatusDescription;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

/**
 * TODO This may be something we consider moving to the database w/admin page. For now, I've just gotta get this done.
 */
public final class GreencardStatusUtil {

    private GreencardStatusUtil() {
    }

    private static Map<String, GreencardStatusDescription> statusMappings = new HashMap<>();
    private static Map<GreencardStatusDescription, String> reverseStatusMappings = new EnumMap<>(GreencardStatusDescription.class);

    static {
        statusMappings.put("1", GreencardStatusDescription.INITIAL);
        statusMappings.put("01", GreencardStatusDescription.INITIAL);
        statusMappings.put("8", GreencardStatusDescription.ACTIVE);
        statusMappings.put("08", GreencardStatusDescription.ACTIVE);
        statusMappings.put("10", GreencardStatusDescription.ON_HOLD);
        statusMappings.put("24", GreencardStatusDescription.FRAUD);
        statusMappings.put("20", GreencardStatusDescription.STOLEN);
        statusMappings.put("21", GreencardStatusDescription.LOST);
        statusMappings.put("14", GreencardStatusDescription.DEACTIVE);
        statusMappings.put("12", GreencardStatusDescription.STOLEN);
        statusMappings.put("27", GreencardStatusDescription.BAD_CREDIT);
        statusMappings.put("15", GreencardStatusDescription.EXPIRED);
        statusMappings.put("26", GreencardStatusDescription.RISK_INVESTIGATION);

        reverseStatusMappings.put(GreencardStatusDescription.INITIAL, "1");
        reverseStatusMappings.put(GreencardStatusDescription.ACTIVE, "8");
        reverseStatusMappings.put(GreencardStatusDescription.ON_HOLD, "10");
        reverseStatusMappings.put(GreencardStatusDescription.FRAUD, "24");
        reverseStatusMappings.put(GreencardStatusDescription.LOST, "21");
        reverseStatusMappings.put(GreencardStatusDescription.DEACTIVE, "14");
        reverseStatusMappings.put(GreencardStatusDescription.STOLEN, "12");
        reverseStatusMappings.put(GreencardStatusDescription.BAD_CREDIT, "27");
        reverseStatusMappings.put(GreencardStatusDescription.EXPIRED, "15");
        reverseStatusMappings.put(GreencardStatusDescription.RISK_INVESTIGATION, "26");
    }

    public static GreencardStatusDescription getStatusDescription(String code) {
        return statusMappings.get(code);
    }

    public static String getStatusCode(GreencardStatusDescription description) {
        return reverseStatusMappings.get(description);
    }
}
