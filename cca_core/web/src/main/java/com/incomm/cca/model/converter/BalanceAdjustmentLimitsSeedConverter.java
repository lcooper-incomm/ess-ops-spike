package com.incomm.cca.model.converter;

import com.incomm.cca.model.view.codex.CcaBalanceAdjustmentLimitsSeed;
import com.incomm.cca.model.view.codex.EnhancedCcaBalanceAdjustmentLimitsSeed;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.springframework.stereotype.Service;

@Service
public class BalanceAdjustmentLimitsSeedConverter {

    public EnhancedCcaBalanceAdjustmentLimitsSeed convert(CcaBalanceAdjustmentLimitsSeed request) {
        EnhancedCcaBalanceAdjustmentLimitsSeed view = null;

        if (request != null) {
            view = new EnhancedCcaBalanceAdjustmentLimitsSeed();
            view.setCreditDebitAmountsAllowed(GringottsExchange.quickExchange(request.getCreditDebitAmountsAllowed()));
            view.setDailyAdjustmentLimit(request.getDailyAdjustmentLimit() != null ? request.getDailyAdjustmentLimit()
                                                                                            .intValue() : null);
            view.setDailyCreditAdjustmentLimit(GringottsExchange.quickExchange(request.getDailyCreditAdjustmentLimit()));
            view.setDailyDebitAdjustmentLimit(GringottsExchange.quickExchange(request.getDailyDebitAdjustmentLimit()));
            view.setMaximumCreditOverInitialBalance(GringottsExchange.quickExchange(request.getMaximumCreditOverInitialBalance()));

            if (request.getPermissions() != null) {
                view.getPermissions()
                    .addAll(request.getPermissions());
            }
        }

        return view;
    }
}
