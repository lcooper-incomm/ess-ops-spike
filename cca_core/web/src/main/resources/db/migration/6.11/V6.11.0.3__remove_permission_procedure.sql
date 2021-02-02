CREATE PROCEDURE remove_permission
        @systemName VARCHAR(64)
AS
    BEGIN

        DECLARE @permissionId BIGINT;
        SET @permissionId = (
            SELECT id
            FROM permission
            WHERE system_name = @systemName );

        DELETE FROM cca_group_permission
        WHERE permission_id = @permissionId;

        DELETE FROM cca_role_permission
        WHERE permission_id = @permissionId;

        DELETE FROM permission
        WHERE id = @permissionId;
    END

GO