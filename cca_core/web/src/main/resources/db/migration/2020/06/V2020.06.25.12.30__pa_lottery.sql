
EXECUTE add_permission 'PARTNER_PERMISSION_PALOTTERY', 'Partner PA Lottery permission', '';

DECLARE @permissionId BIGINT = (SELECT id FROM permission WHERE [system_name] = 'PARTNER_PERMISSION_PALOTTERY');

INSERT INTO [partner] ([name], ivr_dnis, permission_id, [platform], [type]) values
    ('PA Lottery', '', @permissionId, 'CCL', 'PALOTTERY');

DECLARE @partnerId int = (select id from [partner] where [type]='PALOTTERY');
DECLARE @searchTypeId int = (select id from search_type where [name]='CCL Gift Card');

INSERT INTO search_type_partner (search_type_id, partner_id) VALUES (@searchTypeId, @partnerId);
