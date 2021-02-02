-- Add MasterCard bank

DECLARE @ccaAdminId BIGINT = (
    SELECT id
    FROM cca_user
    WHERE username = 'cca_admin'
);

INSERT INTO bank (display_value, system_value, created_by, created_date, modified_by, modified_date)
VALUES ('MasterCard', 'MASTERCARD', @ccaAdminId, GETDATE(), @ccaAdminId, GETDATE())

-- Add complaint permission

EXECUTE add_permission 'CREATE_COMPLAINT_MASTERCARD', 'Create Complaint: MasterCard',
                       'Ability to create a complaint for this bank.';

-- Add complaint categories for MasterCard

DECLARE @mastercardBankId BIGINT = (
 SELECT id
 FROM bank
 WHERE system_value = 'MASTERCARD'
);

INSERT INTO complaint_category ([name], bank_id) VALUES ('Unfairness/Alleged Discrimination', @mastercardBankId);
INSERT INTO complaint_category ([name], bank_id) VALUES ('Offer Issues/Including Design Performance', @mastercardBankId);
INSERT INTO complaint_category ([name], bank_id) VALUES ('Violation of Law', @mastercardBankId);
INSERT INTO complaint_category ([name], bank_id) VALUES ('Fees', @mastercardBankId);
INSERT INTO complaint_category ([name], bank_id) VALUES ('Unauthorized transactions or fraud', @mastercardBankId);
INSERT INTO complaint_category ([name], bank_id) VALUES ('Advertising, marketing or disclosures', @mastercardBankId);
INSERT INTO complaint_category ([name], bank_id) VALUES ('Customer Service', @mastercardBankId);

-- Copy other related complaint data from MetaBank to MasterCard

DECLARE @metabankId BIGINT = (
 SELECT id
 FROM bank
 WHERE system_value = 'METABANK'
);

INSERT INTO complaint_cause ([name], bank_id)
SELECT [name], @mastercardBankId
FROM complaint_cause
WHERE bank_id = @metabankId;

INSERT INTO complaint_department ([name], bank_id)
SELECT [name], @mastercardBankId
FROM complaint_department
WHERE bank_id = @metabankId;

INSERT INTO complaint_discrimination_type ([name], bank_id)
SELECT [name], @mastercardBankId
FROM complaint_discrimination_type
WHERE bank_id = @metabankId;

INSERT INTO complaint_source ([name], bank_id)
SELECT [name], @mastercardBankId
FROM complaint_source
WHERE bank_id = @metabankId;

INSERT INTO complaint_type ([name], bank_id)
SELECT [name], @mastercardBankId
FROM complaint_type
WHERE bank_id = @metabankId;

-- Add queue for MasterCard complaint

EXECUTE add_permission 'QUEUE_COMPLAINT_MASTERCARD', 'Queue - Complaint: MasterCard', 'Ability to work this queue.';

GO
DECLARE
    @mastercardPermissionId BIGINT = (SELECT id
                                    FROM permission
                                    WHERE system_name = 'QUEUE_COMPLAINT_MASTERCARD');

INSERT INTO session_queue (i3_name, active, display_name, autowrap_time, autoclose, type, locale, system_name, permission_id, is_locked)
VALUES ('COMPLAINT_MASTERCARD', 1, 'Complaint: MasterCard', 30000, 1, 'NONE', 'FRAUD', 'COMPLAINT_MASTERCARD', @mastercardPermissionId, 0);

GO

DECLARE @mastercardQueueId BIGINT = (
    SELECT id
    FROM session_queue
    WHERE system_name = 'COMPLAINT_MASTERCARD'
);

DECLARE @complaintCategoryId BIGINT = (
    SELECT id
    FROM wrap_up_code_category
    WHERE i3_name = 'COMPLAINT'
);

INSERT INTO session_queue_session_type (session_queue_id, session_type)
VALUES (@mastercardQueueId, 'COMPLAINT');

INSERT INTO queue_wrap_up_code_category (queue_id, wrap_up_code_category_id)
VALUES (@mastercardQueueId, @complaintCategoryId);

-- Add columns to complaint component: priority, summary

ALTER TABLE complaint_component
ADD
    priority BIGINT,
    summary VARCHAR(500);