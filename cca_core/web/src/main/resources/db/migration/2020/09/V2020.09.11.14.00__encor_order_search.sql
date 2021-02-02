
DECLARE @paramGroup int = (select id from search_type_parameter_group where search_type_id=(select id from search_type where [name]='ENCOR'));
DECLARE @param int = (select id from [search_parameter] where [type]='ORDER_NUMBER');

INSERT INTO [search_type_parameter_group_parameter] (group_id, search_parameter_id, priority, is_advanced)
    VALUES (@paramGroup, @param, 8, 0);
