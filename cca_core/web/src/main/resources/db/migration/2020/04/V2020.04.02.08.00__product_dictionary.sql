
CREATE TABLE bank_product_dictionary (
    id        BIGINT IDENTITY (1,1) NOT NULL,
    bank      VARCHAR(48) NOT NULL,
    product   VARCHAR(128) NOT NULL,
    is_active  BIT NOT NULL DEFAULT 1,
    created_by    BIGINT                NOT NULL,
    created_date  DATETIME2             NOT NULL,
    deleted_by    BIGINT,
    deleted_date  DATETIME2,
    modified_by   BIGINT                NOT NULL,
    modified_date DATETIME2             NOT NULL,
    CONSTRAINT pk_bank_product_dictionary PRIMARY KEY (id),
    CONSTRAINT fk_bank_product_created_by FOREIGN KEY (created_by) REFERENCES cca_user(id),
    CONSTRAINT fk_bank_product_deleted_by FOREIGN KEY (deleted_by) REFERENCES cca_user(id),
    CONSTRAINT fk_bank_product_modified_by FOREIGN KEY (modified_by) REFERENCES cca_user(id)
);

DECLARE
    @ccaAdminUserId BIGINT = (SELECT id
                              FROM cca_user
                              WHERE username = 'cca_admin');

INSERT INTO bank_product_dictionary (bank, product, created_by, created_date, modified_by, modified_date) VALUES
    ('Meta', 'Go RAN', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Meta', 'MasterCard Prepaid Incentives', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Meta', 'Visa LAP Card', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Meta', 'Metabank Vanilla Visa', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Meta', 'Metabank Vanilla MasterCard', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Meta', 'Visa LAP Card', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Meta', 'MasterCard LAP Card', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'MyVanilla Visa', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'MyVanilla MasterCard', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'Bancorp Vanilla Visa', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'Bancorp Vanilla MasterCard', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'UFan Visa', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'WellCare Visa', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'AmidaCare Visa', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'Vanilla Discover', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'DIY Home Improvement Gift Card', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'Virtual eGift/eReward', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'Comcast Visa Reward', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'Momentum Visa', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Bancorp', 'Momentum MasterCard', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Amex', 'Amex Retail Gift', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Amex', 'Amex Rewards', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Amex', 'Amex Simon Mall Gift', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Amex', 'Amex Mall Retail Gift', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Amex', 'Amex Mall Retail Rewards', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Sutton', 'WalMart Academy MasterCard', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Sutton', 'Sutton Visa BOL', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP),
    ('Sutton', 'Sutton Visa eGift BOL', @ccaAdminUserId, CURRENT_TIMESTAMP, @ccaAdminUserId, CURRENT_TIMESTAMP);

ALTER TABLE privacy_request_component ADD product_id BIGINT NULL;

ALTER TABLE privacy_request_component
  ADD CONSTRAINT fk_privacy_request_bank_product
  FOREIGN KEY (product_id) REFERENCES bank_product_dictionary (id);
