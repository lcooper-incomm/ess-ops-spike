EXECUTE add_permission 'SESSION_TYPE_COMPLAINT', 'Work Session Type - Complaint', 'Ability to work a Complaint Case.';
EXECUTE add_permission 'RAISE_SESSION_TYPE_COMPLAINT', 'Raise Session Type - Complaint',
        'Ability to raise a Complaint Case.';

GO

DECLARE
    @caseSessionClassId BIGINT = (SELECT id
                                  FROM session_class
                                  WHERE name = 'CASE');
DECLARE
    @permissionId BIGINT = (SELECT id
                            FROM permission
                            WHERE system_name = 'SESSION_TYPE_COMPLAINT');

INSERT INTO session_type (name, session_class_id, permission_id)
VALUES ('COMPLAINT', @caseSessionClassId, @permissionId);

INSERT INTO session_component (name)
VALUES ('COMPLAINT_COMPONENT');

GO

DECLARE
    @sessionTypeId BIGINT = (SELECT id
                             FROM session_type
                             WHERE name = 'COMPLAINT');
DECLARE
    @generalComponentId BIGINT = (SELECT id
                                  FROM session_component
                                  WHERE name = 'GENERAL_COMPONENT');
DECLARE
    @complaintComponentId BIGINT = (SELECT id
                                    FROM session_component
                                    WHERE name = 'COMPLAINT_COMPONENT');

INSERT INTO session_type_session_component (session_type_id, session_component_id)
VALUES (@sessionTypeId, @generalComponentId),
    (@sessionTypeId, @complaintComponentId);

INSERT INTO session_type_session_status (session_type_id, session_status_id)
VALUES (@sessionTypeId, (SELECT id FROM session_status WHERE name = 'ACTIVE')),
    (@sessionTypeId, (SELECT id FROM session_status WHERE name = 'CLOSED'));
