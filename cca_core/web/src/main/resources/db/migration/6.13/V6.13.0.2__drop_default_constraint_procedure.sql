CREATE PROCEDURE drop_default_constraint
        @tableName  VARCHAR(64),
        @columnName VARCHAR(64)

AS

    BEGIN
        DECLARE @parentObjectId INT;
        DECLARE @parentColumnId INT;
        DECLARE @constraintName VARCHAR(64);

        SELECT @parentObjectId = OBJECT_ID ( @tableName );
        SELECT @parentColumnId = (
            SELECT column_id
            FROM sys.columns
            WHERE name = @columnName AND object_id = @parentObjectId );
        SELECT @constraintName = (
            SELECT name
            FROM sys.default_constraints
            WHERE parent_object_id = @parentObjectId AND parent_column_id = @parentColumnId );

        EXEC ('ALTER TABLE ' + @tableName + ' DROP CONSTRAINT ' + @constraintName);
    END