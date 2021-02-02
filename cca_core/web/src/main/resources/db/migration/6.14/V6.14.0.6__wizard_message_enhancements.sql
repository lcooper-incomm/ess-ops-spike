CREATE PROCEDURE default_wizard_messages_by_page_name

        @wizardKey VARCHAR(64),
        @pageName  VARCHAR(64)

AS

    INSERT INTO wizard_message (wizard_key, page_name, message_type, message) VALUES
        ( @wizardKey, @pageName, 'TITLE', '' ),
        ( @wizardKey, @pageName, 'SHORT_TITLE', '' ),
        ( @wizardKey, @pageName, 'HEADER', '' ),
        ( @wizardKey, @pageName, 'SUBHEADER', '' ),
        ( @wizardKey, @pageName, 'INSTRUCTIONS', '' ),
        ( @wizardKey, @pageName, 'ALERT', '' ),
        ( @wizardKey, @pageName, 'FOOTER', '' );
    ;
GO

CREATE PROCEDURE set_wizard_message_by_page_name

        @wizardKey      VARCHAR(64),
        @messageType    VARCHAR(64),
        @pageName       VARCHAR(64),
        @message        TEXT = NULL,
        @failureMessage TEXT = NULL

AS
    UPDATE wizard_message
    SET message         = @message,
        failure_message = @failureMessage
    WHERE wizard_key = @wizardKey
          AND message_type = @messageType
          AND page_name = @pageName;
    ;
GO

ALTER TABLE wizard_message
    DROP CONSTRAINT uk_wizard_messages;

GO

ALTER TABLE wizard_message
    ALTER COLUMN page INTEGER NULL;

GO

ALTER TABLE wizard_message
    ADD CONSTRAINT uk_wizard_messages UNIQUE (wizard_key, message_type, page, page_name);

GO