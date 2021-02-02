DECLARE
    @otherSessionTypeId BIGINT = ( SELECT id
                                   FROM session_type
                                   WHERE name = 'OTHER_FRAUD' );

INSERT INTO session_type_session_component (session_type_id, session_component_id)
VALUES (@otherSessionTypeId, ( SELECT id FROM session_component WHERE name = 'LAW_ENFORCEMENT_COMPONENT' )),
(@otherSessionTypeId, ( SELECT id FROM session_component WHERE name = 'MERCHANT_COMPONENT' )),
(@otherSessionTypeId, ( SELECT id FROM session_component WHERE name = 'RECEIPT_COMPONENT' ));
