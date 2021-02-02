
-- Permission for working this new case type
EXECUTE add_permission 'SESSION_TYPE_PRIVACY_REQUEST', 'Work Session Type - Privacy Request', 'Ability to work a Privacy Request Session';

-- Lookups for later inserts
DECLARE @sessionClassId int;
SELECT @sessionClassId=id from session_class where [name]='CASE';

DECLARE @permissionId int;
SELECT @permissionId=id from permission where system_name='SESSION_TYPE_PRIVACY_REQUEST';

-- Session queue, category, codes and type
INSERT INTO session_queue ( i3_name,
                            active,
                            display_name,
                            autowrap_time,
                            autoclose,
                            [type],
                            locale,
                            system_name,
                            permission_id,
                            is_locked )
VALUES ( '003_PERSONAL_INFO_REQUESTED',
         1,
         'Personal Info Requested',
         30000,
         0,
         'NONE',
         'NONE',
         '003_PERSONAL_INFO_REQUESTED',
         @permissionId,
         0 );

INSERT INTO session_type ([name], session_class_id, permission_id) values ('PRIVACY_REQUEST', @sessionClassId, @permissionId);

INSERT INTO session_component ([name]) values ('PRIVACY_COMPONENT');

INSERT INTO session_type_session_component (session_type_id, session_component_id) values (
    (select id from session_type where [name]='PRIVACY_REQUEST'),
    (select id from session_component where [name]='PRIVACY_COMPONENT')
);

INSERT INTO session_queue_session_type (session_queue_id, session_type) values (
    (select id from [session_queue] where [system_name]='003_PERSONAL_INFO_REQUESTED'),
    'PRIVACY_REQUEST'
);

INSERT INTO wrap_up_code_category (i3_name, active, display_name) VALUES ('USER_REQUEST', 1, 'User Request');

INSERT INTO queue_wrap_up_code_category (queue_id, wrap_up_code_category_id) VALUES
    ((select id from session_queue where system_name='003_PERSONAL_INFO_REQUESTED'),
    (select id from wrap_up_code_category where i3_name='USER_REQUEST'));

INSERT INTO wrap_up_code (i3_name, active, display_name, locked) VALUES ('COMPLETED', 1, 'Completed', 0);

INSERT INTO wrap_up_code_category_wrap_up_code (category_id, code_id) VALUES
    ((select id from wrap_up_code_category where i3_name='USER_REQUEST'),
    (select id from wrap_up_code where i3_name='COMPLETED'));

-- New session related table
CREATE TABLE privacy_request_component (
    id                BIGINT IDENTITY (1,1) NOT NULL,
    session_id        BIGINT                NOT NULL,
    first_name        VARCHAR(64)           NOT NULL,
    last_name         VARCHAR(64)           NOT NULL,
    line_1            VARCHAR(64)           NULL,
    line_2            VARCHAR(64)           NULL,
    city              VARCHAR(64)           NULL,
    state             VARCHAR(64)           NULL,
    postal_code       VARCHAR(64)           NULL,
    phone_number      VARCHAR(64)           NULL,
    email             VARCHAR(64)           NULL,
    job_title         VARCHAR(64)           NULL,
    account           VARCHAR(64)           NULL,
    comment           VARCHAR(500)          NULL,
    CONSTRAINT pk_privacy_request_component PRIMARY KEY (id),
    CONSTRAINT fk_privacy_request_component_session_id FOREIGN KEY (session_id) REFERENCES cca_session(id)
);
