EXECUTE add_permission 'SESSION_TYPE_ENCOR_TRAINING', 'Work Session Type - Encor Training',
                       'Ability to create an Encor Training Session';
EXECUTE add_permission 'RAISE_SESSION_TYPE_ENCOR_TRAINING', 'Raise Session Type - Encor Training',
                       'Ability to create an Encor Training Session';

DECLARE @permissionId BIGINT = (SELECT id
                                FROM permission
                                WHERE [system_name] = 'SESSION_TYPE_ENCOR_TRAINING');
DECLARE @caseId BIGINT = (SELECT id
                          FROM [session_class]
                          WHERE [name] = 'CASE');

INSERT INTO [session_type] ([name], [session_class_id], [permission_id])
values ('ENCOR_TRAINING', @caseId, @permissionId);
DECLARE @sessionTypeId BIGINT = (SELECT id
                                 FROM [session_type]
                                 WHERE [name] = 'ENCOR_TRAINING');

DECLARE @sessionComponentId BIGINT = (SELECT id
                                      FROM [session_component]
                                      WHERE [name] = 'ENCOR_COMPONENT');
INSERT INTO [session_type_session_component] ([session_type_id], [session_component_id])
values (@sessionTypeId, @sessionComponentId);

SET @sessionComponentId = (SELECT id
                           FROM [session_component]
                           WHERE name = 'CUSTOMER_COMPONENT');
INSERT INTO [session_type_session_component] ([session_type_id], [session_component_id])
values (@sessionTypeId, @sessionComponentId);

DECLARE @queueId BIGINT = (SELECT id
                           FROM [session_queue]
                           WHERE i3_name = 'ENCOR');

INSERT INTO [session_queue_session_type] (session_queue_id, session_type)
VALUES (@queueId, 'ENCOR_TRAINING');

INSERT INTO [session_type_session_status] (session_type_id, session_status_id)
VALUES (@sessionTypeId, (SELECT id FROM [session_status] WHERE [name] = 'ACTIVE')),
       (@sessionTypeId, (SELECT id FROM [session_status] WHERE [name] = 'CLOSED'));