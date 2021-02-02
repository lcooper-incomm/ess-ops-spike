--Remove default constraint
DECLARE @parentObjectId INT;
DECLARE @parentColumnId INT;
DECLARE @constraintName VARCHAR(64);

SELECT @parentObjectId = OBJECT_ID ( 'audit_activity' );
SELECT @parentColumnId = (
    SELECT column_id
    FROM sys.columns
    WHERE name = 'is_encrypted' AND object_id = @parentObjectId );
SELECT @constraintName = (
    SELECT name
    FROM sys.default_constraints
    WHERE parent_object_id = @parentObjectId AND parent_column_id = @parentColumnId );

EXEC ('ALTER TABLE audit_activity DROP CONSTRAINT ' + @constraintName);

--Then drop column
ALTER TABLE audit_activity
    DROP COLUMN is_encrypted;