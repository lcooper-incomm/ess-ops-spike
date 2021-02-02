ALTER TABLE cca_user
    ADD pref_default_ccl_partner_id BIGINT;
ALTER TABLE cca_user
    ADD CONSTRAINT fk_cca_user_pref_default_ccl_partner_id FOREIGN KEY ( pref_default_ccl_partner_id ) REFERENCES partner ( id );