ALTER TABLE cca_user
    ADD pref_default_landing_page VARCHAR(64);

GO

UPDATE cca_user
SET pref_default_landing_page = 'DASHBOARD';

GO

ALTER TABLE cca_user
    ALTER COLUMN pref_default_landing_page VARCHAR(64) NOT NULL;