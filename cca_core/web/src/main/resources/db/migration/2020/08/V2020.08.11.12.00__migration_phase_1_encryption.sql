
-- Customer Component
EXECUTE sp_rename 'customer_component.first_name', 'first_name_hash', 'COLUMN';
EXECUTE sp_rename 'customer_component.last_name', 'last_name_hash', 'COLUMN';
EXECUTE sp_rename 'customer_component.date_of_birth', 'date_of_birth_hash', 'COLUMN';
EXECUTE sp_rename 'customer_component.phone_number', 'phone_number_hash', 'COLUMN';
EXECUTE sp_rename 'customer_component.email_address', 'email_address_hash', 'COLUMN';
EXECUTE sp_rename 'customer_component.ani', 'ani_hash', 'COLUMN';

ALTER TABLE customer_component ADD [first_name] VARBINARY(MAX) NULL;
ALTER TABLE customer_component ADD [last_name] VARBINARY(MAX) NULL;
ALTER TABLE customer_component ADD [date_of_birth] VARBINARY(MAX) NULL;
ALTER TABLE customer_component ADD [phone_number] VARBINARY(MAX) NULL;
ALTER TABLE customer_component ADD [email_address] VARBINARY(MAX) NULL;
ALTER TABLE customer_component ADD [ani] VARBINARY(MAX) NULL;

-- Call Component
EXECUTE sp_rename 'call_component.encrypted_caller_name', 'encrypted_caller_name_hash', 'COLUMN';
EXECUTE sp_rename 'call_component.encrypted_callback_number', 'encrypted_callback_number_hash', 'COLUMN';
EXECUTE sp_rename 'call_component.ani', 'ani_hash', 'COLUMN';

ALTER TABLE call_component ADD [encrypted_caller_name] VARBINARY(MAX) NULL;
ALTER TABLE call_component ADD [encrypted_callback_number] VARBINARY(MAX) NULL;
ALTER TABLE call_component ADD [ani] VARBINARY(MAX) NULL;

-- Refund Component
EXECUTE sp_rename 'refund_request_component.name', 'name_hash', 'COLUMN';
EXECUTE sp_rename 'refund_request_component.ani', 'ani_hash', 'COLUMN';

ALTER TABLE refund_request_component ADD [name] VARBINARY(MAX) NULL;
ALTER TABLE refund_request_component ADD [ani] VARBINARY(MAX) NULL;

-- Comment
EXECUTE sp_rename 'comment.content', 'content_hash', 'COLUMN';

ALTER TABLE comment ADD [content] VARBINARY(MAX) NULL;

-- Migration Status Tracking
CREATE TABLE migration_job_status
(
    id             BIGINT IDENTITY (1, 1)  NOT NULL,
    [name]           VARCHAR(128)            NOT NULL,
    last_processed DATETIME2,
    total          BIGINT,
    remaining      BIGINT,
    [percent]        decimal(5,2),
    CONSTRAINT pk_migration_job_status PRIMARY KEY CLUSTERED (id),
    CONSTRAINT uk_migration_job_status_name UNIQUE (name)
);

INSERT INTO migration_job_status (name)
VALUES ('ENCRYPTION_MIGRATION_CUSTOMER'),
       ('ENCRYPTION_MIGRATION_REFUND'),
       ('ENCRYPTION_MIGRATION_CALL'),
       ('ENCRYPTION_MIGRATION_COMMENT');

-- Start with the customer migration
INSERT INTO togglz (feature_name, feature_enabled)
VALUES ('ENCRYPTION_MIGRATION_CUSTOMER', 1),
       ('ENCRYPTION_MIGRATION_REFUND', 0),
       ('ENCRYPTION_MIGRATION_CALL', 0),
       ('ENCRYPTION_MIGRATION_COMMENT', 0);

INSERT INTO cca_property ([system_name], [display_name], [description], [value])
VALUES ('ENCRYPTION_MIGRATION_BATCH_SIZE_MIN', 'Encryption Migration Batch Size Min', 'Min Batch Size', 1000),
       ('ENCRYPTION_MIGRATION_BATCH_SIZE_MAX', 'Encryption Migration Batch Size Max', 'Max Batch Size', 5000);

