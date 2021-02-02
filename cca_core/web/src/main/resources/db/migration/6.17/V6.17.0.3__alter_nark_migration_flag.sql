ALTER TABLE comment
    DROP COLUMN is_migrated;

GO

ALTER TABLE comment
    ADD migration_status VARCHAR(64);