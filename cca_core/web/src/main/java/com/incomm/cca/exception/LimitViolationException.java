package com.incomm.cca.exception;

import java.math.BigDecimal;

public class LimitViolationException extends RuntimeException {

    private final String officialMessage;

    public enum Reason {
        ADJUSTMENT_COUNT_EXCEEDED("You have exceeded your daily limit of %s balance adjustment actions today."),
        CREDIT_LIMIT_REACHED("You have exceeded your daily limit of $%.2f for credit adjustments."),
        DEBIT_LIMIT_REACHED("You have exceeded your daily limit of $%.2f for debit adjustments."),
        TOTAL_CREDIT_LIMIT_EXCEEDED("You only have $%.2f remaining before you hit your daily credit adjustment limit. This adjustment would exceed that limit."),
        TOTAL_DEBIT_LIMIT_EXCEEDED("You only have $%.2f remaining before you hit your daily debit adjustment limit. This adjustment would exceed that limit."),
        PER_ADJUSTMENT_LIMIT_EXCEEDED("You may only adjust the balance of this card between $%.2f - $%.2f."),
        INITIAL_BALANCE_LIMIT_EXCEEDED("You may only exceed the card's initial balance by $%.2f."),
        NO_NEGATIVE_BALANCE_PERMISSION("You do not have permission to take the account balance below $0.00."),
        UNABLE_TO_VALIDATE_LIMITS("CCA encountered an unexpected error attempting to review your daily limits. Please contact a system administrator.");
        private String messageTemplate;

        Reason(String messageTemplate) {
            this.messageTemplate = messageTemplate;
        }

        public String getReason() {
            return this.messageTemplate;
        }

        public String getReason(String... args) {
            return String.format(this.messageTemplate, args);
        }

        public String getReason(BigDecimal... args) {
            return String.format(this.messageTemplate, args);
        }
    }

    public LimitViolationException(Reason reason) {
        this.officialMessage = reason.getReason();
    }

    public LimitViolationException(Reason reason, String... args) {
        this.officialMessage = reason.getReason(args);
    }

    public LimitViolationException(Reason reason, BigDecimal... args) {
        this.officialMessage = reason.getReason(args);
    }

    @Override
    public String getMessage() {
        return officialMessage;
    }
}
