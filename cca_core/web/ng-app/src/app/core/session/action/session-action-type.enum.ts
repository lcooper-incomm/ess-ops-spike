export enum SessionActionType {
  ADD_ALERT                                         = 'ADD_ALERT',
  ADD_COMMENT                                       = 'ADD_COMMENT',
  ADD_PENDING_COMMENT                               = 'ADD_PENDING_COMMENT',
  ADD_RECEIPT_CARD                                  = 'ADD_RECEIPT_CARD',
  ADD_SELECTION                                     = 'ADD_SELECTION',
  ADD_SESSION_DOCUMENT                              = 'ADD_SESSION_DOCUMENT',
  ADD_SESSION_TO_WORKSPACE                          = 'ADD_SESSION_TO_WORKSPACE',
  APPEND_SELECTION_COMMENTS                         = 'APPEND_SELECTION_COMMENTS',
  APPEND_SELECTION_COMMENT                          = 'APPEND_SELECTION_COMMENT',
  APPEND_SESSION_HISTORY                            = 'APPEND_SESSION_HISTORY',
  AUTO_WRAP_CALL_REMOTE                             = 'AUTO_WRAP_CALL_REMOTE',
  CLEAR_SELECTION_COMMENTS                          = 'CLEAR_SELECTION_COMMENTS',
  CLEAR_STATE                                       = 'CLEAR',
  CLOSE_SESSION                                     = 'CLOSE_SESSION',
  COLLAPSE_SESSION_PANEL                            = 'COLLAPSE_SESSION_PANEL',
  DISCONNECT_CALL                                   = 'DISCONNECT_CALL',
  DISMISS_SESSION                                   = 'DISMISS_SESSION',
  EDIT_RECEIPT_CARD                                 = 'EDIT_RECEIPT_CARD',
  EDIT_SESSION_DOCUMENT                             = 'EDIT_SESSION_DOCUMENT',
  LOAD_SESSION                                      = 'LOAD_SESSION',
  LOAD_SELECTION                                    = 'LOAD_SELECTION',
  OPEN_SESSION_PANEL                                = 'OPEN_SESSION_PANEL',
  REMOVE_RECEIPT_CARD                               = 'REMOVE_RECEIPT_CARD',
  REMOVE_SELECTION                                  = 'REMOVE_SELECTION',
  REMOVE_SESSION_DOCUMENT                           = 'REMOVE_SESSION_DOCUMENT',
  REMOVE_SESSION_FROM_WORKSPACE                     = 'REMOVE_SESSION_FROM_WORKSPACE',
  SET_CUSTOMER_IS_CANADIAN                          = 'SET_CUSTOMER_IS_CANADIAN',
  SET_SELECTION_ACCOUNT_CARD_HISTORY                = 'SET_SELECTION_ACCOUNT_CARD_HISTORY',
  SET_SELECTION_ACCOUNT_DOCUMENTS                   = 'SET_SELECTION_ACCOUNT_DOCUMENTS',
  SET_SELECTION_ACCOUNT_NOTIFICATIONS               = 'SET_SELECTION_ACCOUNT_NOTIFICATIONS',
  SET_SELECTION_ACCOUNT_BLOCKED_MERCHANTS           = 'SET_SELECTION_ACCOUNT_BLOCKED_MERCHANTS',
  SET_SELECTION_ACCOUNT_FEATURES                    = 'SET_SELECTION_ACCOUNT_FEATURES',
  SET_SELECTION_ACCOUNT_STATUS_CODES_ACCOUNT        = 'SET_SELECTION_ACCOUNT_STATUS_CODES_ACCOUNT',
  SET_SELECTION_ACCOUNT_STATUS_CODES_ADDRESS        = 'SET_SELECTION_ACCOUNT_STATUS_CODES_ADDRESS',
  SET_SELECTION_ACCOUNT_STATUS_CODES_FUNDING_SOURCE = 'SET_SELECTION_ACCOUNT_STATUS_CODES_FUNDING_SOURCE',
  SET_SELECTION_COMMENT_DATE_RANGE                  = 'SET_SELECTION_COMMENT_DATE_RANGE',
  SET_SELECTION_COMMENTS                            = 'SET_SELECTION_COMMENTS',
  SET_SELECTION_CUSTOMER_ALERTS                     = 'SET_SELECTION_CUSTOMER_ALERTS',
  SET_SELECTION_CUSTOMER_LIMITS                     = 'SET_SELECTION_CUSTOMER_LIMITS',
  SET_SELECTION_DATA                                = 'SET_SELECTION_DATA',
  SET_SELECTION_DESCRIPTION                         = 'SET_SELECTION_DESCRIPTION',
  SET_SELECTION_FAILED                              = 'SET_SELECTION_FAILED',
  SET_SELECTION_FEE_PLANS                           = 'SET_SELECTION_FEE_PLANS',
  SET_SELECTION_HIERARCHY                           = 'SET_SELECTION_HIERARCHY',
  SET_SELECTION_LAST_REPLACEMENT_ACTIVITY           = 'SET_SELECTION_LAST_REPLACEMENT_ACTIVITY',
  SET_SELECTION_MAPLES_CUSTOMER_ORDERS              = 'SET_SELECTION_MAPLES_CUSTOMER_ORDERS',
  SET_SELECTION_MAPLES_TRANSACTIONS                 = 'SET_SELECTION_MAPLES_TRANSACTIONS',
  SET_SELECTION_MAPLES_TRANSACTION_DETAIL           = 'SET_SELECTION_MAPLES_TRANSACTION_DETAIL',
  SET_SELECTION_ORDER_CANCELLATION_TASKS            = 'SET_SELECTION_ORDER_CANCELLATION_TASKS',
  SET_SELECTION_ORDER_TRANSACTIONS                  = 'SET_SELECTION_ORDER_TRANSACTIONS',
  SET_SELECTION_ORDER_RELATED_JOBS                  = 'SET_SELECTION_ORDER_RELATED_JOBS',
  SET_SELECTION_PURCHASE_LOCATION                   = 'SET_SELECTION_PURCHASE_LOCATION',
  SET_SELECTION_PURCHASE_ORDER                      = 'SET_SELECTION_PURCHASE_ORDER',
  SET_SELECTION_RELATED_CASES                       = 'SET_SELECTION_RELATED_CASES',
  SET_SELECTION_SELECTED_CARD                       = 'SET_SELECTION_SELECTED_CARD',
  SET_SELECTION_SELECTED_CUSTOMER_ACCOUNT_CARD      = 'SET_SELECTION_SELECTED_CUSTOMER_ACCOUNT_CARD',
  SET_SELECTION_SELECTED_TAB                        = 'SET_SELECTION_SELECTED_TAB',
  SET_SELECTION_SHIPMENTS                           = 'SET_SELECTION_SHIPMENTS',
  SET_SELECTION_TERMINALS                           = 'SET_SELECTION_TERMINALS',
  SET_SELECTION_TRANSACTION_SEARCH_REQUEST          = 'SET_SELECTION_TRANSACTION_SEARCH_REQUEST',
  SET_SELECTION_TRANSACTIONS                        = 'SET_SELECTION_TRANSACTIONS',
  SET_SESSION_HISTORY                               = 'SET_SESSION_HISTORY',
  START_SAVE                                        = 'START_SAVE',
  STOP_SAVE                                         = 'STOP_SAVE',
  UPDATE_CALL_COMPONENT                             = 'UPDATE_CALL_COMPONENT',
  UPDATE_CARDS_COMPONENT                            = 'UPDATE_CARDS_COMPONENT',
  UPDATE_COMPLAINT_COMPONENT                        = 'UPDATE_COMPLAINT_COMPONENT',
  UPDATE_CUSTOMER_COMPONENT                         = 'UPDATE_CUSTOMER_COMPONENT',
  UPDATE_ENCOR_COMPONENT                            = 'UPDATE_ENCOR_COMPONENT',
  UPDATE_LAW_ENFORCEMENT_COMPONENT                  = 'UPDATE_LAW_ENFORCEMENT_COMPONENT',
  UPDATE_MERCHANT_COMPONENT                         = 'UPDATE_MERCHANT_COMPONENT',
  UPDATE_PRIVACY_REQUEST_COMPONENT                  = 'UPDATE_PRIVACY_REQUEST_COMPONENT',
  UPDATE_RECEIPT_COMPONENT                          = 'UPDATE_RECEIPT_COMPONENT',
  UPDATE_REFUND_REQUEST_COMPONENT                   = 'UPDATE_REFUND_REQUEST_COMPONENT',
  UPDATE_SELECTION_TRANSACTION                      = 'UPDATE_SELECTION_TRANSACTION',
  UPDATE_SESSION                                    = 'UPDATE_SESSION',
  UPDATE_SESSION_IN_WORKSPACE                       = 'UPDATE_SESSION_IN_WORKSPACE',
  UPDATE_SESSION_STATUS                             = 'UPDATE_SESSION_STATUS',
  WORKSPACE_APPEND                                  = 'WORKSPACE_APPEND',
  WORKSPACE_REFRESH                                 = 'WORKSPACE_REFRESH'

}