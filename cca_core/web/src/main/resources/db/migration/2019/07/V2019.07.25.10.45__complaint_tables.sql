CREATE TABLE bank (
    id            BIGINT IDENTITY (1,1) NOT NULL,
    display_value VARCHAR(64)           NOT NULL,
    system_value  VARCHAR(64)           NOT NULL,
    created_by    BIGINT                NOT NULL,
    created_date  DATETIME2             NOT NULL,
    deleted_by    BIGINT,
    deleted_date  DATETIME2,
    modified_by   BIGINT                NOT NULL,
    modified_date DATETIME2             NOT NULL,
    CONSTRAINT pk_bank PRIMARY KEY (id),
    CONSTRAINT uk_bank_system_value UNIQUE (system_value),
    CONSTRAINT fk_bank_created_by FOREIGN KEY (created_by) REFERENCES cca_user(id),
    CONSTRAINT fk_bank_deleted_by FOREIGN KEY (deleted_by) REFERENCES cca_user(id),
    CONSTRAINT fk_bank_modified_by FOREIGN KEY (modified_by) REFERENCES cca_user(id)
);

CREATE TABLE complaint_category (
    id      BIGINT IDENTITY (1,1) NOT NULL,
    name    VARCHAR(64)           NOT NULL,
    bank_id BIGINT                NOT NULL,
    CONSTRAINT pk_complaint_category PRIMARY KEY (id),
    CONSTRAINT uk_complaint_category_bank_id_name UNIQUE (bank_id, name),
    CONSTRAINT fk_complaint_category_bank_id FOREIGN KEY (bank_id) REFERENCES bank(id)
);

CREATE INDEX idx_complaint_category_bank_id ON complaint_category(bank_id);

CREATE TABLE complaint_cause (
    id      BIGINT IDENTITY (1,1) NOT NULL,
    name    VARCHAR(64)           NOT NULL,
    bank_id BIGINT                NOT NULL,
    CONSTRAINT pk_complaint_cause PRIMARY KEY (id),
    CONSTRAINT uk_complaint_cause_bank_id_name UNIQUE (bank_id, name),
    CONSTRAINT fk_complaint_cause_bank_id FOREIGN KEY (bank_id) REFERENCES bank(id)
);

CREATE INDEX idx_complaint_cause_bank_id ON complaint_cause(bank_id);

CREATE TABLE complaint_source (
    id      BIGINT IDENTITY (1,1) NOT NULL,
    name    VARCHAR(64)           NOT NULL,
    bank_id BIGINT                NOT NULL,
    CONSTRAINT pk_complaint_source PRIMARY KEY (id),
    CONSTRAINT uk_complaint_source_bank_id_name UNIQUE (bank_id, name),
    CONSTRAINT fk_complaint_source_bank_id FOREIGN KEY (bank_id) REFERENCES bank(id)
);

CREATE INDEX idx_complaint_source_bank_id ON complaint_source(bank_id);

CREATE TABLE complaint_type (
    id      BIGINT IDENTITY (1,1) NOT NULL,
    name    VARCHAR(64)           NOT NULL,
    bank_id BIGINT                NOT NULL,
    CONSTRAINT pk_complaint_type PRIMARY KEY (id),
    CONSTRAINT uk_complaint_type_bank_id_name UNIQUE (bank_id, name),
    CONSTRAINT fk_complaint_type_bank_id FOREIGN KEY (bank_id) REFERENCES bank(id)
);

CREATE INDEX idx_complaint_type_bank_id ON complaint_type(bank_id);

CREATE TABLE complaint_department (
    id      BIGINT IDENTITY (1,1) NOT NULL,
    name    VARCHAR(64)           NOT NULL,
    bank_id BIGINT                NOT NULL,
    CONSTRAINT pk_complaint_department PRIMARY KEY (id),
    CONSTRAINT uk_complaint_department_bank_id_name UNIQUE (bank_id, name),
    CONSTRAINT fk_complaint_department_bank_id FOREIGN KEY (bank_id) REFERENCES bank(id)
);

CREATE INDEX idx_complaint_department_bank_id ON complaint_department(bank_id);

CREATE TABLE complaint_discrimination_type (
    id      BIGINT IDENTITY (1,1) NOT NULL,
    name    VARCHAR(64)           NOT NULL,
    bank_id BIGINT                NOT NULL,
    CONSTRAINT pk_complaint_discrimination_type PRIMARY KEY (id),
    CONSTRAINT uk_complaint_discrimination_type_bank_id_name UNIQUE (bank_id, name),
    CONSTRAINT fk_complaint_discrimination_type_bank_id FOREIGN KEY (bank_id) REFERENCES bank(id)
);

