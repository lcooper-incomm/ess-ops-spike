INSERT INTO codex (name, description) VALUES
    ( 'VMS_GIFT_CHANGE_STATUS',
      'Defines all the business rules for when a VMS Gift Change Status action can be performed and what options are available to the user' );

DECLARE @codexId BIGINT;
SET @codexId = (
    SELECT id
    FROM codex
    WHERE name = 'VMS_GIFT_CHANGE_STATUS' );

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'INACTIVE', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'INACTIVE', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'INACTIVE', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'INACTIVE', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'INACTIVE', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'INACTIVE', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'INACTIVE', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'LOST_STOLEN', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'LOST_STOLEN', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'LOST_STOLEN', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'LOST_STOLEN', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'LOST_STOLEN', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'LOST_STOLEN', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'LOST_STOLEN', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'DAMAGE', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'DAMAGE', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'DAMAGE', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'DAMAGE', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'DAMAGE', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'DAMAGE', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'DAMAGE', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CLOSED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CLOSED', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CLOSED', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CLOSED', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CLOSED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CLOSED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CLOSED', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'BAD_CREDIT', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'BAD_CREDIT', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'BAD_CREDIT', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'BAD_CREDIT', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'BAD_CREDIT', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'BAD_CREDIT', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'BAD_CREDIT', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'FRAUD_HOLD', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'FRAUD_HOLD', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'FRAUD_HOLD', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'FRAUD_HOLD', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'FRAUD_HOLD', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'FRAUD_HOLD', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'FRAUD_HOLD', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CONSUMED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CONSUMED', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CONSUMED', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CONSUMED', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CONSUMED', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CONSUMED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_GIFT_CHANGE_STATUS', 'CONSUMED', 'FRAUD_HOLD';
