ALTER TABLE cca_user
    ADD is_migrated BIT;

GO

UPDATE cca_user
SET is_migrated = 0;

GO

ALTER TABLE cca_user
    ALTER COLUMN is_migrated BIT NOT NULL;