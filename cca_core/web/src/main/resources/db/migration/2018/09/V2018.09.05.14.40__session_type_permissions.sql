UPDATE permission
SET
display_name = 'Session Class - Call (Deprecated)'
WHERE system_name = 'SESSION_TYPE_CALL_CENTER';

UPDATE permission
SET
display_name = 'Session Class - Case (Deprecated)'
WHERE system_name = 'SESSION_TYPE_CASE';

EXECUTE add_permission 'SESSION_TYPE_CALL', 'Session Type - Call', 'Ability to create a Call Session';
EXECUTE add_permission 'SESSION_TYPE_BAD_CREDIT', 'Session Type - Bad Credit', 'Ability to create a Bad Credit Session';
EXECUTE add_permission 'SESSION_TYPE_CONSUMED_CARD', 'Session Type - Consumed Card', 'Ability to create a Consumed Card Session';
EXECUTE add_permission 'SESSION_TYPE_DISPUTE', 'Session Type - Dispute', 'Ability to create a Dispute Session';
EXECUTE add_permission 'SESSION_TYPE_ECOMM_FRAUD', 'Session Type - E-Comm Fraud', 'Ability to create a E-Comm Fraud Session';
EXECUTE add_permission 'SESSION_TYPE_LAW_ENFORCEMENT', 'Session Type - Law Enforcement', 'Ability to create a Law Enforcement Session';
EXECUTE add_permission 'SESSION_TYPE_DAMAGED_PINS', 'Session Type - Damaged Pins', 'Ability to create a Damaged Pins Session';
EXECUTE add_permission 'SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE', 'Session Type - PayPal Redemption Issue', 'Ability to create a PayPal Redemption Issue Session';
EXECUTE add_permission 'SESSION_TYPE_MERCHANT_FRAUD', 'Session Type - Merchant Fraud', 'Ability to create a Merchant Fraud Session';
EXECUTE add_permission 'SESSION_TYPE_OTHER_FRAUD', 'Session Type - Other Fraud', 'Ability to create a Other Fraud Session';