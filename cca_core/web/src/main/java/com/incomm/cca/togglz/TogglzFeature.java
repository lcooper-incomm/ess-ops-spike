package com.incomm.cca.togglz;

import com.incomm.cca.togglz.groups.CSCore;
import com.incomm.cca.togglz.groups.Cache;
import com.incomm.cca.togglz.groups.Debug;
import com.incomm.cca.togglz.groups.Detail;
import com.incomm.cca.togglz.groups.ScheduledTasks;
import com.incomm.cca.togglz.groups.Search;
import org.togglz.core.Feature;
import org.togglz.core.annotation.EnabledByDefault;
import org.togglz.core.annotation.Label;
import org.togglz.core.context.FeatureContext;

public enum TogglzFeature implements Feature {
    @EnabledByDefault
    @Label("Google Analytics")
    GOOGLEANALYTICS,
    @Label("Tableau Ticket")
    TABLEAU_TICKET,
    @Debug
    @Label("Live Troubleshooting")
    LIVETROUBLESHOOTING,
    @ScheduledTasks
    @EnabledByDefault
    @Label("Deactivate Idle Users Job")
    DEACTIVATEIDLEUSERSJOB,
    @ScheduledTasks
    @EnabledByDefault
    @Label("Abandoned Call Job")
    ABANDONEDCALLJOB,
    @Debug
    @Label("Job Lock Logging")
    JOBLOCKLOGGING,
    @Detail
    @Label("Show Card Number in Greencard Transaction History")
    SHOW_GC_CARD_NUMBER_IN_TRANSACTION_HISTORY,
    @Detail
    @Label("Allow Add/Remove Session Components")
    ALLOW_ADD_REMOVE_SESSION_COMPONENTS,
    @Label("Email CCA Support")
    @EnabledByDefault
    EMAIL_CCA_SUPPORT,
    @Cache
    @Label("Add Cache-Control Headers for HTML Files")
    ADD_CACHE_CONTROL_HTML,
    @Cache
    @Label("Add Cache-Control Headers for JS Files")
    ADD_CACHE_CONTROL_JS,
    @Cache
    @Label("Add Cache-Control Headers for CSS Files")
    ADD_CACHE_CONTROL_CSS,
    @EnabledByDefault
    @Label("Session Types 'BETA' Tag")
    SESSION_TYPES_BETA_TAG,
    @Debug
    @Label("Hazelcast/Atmosphere Connection Logging")
    HAZELCAST_ATMOSPHERE_CONNECTION_LOGGING,
    @Debug
    @Label("Log Full Stacktrace in GlobalExceptionHandler")
    LOG_FULL_STACKTRACE_IN_GLOBALEXCEPTIONHANDLER,
    @Search
    @Label("E-Comm Order Search")
    ECOMM_ORDER_SEARCH,
    @Detail
    @Label("Mobile Wallet tab for VMS Gift Cards")
    MOBILE_WALLET_TAB_FOR_VMS_GIFT_CARDS,
    @ScheduledTasks
    @EnabledByDefault
    @Label("Ariia Migration")
    ARIIA_MIGRATION_JOB,
    @ScheduledTasks
    @EnabledByDefault
    @Label("Stale Case Cleanup")
    STALE_CASE_JOB,
    @ScheduledTasks
    @EnabledByDefault
    @Label("Stale Gift Card Dispute Cleanup")
    STALE_GIFT_CARD_DISPUTE,
    @ScheduledTasks
    @EnabledByDefault
    @Label("Stale Session Cleanup")
    STALE_SESSION_JOB,
    @ScheduledTasks
    @EnabledByDefault
    @Label("Codex Cache Refresh")
    CODEX_CACHE_REFRESH,
    @CSCore
    @EnabledByDefault
    @Label("Update Ariia on Login")
    UPDATE_ARIIA_ON_LOGIN,
    @Detail
    @Label("VMS Order Number Link")
    VMS_ORDER_NUMBER_LINK,
    @Debug
    @Label("Bypass PIN Check on Activate Card")
    @EnabledByDefault
    BYPASS_PIN_CHECK_ON_ACTIVATE_CARD;

    public boolean isActive() {
        return FeatureContext.getFeatureManager()
                             .isActive(this);
    }
}
