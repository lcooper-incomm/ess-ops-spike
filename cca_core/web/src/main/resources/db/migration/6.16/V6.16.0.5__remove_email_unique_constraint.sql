IF EXISTS ( SELECT *
            FROM sys.objects
            WHERE object_id = OBJECT_ID ( 'uk_cca_user_email' ) AND type IN ( 'U' ) )
    ALTER TABLE cca_user
        DROP CONSTRAINT uk_cca_user_email;

IF EXISTS ( SELECT *
            FROM sys.indexes
            WHERE name = 'uk_cca_user_email' AND object_id = OBJECT_ID ( 'dbo.cca_user' ) )
    DROP INDEX uk_cca_user_email
        ON cca_user;