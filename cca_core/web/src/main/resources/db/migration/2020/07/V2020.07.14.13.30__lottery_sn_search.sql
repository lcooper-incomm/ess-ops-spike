
Declare @searchTypeId int = (select id from search_type where [name]='Lottery');

Declare @idGroup int = (select top 1 id from search_type_parameter_group where search_type_id=@searchTypeId);
Declare @idSN int = (select id from search_parameter where [type]='SERIAL_NUMBER');

insert into search_type_parameter_group_parameter (group_id, search_parameter_id, [priority], is_advanced) values
(@idGroup, @idSN, 1, 0);
