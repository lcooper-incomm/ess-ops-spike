INSERT INTO codex (name, description) VALUES
    ( 'GREENCARD_CHANGE_STATUS',
      'Defines all the business rules for when a Greencard Change Status action can be performed and what options are available to the user' );

DECLARE @codexId BIGINT;
SET @codexId = (
    SELECT id
    FROM codex
    WHERE name = 'GREENCARD_CHANGE_STATUS' );

EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ACTIVE', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ACTIVE', 'STOLEN';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ACTIVE', 'LOST';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ACTIVE', 'FRAUD_WATCH';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'BAD_CREDIT', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'BAD_CREDIT', 'FRAUD_WATCH';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'BAD_CREDIT', 'LOST';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'BAD_CREDIT', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'BAD_CREDIT', 'STOLEN';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'DEACTIVE', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'DEACTIVE', 'FRAUD_WATCH';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'DEACTIVE', 'LOST';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'DEACTIVE', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'DEACTIVE', 'STOLEN';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'FRAUD_WATCH', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'FRAUD_WATCH', 'LOST';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'FRAUD_WATCH', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'FRAUD_WATCH', 'STOLEN';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'INITIAL', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'INITIAL', 'FRAUD_WATCH';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'INITIAL', 'LOST';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'INITIAL', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'INITIAL', 'STOLEN';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'LOST', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'LOST', 'FRAUD_WATCH';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'LOST', 'ON_HOLD';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'LOST', 'STOLEN';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ON_HOLD', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ON_HOLD', 'FRAUD_WATCH';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ON_HOLD', 'LOST';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ON_HOLD', 'STOLEN';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'STOLEN', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'STOLEN', 'FRAUD_WATCH';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'STOLEN', 'LOST';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'STOLEN', 'ON_HOLD';
