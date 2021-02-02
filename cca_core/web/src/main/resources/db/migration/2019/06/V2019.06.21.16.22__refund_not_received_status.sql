INSERT INTO session_status (name)
VALUES ('REFUND_NOT_RECEIVED');

GO

DECLARE
    @statusId BIGINT = (SELECT id
                        FROM session_status
                        WHERE name = 'REFUND_NOT_RECEIVED');

INSERT INTO session_type_session_status (session_type_id, session_status_id)
VALUES ((SELECT id FROM session_type WHERE name = 'BAD_CREDIT'), @statusId),
    ((SELECT id FROM session_type WHERE name = 'CONSUMED_CARD'), @statusId),
    ((SELECT id FROM session_type WHERE name = 'DISPUTE'), @statusId),
    ((SELECT id FROM session_type WHERE name = 'ECOMM_FRAUD'), @statusId),
((SELECT id FROM session_type WHERE name = 'LAW_ENFORCEMENT'), @statusId),
    ((SELECT id FROM session_type WHERE name = 'DAMAGED_PINS'), @statusId),
((SELECT id FROM session_type WHERE name = 'PAYPAL_REDEMPTION_ISSUE'), @statusId),
    ((SELECT id FROM session_type WHERE name = 'MERCHANT_FRAUD'), @statusId),
    ((SELECT id FROM session_type WHERE name = 'OTHER_FRAUD'), @statusId);
