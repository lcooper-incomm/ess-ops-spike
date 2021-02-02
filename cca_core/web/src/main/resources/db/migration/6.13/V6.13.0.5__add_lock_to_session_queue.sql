ALTER TABLE session_queue
    ADD is_locked BIT;

GO

UPDATE session_queue
SET is_locked = 0;

GO

ALTER TABLE session_queue
    ALTER COLUMN is_locked BIT NOT NULL;