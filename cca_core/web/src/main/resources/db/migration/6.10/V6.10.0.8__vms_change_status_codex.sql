INSERT INTO codex (name, description) VALUES
    ( 'VMS_CHANGE_STATUS',
      'Defines all the business rules for when a VMS Change Status action can be performed and what options are available to the user' );

DECLARE @codexId BIGINT;
SET @codexId = (
    SELECT id
    FROM codex
    WHERE name = 'VMS_CHANGE_STATUS' );

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'RESTRICTED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'MONITORED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'HOT_CARDED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'SPEND_DOWN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'RETURNED_MAIL';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'INACTIVE', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'RESTRICTED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'HOT_CARDED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'SPEND_DOWN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'RETURNED_MAIL';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ACTIVE_UNREGISTERED', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'SPEND_DOWN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'LOST_STOLEN', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'DAMAGE', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'DAMAGE', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'DAMAGE', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'DAMAGE', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'DAMAGE', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'DAMAGE', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'DAMAGE', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'RESTRICTED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'HOT_CARDED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'SPEND_DOWN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'ON_HOLD', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'HOT_CARDED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'SPEND_DOWN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'RESTRICTED', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'MONITORED', 'SPEND_DOWN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'MONITORED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'MONITORED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'MONITORED', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'MONITORED', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'PASSIVE', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'PASSIVE', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'PASSIVE', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'PASSIVE', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'PASSIVE', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'PASSIVE', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'HOT_CARDED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'HOT_CARDED', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'HOT_CARDED', 'SPEND_DOWN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'HOT_CARDED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'HOT_CARDED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'HOT_CARDED', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'HOT_CARDED', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'RESTRICTED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'BAD_CREDIT', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'RESTRICTED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'OFAC_FAILED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'FRAUD_HOLD', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'RESTRICTED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'OFAC_FAILED', 'CONSUMED';

EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'INACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'LOST_STOLEN';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'DAMAGE';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'CLOSED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'RESTRICTED';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'BAD_CREDIT';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'FRAUD_HOLD';
EXECUTE add_default_change_status_rule 'VMS', 'VMS_CHANGE_STATUS', 'CONSUMED', 'OFAC_FAILED';