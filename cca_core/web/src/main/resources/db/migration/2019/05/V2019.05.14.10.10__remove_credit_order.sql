DECLARE
    @permissionId BIGINT = (SELECT id
                            FROM permission
                            WHERE system_name = 'CREDIT_ORDER');

DELETE
FROM cca_group_permission
WHERE permission_id = @permissionId;
DELETE
FROM cca_role_permission
WHERE permission_id = @permissionId;
DELETE
FROM permission
WHERE id = @permissionId;

GO

DELETE
FROM cca_property
WHERE system_name = 'BOL_CREDIT_ORDER_SUPPORTED_STATUSES';