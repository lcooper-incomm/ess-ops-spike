DELETE
FROM session_type_session_status
WHERE session_status_id = ( SELECT id FROM session_status WHERE name = 'REPLACEMENT' );

DELETE
FROM session_status
WHERE name = 'REPLACEMENT';