DECLARE @searchTypeId BIGINT = ( SELECT id
                                 FROM search_type
                                 WHERE type = 'BOL_ORDER' );

DECLARE @orderGroupId BIGINT = ( SELECT id
                                 FROM search_type_parameter_group
                                 WHERE name = 'Order Information' AND search_type_id = @searchTypeId );

DECLARE @purchaserGroupId BIGINT = ( SELECT id
                                     FROM search_type_parameter_group
                                     WHERE name = 'Purchaser Information' AND search_type_id = @searchTypeId );

INSERT INTO search_parameter (name, type, value)
VALUES ('CC Last Four', 'CC_LAST_FOUR', 'lastFour'),
    ('Item ID', 'ITEM_ID', 'itemId'),
    ('Quote ID', 'QUOTE_ID', 'quoteId');

--Replace LAST_FOUR field with CC_LAST_FOUR and add id fields to order information group
DELETE
FROM search_type_parameter_group_parameter
WHERE group_id = @purchaserGroupId AND
        search_parameter_id = ( SELECT id FROM search_parameter WHERE type = 'LAST_FOUR' );

INSERT INTO search_type_parameter_group_parameter (group_id, search_parameter_id, priority, is_advanced)
VALUES (@purchaserGroupId, ( SELECT id FROM search_parameter WHERE type = 'CC_LAST_FOUR' ), 3, 0),
(@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'ITEM_ID' ), 4, 1),
(@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'QUOTE_ID' ), 5, 1);

