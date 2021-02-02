ALTER TABLE partner ADD platform VARCHAR(64);

GO

UPDATE partner
SET platform = 'VMS';

GO

ALTER TABLE partner ALTER COLUMN platform VARCHAR(64) NOT NULL;