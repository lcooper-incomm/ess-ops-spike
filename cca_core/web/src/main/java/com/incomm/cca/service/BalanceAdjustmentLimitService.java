package com.incomm.cca.service;

import com.incomm.apls.model.requests.BalanceAdjustmentRequest;
import com.incomm.cca.exception.LimitViolationException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.TransactionType;
import com.incomm.cca.model.domain.audit.AuditBalanceAdjustmentActivity;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.auth.legacy.DailyAdjustmentActivityView;
import com.incomm.cca.model.view.codex.EnhancedCcaBalanceAdjustmentLimitsSeed;
import com.incomm.cca.model.view.external.apls.product.EnhancedAdjustBalanceRequest;
import com.incomm.cca.service.apls.AplsCustomerService;
import com.incomm.cca.service.auth.PermissionService;
import com.incomm.cca.service.codex.CodexSeedService;
import com.incomm.cca.service.codex.CodexService;
import com.incomm.cca.service.maples.MaplesAccountService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import com.incomm.cscore.client.maples.model.request.account.AccountAdjustBalanceRequest;
import com.incomm.cscore.client.maples.model.request.account.EnhancedAccountAdjustBalanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Service
public class BalanceAdjustmentLimitService {

    @Autowired
    private AuditService auditService;
    @Autowired
    private CodexService codexService;
    @Autowired
    private AplsCustomerService customerService;
    @Autowired
    private MaplesAccountService customerAccountService;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private CodexSeedService seedService;
    @Autowired
    private UserService userService;

    private EnhancedCcaBalanceAdjustmentLimitsSeed getLimitsForCurrentUser() {
        return codexService.runBalanceAdjustmentLimitsCodex(seedService.createBalanceAdjustmentLimitsSeed());
    }

    public DailyAdjustmentActivityView getDailyActivityForCurrentUser() {
        EnhancedCcaBalanceAdjustmentLimitsSeed codexLimits = this.getLimitsForCurrentUser();
        List<AuditBalanceAdjustmentActivity> activity = auditService.findTodaysBalanceAdjustmentActivityForUser(userService.currentUser()
                                                                                                                           .getUsername());

        DailyAdjustmentActivityView activityView = new DailyAdjustmentActivityView();
        activityView.initDailyLimits(codexLimits);
        activityView.initDailyAdjustmentTotals(activity);
        return activityView;
    }

