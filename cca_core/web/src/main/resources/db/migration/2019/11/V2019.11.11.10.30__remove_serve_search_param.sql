
 DECLARE @searchTypeId BIGINT = ( SELECT id
                                FROM [search_type]
                                WHERE [platform] = 'SERVE' );

 DECLARE @groupId BIGINT = ( SELECT id
                                FROM [search_type_parameter_group]
                                WHERE [search_type_id] = @searchTypeId and [name]='Personal Information' );

 DECLARE @searchParameterId BIGINT = ( SELECT id
                                FROM [search_parameter]
                                WHERE [name] = 'Online User ID' );

IF @groupId IS NOT NULL AND @searchParameterId IS NOT NULL
    DELETE FROM [search_type_parameter_group_parameter] where [group_id]=@groupId and [search_parameter_id]=@searchParameterId;
