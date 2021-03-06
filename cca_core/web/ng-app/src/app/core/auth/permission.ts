import {PermissionCategory} from "./permission-category";

export class Permission {

  id: number;
  category: PermissionCategory;
  description: string;
  displayName: string;
  isActive: boolean = false;
  systemName: string;

  constructor(data: any) {
    if (data) {
      Object.assign(this, data);

      if (data.category) {
        this.category = new PermissionCategory(data.category);
      }
    }
  }

  public static ACTIVATE_FAST_CARD                               = 'ACTIVATE_FAST_CARD';
  public static ADJUST_BALANCE_LEVEL_1                           = 'ADJUST_BALANCE_LEVEL_1';
  public static ADJUST_BALANCE_LEVEL_2                           = 'ADJUST_BALANCE_LEVEL_2';
  public static ADJUST_BALANCE_LEVEL_3                           = 'ADJUST_BALANCE_LEVEL_3';
  public static ADJUST_BALANCE_LEVEL_4                           = 'ADJUST_BALANCE_LEVEL_4';
  public static ADJUST_BALANCE_LEVEL_5                           = 'ADJUST_BALANCE_LEVEL_5';
  public static ADJUST_BALANCE_STATUS_OVERRIDE                   = 'ADJUST_BALANCE_STATUS_OVERRIDE';
  public static ADMIN_QUEUES                                     = 'ADMIN_QUEUES';
  public static ADMIN_TOGGLZ_PAGE                                = 'ADMIN_TOGGLZ_PAGE';
  public static ALLOW_CARD_BALANCE_TO_BE_NEGATIVE                = 'ALLOW_CARD_BALANCE_TO_BE_NEGATIVE';
  public static BULK_CHANGE_CARD_STATUS                          = 'BULK_CHANGE_CARD_STATUS';
  public static BULK_DEACTIVATE                                  = 'BULK_DEACTIVATE';
  public static BULK_PRODUCT_EXPORT                              = 'BULK_PRODUCT_EXPORT';
  public static BYPASS_SERVE_CUSTOMER_VERIFICATION               = 'BYPASS_SERVE_CUSTOMER_VERIFICATION';
  public static CANCEL_ON_HOLD_ORDER                             = 'CANCEL_ON_HOLD_ORDER';
  public static CANCEL_ORDER                                     = 'CANCEL_ORDER';
  public static CANCEL_ORDER_WITH_REFUND                         = 'CANCEL_ORDER_WITH_REFUND';
  public static CARD_STATUS_CHANGE_OVERRIDE                      = 'CARD_STATUS_CHANGE_OVERRIDE';
  public static CASE_SEARCH_SESSION_TYPE_BAD_CREDIT              = 'CASE_SEARCH_SESSION_TYPE_BAD_CREDIT';
  public static CASE_SEARCH_SESSION_TYPE_COMPLAINT               = 'CASE_SEARCH_SESSION_TYPE_COMPLAINT';
  public static CASE_SEARCH_SESSION_TYPE_CONSUMED_CARD           = 'CASE_SEARCH_SESSION_TYPE_CONSUMED_CARD';
  public static CASE_SEARCH_SESSION_TYPE_DISPUTE                 = 'CASE_SEARCH_SESSION_TYPE_DISPUTE';
  public static CASE_SEARCH_SESSION_TYPE_ECOMM_FRAUD             = 'CASE_SEARCH_SESSION_TYPE_ECOMM_FRAUD';
  public static CASE_SEARCH_SESSION_TYPE_REWARDS                 = 'CASE_SEARCH_SESSION_TYPE_REWARDS';
  public static CASE_SEARCH_SESSION_TYPE_REWARDS_TRAINING        = 'CASE_SEARCH_SESSION_TYPE_REWARDS_TRAINING';
  public static CASE_SEARCH_SESSION_TYPE_LAW_ENFORCEMENT         = 'CASE_SEARCH_SESSION_TYPE_LAW_ENFORCEMENT';
  public static CASE_SEARCH_SESSION_TYPE_DAMAGED_PINS            = 'CASE_SEARCH_SESSION_TYPE_DAMAGED_PINS';
  public static CASE_SEARCH_SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE = 'CASE_SEARCH_SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE';
  public static CASE_SEARCH_SESSION_TYPE_MERCHANT_FRAUD          = 'CASE_SEARCH_SESSION_TYPE_MERCHANT_FRAUD';
  public static CASE_SEARCH_SESSION_TYPE_OTHER_FRAUD             = 'CASE_SEARCH_SESSION_TYPE_OTHER_FRAUD';
  public static CCL_ACTIVATE_CARD                                = 'CCL_ACTIVATE_CARD';
  public static CCL_ADJUST_BALANCE                               = 'CCL_ADJUST_BALANCE';
  public static CCL_ADJUST_BALANCE_TO_NEGATIVE                   = 'CCL_ADJUST_BALANCE_TO_NEGATIVE';
  public static CCL_C2C_TRANSFER_APPROVE                         = 'CCL_C2C_TRANSFER_APPROVE';
  public static CCL_C2C_TRANSFER_REQUEST                         = 'CCL_C2C_TRANSFER_REQUEST';
  public static CCL_EDIT_ACCOUNT                                 = 'CCL_EDIT_ACCOUNT';
  public static CCL_RELEASE_PRE_AUTH                             = 'CCL_RELEASE_PRE_AUTH';
  public static CCL_REPLACE_CARD                                 = 'CCL_REPLACE_CARD';
  public static CCL_REVERSE_FEE                                  = 'CCL_REVERSE_FEE';
  public static CLOSE_ACCOUNT                                    = 'CLOSE_ACCOUNT';
  public static CHALLENGE_PASSWORD                               = 'CHALLENGE_PASSWORD';
  public static CHANGE_CARD_STATUS                               = 'CHANGE_CARD_STATUS';
  public static CREATE_COMPLAINT_AMERICAN_EXPRESS                = 'CREATE_COMPLAINT_AMERICAN_EXPRESS';
  public static CREATE_COMPLAINT_BANCORP                         = 'CREATE_COMPLAINT_BANCORP';
  public static CREATE_COMPLAINT_MASTERCARD                      = 'CREATE_COMPLAINT_MASTERCARD';
  public static CREATE_COMPLAINT_METABANK                        = 'CREATE_COMPLAINT_METABANK';
  public static DEACTIVATE_FAST_CARD                             = 'DEACTIVATE_FAST_CARD';
  public static DOWNLOAD_DOCUMENT                                = 'DOWNLOAD_DOCUMENT';
  public static SERVE_EDIT_ACCOUNT                               = 'SERVE_EDIT_ACCOUNT';
  public static EDIT_APP_PROPERTIES                              = 'EDIT_APP_PROPERTIES';
  public static ENCOR_CASE_WORKSPACE                             = 'ENCOR_CASE_WORKSPACE';
  public static ENCOR_IMPERSONATE_USER                           = 'ENCOR_IMPERSONATE_USER';
  public static EXPORT_CSV                                       = 'EXPORT_CSV';
  public static EXPORT_PDF                                       = 'EXPORT_PDF';
  public static EXPORT_XLSX                                      = 'EXPORT_XLSX';
  public static FAILED_KYC_REGISTRATION_SEARCH                   = 'FAILED_KYC_REGISTRATION_SEARCH';
  public static GC_ACTIVATE_B2B_CARD                             = 'GC_ACTIVATE_B2B_CARD';
  public static GC_ACTIVATE_GIFT_CARD_REPLACEMENT                = 'GC_ACTIVATE_GIFT_CARD_REPLACEMENT';
  public static GC_ADJUST_BALANCE_UP_TO_100                      = 'GC_ADJUST_BALANCE_UP_TO_100';
  public static GC_ADJUST_BALANCE_UP_TO_500                      = 'GC_ADJUST_BALANCE_UP_TO_500';
  public static GC_ADJUST_BALANCE_WHEN_ACTIVE                    = 'GC_ADJUST_BALANCE_WHEN_ACTIVE';
  public static GC_ADJUST_BALANCE_WHEN_DEACTIVE                  = 'GC_ADJUST_BALANCE_WHEN_DEACTIVE';
  public static GC_ADJUST_BALANCE_WHEN_EXPIRED                   = 'GC_ADJUST_BALANCE_WHEN_EXPIRED';
  public static GC_ADJUST_BALANCE_WHEN_INITIAL                   = 'GC_ADJUST_BALANCE_WHEN_INITIAL';
  public static GC_CARD_TRANSFER                                 = 'GC_CARD_TRANSFER';
  public static GC_CARD_TRANSFER_STATUS_OVERRIDE                 = 'GC_CARD_TRANSFER_STATUS_OVERRIDE';
  public static GC_CHANGE_STATUS_FROM_RISK_INVESTIGATION         = 'GC_CHANGE_STATUS_FROM_RISK_INVESTIGATION';
  public static GC_CHANGE_STATUS_TO_RISK_INVESTIGATION           = 'GC_CHANGE_STATUS_TO_RISK_INVESTIGATION';
  public static GC_MERCHANDISE_RELEASE                           = 'GC_MERCHANDISE_RELEASE';
  public static GC_RAISE_DISPUTE                                 = 'GC_RAISE_DISPUTE';
  public static GC_RELEASE_PREAUTH                               = 'GC_RELEASE_PREAUTH';
  public static GC_REPLACE_CARD                                  = 'GC_REPLACE_CARD';
  public static GC_REPLACE_CARD_USE_NEW_CARD_NUMBER              = 'GC_REPLACE_CARD_USE_NEW_CARD_NUMBER';
  public static HOLD_ORDER                                       = 'HOLD_ORDER';
  public static REPLACE_REPLACEMENT_CARD                         = 'REPLACE_REPLACEMENT_CARD';
  public static HISTORY_FULL_VIEW                                = 'HISTORY_FULL_VIEW';
  public static JOB_QUEUE                                        = 'JOB_QUEUE';
  public static LIVE_TROUBLESHOOTING                             = 'LIVE_TROUBLESHOOTING';
  public static OVERRIDE_BILLABLE                                = 'OVERRIDE_BILLABLE';
  public static OVERRIDE_SHORT_PAY                               = 'OVERRIDE_SHORT_PAY';
  public static PERSONAL_INFO_REQUEST                            = 'PERSONAL_INFO_REQUEST';
  public static PRIVATE_COMMENTS                                 = 'PRIVATE_COMMENTS';
  public static RAISE_SESSION_TYPE_BAD_CREDIT                    = 'RAISE_SESSION_TYPE_BAD_CREDIT';
  public static RAISE_SESSION_TYPE_COMPLAINT                     = 'RAISE_SESSION_TYPE_COMPLAINT';
  public static RAISE_SESSION_TYPE_CONSUMED_CARD                 = 'RAISE_SESSION_TYPE_CONSUMED_CARD';
  public static RAISE_SESSION_TYPE_DISPUTE                       = 'RAISE_SESSION_TYPE_DISPUTE';
  public static RAISE_SESSION_TYPE_ECOMM_FRAUD                   = 'RAISE_SESSION_TYPE_ECOMM_FRAUD';
  public static RAISE_SESSION_TYPE_REWARDS                       = 'RAISE_SESSION_TYPE_REWARDS';
  public static RAISE_SESSION_TYPE_REWARDS_TRAINING              = 'RAISE_SESSION_TYPE_REWARDS_TRAINING';
  public static RAISE_SESSION_TYPE_LAW_ENFORCEMENT               = 'RAISE_SESSION_TYPE_LAW_ENFORCEMENT';
  public static RAISE_SESSION_TYPE_DAMAGED_PINS                  = 'RAISE_SESSION_TYPE_DAMAGED_PINS';
  public static RAISE_SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE       = 'RAISE_SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE';
  public static RAISE_SESSION_TYPE_MERCHANT_FRAUD                = 'RAISE_SESSION_TYPE_MERCHANT_FRAUD';
  public static RAISE_SESSION_TYPE_OTHER_FRAUD                   = 'RAISE_SESSION_TYPE_OTHER_FRAUD';
  public static REMOVE_SELECTION                                 = 'REMOVE_SELECTION';
  public static REQUEST_HOLD_ORDER                               = 'REQUEST_HOLD_ORDER';
  public static RESEND_DELIVERY                                  = 'RESEND_DELIVERY';
  public static RESEND_DISPUTE_DOCUMENTS                         = 'RESEND_DISPUTE_DOCUMENTS';
  public static RESEND_ORDER_NOTIFICATION                        = 'RESEND_ORDER_NOTIFICATION';
  public static SEARCH_AMEX_GIFT                                 = 'SEARCH_AMEX_GIFT';
  public static SEARCH_BOOST                                     = 'SEARCH_BOOST';
  public static SEARCH_BY_ALDER_CARD                             = 'SEARCH_BY_ALDER_CARD';
  public static SEARCH_BY_ALDER_ORDER                            = 'SEARCH_BY_ALDER_ORDER';
  public static SEARCH_BY_AMEX_BOL                               = 'SEARCH_BY_AMEX_BOL';
  public static SEARCH_BY_DDP                                    = 'SEARCH_BY_DDP';
  public static SEARCH_BY_ECOMM_ORDER                            = 'SEARCH_BY_ECOMM_ORDER';
  public static SEARCH_BY_FINANCIAL_GIFT                         = 'SEARCH_BY_FINANCIAL_GIFT';
  public static SEARCH_BY_GPR                                    = 'SEARCH_BY_GPR';
  public static SEARCH_BY_INCOMM                                 = 'SEARCH_BY_INCOMM';
  public static SEARCH_BY_LOCATION                               = 'SEARCH_BY_LOCATION';
  public static SEARCH_BY_MASTERCARD_BOL                         = 'SEARCH_BY_MASTERCARD_BOL';
  public static SEARCH_BY_PAYPAL                                 = 'SEARCH_BY_PAYPAL';
  public static SEARCH_BY_PROMOTIONS                             = 'SEARCH_BY_PROMOTIONS';
  public static SEARCH_BY_VANILLA_BOL                            = 'SEARCH_BY_VANILLA_BOL';
  public static SEARCH_BY_VANILLA_DIRECT                         = 'SEARCH_BY_VANILLA_DIRECT';
  public static SEARCH_BY_VMS_GIFT                               = 'SEARCH_BY_VMS_GIFT';
  public static SEARCH_BY_VRN                                    = 'SEARCH_BY_VRN';
  public static SEARCH_BY_WALMART_BOL                            = 'SEARCH_BY_WALMART_BOL';
  public static SEARCH_CCL                                       = 'SEARCH_CCL';
  public static SEARCH_GOOGLE                                    = 'SEARCH_GOOGLE';
  public static SEARCH_JIRA                                      = 'SEARCH_JIRA';
  public static SEARCH_MICROSOFT                                 = 'SEARCH_MICROSOFT';
  public static SEARCH_NET10                                     = 'SEARCH_NET10';
  public static SEARCH_SERVE                                     = 'SEARCH_SERVE';
  public static SEARCH_SESSIONS_ALL                              = 'SEARCH_SESSIONS_ALL';
  public static SEARCH_SESSIONS_CALL_CENTER                      = 'SEARCH_SESSIONS_CALL_CENTER';
  public static SEARCH_SESSIONS_CASE                             = 'SEARCH_SESSIONS_CASE';
  public static SEARCH_SESSIONS_GENERAL                          = 'SEARCH_SESSIONS_GENERAL';
  public static SEARCH_TRACFONE                                  = 'SEARCH_TRACFONE';
  public static SEARCH_VIRGIN                                    = 'SEARCH_VIRGIN';
  public static SERVE_ACTIVATE_CARD                              = 'SERVE_ACTIVATE_CARD';
  public static SERVE_ADJUST_BALANCE                             = 'SERVE_ADJUST_BALANCE';
  public static SERVE_ADJUST_BALANCE_TO_NEGATIVE                 = 'SERVE_ADJUST_BALANCE_TO_NEGATIVE';
  public static SERVE_ADJUST_TRANSACTION                         = 'SERVE_ADJUST_TRANSACTION';
  public static SERVE_CANCEL_PREAUTH_TRANSACTION                 = 'SERVE_CANCEL_PREAUTH_TRANSACTION';
  public static SERVE_CANCEL_TRANSACTION                         = 'SERVE_CANCEL_TRANSACTION';
  public static SERVE_CHANGE_ACCOUNT_STATUS                      = 'SERVE_CHANGE_ACCOUNT_STATUS';
  public static SERVE_DOCUMENT_ADVANCED_FUNCTIONS                = 'SERVE_DOCUMENT_ADVANCED_FUNCTIONS';
  public static SERVE_LOCK_CARD                                  = 'SERVE_LOCK_CARD';
  public static SERVE_RAISE_DISPUTE                              = 'SERVE_RAISE_DISPUTE';
  public static SERVE_REFUND                                     = 'SERVE_REFUND';
  public static SERVE_REPLACE_CARD                               = 'SERVE_REPLACE_CARD';
  public static SERVE_TRANSFER_FUNDS                             = 'SERVE_TRANSFER_FUNDS';
  public static SERVE_TRANSFER_FUNDS_SUB_ACCOUNTS                = 'SERVE_TRANSFER_FUNDS_SUB_ACCOUNTS';
  public static SERVE_TRANSFER_FUNDS_ASSOCIATED_ACCOUNTS         = 'SERVE_TRANSFER_FUNDS_ASSOCIATED_ACCOUNTS';
  public static SERVE_TRANSFER_FUNDS_OTHER_ACCOUNTS              = 'SERVE_TRANSFER_FUNDS_OTHER_ACCOUNTS';
  public static SERVE_SEND_FORM                                  = 'SERVE_SEND_FORM';
  public static SERVE_STATUS_CODE_EDIT                           = 'SERVE_STATUS_CODE_EDIT';
  public static SERVE_VIEW_BILL_PAY_DDA                          = 'SERVE_VIEW_BILL_PAY_DDA';
  public static SERVE_VIEW_RESTRICTED_DOCS                       = 'SERVE_VIEW_RESTRICTED_DOCS';
  public static SERVE_WAIVE_FEE_FOR_REPLACE_CARD                 = 'SERVE_WAIVE_FEE_FOR_REPLACE_CARD';
  public static SESSION_TYPE_GENERAL                             = 'SESSION_TYPE_GENERAL';
  public static SESSION_TYPE_CALL                                = 'SESSION_TYPE_CALL';
  public static SESSION_TYPE_BAD_CREDIT                          = 'SESSION_TYPE_BAD_CREDIT';
  public static SESSION_TYPE_CONSUMED_CARD                       = 'SESSION_TYPE_CONSUMED_CARD';
  public static SESSION_TYPE_DISPUTE                             = 'SESSION_TYPE_DISPUTE';
  public static SESSION_TYPE_ECOMM_FRAUD                         = 'SESSION_TYPE_ECOMM_FRAUD';
  public static SESSION_TYPE_LAW_ENFORCEMENT                     = 'SESSION_TYPE_LAW_ENFORCEMENT';
  public static SESSION_TYPE_DAMAGED_PINS                        = 'SESSION_TYPE_DAMAGED_PINS';
  public static SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE             = 'SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE';
  public static SESSION_TYPE_COMPLAINT                           = 'SESSION_TYPE_COMPLAINT';
  public static SESSION_TYPE_MERCHANT_FRAUD                      = 'SESSION_TYPE_MERCHANT_FRAUD';
  public static SESSION_TYPE_OTHER_FRAUD                         = 'SESSION_TYPE_OTHER_FRAUD';
  public static SHOW_FILE_PASSWORD                               = 'SHOW_FILE_PASSWORD';
  public static SPLUNK_LINK                                      = 'SPLUNK_LINK';
  public static TRANSACTION_FILTER_REPORTED_FRAUD                = 'TRANSACTION_FILTER_REPORTED_FRAUD';
  public static UNHOLD_ORDER                                     = 'UNHOLD_ORDER';
  public static UNMASK_PAN                                       = 'UNMASK_PAN';
  public static UNMASK_PIN                                       = 'UNMASK_PIN';
  public static VIEW_ALL_JOBS                                    = 'VIEW_ALL_JOBS';
  public static VIEW_CASE_WORKSPACE                              = 'VIEW_CASE_WORKSPACE';
  public static VIEW_DOCUMENT                                    = 'VIEW_DOCUMENT';
  public static VIEW_SENSITIVE_ORDER_INFORMATION                 = 'VIEW_SENSITIVE_ORDER_INFORMATION';
  public static VIEW_UNMASKED_LOCATION_HISTORY                   = 'VIEW_UNMASKED_LOCATION_HISTORY';
  public static VMS_RESET_PIN                                    = 'VMS_RESET_PIN';
  public static VMS_ACTIVATE_CARD                                = 'VMS_ACTIVATE_CARD';
  public static VMS_ADJUST_BALANCE                               = 'VMS_ADJUST_BALANCE';
  public static VMS_ADJUST_BALANCE_TO_NEGATIVE                   = 'VMS_ADJUST_BALANCE_TO_NEGATIVE';
  public static VMS_C2C_TRANSFER_APPROVE                         = 'VMS_C2C_TRANSFER_APPROVE';
  public static VMS_C2C_TRANSFER_REQUEST                         = 'VMS_C2C_TRANSFER_REQUEST';
  public static VMS_CHANGE_STATUS_WITH_EFFECTIVE_DATE            = 'VMS_CHANGE_STATUS_WITH_EFFECTIVE_DATE';
  public static VMS_RELEASE_PRE_AUTH                             = 'VMS_RELEASE_PRE_AUTH';
  public static VMS_EXPORT_CSV                                   = 'VMS_EXPORT_CSV';
  public static VMS_MOBILE_WALLET_FRAUD_CHECK_OVERRIDE           = 'VMS_MOBILE_WALLET_FRAUD_CHECK_OVERRIDE';
  public static VMS_ORDER_NEW_CARD                               = 'VMS_ORDER_NEW_CARD';
  public static VMS_CHANGE_FEE_PLAN                              = 'VMS_CHANGE_FEE_PLAN';
  public static VMS_CHANGE_STATUS_FROM_RISK_INVESTIGATION        = 'VMS_CHANGE_STATUS_FROM_RISK_INVESTIGATION';
  public static VMS_CHANGE_STATUS_TO_RISK_INVESTIGATION          = 'VMS_CHANGE_STATUS_TO_RISK_INVESTIGATION';
  public static VMS_DISABLE_ONE_TIME_FRAUD_OVERRIDE              = 'VMS_DISABLE_ONE_TIME_FRAUD_OVERRIDE';
  public static VMS_DISABLE_PERMANENT_FRAUD_OVERRIDE             = 'VMS_DISABLE_PERMANENT_FRAUD_OVERRIDE';
  public static VMS_ENABLE_ONE_TIME_FRAUD_OVERRIDE               = 'VMS_ENABLE_ONE_TIME_FRAUD_OVERRIDE';
  public static VMS_ENABLE_PERMANENT_FRAUD_OVERRIDE              = 'VMS_ENABLE_PERMANENT_FRAUD_OVERRIDE';
  public static VMS_REPLACE_CARD                                 = 'VMS_REPLACE_CARD';
  public static VMS_RESET_ONLINE_PASSWORD                        = 'VMS_RESET_ONLINE_PASSWORD';
  public static VMS_SEARCH_BY_DRIVERS_LICENSE_NUMBER             = 'VMS_SEARCH_BY_DRIVERS_LICENSE_NUMBER';
  public static VMS_SEARCH_BY_PASSPORT                           = 'VMS_SEARCH_BY_PASSPORT';
  public static VMS_SEARCH_BY_SOCIAL_INSURANCE_NUMBER            = 'VMS_SEARCH_BY_SOCIAL_INSURANCE_NUMBER';
  public static VMS_SEARCH_BY_SOCIAL_SECURITY_NUMBER             = 'VMS_SEARCH_BY_SOCIAL_SECURITY_NUMBER';
  public static VMS_SEND_FORM                                    = 'VMS_SEND_FORM';
  public static VMS_SEND_ACCOUNT_STATEMENT                       = 'VMS_SEND_ACCOUNT_STATEMENT';
  public static VMS_REGISTER_CARD_POSTAL_CODE_ONLY               = 'VMS_REGISTER_CARD_POSTAL_CODE_ONLY';
  public static VMS_REGISTER_CARD_PERSONALIZED                   = 'VMS_REGISTER_CARD_PERSONALIZED';
  public static VMS_MANAGE_PRODUCT_TYPES                         = 'VMS_MANAGE_PRODUCT_TYPES';
  public static VMS_RAISE_DISPUTE                                = 'VMS_RAISE_DISPUTE';
  public static VMS_REVERSE_FEE                                  = 'VMS_REVERSE_FEE';
  public static VMS_EDIT_ACCOUNT_HOLDER_RESTRICTED_FIELDS        = 'VMS_EDIT_ACCOUNT_HOLDER_RESTRICTED_FIELDS';
  public static VMS_EDIT_CARD_HOLDER                             = 'VMS_EDIT_CARD_HOLDER';
  public static VMS_ENABLE_PROVISION_MOBILE_WALLET               = 'VMS_ENABLE_PROVISION_MOBILE_WALLET';
  public static VMS_UPDATE_DEVICE_STATUS                         = 'VMS_UPDATE_DEVICE_STATUS';
  public static VMS_UPGRADE_FROM_STARTER_CARD                    = 'VMS_UPGRADE_FROM_STARTER_CARD';
  public static VMS_REPORT_TRANSACTION_AS_FRAUD                  = 'VMS_REPORT_TRANSACTION_AS_FRAUD';
  public static VMS_VIEW_ACCOUNT_HOLDER_DOCUMENTS                = 'VMS_VIEW_ACCOUNT_HOLDER_DOCUMENTS';
  public static VMS_VIEW_DISPUTE                                 = 'VMS_VIEW_DISPUTE';
  public static VMS_WAIVE_FEE_FOR_UPGRADE_FROM_STARTER_CARD      = 'VMS_WAIVE_FEE_FOR_UPGRADE_FROM_STARTER_CARD';


}
