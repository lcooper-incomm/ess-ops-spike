ALTER TABLE comment
    ADD is_migrated BIT;

GO

UPDATE comment
SET is_migrated = 0;

GO

ALTER TABLE comment
    ALTER COLUMN is_migrated BIT NOT NULL;