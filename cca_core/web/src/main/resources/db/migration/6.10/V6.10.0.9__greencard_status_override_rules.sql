CREATE PROCEDURE add_greencard_override_rule
        @whenStatus VARCHAR(64),
        @thenStatus VARCHAR(64)

AS

    BEGIN

        DECLARE @permissionName VARCHAR(64);
        SET @permissionName = 'CARD_STATUS_CHANGE_OVERRIDE';

        DECLARE @ruleDescription VARCHAR(512);
        SET @ruleDescription = CONCAT (
            'WHEN current status is ',
            @whenStatus,
            ' AND user has override permission THEN allow ',
            @thenStatus
        );

        DECLARE @codexId BIGINT;
        SET @codexId = (
            SELECT id
            FROM codex
            WHERE name = 'GREENCARD_CHANGE_STATUS' );

        INSERT INTO codex_rule (codex_id, description, rule_flow, rule_order) VALUES
            ( @codexId, @ruleDescription, 'CONTINUE', 1 );

        DECLARE @ruleId BIGINT;
        SET @ruleId = @@IDENTITY;

        INSERT INTO codex_when (codex_rule_id, when_type, when_value, negate) VALUES
            ( @ruleId, 'CURRENT_STATUS_EQUALS', @whenStatus, 0 ),
            ( @ruleId, 'USER_HAS_PERMISSION', @permissionName, 0 );

        INSERT INTO codex_then (codex_rule_id, then_type, then_value) VALUES
            ( @ruleId, 'ALLOW_STATUS', @thenStatus );
    END

GO

EXECUTE add_greencard_override_rule 'ACTIVE', 'ON_HOLD';
EXECUTE add_greencard_override_rule 'ACTIVE', 'STOLEN';
EXECUTE add_greencard_override_rule 'ACTIVE', 'LOST';
EXECUTE add_greencard_override_rule 'ACTIVE', 'FRAUD_WATCH';
EXECUTE add_greencard_override_rule 'BAD_CREDIT', 'ACTIVE';
EXECUTE add_greencard_override_rule 'BAD_CREDIT', 'FRAUD_WATCH';
EXECUTE add_greencard_override_rule 'BAD_CREDIT', 'LOST';
EXECUTE add_greencard_override_rule 'BAD_CREDIT', 'ON_HOLD';
EXECUTE add_greencard_override_rule 'BAD_CREDIT', 'STOLEN';
EXECUTE add_greencard_override_rule 'DEACTIVE', 'ACTIVE';
EXECUTE add_greencard_override_rule 'DEACTIVE', 'FRAUD_WATCH';
EXECUTE add_greencard_override_rule 'DEACTIVE', 'LOST';
EXECUTE add_greencard_override_rule 'DEACTIVE', 'ON_HOLD';
EXECUTE add_greencard_override_rule 'DEACTIVE', 'STOLEN';
EXECUTE add_greencard_override_rule 'FRAUD_WATCH', 'ACTIVE';
EXECUTE add_greencard_override_rule 'FRAUD_WATCH', 'LOST';
EXECUTE add_greencard_override_rule 'FRAUD_WATCH', 'ON_HOLD';
EXECUTE add_greencard_override_rule 'FRAUD_WATCH', 'STOLEN';
EXECUTE add_greencard_override_rule 'INITIAL', 'ACTIVE';
EXECUTE add_greencard_override_rule 'INITIAL', 'FRAUD_WATCH';
EXECUTE add_greencard_override_rule 'INITIAL', 'LOST';
EXECUTE add_greencard_override_rule 'INITIAL', 'ON_HOLD';
EXECUTE add_greencard_override_rule 'INITIAL', 'STOLEN';
EXECUTE add_greencard_override_rule 'LOST', 'ACTIVE';
EXECUTE add_greencard_override_rule 'LOST', 'FRAUD_WATCH';
EXECUTE add_greencard_override_rule 'LOST', 'ON_HOLD';
EXECUTE add_greencard_override_rule 'LOST', 'STOLEN';
EXECUTE add_greencard_override_rule 'ON_HOLD', 'ACTIVE';
EXECUTE add_greencard_override_rule 'ON_HOLD', 'FRAUD_WATCH';
EXECUTE add_greencard_override_rule 'ON_HOLD', 'LOST';
EXECUTE add_greencard_override_rule 'ON_HOLD', 'STOLEN';
EXECUTE add_greencard_override_rule 'STOLEN', 'ACTIVE';
EXECUTE add_greencard_override_rule 'STOLEN', 'FRAUD_WATCH';
EXECUTE add_greencard_override_rule 'STOLEN', 'LOST';
EXECUTE add_greencard_override_rule 'STOLEN', 'ON_HOLD';

GO

DROP PROCEDURE add_greencard_override_rule;