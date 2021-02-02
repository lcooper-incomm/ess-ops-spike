DECLARE
    @giftSearchCategoryId BIGINT = ( SELECT id
                                     FROM search_type_category
                                     WHERE name = 'Gift' );

INSERT INTO search_type (name, type, category_id, platform, selection_type, default_quick_search_parameter_id)
VALUES ('CCL Gift Card',
        'CCL_GIFT',
        ( SELECT id FROM search_type_category WHERE name = 'Gift' ),
        'CCL',
        'CUSTOMER',
        ( SELECT id FROM search_parameter WHERE type = 'PAN_VMS' ));

INSERT INTO search_type_permission (search_type_id, permission_id)
VALUES (( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ),
        ( SELECT id FROM permission WHERE system_name = 'SEARCH_CCL' ));

INSERT INTO search_type_parameter_group (name, priority, search_type_id)
VALUES ('Card Information', 0, ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' )),
('Transaction Information', 1, ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ));

INSERT INTO search_type_parameter_group_parameter (group_id, search_parameter_id, priority, is_advanced)
VALUES (( SELECT id
          FROM search_type_parameter_group
          WHERE name = 'Card Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
        ( SELECT id FROM search_parameter WHERE type = 'PAN_VMS' ),
        0,
        0),
(( SELECT id
   FROM search_type_parameter_group
   WHERE name = 'Card Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
 ( SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER' ),
 1,
 0),
(( SELECT id
   FROM search_type_parameter_group
   WHERE name = 'Card Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
 ( SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER' ),
 2,
 0),
(( SELECT id
   FROM search_type_parameter_group
   WHERE name = 'Card Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
 ( SELECT id FROM search_parameter WHERE type = 'PROXY_NUMBER' ),
 3,
 1),
(( SELECT id
   FROM search_type_parameter_group
   WHERE name = 'Card Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
 ( SELECT id FROM search_parameter WHERE type = 'CARD_ID' ),
 4,
 1),
(( SELECT id
   FROM search_type_parameter_group
   WHERE name = 'Transaction Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
 ( SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID' ),
 0,
 1),
(( SELECT id
   FROM search_type_parameter_group
   WHERE name = 'Transaction Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
 ( SELECT id FROM search_parameter WHERE type = 'START_DATE' ),
 1,
 1),
(( SELECT id
   FROM search_type_parameter_group
   WHERE name = 'Transaction Information' AND search_type_id = ( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ) ),
 ( SELECT id FROM search_parameter WHERE type = 'END_DATE' ),
 2,
 1);

INSERT INTO search_type_quick_search_parameter (search_type_id, search_parameter_id)
VALUES (( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ),
        ( SELECT id FROM search_parameter WHERE type = 'PAN_VMS' )),
(( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ),
 ( SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER' )),
(( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ),
 ( SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER' ));

GO

UPDATE partner
SET type = 'GLOBAL'
WHERE name = 'Global' AND platform = 'CCL';

UPDATE partner
SET type = 'DOLLARGENERAL',
    name = 'Dollar General'
WHERE name = 'DollarGeneral' AND platform = 'CCL';

GO

INSERT INTO search_type_partner (search_type_id, partner_id)
VALUES (( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ),
        ( SELECT id FROM partner WHERE platform = 'CCL' AND type = 'GLOBAL' )),
(( SELECT id FROM search_type WHERE type = 'CCL_GIFT' ),
 ( SELECT id FROM partner WHERE platform = 'CCL' AND type = 'DOLLARGENERAL' ));