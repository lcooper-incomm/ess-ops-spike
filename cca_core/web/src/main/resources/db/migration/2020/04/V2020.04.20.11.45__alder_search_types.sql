EXECUTE add_permission 'SEARCH_BY_ALDER_CARD', 'ALDER Card Search',
        'Ability to search ALDER Cards';
EXECUTE add_permission 'SEARCH_BY_ALDER_ORDER', 'ALDER Order Search',
        'Ability to search ALDER Orders';

GO

INSERT INTO search_type (name, category_id, platform, selection_type, type)
VALUES ('ALDER', ( SELECT id FROM search_type_category WHERE name = 'Gift' ), 'ALDER', 'ORDER', 'ALDER');

DECLARE @searchTypeId BIGINT = ( SELECT id
                                 FROM search_type
                                 WHERE type = 'ALDER' );

INSERT INTO search_parameter (name, type, value)
VALUES ('Search Type', 'ALDER_SEARCH_TYPE', 'alderSearchType'),
('Checkout Id', 'CHECKOUT_ID', 'correlationId'),
('Card Number', 'ALDER_CARD_NUMBER', 'cardNumber');

INSERT INTO search_type_permission (search_type_id, permission_id)
VALUES (@searchTypeId, ( SELECT id FROM permission WHERE system_name = 'SEARCH_BY_ALDER_CARD' )),
(@searchTypeId, ( SELECT id FROM permission WHERE system_name = 'SEARCH_BY_ALDER_ORDER' ));

INSERT INTO search_type_parameter_group (name, priority, search_type_id)
VALUES ('Order Information', 0, @searchTypeId),
    ('Purchaser Information', 1, @searchTypeId),
    ('Card Information', 2, @searchTypeId),
    ('Recipient Information', 3, @searchTypeId);

DECLARE @orderGroupId BIGINT = ( SELECT id
                                 FROM search_type_parameter_group
                                 WHERE name = 'Order Information' AND search_type_id = @searchTypeId );

DECLARE @purchaserGroupId BIGINT = ( SELECT id
                                     FROM search_type_parameter_group
                                     WHERE name = 'Purchaser Information' AND search_type_id = @searchTypeId );

DECLARE @cardGroupId BIGINT = ( SELECT id
                                 FROM search_type_parameter_group
                                 WHERE name = 'Card Information' AND search_type_id = @searchTypeId );

DECLARE @recipientGroupId BIGINT = ( SELECT id
                                     FROM search_type_parameter_group
                                     WHERE name = 'Recipient Information' AND search_type_id = @searchTypeId );

INSERT INTO search_type_parameter_group_parameter (group_id, search_parameter_id, priority, is_advanced)
VALUES (@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'ORDER_NUMBER' ), 0, 0),
(@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'CHECKOUT_ID' ), 1, 0),
(@purchaserGroupId, ( SELECT id FROM search_parameter WHERE type = 'FIRST_NAME' ), 0, 0),
(@purchaserGroupId, ( SELECT id FROM search_parameter WHERE type = 'LAST_NAME' ), 1, 0),
(@cardGroupId, ( SELECT id FROM search_parameter WHERE type = 'ALDER_CARD_NUMBER' ), 0, 0),
(@recipientGroupId, ( SELECT id FROM search_parameter WHERE type = 'RECIPIENT_FIRST_NAME' ), 0, 0),
(@recipientGroupId, ( SELECT id FROM search_parameter WHERE type = 'RECIPIENT_LAST_NAME' ), 1, 0),
(@recipientGroupId, ( SELECT id FROM search_parameter WHERE type = 'RECIPIENT_EMAIL_ADDRESS' ), 2, 0);


