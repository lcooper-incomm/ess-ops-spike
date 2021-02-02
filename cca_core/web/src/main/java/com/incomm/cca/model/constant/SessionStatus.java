package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class SessionStatus extends PseudoEnum {

    public static final String ABANDONED = "ABANDONED";
    public static final String ACTIVATION_REQUEST = "ACTIVATION_REQUEST";
    public static final String ACTIVATION_REVERSAL = "ACTIVATION_REVERSAL";
    public static final String ACTIVE = "ACTIVE";
    public static final String AWAITING_DOCS = "AWAITING_DOCS";
    public static final String CANCELLED = "CANCELLED";
    public static final String CALLBACK = "CALLBACK";
    public static final String CHARGEBACK_PENDING = "CHARGEBACK_PENDING";
    public static final String CLOSED = "CLOSED";
    public static final String DISCONNECTED = "DISCONNECTED";
    public static final String DOCS_RECEIVED = "DOCS_RECEIVED";
    public static final String FORCED_CLOSED = "FORCED_CLOSED";
    public static final String OFAC_PENDING = "OFAC_PENDING";
    public static final String QUEUED = "QUEUED";
    public static final String REFUND_NOT_RECEIVED = "REFUND_NOT_RECEIVED";
    public static final String REFUND_REQUESTED = "REFUND_REQUESTED";
    public static final String REPLACEMENT = "REPLACEMENT";
    public static final String REPLACEMENT_CARD_ACTIVATION = "REPLACEMENT_CARD_ACTIVATION";
    public static final String REPLACEMENT_REQUESTED = "REPLACEMENT_REQUESTED";
    public static final String VMS_SESSION_FAILED = "VMS_SESSION_FAILED";
    public static final String WORKING = "WORKING";
    public static final String WRAPPEDUP = "WRAPPEDUP";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(ABANDONED);
        values.add(ACTIVATION_REQUEST);
        values.add(ACTIVATION_REVERSAL);
        values.add(ACTIVE);
        values.add(AWAITING_DOCS);
        values.add(CANCELLED);
        values.add(CALLBACK);
        values.add(CHARGEBACK_PENDING);
        values.add(CLOSED);
        values.add(DISCONNECTED);
        values.add(DOCS_RECEIVED);
        values.add(FORCED_CLOSED);
        values.add(OFAC_PENDING);
        values.add(QUEUED);
        values.add(REFUND_NOT_RECEIVED);
        values.add(REFUND_REQUESTED);
        values.add(REPLACEMENT);
        values.add(REPLACEMENT_CARD_ACTIVATION);
        values.add(REPLACEMENT_REQUESTED);
        values.add(VMS_SESSION_FAILED);
        values.add(WORKING);
        values.add(WRAPPEDUP);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static String valueOf(String value) {
        return new SessionStatus().validateValue(value);
    }
}
