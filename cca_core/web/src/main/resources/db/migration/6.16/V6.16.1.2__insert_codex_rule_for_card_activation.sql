DECLARE @codexId BIGINT = (
    SELECT id
    FROM codex
    WHERE name = 'VMS_CHANGE_STATUS' );

INSERT INTO codex_rule (codex_id, description, rule_flow, rule_order) VALUES
    ( @codexId, 'WHEN user has VMS Register Card permission THEN allow CARD_ACTIVATION', 'CONTINUE', 1 );

DECLARE @ruleId BIGINT = (
    SELECT SCOPE_IDENTITY ( ) );

INSERT INTO codex_when (codex_rule_id, when_type, when_value, negate) VALUES
    ( @ruleId, 'USER_HAS_PERMISSION', 'VMS_REGISTER_CARD_POSTAL_CODE_ONLY', 0 );

INSERT INTO codex_then (codex_rule_id, then_type, then_value) VALUES
    ( @ruleId, 'ALLOW_STATUS', 'CARD_ACTIVATION' );