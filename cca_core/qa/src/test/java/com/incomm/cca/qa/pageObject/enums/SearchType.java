package com.incomm.cca.qa.pageObject.enums;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Allen on 2/3/2017.
 */
public enum SearchType {
    FASTCARD("FastCard/FastPIN", "FASTCARD_FASTPIN"),
    FINANCIAL_GIFT("Financial Gift", "FINANCIAL_GIFT"),
    VMS_GPR("VMS GPR Card", "VMS_GPR"),
    VRN("VRN/Swipe Reload", "VRN_SWIPE_RELOAD"),
    VANILLA("Vanilla Direct", "VANILLA_DIRECT"),
    BOL("BOL Order", "BOL_ORDER"),
    DDP("DDP", "DDP"),
    ECOMM("E-Comm Order", "ECOMM_ORDER"),
    VMS_GIFT("VMS Gift Card", "VMS_GIFT"),
    LOCATION("Location", "LOCATION"),
    JIRA("JIRA", "JIRA"),
    SESSION("Session", "SESSION"),
    SERVE("SERVE Card", "SERVE_CARD");
    private String label;
    private String queryOption;

    SearchType(String label, String queryOption) {
        this.label = label;
        this.queryOption = queryOption;
    }

    public static List<String> getLabels() {
        List<String> labels = new ArrayList<>();
        Arrays.asList(SearchType.values())
              .forEach(searchType -> labels.add(searchType.getLabel()));
        return labels;
    }

    public String getLabel() {
        return this.label;
    }

    public String getQueryOption() {
        return queryOption;
    }

}
