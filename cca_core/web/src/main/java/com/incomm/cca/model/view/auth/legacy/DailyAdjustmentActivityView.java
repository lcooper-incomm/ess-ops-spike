package com.incomm.cca.model.view.auth.legacy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.constant.TransactionType;
import com.incomm.cca.model.domain.audit.AuditBalanceAdjustmentActivity;
import com.incomm.cca.model.view.codex.EnhancedCcaBalanceAdjustmentLimitsSeed;
import com.incomm.cscore.gringotts.GringottsExchange;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DailyAdjustmentActivityView implements Serializable {

    private Integer dailyAdjustmentLimit = 0;
    private CsCoreCurrency dailyCreditAdjustmentLimit;
    private CsCoreCurrency dailyDebitAdjustmentLimit;
    private CsCoreCurrency creditDebitAmountsAllowed;
    private CsCoreCurrency maximumCreditOverInitialBalance;
    private Integer adjustmentsToday = 0;
    private CsCoreCurrency totalCreditAdjustmentsToday;
    private CsCoreCurrency totalDebitAdjustmentsToday;

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

    public Integer getAdjustmentsToday() {
        return adjustmentsToday;
    }

    public void setAdjustmentsToday(final Integer adjustmentsToday) {
        this.adjustmentsToday = adjustmentsToday;
    }

    public CsCoreCurrency getTotalCreditAdjustmentsToday() {
        return totalCreditAdjustmentsToday;
    }

    public void setTotalCreditAdjustmentsToday(final CsCoreCurrency totalCreditAdjustmentsToday) {
        this.totalCreditAdjustmentsToday = totalCreditAdjustmentsToday;
    }

    public void setTotalCreditAdjustmentsToday(final Double totalCreditAdjustmentsToday) {
        this.setTotalCreditAdjustmentsToday(GringottsExchange.quickExchange(totalCreditAdjustmentsToday));
    }

    public CsCoreCurrency getTotalDebitAdjustmentsToday() {
        return totalDebitAdjustmentsToday;
    }

    public void setTotalDebitAdjustmentsToday(final CsCoreCurrency totalDebitAdjustmentsToday) {
        this.totalDebitAdjustmentsToday = totalDebitAdjustmentsToday;
    }

    public void setTotalDebitAdjustmentsToday(final Double totalDebitAdjustmentsToday) {
        this.setTotalDebitAdjustmentsToday(GringottsExchange.quickExchange(totalDebitAdjustmentsToday));
    }

    public CsCoreCurrency getRemainingDailyDebitAmount() {
        BigDecimal result = dailyDebitAdjustmentLimit.getValue()
                                                     .subtract(totalDebitAdjustmentsToday.getValue());
        return GringottsExchange.quickExchange(result);
    }

    public CsCoreCurrency getRemainingDailyCreditAmount() {
        BigDecimal result = dailyCreditAdjustmentLimit.getValue()
                                                      .subtract(totalCreditAdjustmentsToday.getValue());
        return GringottsExchange.quickExchange(result);
    }

    public Integer getRemainingDailyAdjustmentCount() {
        return dailyAdjustmentLimit - adjustmentsToday;
    }

    public void initDailyLimits(EnhancedCcaBalanceAdjustmentLimitsSeed limits) {
        this.setDailyAdjustmentLimit(limits.getDailyAdjustmentLimit() != null ? limits.getDailyAdjustmentLimit() : 0);
        this.setCreditDebitAmountsAllowed(limits.getCreditDebitAmountsAllowed() != null ? limits.getCreditDebitAmountsAllowed() : GringottsExchange.quickExchange(0));
        this.setDailyCreditAdjustmentLimit(limits.getDailyCreditAdjustmentLimit() != null ? limits.getDailyCreditAdjustmentLimit() : GringottsExchange.quickExchange(0));
        this.setDailyDebitAdjustmentLimit(limits.getDailyDebitAdjustmentLimit() != null ? limits.getDailyDebitAdjustmentLimit() : GringottsExchange.quickExchange(0));
        this.setMaximumCreditOverInitialBalance(limits.getMaximumCreditOverInitialBalance() != null ? limits.getMaximumCreditOverInitialBalance() : GringottsExchange.quickExchange(0));
    }

    public void initDailyAdjustmentTotals(List<AuditBalanceAdjustmentActivity> activities) {
        adjustmentsToday = activities.size();
        this.totalCreditAdjustmentsToday = GringottsExchange.quickExchange(0);
        this.totalDebitAdjustmentsToday = GringottsExchange.quickExchange(0);

        for (AuditBalanceAdjustmentActivity auditActivity : activities) {
            Double amount = auditActivity.getAmount();
            BigDecimal mathAmount = new BigDecimal(amount.toString());

            if (auditActivity.getTransactionType()
                             .equalsIgnoreCase(TransactionType.DEBIT)) {
                BigDecimal result = totalDebitAdjustmentsToday.getValue()
                                                              .add(mathAmount);
                totalDebitAdjustmentsToday = GringottsExchange.quickExchange(result);
            } else {
                BigDecimal result = totalCreditAdjustmentsToday.getValue()
                                                               .add(mathAmount);
                totalCreditAdjustmentsToday = GringottsExchange.quickExchange(result);
            }
        }
    }
}
