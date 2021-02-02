CREATE PROCEDURE add_default_change_status_rule
        @platform   VARCHAR(64),
        @codexName  VARCHAR(64),
        @whenStatus VARCHAR(64),
        @thenStatus VARCHAR(64)

AS

    BEGIN

        DECLARE @fromPermissionName VARCHAR(64);
        SET @fromPermissionName = CONCAT (
            @platform,
            '_CHANGE_STATUS_FROM_',
            @whenStatus
        );

        DECLARE @toPermissionName VARCHAR(64);
        SET @toPermissionName = CONCAT (
            @platform,
            '_CHANGE_STATUS_TO_',
            @thenStatus
        );

        DECLARE @ruleDescription VARCHAR(512);
        SET @ruleDescription = CONCAT (
            'WHEN current status is ',
            @whenStatus,
            ' AND user has permission to change FROM ',
            @whenStatus,
            ' AND user has permission to change TO ',
            @thenStatus,
            ' THEN allow ',
            @thenStatus
        );

        DECLARE @codexId BIGINT;
        SET @codexId = (
            SELECT id
            FROM codex
            WHERE name = @codexName );

        INSERT INTO codex_rule (codex_id, description, rule_flow, rule_order) VALUES
            ( @codexId, @ruleDescription, 'CONTINUE', 0 );

        DECLARE @ruleId BIGINT;
        SET @ruleId = @@IDENTITY;

        INSERT INTO codex_when (codex_rule_id, when_type, when_value, negate) VALUES
            ( @ruleId, 'CURRENT_STATUS_EQUALS', @whenStatus, 0 ),
            ( @ruleId, 'USER_HAS_PERMISSION', @fromPermissionName, 0 ),
            ( @ruleId, 'USER_HAS_PERMISSION', @toPermissionName, 0 );

        INSERT INTO codex_then (codex_rule_id, then_type, then_value) VALUES
            ( @ruleId, 'ALLOW_STATUS', @thenStatus );
    END

GO