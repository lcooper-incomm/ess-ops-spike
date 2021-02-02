UPDATE permission
SET display_name = 'Work Session Type - Call'
WHERE system_name = 'SESSION_TYPE_CALL';

UPDATE permission
SET display_name = 'Work Session Type - Bad Credit'
WHERE system_name = 'SESSION_TYPE_BAD_CREDIT';

UPDATE permission
SET display_name = 'Work Session Type - Consumed Card'
WHERE system_name = 'SESSION_TYPE_CONSUMED_CARD';

UPDATE permission
SET display_name = 'Work Session Type - Dispute'
WHERE system_name = 'SESSION_TYPE_DISPUTE';

UPDATE permission
SET display_name = 'Work Session Type - E-Comm Fraud'
WHERE system_name = 'SESSION_TYPE_ECOMM_FRAUD';

UPDATE permission
SET display_name = 'Work Session Type - Law Enforcement'
WHERE system_name = 'SESSION_TYPE_LAW_ENFORCEMENT';

UPDATE permission
SET display_name = 'Work Session Type - Damaged Pins'
WHERE system_name = 'SESSION_TYPE_DAMAGED_PINS';

UPDATE permission
SET display_name = 'Work Session Type - PayPal Redemption Issue'
WHERE system_name = 'SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE';

UPDATE permission
SET display_name = 'Work Session Type - Merchant Fraud'
WHERE system_name = 'SESSION_TYPE_MERCHANT_FRAUD';

UPDATE permission
SET display_name = 'Work Session Type - Other Fraud'
WHERE system_name = 'SESSION_TYPE_OTHER_FRAUD';

EXECUTE add_permission 'RAISE_SESSION_TYPE_BAD_CREDIT', 'Raise Session Type - Bad Credit',
        'Ability to create a Bad Credit Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_CONSUMED_CARD', 'Raise Session Type - Consumed Card',
        'Ability to create a Consumed Card Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_DISPUTE', 'Raise Session Type - Dispute',
        'Ability to create a Dispute Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_ECOMM_FRAUD', 'Raise Session Type - E-Comm Fraud',
        'Ability to create a E-Comm Fraud Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_LAW_ENFORCEMENT', 'Raise Session Type - Law Enforcement',
        'Ability to create a Law Enforcement Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_DAMAGED_PINS', 'Raise Session Type - Damaged Pins',
        'Ability to create a Damaged Pins Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE', 'Raise Session Type - PayPal Redemption Issue',
        'Ability to create a PayPal Redemption Issue Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_MERCHANT_FRAUD', 'Raise Session Type - Merchant Fraud',
        'Ability to create a Merchant Fraud Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_OTHER_FRAUD', 'Raise Session Type - Other Fraud',
        'Ability to create a Other Fraud Session';