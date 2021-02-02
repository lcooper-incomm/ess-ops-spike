INSERT INTO session_status (name)
VALUES ('ABANDONED'),
    ('ACTIVATION_REQUEST'),
    ('CANCELLED'),
    ('CHARGEBACK_PENDING'),
    ('DISCONNECTED'),
    ('DOCS_RECEIVED'),
    ('FORCED_CLOSED'),
    ('OFAC_PENDING'),
    ('QUEUED'),
    ('REFUND_REQUESTED'),
    ('REPLACEMENT_CARD_ACTIVATION'),
    ('REPLACEMENT_REQUESTED'),
    ('VMS_SESSION_FAILED'),
    ('WRAPPEDUP');

GO

DECLARE
    @generalTypeId BIGINT = ( SELECT id
                              FROM session_type
                              WHERE name = 'GENERAL' );
DECLARE
    @callTypeId BIGINT = ( SELECT id
                           FROM session_type
                           WHERE name = 'CALL' );
DECLARE
    @badCreditTypeId BIGINT = ( SELECT id
                                FROM session_type
                                WHERE name = 'BAD_CREDIT' );
DECLARE
    @consumedCardTypeId BIGINT = ( SELECT id
                                   FROM session_type
                                   WHERE name = 'CONSUMED_CARD' );
DECLARE
    @disputeTypeId BIGINT = ( SELECT id
                              FROM session_type
                              WHERE name = 'DISPUTE' );
DECLARE
    @ecommFraudTypeId BIGINT = ( SELECT id
                                 FROM session_type
                                 WHERE name = 'ECOMM_FRAUD' );
DECLARE
    @lawEnforcementTypeId BIGINT = ( SELECT id
                                     FROM session_type
                                     WHERE name = 'LAW_ENFORCEMENT' );
DECLARE
    @damagedPinsTypeId BIGINT = ( SELECT id
                                  FROM session_type
                                  WHERE name = 'DAMAGED_PINS' );
DECLARE
    @paypalRedemptionIssueTypeId BIGINT = ( SELECT id
                                            FROM session_type
                                            WHERE name = 'PAYPAL_REDEMPTION_ISSUE' );
DECLARE
    @merchantFraudId BIGINT = ( SELECT id
                                FROM session_type
                                WHERE name = 'MERCHANT_FRAUD' );
DECLARE
    @otherFraudTypeId BIGINT = ( SELECT id
                                 FROM session_type
                                 WHERE name = 'OTHER_FRAUD' );

DECLARE
    @abandonedStatusId BIGINT = ( SELECT id
                                  FROM session_status
                                  WHERE name = 'ABANDONED' );
DECLARE
    @activationRequestStatusId BIGINT = ( SELECT id
                                          FROM session_status
                                          WHERE name = 'ACTIVATION_REQUEST' );
DECLARE
    @cancelledStatusId BIGINT = ( SELECT id
                                  FROM session_status
                                  WHERE name = 'CANCELLED' );
DECLARE
    @chargebackPendingStatusId BIGINT = ( SELECT id
                                          FROM session_status
                                          WHERE name = 'CHARGEBACK_PENDING' );
DECLARE
    @disconnectedStatusId BIGINT = ( SELECT id
                                     FROM session_status
                                     WHERE name = 'DISCONNECTED' );
DECLARE
    @docsReceivedStatusId BIGINT = ( SELECT id
                                     FROM session_status
                                     WHERE name = 'DOCS_RECEIVED' );
DECLARE
    @forcedClosedStatusId BIGINT = ( SELECT id
                                     FROM session_status
                                     WHERE name = 'FORCED_CLOSED' );
DECLARE
    @ofacPendingStatusId BIGINT = ( SELECT id
                                    FROM session_status
                                    WHERE name = 'OFAC_PENDING' );
DECLARE
    @queuedStatusId BIGINT = ( SELECT id
                               FROM session_status
                               WHERE name = 'QUEUED' );
DECLARE
    @refundRequestedStatusId BIGINT = ( SELECT id
                                        FROM session_status
                                        WHERE name = 'REFUND_REQUESTED' );
DECLARE
    @replacementCardActivationStatusId BIGINT = ( SELECT id
                                                  FROM session_status
                                                  WHERE name = 'REPLACEMENT_CARD_ACTIVATION' );
DECLARE
    @replacementRequestedStatusId BIGINT = ( SELECT id
                                             FROM session_status
                                             WHERE name = 'REPLACEMENT_REQUESTED' );
DECLARE
    @vmsSessionFailedStatusId BIGINT = ( SELECT id
                                         FROM session_status
                                         WHERE name = 'VMS_SESSION_FAILED' );
