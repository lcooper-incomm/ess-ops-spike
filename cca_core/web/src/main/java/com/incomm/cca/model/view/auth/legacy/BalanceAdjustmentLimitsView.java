package com.incomm.cca.model.view.auth.legacy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BalanceAdjustmentLimitsView implements Serializable {

    private Map<String, BalanceAdjustmentLimitView> limit_map;
    private Map<String, BalanceAdjustmentLimitView> existing_limit_map;

    public Map<String, BalanceAdjustmentLimitView> getLimit_map() {
        return limit_map;
    }

    public void setLimit_map(Map<String, BalanceAdjustmentLimitView> limit_map) {
        this.limit_map = limit_map;
    }

    public Map<String, BalanceAdjustmentLimitView> getExisting_limit_map() {
        return existing_limit_map;
    }

    public void setExisting_limit_map(Map<String, BalanceAdjustmentLimitView> existing_limit_map) {
        this.existing_limit_map = existing_limit_map;
    }
}
