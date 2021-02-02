-- Add is_inactive column
ALTER TABLE complaint_category
ADD is_inactive BIT DEFAULT 0;
GO

UPDATE complaint_category
SET is_inactive = 0;
GO

CREATE PROCEDURE addOrActivateComplaintCategory(
    @name VARCHAR(64),
    @bankId BIGINT
)
AS
    IF EXISTS (SELECT id FROM complaint_category WHERE [name] = @name)
        UPDATE complaint_category
        SET is_inactive = 0
        WHERE [name] = @name
        AND bank_id = @bankId;
    ELSE
        INSERT INTO complaint_category ([name], bank_id)
        VALUES (@name, @bankId);
GO

DECLARE @metabankId BIGINT = (SELECT id FROM bank WHERE system_value = 'METABANK');

-- Deactivate existing metabank categories
UPDATE complaint_category
SET is_inactive = 1
WHERE bank_id = @metabankId;

-- Insert new metabank categories
EXECUTE addOrActivateComplaintCategory 'Trouble Using Card', @metabankId;
EXECUTE addOrActivateComplaintCategory 'Physical Card/Refund Check', @metabankId;
EXECUTE addOrActivateComplaintCategory 'CIP/Verification', @metabankId;
EXECUTE addOrActivateComplaintCategory 'Transaction/Balance', @metabankId;
EXECUTE addOrActivateComplaintCategory 'Website/Mobile App/IVR', @metabankId;
EXECUTE addOrActivateComplaintCategory 'Dispute', @metabankId;
EXECUTE addOrActivateComplaintCategory 'Fraud', @metabankId;
EXECUTE addOrActivateComplaintCategory 'Adding Money', @metabankId;
GO

DROP PROCEDURE addOrActivateComplaintCategory