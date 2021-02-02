package com.incomm.cca.qa.pageObject.enums;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum SearchCategory {
    FINANCIAL("Financial"),
    GIFT("Gift"),
    LOCATIONS("Locations"),
    SYSTEM("System");
    private String label;

    SearchCategory(String label) {
        this.label = label;
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

}
