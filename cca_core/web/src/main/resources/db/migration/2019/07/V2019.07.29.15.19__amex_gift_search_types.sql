EXECUTE add_permission 'SEARCH_AMEX_GIFT_CARD', 'AMEX Gift Search', 'Ability to search AMEX Gift Cards';

INSERT INTO search_parameter (name, type, value)
VALUES ('DA Number', 'DA_NUMBER', 'daNumber'),
('Social Security Number', 'SSN', 'ssn');

INSERT INTO search_type (name, type, category_id, platform, selection_type, default_quick_search_parameter_id)
VALUES ('AMEX Gift Card',
        'AMEX_GIFT',
        (SELECT id FROM search_type_category WHERE name = 'Gift'),
        'AMEX',
        'CUSTOMER_ACCOUNT',
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS'));

DECLARE
    @amexGiftSearchTypeId BIGINT = (SELECT id
                                    FROM search_type
                                    WHERE type = 'AMEX_GIFT');

INSERT INTO search_type_permission (search_type_id, permission_id)
VALUES (@amexGiftSearchTypeId,
        (SELECT id FROM permission WHERE system_name = 'SEARCH_AMEX_GIFT_CARD'));

INSERT INTO search_type_parameter_group (name, priority, search_type_id)
VALUES ('Card Information', 0, @amexGiftSearchTypeId),
    ('Personal Information', 1, @amexGiftSearchTypeId);

DECLARE
    @cardInformationGroupId BIGINT = (SELECT id
                                      FROM search_type_parameter_group
                                      WHERE name = 'Card Information' AND search_type_id = @amexGiftSearchTypeId);

DECLARE
    @personalInformationGroupId BIGINT = (SELECT id
                                          FROM search_type_parameter_group
                                          WHERE name = 'Personal Information' AND
                                              search_type_id = @amexGiftSearchTypeId);

INSERT INTO search_type_parameter_group_parameter (group_id, search_parameter_id, priority, is_advanced)
VALUES (@cardInformationGroupId,
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS'),
        0,
        0),
(@cardInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER'),
 1,
 0),
(@cardInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
 2,
 1),
(@cardInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'DA_NUMBER'),
 3,
 1),
(@cardInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'PROXY_NUMBER'),
 4,
 1),
(@personalInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'FIRST_NAME'),
 0,
 0),
(@personalInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'LAST_NAME'),
 1,
 0),
(@personalInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'PHONE_NUMBER'),
 2,
 0),
(@personalInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'SSN'),
 3,
 0),
(@personalInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'EMAIL_ADDRESS'),
 4,
 1),
(@personalInformationGroupId,
 (SELECT id FROM search_parameter WHERE type = 'ONLINE_USER_ID'),
 5,
 1);

INSERT INTO search_type_quick_search_parameter (search_type_id, search_parameter_id)
VALUES (@amexGiftSearchTypeId, (SELECT id FROM search_parameter WHERE type = 'PAN_VMS')),
(@amexGiftSearchTypeId, (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER')),
(@amexGiftSearchTypeId, (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
(@amexGiftSearchTypeId, (SELECT id FROM search_parameter WHERE type = 'DA_NUMBER')),
(@amexGiftSearchTypeId, (SELECT id FROM search_parameter WHERE type = 'PROXY_NUMBER'));
