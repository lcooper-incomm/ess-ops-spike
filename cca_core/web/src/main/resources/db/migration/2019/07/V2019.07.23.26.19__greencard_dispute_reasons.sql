ALTER TABLE action_reason_code_mapping
    ALTER COLUMN platform_code VARCHAR( 64 );

GO

INSERT INTO action_reason_code_mapping ( code, display_value, type, platform, is_active )
VALUES ( 'UNAUTHORIZED_TRANSACTION', 'Unauthorized Transaction', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'ATM_NON_DISPENSE', 'ATM Non-Dispense', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'ATM_PARTIAL_DISPENSE', 'ATM Partial Dispense', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'DUPLICATE_TRANSACTION', 'Duplicate Transaction', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'PAID_BY_OTHER_MEANS', 'Paid by Other Means', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'INCORRECT_AMOUNT_CHARGED', 'Incorrect Amount Charged', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'CANCELLED_SERVICES', 'Cancelled Services', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'MERCHANDISE_DEFECTIVE', 'Merchandise Defective', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'MERCHANDISE_NOT_AS_DESCRIBED', 'Merchandise Not As Described', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'MERCHANDISE_NOT_RECEIVED', 'Merchandise Not Received', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'REFUND_NOT_RECEIVED', 'Refund Not Received', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'SERVICES_NOT_RECEIVED', 'Services Not Received', 'RAISE_DISPUTE', 'GREENCARD', 1 ),
       ( 'TRANSACTION_DECLINED', 'Transaction Declined', 'RAISE_DISPUTE', 'GREENCARD', 1 );
