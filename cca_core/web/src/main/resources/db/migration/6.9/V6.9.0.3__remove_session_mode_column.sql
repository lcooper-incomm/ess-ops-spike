--Drop default constraint
DECLARE @parentObjectId INT;
DECLARE @parentColumnId INT;
DECLARE @constraintName VARCHAR(64);

SELECT @parentObjectId = OBJECT_ID ( 'cca_user' );
SELECT @parentColumnId = (
    SELECT column_id
    FROM sys.columns
    WHERE name = 'pref_session_mode' AND object_id = @parentObjectId );
SELECT @constraintName = (
    SELECT name
    FROM sys.default_constraints
    WHERE parent_object_id = @parentObjectId AND parent_column_id = @parentColumnId );

EXEC ('ALTER TABLE cca_user DROP CONSTRAINT ' + @constraintName);

--Drop column
ALTER TABLE cca_user
    DROP COLUMN pref_session_mode;