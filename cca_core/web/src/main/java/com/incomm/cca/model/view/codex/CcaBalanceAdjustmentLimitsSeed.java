package com.incomm.cca.model.view.codex;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CcaBalanceAdjustmentLimitsSeed implements Serializable {

    private Double dailyAdjustmentLimit;
    private Double dailyCreditAdjustmentLimit;
    private Double dailyDebitAdjustmentLimit;
    private Double creditDebitAmountsAllowed;
    private Double maximumCreditOverInitialBalance;
    private List<String> permissions = new ArrayList<>();

    public Double getDailyAdjustmentLimit() {
        return dailyAdjustmentLimit;
    }

    public void setDailyAdjustmentLimit(final Double dailyAdjustmentLimit) {
        this.dailyAdjustmentLimit = dailyAdjustmentLimit;
    }

    public Double getDailyCreditAdjustmentLimit() {
        return dailyCreditAdjustmentLimit;
    }

    public void setDailyCreditAdjustmentLimit(final Double dailyCreditAdjustmentLimit) {
        this.dailyCreditAdjustmentLimit = dailyCreditAdjustmentLimit;
    }

    public Double getDailyDebitAdjustmentLimit() {
        return dailyDebitAdjustmentLimit;
    }

    public void setDailyDebitAdjustmentLimit(final Double dailyDebitAdjustmentLimit) {
        this.dailyDebitAdjustmentLimit = dailyDebitAdjustmentLimit;
    }

    public Double getCreditDebitAmountsAllowed() {
        return creditDebitAmountsAllowed;
    }

    public void setCreditDebitAmountsAllowed(final Double creditDebitAmountsAllowed) {
        this.creditDebitAmountsAllowed = creditDebitAmountsAllowed;
    }

    public Double getMaximumCreditOverInitialBalance() {
        return maximumCreditOverInitialBalance;
    }

    public void setMaximumCreditOverInitialBalance(final Double maximumCreditOverInitialBalance) {
        this.maximumCreditOverInitialBalance = maximumCreditOverInitialBalance;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<String> permissions) {
        this.permissions = permissions;
    }
}
