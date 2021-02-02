
-- Lookup session type
DECLARE @sessionTypeId int;
SELECT @sessionTypeId=id from session_type where [name]='PRIVACY_REQUEST';

INSERT INTO session_type_session_status (session_type_id, session_status_id) VALUES
	(@sessionTypeId, (select id from session_status where [name]='ACTIVE')),
	(@sessionTypeId, (select id from session_status where [name]='CALLBACK')),
	(@sessionTypeId, (select id from session_status where [name]='CANCELLED')),
	(@sessionTypeId, (select id from session_status where [name]='CLOSED')),
	(@sessionTypeId, (select id from session_status where [name]='WORKING'));
