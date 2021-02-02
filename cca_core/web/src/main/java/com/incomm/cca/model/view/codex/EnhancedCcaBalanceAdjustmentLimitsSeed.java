package com.incomm.cca.model.view.codex;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedCcaBalanceAdjustmentLimitsSeed implements Serializable {

    private Integer dailyAdjustmentLimit;
    private CsCoreCurrency dailyCreditAdjustmentLimit;
    private CsCoreCurrency dailyDebitAdjustmentLimit;
    private CsCoreCurrency creditDebitAmountsAllowed;
    private CsCoreCurrency maximumCreditOverInitialBalance;
    private List<String> permissions = new ArrayList<>();

    public Integer getDailyAdjustmentLimit() {
        return dailyAdjustmentLimit;
    }

    public void setDailyAdjustmentLimit(final Integer dailyAdjustmentLimit) {
        this.dailyAdjustmentLimit = dailyAdjustmentLimit;
    }

    public CsCoreCurrency getDailyCreditAdjustmentLimit() {
        return dailyCreditAdjustmentLimit;
    }

    public void setDailyCreditAdjustmentLimit(final CsCoreCurrency dailyCreditAdjustmentLimit) {
        this.dailyCreditAdjustmentLimit = dailyCreditAdjustmentLimit;
    }

    public CsCoreCurrency getDailyDebitAdjustmentLimit() {
        return dailyDebitAdjustmentLimit;
    }

    public void setDailyDebitAdjustmentLimit(final CsCoreCurrency dailyDebitAdjustmentLimit) {
        this.dailyDebitAdjustmentLimit = dailyDebitAdjustmentLimit;
    }

    public CsCoreCurrency getCreditDebitAmountsAllowed() {
        return creditDebitAmountsAllowed;
    }

    public void setCreditDebitAmountsAllowed(final CsCoreCurrency creditDebitAmountsAllowed) {
        this.creditDebitAmountsAllowed = creditDebitAmountsAllowed;
    }

    public CsCoreCurrency getMaximumCreditOverInitialBalance() {
        return maximumCreditOverInitialBalance;
    }

    public void setMaximumCreditOverInitialBalance(final CsCoreCurrency maximumCreditOverInitialBalance) {
        this.maximumCreditOverInitialBalance = maximumCreditOverInitialBalance;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<String> permissions) {
        this.permissions = permissions;
    }
}
