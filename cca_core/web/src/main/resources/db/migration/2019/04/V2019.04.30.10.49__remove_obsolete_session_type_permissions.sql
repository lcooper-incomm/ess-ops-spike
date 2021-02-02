DECLARE
    @sessionTypeCallCenterPermissionId BIGINT = ( SELECT id
                                                  FROM permission
                                                  WHERE system_name = 'SESSION_TYPE_CALL_CENTER' );
DECLARE
    @sessionTypeCasePermissionId BIGINT = ( SELECT id
                                            FROM permission
                                            WHERE system_name = 'SESSION_TYPE_CASE' );

DELETE
FROM cca_role_permission
WHERE permission_id IN ( @sessionTypeCallCenterPermissionId, @sessionTypeCasePermissionId );

DELETE
FROM cca_group_permission
WHERE permission_id IN ( @sessionTypeCallCenterPermissionId, @sessionTypeCasePermissionId );

DELETE
FROM permission
WHERE id IN ( @sessionTypeCallCenterPermissionId, @sessionTypeCasePermissionId );
