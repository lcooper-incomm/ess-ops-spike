DECLARE @componentId BIGINT = ( SELECT id
                                FROM session_component
                                WHERE name = 'DOCUMENTS_COMPONENT' );

INSERT INTO session_type_session_component (session_type_id, session_component_id)
VALUES (( SELECT id FROM session_type WHERE name = 'BAD_CREDIT' ), @componentId),
(( SELECT id FROM session_type WHERE name = 'CONSUMED_CARD' ), @componentId),
(( SELECT id FROM session_type WHERE name = 'DAMAGED_PINS' ), @componentId),
    (( SELECT id FROM session_type WHERE name = 'DISPUTE' ), @componentId),
    (( SELECT id FROM session_type WHERE name = 'ECOMM_FRAUD' ), @componentId),
(( SELECT id FROM session_type WHERE name = 'LAW_ENFORCEMENT' ), @componentId),
(( SELECT id FROM session_type WHERE name = 'MERCHANT_FRAUD' ), @componentId),
(( SELECT id FROM session_type WHERE name = 'PAYPAL_REDEMPTION_ISSUE' ), @componentId);