
UPDATE [wrap_up_code] set [locked]=0 where [locked] IS NULL;

ALTER TABLE [wrap_up_code] ALTER COLUMN [locked] BIT NOT NULL;
