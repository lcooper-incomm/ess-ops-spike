INSERT INTO search_type (name, type, category_id, platform, selection_type, default_quick_search_parameter_id)
VALUES ('VMS KYC Failure',
        'KYC_FAILURE',
        (SELECT id FROM search_type_category WHERE name = 'Financial'),
        'VMS',
        NULL,
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS'));

DECLARE
    @kycSearchTypeId BIGINT = (SELECT id
                                    FROM search_type
                                    WHERE type = 'KYC_FAILURE');

INSERT INTO search_type_permission (search_type_id, permission_id)
VALUES (@kycSearchTypeId,
        (SELECT id FROM permission WHERE system_name = 'FAILED_KYC_REGISTRATION_SEARCH'));

INSERT INTO search_type_parameter_group (name, priority, search_type_id)
VALUES ('Basic Search', 0, @kycSearchTypeId);

DECLARE
    @basicSearchGroupId BIGINT = (SELECT id
                                  FROM search_type_parameter_group
                                  WHERE name = 'Basic Search' AND search_type_id = @kycSearchTypeId);


INSERT INTO search_type_parameter_group_parameter (group_id, search_parameter_id, priority, is_advanced)
VALUES (@basicSearchGroupId,
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS'),
        0,
        0),
       (@basicSearchGroupId,
        (SELECT id FROM search_parameter WHERE type = 'FIRST_NAME'),
        1,
        0),
       (@basicSearchGroupId,
        (SELECT id FROM search_parameter WHERE type = 'LAST_NAME'),
        2,
        0),
       (@basicSearchGroupId,
        (SELECT id FROM search_parameter WHERE type = 'SSN'),
        3,
        0);

INSERT INTO search_type_quick_search_parameter (search_type_id, search_parameter_id)
VALUES (@kycSearchTypeId, (SELECT id FROM search_parameter WHERE type = 'CUSTOMER_NAME')),
       (@kycSearchTypeId, (SELECT id FROM search_parameter WHERE type = 'PAN_VMS'));

INSERT INTO search_type_partner (search_type_id, partner_id)
VALUES (@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'COINBASE' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'DFC' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'EPP' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'INCOMM' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'JACKSONHEWITT' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'LYFE' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'NEXTCALA' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'PAYPAL' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'DOLLARGENERAL' and platform = 'VMS' )),
(@kycSearchTypeId, ( SELECT id FROM partner WHERE type = 'GLOBAL' and platform = 'VMS' ));
