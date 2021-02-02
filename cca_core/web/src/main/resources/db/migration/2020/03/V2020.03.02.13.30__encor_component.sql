
ALTER TABLE [cca_session] ADD [summary] varchar(64) NULL;

CREATE TABLE [encor_component] (
    id                     BIGINT IDENTITY (1,1) NOT NULL,
    session_id             BIGINT                NOT NULL,
    priority               VARCHAR(16)           NULL,
    customer_id            VARCHAR(32)           NULL,
    order_id               VARCHAR(32)           NULL
    CONSTRAINT pk_encor_component PRIMARY KEY (id),
    CONSTRAINT fk_encor_component_session_id FOREIGN KEY (session_id) REFERENCES cca_session(id)
);

CREATE INDEX idx_encor_component_session_id ON encor_component(session_id);

EXECUTE add_permission 'SESSION_TYPE_ENCOR', 'Work Session Type - Encor', 'Ability to create an Encor Session';

DECLARE @permissionId BIGINT = (SELECT id FROM permission WHERE [system_name] = 'SESSION_TYPE_ENCOR');
DECLARE @caseId BIGINT = (SELECT id FROM [session_class] WHERE [name] = 'CASE');

INSERT INTO [session_type] ([name], [session_class_id], [permission_id]) values ('ENCOR', @caseId, @permissionId);
DECLARE @sessionTypeId BIGINT = (SELECT id FROM [session_type] WHERE [name] = 'ENCOR');

INSERT INTO [session_component] ([name]) values ('ENCOR_COMPONENT');
DECLARE @sessionComponentId BIGINT = (SELECT id FROM [session_component] WHERE [name] = 'ENCOR_COMPONENT');

INSERT INTO [session_type_session_component] ([session_type_id], [session_component_id]) values (@sessionTypeId, @sessionComponentId);

SET @sessionComponentId = (SELECT id FROM [session_component] WHERE name = 'CUSTOMER_COMPONENT');
INSERT INTO [session_type_session_component] ([session_type_id], [session_component_id]) values (@sessionTypeId, @sessionComponentId);

INSERT INTO [session_queue] (i3_name, display_name, [type], locale, system_name, permission_id, is_locked)
  VALUES ('ENCOR', 'Encor', 'NONE', 'NONE', 'ENCOR', @permissionId, 0);
DECLARE @queueId BIGINT = (SELECT id FROM [session_queue] WHERE i3_name = 'ENCOR');

INSERT INTO [session_queue_session_type] (session_queue_id, session_type) VALUES (@queueId, 'ENCOR');

INSERT INTO [wrap_up_code_category] (i3_name, display_name) VALUES ('ENCOR', 'Encor');
DECLARE @categoryId BIGINT = (SELECT id FROM [wrap_up_code_category] WHERE display_name = 'Encor');

INSERT INTO [queue_wrap_up_code_category] (queue_id, wrap_up_code_category_id) VALUES (@queueId, @categoryId);

INSERT INTO [wrap_up_code] (i3_name, display_name) VALUES ('ENCOR', 'Encor');
DECLARE @wrapUpId BIGINT = (SELECT id FROM [wrap_up_code] WHERE display_name = 'Encor');

INSERT INTO [wrap_up_code_category_wrap_up_code] (category_id, code_id) VALUES (@categoryId, @wrapUpId);

INSERT INTO [session_type_session_status] (session_type_id, session_status_id) VALUES
  (@sessionTypeId, (SELECT id FROM [session_status] WHERE [name] = 'ACTIVE')),
  (@sessionTypeId, (SELECT id FROM [session_status] WHERE [name] = 'CLOSED'));
