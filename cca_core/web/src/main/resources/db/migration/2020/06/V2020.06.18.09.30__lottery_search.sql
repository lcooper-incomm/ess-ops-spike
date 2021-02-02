
EXECUTE add_permission 'SEARCH_LOTTERY', 'Search Permission Lottery',
                       'Perform a lookup for Lottery products.';
declare @idPermissionSearch int = (select id from permission where system_name='SEARCH_LOTTERY');


declare @idSN int = (select id from search_parameter where [type]='SERIAL_NUMBER');
declare @idVAN int = (select id from search_parameter where [type]='VAN');

Declare @idSearchTypeCategory int = (select id from search_type_category where [name]='Financial');
Declare @idDefaultParam int = (select id from search_parameter where [type]='VAN');
insert into search_type ([name], category_id, [platform], selection_type, [type], default_quick_search_parameter_id) values
  ('Lottery', @idSearchTypeCategory, 'LOTTERY', 'PRODUCT', 'LOTTERY', @idDefaultParam);

Declare @searchTypeId int = (select id from search_type where [name]='Lottery');

insert into search_type_parameter_group ([name], [priority], search_type_id)
	values  ('Basic Search', 0, @searchTypeId);

Declare @idGroup int = (select top 1 id from search_type_parameter_group where search_type_id=@searchTypeId);

-- Only do VAN at this time.  Add Serial Number in later script.
insert into search_type_parameter_group_parameter (group_id, search_parameter_id, [priority], is_advanced) values
	(@idGroup, @idVAN, 0, 0);

insert into search_type_permission (search_type_id, permission_id) values (@searchTypeId, @idPermissionSearch);
