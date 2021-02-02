INSERT INTO session_component (name)
VALUES ('DISPUTE_COMPONENT');

INSERT INTO session_type_session_component (session_type_id, session_component_id)
VALUES (( SELECT id FROM session_type WHERE name = 'DISPUTE' ),
        ( SELECT id FROM session_component WHERE name = 'DISPUTE_COMPONENT' ));
