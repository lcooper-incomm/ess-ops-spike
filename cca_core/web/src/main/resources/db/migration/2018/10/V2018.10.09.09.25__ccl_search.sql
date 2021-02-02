ALTER TABLE partner
    DROP CONSTRAINT uk_partner_name;

GO

EXECUTE add_permission 'PARTNER_PERMISSION_GLOBAL_CCL', 'Partner Global CCL', 'Ability to use the CCL Global Partner';
EXECUTE add_permission 'PARTNER_PERMISSION_DOLLARGENERAL_CCL', 'Partner Dollar General CCL',
        'Ability to use the CCL DollarGeneral Partner';
EXECUTE add_permission 'SEARCH_CCL', 'Search CCL', 'Ability to use the CCL Search Type';

GO

INSERT INTO partner (name, ivr_dnis, permission_id, platform)
VALUES ('Global', '', ( SELECT id FROM permission WHERE system_name = 'PARTNER_PERMISSION_GLOBAL_CCL' ), 'CCL'),
('DollarGeneral', '', ( SELECT id FROM permission WHERE system_name = 'PARTNER_PERMISSION_DOLLARGENERAL_CCL' ), 'CCL');