CREATE INDEX idx_complaint_discrimination_type_bank_id ON complaint_discrimination_type(bank_id);

GO

DECLARE
    @ccaAdminUserId BIGINT = (SELECT id
                              FROM cca_user
                              WHERE username = 'cca_admin');

INSERT INTO bank (display_value, system_value, created_by, created_date, modified_by, modified_date)
VALUES ('American Express', 'AMERICAN_EXPRESS', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
('Bancorp', 'BANCORP', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
('MetaBank', 'METABANK', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP);

GO

DECLARE
    @americanExpressBankId BIGINT = (SELECT id
                                     FROM bank
                                     WHERE system_value = 'AMERICAN_EXPRESS');
DECLARE
    @bancorpBankId BIGINT = (SELECT id
                             FROM bank
                             WHERE system_value = 'BANCORP');
DECLARE
    @metabankBankId BIGINT = (SELECT id
                              FROM bank
                              WHERE system_value = 'METABANK');

INSERT INTO complaint_category (name, bank_id)
VALUES ('Account/Card Access', @americanExpressBankId),
    ('Call Wait Times', @americanExpressBankId),
    ('Card Blocked', @americanExpressBankId),
    ('CIP', @americanExpressBankId),
    ('Closure Related', @americanExpressBankId),
    ('Disclosure Related', @americanExpressBankId),
    ('Disputed Transaction', @americanExpressBankId),
('Don''t Recall Applying - Account Not Requested', @americanExpressBankId),
    ('Fee Related', @americanExpressBankId),
    ('Funds Availability', @americanExpressBankId),
    ('Identity Theft', @americanExpressBankId),
    ('Other', @americanExpressBankId),
    ('Regulatory', @americanExpressBankId),
    ('Service Related', @americanExpressBankId),
    ('Tax Refund Related', @americanExpressBankId),
('Marketing, Advertising, and Promotional Offers', @americanExpressBankId),
    ('Not Delivered/Replacement Timeframes', @americanExpressBankId),
    ('Privacy', @americanExpressBankId),
    ('Processing of Application/Order', @americanExpressBankId),
    ('Fraud Disputes', @americanExpressBankId),
    ('Funds Transfer', @americanExpressBankId),
    ('ATM Related', @americanExpressBankId),
    ('Pre-Authorized Holds', @americanExpressBankId),
    ('Pre-Paid Refunds', @americanExpressBankId),
    ('Product Feature/Benefit Usage', @americanExpressBankId),
    ('Problems with Policy', @americanExpressBankId),
    ('Account/Card Access', @bancorpBankId),
    ('Call Wait Times', @bancorpBankId),
    ('Card Blocked', @bancorpBankId),
    ('CIP', @bancorpBankId),
    ('Closure Related', @bancorpBankId),
    ('Disclosure Related', @bancorpBankId),
    ('Disputed Transaction', @bancorpBankId),
    ('Don''t Recall Applying - Account Not Requested', @bancorpBankId),
    ('Fee Related', @bancorpBankId),
    ('Funds Availability', @bancorpBankId),
    ('Identity Theft', @bancorpBankId),
    ('Other', @bancorpBankId),
    ('Regulatory', @bancorpBankId),
    ('Service Related', @bancorpBankId),
    ('Tax Refund Related', @bancorpBankId),
    ('Adding Money', @metabankBankId),
    ('Advertising/Marketing/Disclosures', @metabankBankId),
    ('Customer Service', @metabankBankId),
    ('Fee', @metabankBankId),
    ('Managing/Opening/Close Account', @metabankBankId),
    ('ODP/Saving/Reward', @metabankBankId),
    ('Unauthorized Transactions/Fraud', @metabankBankId);

INSERT INTO complaint_cause (name, bank_id)
VALUES ('Customer Misunderstanding', @americanExpressBankId),
    ('Rep Error', @americanExpressBankId),
    ('Systemic Error', @americanExpressBankId),
    ('Disclosure Related', @americanExpressBankId),
    ('Verification Needed', @americanExpressBankId),
    ('None', @americanExpressBankId),
    ('Customer Misunderstanding', @bancorpBankId),
    ('Rep Error', @bancorpBankId),
    ('Systemic Error', @bancorpBankId),
    ('Disclosure Related', @bancorpBankId),
    ('Verification Needed', @bancorpBankId),
    ('None', @bancorpBankId);

INSERT INTO complaint_source (name, bank_id)
VALUES ('Email', @americanExpressBankId),
    ('Fax', @americanExpressBankId),
    ('Letter', @americanExpressBankId),
    ('Online', @americanExpressBankId),
    ('Phone', @americanExpressBankId),
    ('Social Media', @americanExpressBankId),
    ('Email', @bancorpBankId),
    ('Fax', @bancorpBankId),
    ('Letter', @bancorpBankId),
    ('Online', @bancorpBankId),
    ('Phone', @bancorpBankId),
    ('Social Media', @bancorpBankId),
    ('AG', @metabankBankId),
    ('Atty/Reg', @metabankBankId),
    ('BBB', @metabankBankId),
    ('CFPB', @metabankBankId),
    ('Email/Online', @metabankBankId),
    ('FDIC', @metabankBankId),
    ('Mail/Fax', @metabankBankId),
    ('OCC', @metabankBankId),
    ('Phone', @metabankBankId),
    ('Presidential', @metabankBankId),
    ('Social/Blog', @metabankBankId);

INSERT INTO complaint_type (name, bank_id)
VALUES ('Attorney', @americanExpressBankId),
    ('Attorney General', @americanExpressBankId),
    ('Bank Commissioner', @americanExpressBankId),
    ('BBB', @americanExpressBankId),
    ('Call Center', @americanExpressBankId),
    ('Client Relationship Manager', @americanExpressBankId),
    ('Executive Staff', @americanExpressBankId),
    ('FDIC', @americanExpressBankId),
    ('Other', @americanExpressBankId),
    ('Program Manager', @americanExpressBankId),
    ('Social Media', @americanExpressBankId),
    ('DFPB', @americanExpressBankId),
    ('Attorney', @bancorpBankId),
    ('Attorney General', @bancorpBankId),
    ('Bank Commissioner', @bancorpBankId),
    ('BBB', @bancorpBankId),
    ('Call Center', @bancorpBankId),
    ('Client Relationship Manager', @bancorpBankId),
    ('Executive Staff', @bancorpBankId),
    ('FDIC', @bancorpBankId),
    ('Other', @bancorpBankId),
    ('Program Manager', @bancorpBankId),
    ('Social Media', @bancorpBankId);

INSERT INTO complaint_department (name, bank_id)
VALUES ('Business Banking', @americanExpressBankId),
    ('Call Center', @americanExpressBankId),
    ('Cash Management (Formerly PPB)', @americanExpressBankId),
    ('Deposit Operations', @americanExpressBankId),
    ('General Affinity', @americanExpressBankId),
    ('Healthcare/HSA', @americanExpressBankId),
    ('HigherOne', @americanExpressBankId),
    ('ISO/Merchant', @americanExpressBankId),
    ('Loans', @americanExpressBankId),
    ('Other', @americanExpressBankId),
    ('Prepaid / PSG', @americanExpressBankId),
    ('Wealth Management', @americanExpressBankId),
    ('Business Banking', @bancorpBankId),
    ('Call Center', @bancorpBankId),
    ('Cash Management (Formerly PPB)', @bancorpBankId),
    ('Deposit Operations', @bancorpBankId),
    ('General Affinity', @bancorpBankId),
    ('Healthcare/HSA', @bancorpBankId),
    ('HigherOne', @bancorpBankId),
    ('ISO/Merchant', @bancorpBankId),
    ('Loans', @bancorpBankId),
    ('Other', @bancorpBankId),
    ('Prepaid / PSG', @bancorpBankId),
    ('Wealth Management', @bancorpBankId);

INSERT INTO complaint_discrimination_type (name, bank_id)
VALUES ('Race', @americanExpressBankId),
    ('Color', @americanExpressBankId),
    ('Age', @americanExpressBankId),
    ('Religion', @americanExpressBankId),
    ('Gender', @americanExpressBankId),
    ('Familial Status', @americanExpressBankId),
    ('Handicap', @americanExpressBankId),
    ('Location/Age of Dwelling', @americanExpressBankId),
    ('Marital Status', @americanExpressBankId),
    ('National Origin', @americanExpressBankId),
    ('Receipt of Public Assistance', @americanExpressBankId),
    ('Sexual Orientation', @americanExpressBankId),
    ('Other', @americanExpressBankId);





