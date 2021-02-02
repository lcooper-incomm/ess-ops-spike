-- Add case permission foreign key to team table

ALTER TABLE team
    ADD case_permission_id BIGINT CONSTRAINT fk_team_case_permission_id FOREIGN KEY (case_permission_id) REFERENCES permission (id);
GO

-- Create a new permission category for case team permissions

DECLARE @ccaAdminId BIGINT = (
    SELECT id
    FROM cca_user
    WHERE username = 'cca_admin'
);

INSERT INTO permission_category (
    system_name,
    display_name,
    description,
    locked,
    created_by,
    modified_by
)
VALUES (
    'CASE_TEAMS',
    'Case Teams',
    'Permissions to use a particular team for searching and assigning cases',
    0,
    @ccaAdminId,
    @ccaAdminId
);

DECLARE @permissionCategoryId BIGINT = (
    SELECT id
    FROM permission_category
    WHERE system_name = 'CASE_TEAMS'
);

-- Create a new permission for every existing team

DECLARE team_cursor CURSOR FOR
    SELECT id, CONCAT('CASE_TEAM_', system_name), CONCAT('Case Team - ', display_name)
    FROM team;

DECLARE @teamId BIGINT;
DECLARE @systemName VARCHAR(64);
DECLARE @displayName VARCHAR(64);

OPEN team_cursor

FETCH NEXT FROM team_cursor INTO @teamId, @systemName, @displayName;

WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Add permission
        EXECUTE add_permission @systemName, @displayName, 'Permission to use this team for searching and assigning cases';

        -- Link team to permission
        DECLARE @permissionId BIGINT = (
            SELECT id
            FROM permission
            WHERE system_name = @systemName
        );

        UPDATE team
        SET case_permission_id = @permissionId
        WHERE id = @teamId

        FETCH NEXT FROM team_cursor INTO @teamId, @systemName, @displayName;
    END;

CLOSE team_cursor;
DEALLOCATE team_cursor;

-- Change the permission category for each case team permission
UPDATE permission
SET permission_category_id = @permissionCategoryId
WHERE system_name LIKE 'CASE_TEAM_%';