DECLARE @ccaAdminId BIGINT;
SET @ccaAdminId = (
    SELECT id
    FROM cca_user
    WHERE username = 'cca_admin' );

INSERT INTO permission_category (system_name, display_name, description, locked, created_by, created_date, modified_by, modified_date)
VALUES
    ( 'REPORTS', 'Reports', 'Report Permissions', 1, @ccaAdminId, GETDATE ( ), @ccaAdminId, GETDATE ( ) );

ALTER TABLE report
    ADD permission_id BIGINT;

GO

DECLARE reportCursor CURSOR FOR
    SELECT name
    FROM report
    WHERE permission_id IS NULL
    ORDER BY name ASC;
DECLARE @reportName VARCHAR(64);

OPEN reportCursor;
FETCH NEXT FROM reportCursor
INTO @reportName;

WHILE @@FETCH_STATUS = 0
    BEGIN
        DECLARE @permissionSystemName VARCHAR(64);

        IF @reportName = 'Wrap-up: Target''s Weekly Report'
            SET @permissionSystemName = 'REPORT_WRAP_UP_TARGETS_WEEKLY_REPORT';

        IF @reportName = 'Sessions: Lookup by Serial Number'
            SET @permissionSystemName = 'REPORT_SESSIONS_LOOKUP_BY_SERIAL_NUMBER';

        IF @reportName = 'Wrap-up: Code ''NS'' by Username'
            SET @permissionSystemName = 'REPORT_WRAP_UP_CODE_NS_BY_USERNAME';

        IF @reportName = 'Wrap-up: Custom Report'
            SET @permissionSystemName = 'REPORT_WRAP_UP_CUSTOM_REPORT';

        IF @reportName = 'Trends: Year over Year'
            SET @permissionSystemName = 'REPORT_TRENDS_YEAR_OVER_YEAR';

        IF @reportName = 'Roles: by Permissions'
            SET @permissionSystemName = 'REPORT_ROLES_BY_PERMISSION';

        IF @reportName = 'Actions Performed'
            SET @permissionSystemName = 'REPORT_ACTIONS_PERFORMED';

        IF @reportName = 'Sessions: Lookup Serial Number by Username'
            SET @permissionSystemName = 'REPORT_SESSIONS_LOOKUP_SERIAL_NUMBER_BY_USERNAME';

        IF @reportName = 'Sessions: Open Sessions by Username'
            SET @permissionSystemName = 'REPORT_SESSIONS_OPEN_SESSIONS_BY_USERNAME';

        IF @reportName = 'Wrap-up: RBC Monthly'
            SET @permissionSystemName = 'REPORT_WRAP_UP_RBC_MONTHLY';

        IF @reportName = 'Roles: By User'
            SET @permissionSystemName = 'REPORT_ROLES_BY_USER';

        IF @reportName = 'Session: Report'
            SET @permissionSystemName = 'REPORT_SESSION_REPORT';

        IF @reportName = 'Calls: Daily PBX Report'
            SET @permissionSystemName = 'REPORT_CALLS_DAILY_PBX_REPORT';

        IF @reportName = 'Calls: Hour by Hour'
            SET @permissionSystemName = 'REPORT_CALLS_HOUR_BY_HOUR';

        IF @reportName = 'Session: Details'
            SET @permissionSystemName = 'REPORT_SESSION_DETAILS';

        IF @reportName = 'GO LIVE: Hour by Hour'
            SET @permissionSystemName = 'REPORT_GO_LIVE_HOUR_BY_HOUR';

        DECLARE @permissionDisplayName VARCHAR(64);
        SET @permissionDisplayName = CONCAT ( 'Report - "', @reportName, '"' );

        DECLARE @existingId BIGINT = (
            SELECT id
            FROM permission
            WHERE system_name = @permissionSystemName );

        IF ( @existingId IS NULL )
            EXECUTE add_permission @permissionSystemName, @permissionDisplayName, 'Permission to view this Report';

        UPDATE report
        SET permission_id = (
            SELECT id
            FROM permission
            WHERE system_name = @permissionSystemName )
        WHERE name = @reportName;

        FETCH NEXT FROM reportCursor
        INTO @reportName;
    END

CLOSE reportCursor;
DEALLOCATE reportCursor;