package com.incomm.cca.model.constant;

import org.apache.commons.lang3.StringUtils;

import java.util.Set;

/**
 * This is meant to aid in backwards-compatibility by removing direct enum usage from our domain models, allowing us to
 * deploy two versions of the app to the same environment (Production's blue/green, for example), without a hard enum
 * reference causing problems when enumerated records are added or removed by the newer version of the app.
 * <p>
 * By providing static String constants for specific internal usage, and mimicking enum behavior with a set of values
 * and the ability to validate that a given value exists in that set, we should get the best of both worlds, even if
 * this isn't the most conventional of solutions.
 * <p>
 */
public abstract class PseudoEnum {

    public abstract Set<String> getValues();

    /**
     * Mimicks an enum's valueOf(), allowing you to check and see if a given value exists in this class' list of values.
     *
     * @throws IllegalArgumentException if no match found
     */
    protected String validateValue(String value) {
        if (StringUtils.isNotBlank(value)) {
            return getValues().stream()
                              .filter(existing -> existing.equalsIgnoreCase(value))
                              .findFirst()
                              .orElse(null);
        } else {
            throw new IllegalArgumentException(String.format("No PseudoEnum match found for value '%s'!", value));
        }
    }
}
