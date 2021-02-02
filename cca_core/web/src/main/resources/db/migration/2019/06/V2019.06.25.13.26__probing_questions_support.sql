CREATE TABLE dispute_probing_question (
    id                   BIGINT IDENTITY (1,1) NOT NULL,
    dispute_component_id BIGINT                NOT NULL,
    created_by           BIGINT                NOT NULL,
    question             VARCHAR(500)          NOT NULL,
    answer               VARCHAR(500)          NOT NULL,
    CONSTRAINT pk_dispute_probing_question PRIMARY KEY (id),
    CONSTRAINT fk_dispute_probing_question_dispute_component_id FOREIGN KEY (dispute_component_id) REFERENCES detail_dispute(id),
    CONSTRAINT fk_dispute_probing_question_created_by FOREIGN KEY (created_by) REFERENCES cca_user(id)
);

CREATE NONCLUSTERED INDEX idx_dispute_probing_question_dispute_component_id ON dispute_probing_question(dispute_component_id);

GO

CREATE TABLE action_reason_code_mapping (
    id            BIGINT IDENTITY (1,1) NOT NULL,
    code          VARCHAR(64)           NOT NULL,
    display_value VARCHAR(64)           NOT NULL,
    type          VARCHAR(64)           NOT NULL,
    platform      VARCHAR(64)           NOT NULL,
    platform_code VARCHAR(64)           NOT NULL,
    is_active     BIT                   NOT NULL,
    CONSTRAINT pk_action_reason_code_mapping PRIMARY KEY (id),
    CONSTRAINT uk_action_reason_code_mapping UNIQUE (code, type, platform)
);

CREATE NONCLUSTERED INDEX idx_action_reason_code_mapping_type_platform ON action_reason_code_mapping(type, platform);

GO

INSERT INTO action_reason_code_mapping (code, display_value, type, platform, platform_code, is_active)
VALUES ('UNAUTHORIZED_TRANSACTION', 'Unauthorized Transaction', 'RAISE_DISPUTE', 'VMS', '123', 1),
('ATM_NON_DISPENSE', 'ATM Non-Dispense', 'RAISE_DISPUTE', 'VMS', '244', 1),
('ATM_PARTIAL_DISPENSE', 'ATM Partial Dispense', 'RAISE_DISPUTE', 'VMS', '245', 1),
('DUPLICATE_TRANSACTION', 'Duplicate Transaction', 'RAISE_DISPUTE', 'VMS', '249', 1),
('PAID_BY_OTHER_MEANS', 'Paid by Other Means', 'RAISE_DISPUTE', 'VMS', '249', 1),
('INCORRECT_AMOUNT_CHARGED', 'Incorrect Amount Charged', 'RAISE_DISPUTE', 'VMS', '125', 1),
('CANCELLED_SERVICES', 'Cancelled Services', 'RAISE_DISPUTE', 'VMS', '248', 1),
('MERCHANDISE_DEFECTIVE', 'Merchandise Defective', 'RAISE_DISPUTE', 'VMS', '247', 1),
('MERCHANDISE_NOT_AS_DESCRIBED', 'Merchandise Not As Described', 'RAISE_DISPUTE', 'VMS', '247', 1),
('MERCHANDISE_NOT_RECEIVED', 'Merchandise Not Received', 'RAISE_DISPUTE', 'VMS', '247', 1),
('REFUND_NOT_RECEIVED', 'Refund Not Received', 'RAISE_DISPUTE', 'VMS', '246', 1),
('SERVICES_NOT_RECEIVED', 'Services Not Received', 'RAISE_DISPUTE', 'VMS', '248', 1),
('TRANSACTION_DECLINED', 'Transaction Declined', 'RAISE_DISPUTE', 'VMS', '123', 1),
('UNAUTHORIZED_TRANSACTION', 'Unauthorized Transaction', 'RAISE_DISPUTE', 'CCL', '123', 1),
('ATM_NON_DISPENSE', 'ATM Non-Dispense', 'RAISE_DISPUTE', 'CCL', '244', 1),
('ATM_PARTIAL_DISPENSE', 'ATM Partial Dispense', 'RAISE_DISPUTE', 'CCL', '245', 1),
('DUPLICATE_TRANSACTION', 'Duplicate Transaction', 'RAISE_DISPUTE', 'CCL', '249', 1),
('PAID_BY_OTHER_MEANS', 'Paid by Other Means', 'RAISE_DISPUTE', 'CCL', '249', 1),
('INCORRECT_AMOUNT_CHARGED', 'Incorrect Amount Charged', 'RAISE_DISPUTE', 'CCL', '125', 1),
('CANCELLED_SERVICES', 'Cancelled Services', 'RAISE_DISPUTE', 'CCL', '248', 1),
('MERCHANDISE_DEFECTIVE', 'Merchandise Defective', 'RAISE_DISPUTE', 'CCL', '247', 1),
('MERCHANDISE_NOT_AS_DESCRIBED', 'Merchandise Not As Described', 'RAISE_DISPUTE', 'CCL', '247', 1),
('MERCHANDISE_NOT_RECEIVED', 'Merchandise Not Received', 'RAISE_DISPUTE', 'CCL', '247', 1),
('REFUND_NOT_RECEIVED', 'Refund Not Received', 'RAISE_DISPUTE', 'CCL', '246', 1),
('SERVICES_NOT_RECEIVED', 'Services Not Received', 'RAISE_DISPUTE', 'CCL', '248', 1),
('TRANSACTION_DECLINED', 'Transaction Declined', 'RAISE_DISPUTE', 'CCL', '123', 1);
