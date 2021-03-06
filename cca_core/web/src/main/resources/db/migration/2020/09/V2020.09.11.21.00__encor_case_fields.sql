
CREATE TABLE encor_types (
	id int identity(1, 1),
	primary_type varchar(16) NOT NULL,
	[type] varchar(64) NOT NULL,
	subtype varchar(64) NOT NULL,
    is_active  BIT NOT NULL DEFAULT 1,
    created_by    BIGINT                NOT NULL,
    created_date  DATETIME2             NOT NULL,
    deleted_by    BIGINT,
    deleted_date  DATETIME2,
    modified_by   BIGINT                NOT NULL,
    modified_date DATETIME2             NOT NULL,
    CONSTRAINT pk_encor_types PRIMARY KEY CLUSTERED (id)
);

ALTER TABLE encor_component ADD issue_type int NULL;
ALTER TABLE encor_component ADD complaint_type int NULL;

ALTER TABLE [encor_component]
  ADD CONSTRAINT fk_encor_component_issue_type FOREIGN KEY ([issue_type]) references [encor_types] ([id]);
ALTER TABLE [encor_component]
  ADD CONSTRAINT fk_encor_component_complaint_type FOREIGN KEY ([complaint_type]) references [encor_types] ([id]);

DECLARE
    @ccaAdminUserId BIGINT = (SELECT id
                              FROM cca_user
                              WHERE username = 'cca_admin');

INSERT INTO encor_types (primary_type, type, subtype, created_by, created_date, modified_by, modified_date) VALUES
    ('ISSUE', 'Account Services', 'Internet Banking Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Account Services', 'Other (Please Note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Account Services', 'Rewards Navigation Assistance', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Account Services', 'Website Error/Technical Issue', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Complaint', 'Complaint', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Fraud', 'Cash Rewards', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Fraud', 'Gift card/Cert/E-cert', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Fraud', 'Merchandise', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Fraud', 'Other (please note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Fraud', 'Travel', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Fraud Review', 'Red Order', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Fraud Review', 'Yellow Order', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'How Can I Use My Points', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'How Do I Earn Points', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'How Does Program Work', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'Point Value/Conversion Rate', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'Points Expiration', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'Points Transfer', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'Return/Cancellation Policy', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'General Program', 'Reward Program Mailing', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Goodwill', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Lost/Stolen Adjustment', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Other (Please Note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Point Balance Discrepancy', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Point Balance Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Point Bonus Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Point Promotion Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Point Rebate Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Point Adjustment (not GWor L/S)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Point Transfer', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Point Bank', 'Points Expired', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Address Verification Required', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Auto Loan Payment Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Cancellation Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Checking Deposit Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Home Equity Payment Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Incorrect Account - In-Kind', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'In-Kind Reward Reject', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Mortgage Payment Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Order Status Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Other (Please Note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Personal Loan Payment Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Savings Deposit Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Cash Rewards', 'Statement Credit Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Charitable Reward', 'Cancellation Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Charitable Reward', 'Order Status Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Charitable Reward', 'Other (Please Note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Address Verification Required', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Backorder/Out of Stock', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Cancellation Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'GC/EC/Ecert - no value/not active', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Incorrect Item Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Item Damaged', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Item Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Item Substitution', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Long Term BO/Discontinued', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Order Status Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior redemption - Gift card/Cert/E-cert', 'Other (Please Note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Address Verification Required', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Backorder/Out of Stock', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Cancellation Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Incorrect Item Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Item Damaged', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Item Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Item Substitution', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Long Term BO/Discontinued', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Order Status Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Merchandise', 'Other (Please Note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Address Verification Required', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Backorder/Out of Stock/Discontinued', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Cancellation Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Incorrect Item Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Item Not Received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Item Substitution', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Order Status Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - NFL Experience', 'Other (Please Note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Additional Taxes/Fees', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Address Verification Required', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Booking Modification', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Booking Status/Confirmation', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Booking Unavailable at Location', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Cancellation Exception', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Cancellation Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Cancelled with supplier fees', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Full Charge by Supplier', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Incorrect Online Reward Details', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Other (please note)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Request to Waive Fees', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Prior Redemption - Travel', 'Travel Inventory Inquiry', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Redemption Processed', 'Did Not Want to Redeem Online', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Redemption Processed', 'Online Redemption Failed', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Unable to Assist', 'Could Not Assist/Did Not Handle', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Unable to Assist', 'Hang Up/Misdirect', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Unable to Assist', 'Referred to Client', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Unable to Assist', 'Referred to Servicing Partners', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Website Initiated', 'General Inquiry (Web)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Website Initiated', 'Item Not Received (Web)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Website Initiated', 'Order Dispute (Web)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Website Initiated', 'Point Bank Inquiry (Web)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('ISSUE', 'Website Initiated', 'Point Inquiry (Web)', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Cash Rewards', 'Cancelled reward and points not returned', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Cash Rewards', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Cash Rewards', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Cash Rewards', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Cash Rewards', 'Rwd never received/not posted to account', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Charitable Reward', 'Cancelled reward and points not returned', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Charitable Reward', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Charitable Reward', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Charitable Reward', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Charitable Reward', 'Pts applied incorrectly/charged for rwd', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Charitable Reward', 'Reward never received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Charitable Reward', 'Reward outside of delivery range', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'CM Service', 'Agent displayed discriminatory behavior', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'CM Service', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'CM Service', 'CM asks to speak to TL/TM - agent issue', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'CM Service', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'CM Service', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'Cancelled reward and points not returned', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'CM unhappy with reward', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'CM upset over item substitution', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'No availability on advertised reward', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'No value on Gift card', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'Product complaint - damaged/defective', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'Pts applied incorrectly/charged for rwd', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'Reward never received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Gift Card/Cert/E-Cert', 'Reward outside of delivery range', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'Cancelled reward and points not returned', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'CM unhappy with reward', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'No availability on advertised reward', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'Product complaint - damaged', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'Pts applied incorrectly/charged for rwd', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'Reward never received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Merchandise', 'Reward outside of delivery range', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'CM states pts not transfered to new card', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'CM upset regarding points forfeiture', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'CM upset that points expired', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'Point transfer discrepancy', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'Points adjustment not received', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'Points not earned as advertised', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Points', 'Points not received for promo/bonus offer', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Rewards Program', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Rewards Program', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Rewards Program', 'Confused/dissatisfied w/burn ratio', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Rewards Program', 'Confused/dissatisfied w/pgm earn ratio', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Rewards Program', 'Confused/dissatisfied w/redemption optns', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Rewards Program', 'Confused/dissatisfied w/reward pgm fees', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Rewards Program', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Air/Hotel/Car not available in program', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Booking cancelled/points not returned', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Booking not found when CM went to use', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Charged more points than advertised', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'CM alleges unfair, deceptive practices', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'CM threatened legal actions / BB/ Social  Media', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'CM unhappy with travel experience', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Could not complete booking online', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Itinerary modification not made by CM', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'No availability on advertised reward', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Other', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
	('COMPLAINT', 'Travel', 'Pts applied incorrectly/charged for bkng', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP);
