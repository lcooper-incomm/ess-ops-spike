-- Create a new permission category for case search session type permissions

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
    'CASE_SEARCH_SESSION_TYPE',
    'Case Search Session Type',
    'Permissions to see a particular session type when searching cases',
    0,
    @ccaAdminId,
    @ccaAdminId
);

DECLARE @permissionCategoryId BIGINT = (
    SELECT id
    FROM permission_category
    WHERE system_name = 'CASE_SEARCH_SESSION_TYPE'
);

DECLARE @caseSessionClassId BIGINT = (
    SELECT id
    FROM session_class
    WHERE [name] = 'CASE'
);

-- Create a new permission for every existing case session type

DECLARE session_type_cursor CURSOR FOR
    SELECT id, CONCAT('CASE_SEARCH_SESSION_TYPE_', [name]), CONCAT('Case Search Session Type - ', [name])
    FROM session_type
    WHERE session_class_id = @caseSessionClassId;

DECLARE @sessionTypeId BIGINT;
DECLARE @systemName VARCHAR(64);
DECLARE @displayName VARCHAR(64);

OPEN session_type_cursor

FETCH NEXT FROM session_type_cursor INTO @sessionTypeId, @systemName, @displayName;

WHILE @@FETCH_STATUS = 0
    BEGIN
        EXECUTE add_permission @systemName, @displayName, 'Permission to see cases with this session type';

        FETCH NEXT FROM session_type_cursor INTO @sessionTypeId, @systemName, @displayName;
    END;

CLOSE session_type_cursor;
DEALLOCATE session_type_cursor;

-- Change the permission category for each case search session type permission

UPDATE permission
SET permission_category_id = @permissionCategoryId
WHERE system_name LIKE 'CASE_SEARCH_SESSION_TYPE_%';

-- Give case search session type permissions to all roles with permission to search case sessions

INSERT INTO cca_role_permission (role_id, permission_id)
SELECT r.id, p.id
FROM (
    -- All search session roles
    SELECT DISTINCT r.id
    FROM cca_role r
    INNER JOIN cca_role_permission rp ON rp.role_id = r.id
    INNER JOIN permission p ON p.id = rp.permission_id
    WHERE p.system_name IN (
        'SEARCH_SESSIONS_ALL',
        'SEARCH_SESSIONS_CASE',
        'VIEW_CASE_WORKSPACE'
    )
) r
-- Case search session type permission ids
CROSS JOIN permission p
WHERE p.system_name LIKE 'CASE_SEARCH_SESSION_TYPE_%';