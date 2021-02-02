EXECUTE add_permission 'SEARCH_BY_VANILLA_BOL', 'Vanilla BOL Search',
        'Ability to search BOL Orders with the Vanilla Partner';
EXECUTE add_permission 'SEARCH_BY_WALMART_BOL', 'Walmart BOL Search',
        'Ability to search BOL Orders with the Walmart Partner';

GO

INSERT INTO search_type (name, category_id, platform, selection_type, type)
VALUES ('BOL Order', ( SELECT id FROM search_type_category WHERE name = 'Gift' ), 'BOL', 'ORDER', 'BOL_ORDER');

DECLARE @searchTypeId BIGINT = ( SELECT id
                                 FROM search_type
                                 WHERE type = 'BOL_ORDER' );

INSERT INTO search_parameter (name, type, value)
VALUES ('Partner', 'BOL_PARTNER', 'bolPartner'),
    ('First Name', 'RECIPIENT_FIRST_NAME', 'recipientFirstName'),
    ('Last Name', 'RECIPIENT_LAST_NAME', 'recipientLastName'),
    ('Email Address', 'RECIPIENT_EMAIL_ADDRESS', 'recipientEmail'),
    ('Address Line 1', 'RECIPIENT_ADDRESS_LINE_1', 'recipientAddressLine1'),
    ('Card Number', 'BOL_CARD_NUMBER', 'cardNumber');

INSERT INTO search_type_permission (search_type_id, permission_id)
VALUES (@searchTypeId, ( SELECT id FROM permission WHERE system_name = 'SEARCH_BY_VANILLA_BOL' )),
(@searchTypeId, ( SELECT id FROM permission WHERE system_name = 'SEARCH_BY_WALMART_BOL' ));

INSERT INTO search_type_parameter_group (name, priority, search_type_id)
VALUES ('Order Information', 0, @searchTypeId),
    ('Purchaser Information', 1, @searchTypeId),
    ('Recipient Information', 2, @searchTypeId);

DECLARE @orderGroupId BIGINT = ( SELECT id
                                 FROM search_type_parameter_group
                                 WHERE name = 'Order Information' AND search_type_id = @searchTypeId );

DECLARE @purchaserGroupId BIGINT = ( SELECT id
                                     FROM search_type_parameter_group
                                     WHERE name = 'Purchaser Information' AND search_type_id = @searchTypeId );

DECLARE @recipientGroupId BIGINT = ( SELECT id
                                     FROM search_type_parameter_group
                                     WHERE name = 'Recipient Information' AND search_type_id = @searchTypeId );

INSERT INTO search_type_parameter_group_parameter (group_id, search_parameter_id, priority, is_advanced)
VALUES (@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'ORDER_NUMBER' ), 0, 0),
(@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'SHIPMENT_NUMBER' ), 1, 0),
(@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER' ), 2, 0),
(@orderGroupId, ( SELECT id FROM search_parameter WHERE type = 'BOL_CARD_NUMBER' ), 3, 0),
(@purchaserGroupId, ( SELECT id FROM search_parameter WHERE type = 'FIRST_NAME' ), 0, 0),
(@purchaserGroupId, ( SELECT id FROM search_parameter WHERE type = 'LAST_NAME' ), 1, 0),
(@purchaserGroupId, ( SELECT id FROM search_parameter WHERE type = 'EMAIL_ADDRESS' ), 2, 0),
(@purchaserGroupId, ( SELECT id FROM search_parameter WHERE type = 'LAST_FOUR' ), 3, 0),
(@recipientGroupId, ( SELECT id FROM search_parameter WHERE type = 'RECIPIENT_FIRST_NAME' ), 0, 0),
(@recipientGroupId, ( SELECT id FROM search_parameter WHERE type = 'RECIPIENT_LAST_NAME' ), 1, 0),
(@recipientGroupId, ( SELECT id FROM search_parameter WHERE type = 'RECIPIENT_EMAIL_ADDRESS' ), 2, 0),
(@recipientGroupId, ( SELECT id FROM search_parameter WHERE type = 'RECIPIENT_ADDRESS_LINE_1' ), 3, 0);