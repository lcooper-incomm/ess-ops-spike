INSERT INTO session_type_session_component (session_type_id, session_component_id)
VALUES ((SELECT id FROM session_type WHERE name = 'LAW_ENFORCEMENT'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT'));