
EXECUTE add_permission 'SEARCH_ENCOR', 'Search Permission Encor',
                       'Perform a lookup for Encor orders.';
declare @idPermissionSearch int = (select id from permission where system_name='SEARCH_ENCOR');

Declare @idSearchTypeCategory int = (select id from search_type_category where [name]='Gift');
Declare @idDefaultParam int = (select id from search_parameter where [type]='PROGRAM');

insert into search_parameter ([name], [type], [value]) VALUES
  ('Card Last 4', 'CARD_LAST_4', 'cardLast4'),
  ('Member Number', 'MEMBER_NUMBER', 'memberNumber'),
  ('Program', 'ENCOR_PROGRAM', 'encorProgram'),
  ('SSN Last 4', 'SSN_LAST_4', 'ssnLast4');

insert into search_type ([name], category_id, [platform], selection_type, [type], default_quick_search_parameter_id) values
  ('ENCOR', @idSearchTypeCategory, 'ENCOR', 'MAPLES_CUSTOMER', 'ENCOR', @idDefaultParam);

Declare @searchTypeId int = (select id from search_type where [name]='ENCOR');

insert into search_type_parameter_group ([name], [priority], search_type_id)
	values  ('Basic Search', 0, @searchTypeId);

Declare @idGroup int = (select top 1 id from search_type_parameter_group where search_type_id=@searchTypeId);

insert into search_type_parameter_group_parameter (group_id, search_parameter_id, [priority], is_advanced) values
	(@idGroup, (select id from search_parameter where [type]='FIRST_NAME'), 0, 0),
	(@idGroup, (select id from search_parameter where [type]='LAST_NAME'), 1, 0),
	(@idGroup, (select id from search_parameter where [type]='EMAIL_ADDRESS'), 2, 0),
	(@idGroup, (select id from search_parameter where [type]='PHONE_NUMBER'), 3, 0),
	(@idGroup, (select id from search_parameter where [type]='SSN_LAST_4'), 4, 0),
	(@idGroup, (select id from search_parameter where [type]='POSTAL_CODE'), 5, 0),
	(@idGroup, (select id from search_parameter where [type]='CARD_LAST_4'), 6, 0),
	(@idGroup, (select id from search_parameter where [type]='MEMBER_NUMBER'), 7, 0);

insert into search_type_permission (search_type_id, permission_id) values (@searchTypeId, @idPermissionSearch);
