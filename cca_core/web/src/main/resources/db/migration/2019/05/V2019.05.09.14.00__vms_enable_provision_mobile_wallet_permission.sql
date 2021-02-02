EXECUTE add_permission 'VMS_ENABLE_PROVISION_MOBILE_WALLET', 'VMS Enable Provision Mobile Wallet', 'Ability to enable Mobile Wallet on a VMS Customer Account.';

DECLARE @oldPermissionId INT = (SELECT id from permission WHERE system_name = 'VMS_PROVISION_MOBILE_WALLET');
DECLARE @newPermissionId INT = (SELECT id from permission WHERE system_name = 'VMS_ENABLE_PROVISION_MOBILE_WALLET');

-- Copy records in group_permission
DECLARE @systemAdminGroupId INT;
SET @systemAdminGroupId = (SELECT id FROM cca_group WHERE system_name = 'SYSTEM_ADMINISTRATION');
INSERT INTO cca_group_permission (group_id, permission_id)
SELECT group_id, @newPermissionId FROM cca_group_permission WHERE permission_id = @oldPermissionId AND NOT group_id = @systemAdminGroupId;

-- Copy records in role_permission
INSERT INTO cca_role_permission (role_id, permission_id)
SELECT role_id, @newPermissionId FROM cca_role_permission WHERE permission_id = @oldPermissionId;