DECLARE
    @wrappedUpStatusId BIGINT = ( SELECT id
                                  FROM session_status
                                  WHERE name = 'WRAPPEDUP' );

INSERT INTO session_type_session_status (session_type_id, session_status_id)
VALUES (@badCreditTypeId, @activationRequestStatusId),
    (@consumedCardTypeId, @activationRequestStatusId),
    (@disputeTypeId, @activationRequestStatusId),
    (@ecommFraudTypeId, @activationRequestStatusId),
    (@lawEnforcementTypeId, @activationRequestStatusId),
    (@damagedPinsTypeId, @activationRequestStatusId),
    (@paypalRedemptionIssueTypeId, @activationRequestStatusId),
    (@merchantFraudId, @activationRequestStatusId),
    (@otherFraudTypeId, @activationRequestStatusId),
    (@badCreditTypeId, @chargebackPendingStatusId),
    (@consumedCardTypeId, @chargebackPendingStatusId),
    (@disputeTypeId, @chargebackPendingStatusId),
    (@ecommFraudTypeId, @chargebackPendingStatusId),
    (@lawEnforcementTypeId, @chargebackPendingStatusId),
    (@damagedPinsTypeId, @chargebackPendingStatusId),
    (@paypalRedemptionIssueTypeId, @chargebackPendingStatusId),
    (@merchantFraudId, @chargebackPendingStatusId),
    (@otherFraudTypeId, @chargebackPendingStatusId),
    (@badCreditTypeId, @docsReceivedStatusId),
    (@consumedCardTypeId, @docsReceivedStatusId),
    (@disputeTypeId, @docsReceivedStatusId),
    (@ecommFraudTypeId, @docsReceivedStatusId),
    (@lawEnforcementTypeId, @docsReceivedStatusId),
    (@damagedPinsTypeId, @docsReceivedStatusId),
    (@paypalRedemptionIssueTypeId, @docsReceivedStatusId),
    (@merchantFraudId, @docsReceivedStatusId),
    (@otherFraudTypeId, @docsReceivedStatusId),
    (@badCreditTypeId, @ofacPendingStatusId),
    (@consumedCardTypeId, @ofacPendingStatusId),
    (@disputeTypeId, @ofacPendingStatusId),
    (@ecommFraudTypeId, @ofacPendingStatusId),
    (@lawEnforcementTypeId, @ofacPendingStatusId),
    (@damagedPinsTypeId, @ofacPendingStatusId),
    (@paypalRedemptionIssueTypeId, @ofacPendingStatusId),
    (@merchantFraudId, @ofacPendingStatusId),
    (@otherFraudTypeId, @ofacPendingStatusId),
    (@badCreditTypeId, @refundRequestedStatusId),
    (@consumedCardTypeId, @refundRequestedStatusId),
    (@disputeTypeId, @refundRequestedStatusId),
    (@ecommFraudTypeId, @refundRequestedStatusId),
    (@lawEnforcementTypeId, @refundRequestedStatusId),
    (@damagedPinsTypeId, @refundRequestedStatusId),
    (@paypalRedemptionIssueTypeId, @refundRequestedStatusId),
    (@merchantFraudId, @refundRequestedStatusId),
    (@otherFraudTypeId, @refundRequestedStatusId),
    (@badCreditTypeId, @replacementCardActivationStatusId),
    (@consumedCardTypeId, @replacementCardActivationStatusId),
    (@disputeTypeId, @replacementCardActivationStatusId),
    (@ecommFraudTypeId, @replacementCardActivationStatusId),
    (@lawEnforcementTypeId, @replacementCardActivationStatusId),
    (@damagedPinsTypeId, @replacementCardActivationStatusId),
    (@paypalRedemptionIssueTypeId, @replacementCardActivationStatusId),
    (@merchantFraudId, @replacementCardActivationStatusId),
    (@otherFraudTypeId, @replacementCardActivationStatusId),
    (@badCreditTypeId, @replacementRequestedStatusId),
    (@consumedCardTypeId, @replacementRequestedStatusId),
    (@disputeTypeId, @replacementRequestedStatusId),
    (@ecommFraudTypeId, @replacementRequestedStatusId),
    (@lawEnforcementTypeId, @replacementRequestedStatusId),
    (@damagedPinsTypeId, @replacementRequestedStatusId),
    (@paypalRedemptionIssueTypeId, @replacementRequestedStatusId),
    (@merchantFraudId, @replacementRequestedStatusId),
    (@otherFraudTypeId, @replacementRequestedStatusId);