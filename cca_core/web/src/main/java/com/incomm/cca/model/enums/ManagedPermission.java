package com.incomm.cca.model.enums;

/**
 * This enum used for Permission system names that we use for validation in the app itself.
 * It could not be implemented on Permission itself AS the systemName, due to Partner
 * permissions being created dynamically (those values would therefore not exist in the enum...)
 */
public enum ManagedPermission {
    ACTIVATE_FAST_CARD,
    ADMIN_SCHEDULED_TASKS,
    ADJUST_BALANCE_LEVEL_1,
    ADJUST_BALANCE_LEVEL_2,
    ADJUST_BALANCE_LEVEL_3,
    ADJUST_BALANCE_LEVEL_4,
    ADJUST_BALANCE_LEVEL_5,
    ADJUST_BALANCE_STATUS_OVERRIDE,
    ADMIN_QUEUES,
    ADMIN_TOGGLZ_PAGE,
    ALLOW_CARD_BALANCE_TO_BE_NEGATIVE,
    API_SESSION_SUMMARY,
    BULK_CHANGE_CARD_STATUS,
    BULK_DEACTIVATE,
    BULK_PRODUCT_EXPORT,
    BYPASS_SERVE_CUSTOMER_VERIFICATION,
    CANARY_SERVICE_READ,
    CANCEL_ON_HOLD_ORDER,
    CANCEL_ORDER,
    CANCEL_ORDER_WITH_REFUND,
    CARD_STATUS_CHANGE_OVERRIDE,
    CASE_SEARCH_SESSION_TYPE_BAD_CREDIT,
    CASE_SEARCH_SESSION_TYPE_COMPLAINT,
    CASE_SEARCH_SESSION_TYPE_CONSUMED_CARD,
    CASE_SEARCH_SESSION_TYPE_DISPUTE,
    CASE_SEARCH_SESSION_TYPE_ECOMM_FRAUD,
    CASE_SEARCH_SESSION_TYPE_LAW_ENFORCEMENT,
    CASE_SEARCH_SESSION_TYPE_DAMAGED_PINS,
    CASE_SEARCH_SESSION_TYPE_MERCHANT_FRAUD,
    CASE_SEARCH_SESSION_TYPE_OTHER_FRAUD,
    CASE_SEARCH_SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE,
    CASE_SEARCH_SESSION_TYPE_PRIVACY_REQUEST,
    CASE_SEARCH_SESSION_TYPE_REWARDS,
    CASE_SEARCH_SESSION_TYPE_REWARDS_TRAINING,
    CCL_ACTIVATE_CARD,
    CCL_ADJUST_BALANCE,
    CCL_ADJUST_BALANCE_TO_NEGATIVE,
    CCL_RELEASE_PRE_AUTH,
    CCL_C2C_TRANSFER_APPROVE,
    CCL_C2C_TRANSFER_REQUEST,
    CCL_REVERSE_FEE,
    CHALLENGE_PASSWORD,
    CHANGE_CARD_STATUS,
    CREATE_COMPLAINT_AMERICAN_EXPRESS,
    CREATE_COMPLAINT_BANCORP,
    CREATE_COMPLAINT_MASTERCARD,
    CREATE_COMPLAINT_METABANK,
    DEACTIVATE_FAST_CARD,
    DOWNLOAD_DOCUMENT,
    EDIT_APP_PROPERTIES,
    ENCOR_CASE_WORKSPACE,
    ENCOR_IMPERSONATE_USER,
    EXPORT_CSV,
    EXPORT_PDF,
    EXPORT_XLSX,
    FAILED_KYC_REGISTRATION_SEARCH,
    GC_ACTIVATE_B2B_CARD,
    GC_ACTIVATE_GIFT_CARD_REPLACEMENT,
    GC_ADJUST_BALANCE_UP_TO_100,
    GC_ADJUST_BALANCE_UP_TO_500,
    GC_ADJUST_BALANCE_WHEN_ACTIVE,
    GC_ADJUST_BALANCE_WHEN_DEACTIVE,
    GC_ADJUST_BALANCE_WHEN_EXPIRED,
    GC_ADJUST_BALANCE_WHEN_INITIAL,
    GC_CARD_TRANSFER,
    GC_CARD_TRANSFER_STATUS_OVERRIDE,
    GC_CHANGE_STATUS_FROM_RISK_INVESTIGATION,
    GC_CHANGE_STATUS_TO_RISK_INVESTIGATION,
    GC_MERCHANDISE_RELEASE,
    GC_RELEASE_PREAUTH,
    GC_REPLACE_CARD,
    GC_REPLACE_CARD_USE_NEW_CARD_NUMBER,
    HISTORY_FULL_VIEW,
    HOLD_ORDER,
    JOB_QUEUE,
    LIVE_TROUBLESHOOTING,
    OVERRIDE_BILLABLE,
    PERSONAL_INFO_REQUEST,
    RAISE_SESSION_TYPE_BAD_CREDIT,
    RAISE_SESSION_TYPE_CONSUMED_CARD,
    RAISE_SESSION_TYPE_DISPUTE,
    RAISE_SESSION_TYPE_ECOMM_FRAUD,
    RAISE_SESSION_TYPE_LAW_ENFORCEMENT,
    RAISE_SESSION_TYPE_DAMAGED_PINS,
    RAISE_SESSION_TYPE_MERCHANT_FRAUD,
    RAISE_SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE,
    RAISE_SESSION_TYPE_OTHER_FRAUD,
    RAISE_SESSION_TYPE_REWARDS,
    RAISE_SESSION_TYPE_REWARDS_TRAINING,
    REMOVE_SELECTION,
    REPLACE_REPLACEMENT_CARD,
    REQUEST_HOLD_ORDER,
    RESEND_DELIVERY,
    RESEND_DISPUTE_DOCUMENTS,
    RESEND_ORDER_NOTIFICATION,
    SEARCH_BOOST,
    SEARCH_BY_DDP,
    SEARCH_BY_ALDER_CARD,
    SEARCH_BY_ALDER_ORDER,
    SEARCH_BY_ECOMM_ORDER,
    SEARCH_BY_FINANCIAL_GIFT,
    SEARCH_BY_GPR,
    SEARCH_BY_INCOMM,
    SEARCH_BY_LOCATION,
    SEARCH_BY_MASTERCARD_BOL,
    SEARCH_BY_PAYPAL,
    SEARCH_BY_PROMOTIONS,
    SEARCH_BY_VMS_GIFT,
    SEARCH_BY_VRN,
    SEARCH_CCL,
    SEARCH_JIRA,
    SEARCH_NET10,
    SEARCH_SERVE,
    SEARCH_SESSIONS_ALL,
    SEARCH_SESSIONS_CALL_CENTER,
    SEARCH_SESSIONS_GENERAL,
    SEARCH_SESSIONS_CASE,
    SEARCH_TRACFONE,
    SEARCH_VIRGIN,
    SEARCH_BY_AMEX_BOL,
    SEARCH_BY_VANILLA_BOL,
    SEARCH_BY_VANILLA_DIRECT,
    SEARCH_BY_WALMART_BOL,
    SERVE_ACTIVATE_CARD,
    SERVE_ADJUST_BALANCE,
    SERVE_ADJUST_BALANCE_TO_NEGATIVE,
    SERVE_ADJUST_TRANSACTION,
    SERVE_CANCEL_PREAUTH_TRANSACTION,
    SERVE_CANCEL_TRANSACTION,
    SERVE_CHANGE_ACCOUNT_STATUS,
    SERVE_DOCUMENT_ADVANCED_FUNCTIONS,
    SERVE_EDIT_ACCOUNT,
    SERVE_LOCK_CARD,
    SERVE_RAISE_DISPUTE,
    SERVE_REFUND,
    SERVE_REPLACE_CARD,
    SERVE_SEND_FORM,
    SERVE_STATUS_CODE_EDIT,
    SERVE_VIEW_BILL_PAY_DDA,
    SERVE_VIEW_RESTRICTED_DOCS,
    SERVE_TRANSFER_FUNDS,
    SERVE_TRANSFER_FUNDS_SUB_ACCOUNTS,
    SERVE_TRANSFER_FUNDS_ASSOCIATED_ACCOUNTS,
    SERVE_TRANSFER_FUNDS_OTHER_ACCOUNTS,
    SERVE_WAIVE_FEE_FOR_REPLACE_CARD,
    SESSION_TYPE_CALL,
    SESSION_TYPE_BAD_CREDIT,
    SESSION_TYPE_CONSUMED_CARD,
    SESSION_TYPE_DISPUTE,
    SESSION_TYPE_ECOMM_FRAUD,
    SESSION_TYPE_LAW_ENFORCEMENT,
    SESSION_TYPE_DAMAGED_PINS,
    SESSION_TYPE_MERCHANT_FRAUD,
    SESSION_TYPE_OTHER_FRAUD,
    SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE,
    SESSION_TYPE_PRIVACY_REQUEST,
    SESSION_TYPE_REWARDS,
    SESSION_TYPE_REWARDS_TRAINING,
    TRANSACTION_FILTER_REPORTED_FRAUD,
    UNHOLD_ORDER,
    UNMASK_PAN,
    UNMASK_PIN,
    VIEW_ALL_JOBS,
    VIEW_DOCUMENT,
    VIEW_SENSITIVE_ORDER_INFORMATION,
    VIEW_UNMASKED_LOCATION_HISTORY,
    VMS_ACTIVATE_CARD,
    VMS_ADJUST_BALANCE,
    VMS_ADJUST_BALANCE_TO_NEGATIVE,
    VMS_C2C_TRANSFER_APPROVE,
    VMS_C2C_TRANSFER_REQUEST,
    VMS_CHANGE_STATUS_FROM_RISK_INVESTIGATION,
    VMS_CHANGE_STATUS_TO_RISK_INVESTIGATION,
    VMS_DISABLE_ONE_TIME_FRAUD_OVERRIDE,
    VMS_DISABLE_PERMANENT_FRAUD_OVERRIDE,
    VMS_ENABLE_ONE_TIME_FRAUD_OVERRIDE,
    VMS_ENABLE_PERMANENT_FRAUD_OVERRIDE,
    VMS_MANAGE_PRODUCT_TYPES,
    VMS_ORDER_NEW_CARD,
    VMS_RELEASE_PRE_AUTH,
    VMS_RAISE_DISPUTE,
    VMS_REPORT_TRANSACTION_AS_FRAUD,
    VMS_RESET_PIN,
    VMS_RESET_ONLINE_PASSWORD,
    VMS_REVERSE_FEE,
    VMS_UPDATE_DEVICE_STATUS,
    SHOW_FILE_PASSWORD,
    VMS_VIEW_DISPUTE
}