    public void authorizeBalanceAdjustmentAgainstLimits(BalanceAdjustmentRequest requestDto, EnhancedCard card) {
        //Must have a permission
        Permission permission = permissionService.findHighestBalanceAdjustmentPermission();
        if (permission == null) {
            throw new SecurityViolationException();
        }

        //Must have balance adjustment permission for the given status
        if (!securityService.hasPermission(ManagedPermission.ADJUST_BALANCE_STATUS_OVERRIDE) && !securityService.canAdjustBalance(card.findStatusByPlatform(AplsPlatform.GREENCARD))) {
            throw new SecurityViolationException();
        }

        //Get request amount, adjusting debit amounts accordingly for validation
        BigDecimal requestAmount = new BigDecimal(requestDto.getAmount());
        if (requestDto.getReason()
                      .toLowerCase()
                      .contains("debit")) {
            requestAmount = BigDecimal.ZERO.subtract(requestAmount);
        }

        //Find limits
        DailyAdjustmentActivityView activityView = this.getDailyActivityForCurrentUser();

        //Validate request amount limit
        if (requestAmount.abs()
                         .compareTo(activityView.getCreditDebitAmountsAllowed()
                                                .getValue()) > 0) {
            throw new LimitViolationException(LimitViolationException.Reason.PER_ADJUSTMENT_LIMIT_EXCEEDED, BigDecimal.ZERO, activityView.getCreditDebitAmountsAllowed()
                                                                                                                                         .getValue());
        }

        //Validate adjustment over initial balance limit
        if (requestAmount.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal initialBalance = card.getAmounts()
                                            .getInitialLoadAmount() != null ? card.getAmounts()
                                                                                  .getInitialLoadAmount()
                                                                                  .getValue() : BigDecimal.ZERO;
            BigDecimal currentBalance = card.getAmounts()
                                            .getAvailableBalance() != null ? card.getAmounts()
                                                                                 .getAvailableBalance()
                                                                                 .getValue() : BigDecimal.ZERO;

            if (currentBalance.add(requestAmount)
                              .compareTo(initialBalance.add(activityView.getMaximumCreditOverInitialBalance()
                                                                        .getValue())) > 0) {
                throw new LimitViolationException(LimitViolationException.Reason.INITIAL_BALANCE_LIMIT_EXCEEDED, activityView.getMaximumCreditOverInitialBalance()
                                                                                                                             .getValue());
            }
        }

        //Find user's audit activities for today
        List<AuditBalanceAdjustmentActivity> previousAdjustments = null;
        try {
            previousAdjustments = findTodaysBalanceAdjustmentActivityForCurrentUser();
        } catch (Exception e) {
            throw new LimitViolationException(LimitViolationException.Reason.UNABLE_TO_VALIDATE_LIMITS);
        }

        //Prepare to get user's current adjustment limit status
        int totalAdjustments = previousAdjustments.size();
        BigDecimal totalCreditAdjustmentValue = BigDecimal.ZERO;
        BigDecimal totalDebitAdjustmentValue = BigDecimal.ZERO;

        //Get user's current adjustment limit status
        for (AuditBalanceAdjustmentActivity auditActivity : previousAdjustments) {
            BigDecimal amount = BigDecimal.valueOf(auditActivity.getAmount());
            if (Objects.equals(auditActivity.getTransactionType(), TransactionType.DEBIT)) {
                totalDebitAdjustmentValue = totalDebitAdjustmentValue.add(amount);
            } else {
                totalCreditAdjustmentValue = totalCreditAdjustmentValue.add(amount);
            }
        }

        //Validate total count of adjustments limit
        if (totalAdjustments >= activityView.getDailyAdjustmentLimit()) {
            throw new LimitViolationException(LimitViolationException.Reason.ADJUSTMENT_COUNT_EXCEEDED, activityView.getDailyAdjustmentLimit()
                                                                                                                    .toString());
        }

        //Validate total credit value limit
        if (requestAmount.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal remainingCredit = activityView.getDailyCreditAdjustmentLimit()
                                                     .getValue()
                                                     .subtract(totalCreditAdjustmentValue);
            if (remainingCredit.compareTo(BigDecimal.ZERO) <= 0) {
                throw new LimitViolationException(LimitViolationException.Reason.CREDIT_LIMIT_REACHED, activityView.getDailyCreditAdjustmentLimit()
                                                                                                                   .getValue());
            } else if (requestAmount.compareTo(remainingCredit) > 0) {
                throw new LimitViolationException(LimitViolationException.Reason.TOTAL_CREDIT_LIMIT_EXCEEDED, remainingCredit);
            }
        }

        //Validate total debit value limit
        if (requestAmount.compareTo(BigDecimal.ZERO) < 0) {
            BigDecimal remainingDebit = activityView.getDailyDebitAdjustmentLimit()
                                                    .getValue()
                                                    .subtract(totalDebitAdjustmentValue);
            if (remainingDebit.compareTo(BigDecimal.ZERO) <= 0) {
                throw new LimitViolationException(LimitViolationException.Reason.DEBIT_LIMIT_REACHED, activityView.getDailyDebitAdjustmentLimit()
                                                                                                                  .getValue());
            } else if (requestAmount.abs()
                                    .compareTo(remainingDebit) > 0) {
                throw new LimitViolationException(LimitViolationException.Reason.TOTAL_DEBIT_LIMIT_EXCEEDED, remainingDebit);
            }
        }

    }

    public void authorizeMaplesBalanceAdjustmentAgainstLimits(String accountId, EnhancedAccountAdjustBalanceRequest request, MaplesPlatform platform) {
        String adjustmentType = request.getAdjustmentType();
        boolean isCredit = adjustmentType.equalsIgnoreCase(TransactionType.CREDIT);
        boolean isDebit = adjustmentType.equalsIgnoreCase(TransactionType.DEBIT);
        BigDecimal requestAmount = new BigDecimal(request.getAmount());
        DailyAdjustmentActivityView activityView = getDailyActivityForCurrentUser();
        BigDecimal maxAdjustmentAmount = activityView.getCreditDebitAmountsAllowed()
                                                     .getValue();
        BigDecimal minAdjustmentAmount = BigDecimal.valueOf(0);
        BigDecimal availableBalance = customerAccountService.findOne(accountId).getPrimaryAccountAvailableBalance().getAmount().getValue();


        boolean negativeResultingBalance = availableBalance.subtract(requestAmount)
                                                           .compareTo(BigDecimal.ZERO) < 0;
        //If adjustment is debit and would take balance below zero, must have permission to do so
        if (isDebit && negativeResultingBalance && !canTakeMaplesBalanceNegative(platform)) {
            throw new LimitViolationException(LimitViolationException.Reason.NO_NEGATIVE_BALANCE_PERMISSION);
        }

        //Must not exceed the max adjustment count per day
        checkNumberLimitOfAdjustmentPerDay(activityView);

        //Adjustment amount must not exceed amount limit
        checkAmountLimitPerAdjustment(requestAmount, minAdjustmentAmount, maxAdjustmentAmount);

        //Adjustment amount must not make total adjustment for today exceed limit
        checkDailyAdjustmentLimit(activityView, isCredit, requestAmount);

    }

