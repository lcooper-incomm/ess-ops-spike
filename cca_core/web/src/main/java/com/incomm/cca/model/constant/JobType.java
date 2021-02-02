package com.incomm.cca.model.constant;

import java.util.HashSet;
import java.util.Set;

public class JobType extends PseudoEnum {

    public static final String ABANDONED_CALL = "ABANDONED_CALL";
    public static final String ARCHIVE_SESSIONS = "ARCHIVE_SESSIONS";
    public static final String ARIIA_MIGRATION = "ARIIA_MIGRATION";
    public static final String AUTO_WRAP_TIMER = "AUTO_WRAP_TIMER";
    public static final String CODEX_CACHE_REFRESH = "CODEX_CACHE_REFRESH";
    public static final String DEACTIVATE_IDLE_USERS_JOB = "DEACTIVATE_IDLE_USERS_JOB";
    public static final String MDM_ID_CONVERSION = "MDM_ID_CONVERSION";
    public static final String STALE_CASE_JOB = "STALE_CASE_JOB";
    public static final String STALE_GIFT_CARD_DISPUTE = "STALE_GIFT_CARD_DISPUTE";
    public static final String STALE_SESSION_JOB = "STALE_DISPUTE_JOB";
    private static Set<String> values = new HashSet<>();

    static {
        values.add(ABANDONED_CALL);
        values.add(ARCHIVE_SESSIONS);
        values.add(ARIIA_MIGRATION);
        values.add(AUTO_WRAP_TIMER);
        values.add(CODEX_CACHE_REFRESH);
        values.add(DEACTIVATE_IDLE_USERS_JOB);
        values.add(MDM_ID_CONVERSION);
        values.add(STALE_CASE_JOB);
        values.add(STALE_GIFT_CARD_DISPUTE);
        values.add(STALE_SESSION_JOB);
    }

    @Override
    public Set<String> getValues() {
        return values;
    }

    public static long getJobTimeout(String jobType) {
        long jobDuration;

        switch (jobType) {
            case MDM_ID_CONVERSION:
                jobDuration = 1000l * 60 * 60 * 24;
                break;
            case AUTO_WRAP_TIMER:
                jobDuration = 1000l * 10;
                break;
            default:
                jobDuration = 1000l * 60 * 60;
                break;
        }

        if (jobDuration != -1) {
            double timeout = jobDuration * 1.50;
            return (long) timeout;
        }

        return jobDuration;
    }

    public static String valueOf(String value) {
        return new JobType().validateValue(value);
    }
}
