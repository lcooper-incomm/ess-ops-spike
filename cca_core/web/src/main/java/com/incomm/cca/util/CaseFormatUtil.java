package com.incomm.cca.util;

import org.apache.commons.lang3.StringUtils;

/**
 * This util to create system names from user-provided display names (without having to pull in Guava for all its coolness)
 */
public class CaseFormatUtil {

    public static String upperUnderscore(String value) {
        if (StringUtils.isNotBlank(value)) {
            value = value.trim();
            value = value.toUpperCase(); //Uppercase all
            value = value.replaceAll("[^A-Z0-9\\s]", " "); //Replace all special characters with a space
            value = value.replaceAll("[\\s]+", "_"); //Collapse spaces to single underscore
        }
        return value;
    }
}