    public void authorizeBalanceAdjustmentAgainstLimits(String customerId, EnhancedAdjustBalanceRequest request, AplsPlatform platform) {

        String adjustmentType = request.getCrdrFlag();
        boolean isCredit = adjustmentType.equalsIgnoreCase(TransactionType.CREDIT);
        boolean isDebit = adjustmentType.equalsIgnoreCase(TransactionType.DEBIT);

        if (!isCredit && !isDebit) {
            throw new LimitViolationException(LimitViolationException.Reason.UNABLE_TO_VALIDATE_LIMITS);
        }

        BigDecimal requestAmount = new BigDecimal(request.getAmount());

        DailyAdjustmentActivityView activityView = getDailyActivityForCurrentUser();
        BigDecimal maxAdjustmentAmount = activityView.getCreditDebitAmountsAllowed()
                                                     .getValue();
        BigDecimal minAdjustmentAmount = BigDecimal.valueOf(0);

        BigDecimal availableBalance = customerService.findOne(customerId)
                                                     .getAccounts()
                                                     .getSpending()
                                                     .getAvailableBalance()
                                                     .getValue();
        boolean negativeResultingBalance = availableBalance.subtract(requestAmount)
                                                           .compareTo(BigDecimal.ZERO) < 0;

        //Must not exceed the max adjustment count for today
        if (activityView.getRemainingDailyAdjustmentCount() <= 0) {
            throw new LimitViolationException(LimitViolationException.Reason.ADJUSTMENT_COUNT_EXCEEDED, activityView.getDailyAdjustmentLimit()
                                                                                                                    .toString());
        }

        //If adjustment is debit and would take balance below zero, must have permission to do so
        if (isDebit && negativeResultingBalance && !canTakeBalanceNegative(platform)) {
            throw new LimitViolationException(LimitViolationException.Reason.NO_NEGATIVE_BALANCE_PERMISSION);
        }

        //Adjustment amount must not exceed amount limit
        checkAmountLimitPerAdjustment(requestAmount, minAdjustmentAmount, maxAdjustmentAmount);

        //Adjustment amount must not make total adjustment for today exceed limit
        checkDailyAdjustmentLimit(activityView, isCredit, requestAmount);
    }

    private boolean canTakeBalanceNegative(final AplsPlatform platform) {
        return (platform == AplsPlatform.VMS && securityService.hasPermission(ManagedPermission.VMS_ADJUST_BALANCE_TO_NEGATIVE))
                || (platform == AplsPlatform.CCL && securityService.hasPermission(ManagedPermission.CCL_ADJUST_BALANCE_TO_NEGATIVE));
    }

    private boolean canTakeMaplesBalanceNegative(final MaplesPlatform platform) {
        return (platform == MaplesPlatform.SERVE && securityService.hasPermission(ManagedPermission.SERVE_ADJUST_BALANCE_TO_NEGATIVE));
    }

    private static boolean isInRange(BigDecimal amount, BigDecimal min, BigDecimal max) {
        boolean isAboveMin = amount.compareTo(min) >= 0;
        boolean isBelowMax = amount.compareTo(max) <= 0;
        return isAboveMin && isBelowMax;
    }

    private List<AuditBalanceAdjustmentActivity> findTodaysBalanceAdjustmentActivityForCurrentUser() {
        return auditService.findTodaysBalanceAdjustmentActivityForUser(userService.currentUser()
                                                                                  .getUsername());
    }

    private void checkAmountLimitPerAdjustment(BigDecimal requestAmount, BigDecimal minAdjustmentAmount, BigDecimal maxAdjustmentAmount) {
        if (!isInRange(requestAmount, minAdjustmentAmount, maxAdjustmentAmount)) {
            throw new LimitViolationException(
                    LimitViolationException.Reason.PER_ADJUSTMENT_LIMIT_EXCEEDED,
                    minAdjustmentAmount,
                    maxAdjustmentAmount
            );
        }
    }

    private void checkDailyAdjustmentLimit(DailyAdjustmentActivityView activityView, boolean isCredit, BigDecimal requestAmount) {
        //Adjustment amount must not make total adjustment for today exceed limit
        if (isCredit) {
            BigDecimal remainingCredit = activityView.getRemainingDailyCreditAmount()
                                                     .getValue();
            if (requestAmount.compareTo(remainingCredit) > 0) {
                throw new LimitViolationException(LimitViolationException.Reason.TOTAL_CREDIT_LIMIT_EXCEEDED, remainingCredit);
            }
        } else {
            BigDecimal remainingDebit = activityView.getRemainingDailyDebitAmount()
                                                    .getValue();
            if (requestAmount.compareTo(remainingDebit) > 0) {
                throw new LimitViolationException(LimitViolationException.Reason.TOTAL_DEBIT_LIMIT_EXCEEDED, remainingDebit);
            }
        }
    }

    private void checkNumberLimitOfAdjustmentPerDay(DailyAdjustmentActivityView activityView) {
        if (activityView.getRemainingDailyAdjustmentCount() <= 0) {
            throw new LimitViolationException(LimitViolationException.Reason.ADJUSTMENT_COUNT_EXCEEDED, activityView.getDailyAdjustmentLimit()
                                                                                                                    .toString());
        }
    }
}
