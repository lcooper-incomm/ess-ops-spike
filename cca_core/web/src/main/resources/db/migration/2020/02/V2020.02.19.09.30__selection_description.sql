
-- Increase column length due to large data causing sql exceptions
ALTER TABLE [selection] ALTER COLUMN [description] VARCHAR(96) NULL;
