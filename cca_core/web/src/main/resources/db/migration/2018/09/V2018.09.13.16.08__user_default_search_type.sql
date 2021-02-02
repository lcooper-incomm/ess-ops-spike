ALTER TABLE cca_user
    ADD pref_default_search_type_id BIGINT;
ALTER TABLE cca_user
    ADD CONSTRAINT fk_cca_user_pref_default_search_type_id FOREIGN KEY (pref_default_search_type_id) REFERENCES search_type (id);

GO

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'DDP')
WHERE pref_default_search_type = 'DDP';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'ECOMM_ORDER')
WHERE pref_default_search_type = 'ECOMM_ORDER';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'FASTCARD_FASTPIN')
WHERE pref_default_search_type = 'FASTCARD';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'FINANCIAL_GIFT')
WHERE pref_default_search_type = 'FINANCIAL_GIFT';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'VMS_GPR')
WHERE pref_default_search_type = 'GPR';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'JIRA')
WHERE pref_default_search_type = 'JIRA';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'LOCATION')
WHERE pref_default_search_type = 'LOCATION';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'SESSION')
WHERE pref_default_search_type = 'SESSION';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'VANILLA_DIRECT')
WHERE pref_default_search_type = 'VANILLA_DIRECT';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'VRN_SWIPE_RELOAD')
WHERE pref_default_search_type = 'VRN';

UPDATE cca_user
SET pref_default_search_type_id = (SELECT id
                                   FROM search_type
                                   WHERE type = 'VMS_GIFT')
WHERE pref_default_search_type = 'VMS_GIFT';