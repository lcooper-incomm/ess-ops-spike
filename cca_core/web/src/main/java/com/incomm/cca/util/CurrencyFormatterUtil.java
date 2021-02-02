package com.incomm.cca.util;

import org.apache.commons.lang3.StringUtils;

import java.text.NumberFormat;

/**
 * Currency formatting is platform-specific... This simply provides a single place to maintain that logic.
 * <p>
 */
public class CurrencyFormatterUtil {

    private static final NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance();
    private static final NumberFormat numberFormatter = NumberFormat.getNumberInstance();

    public static String format(String value) {
        if (StringUtils.isNotBlank(value)) {
            try {
                if (StringUtils.contains(value, ".")) {
                    return currencyFormatter.format(numberFormatter.parse(value));
                } else {
                    return currencyFormatter.format(numberFormatter.parse(value)
                                                                   .doubleValue() / 100);
                }
            } catch (Exception e) {
                //Until further notice, fail silently. Not sure what to do if we can't parse a value we were given without breaking and uglifying reports
            }
        }
        return null;
    }

    public static Double formatAsDouble(String value) {
        if (StringUtils.isNotBlank(value)) {
            try {
                if (StringUtils.contains(value, ".")) {
                    return numberFormatter.parse(value)
                                          .doubleValue();
                } else {
                    return numberFormatter.parse(value)
                                          .doubleValue() / 100;
                }
            } catch (Exception e) {
                //Until further notice, fail silently. Not sure what to do if we can't parse a value we were given without breaking and uglifying reports
            }
        }
        return 0.0;
    }
}
