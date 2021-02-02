
DROP TABLE migration_job_status;

ALTER TABLE refund_request_component DROP COLUMN name_hash;
ALTER TABLE refund_request_component DROP COLUMN ani_hash;

ALTER TABLE call_component DROP COLUMN encrypted_caller_name_hash;
ALTER TABLE call_component DROP COLUMN encrypted_callback_number_hash;
ALTER TABLE call_component DROP COLUMN ani_hash;

ALTER TABLE customer_component DROP COLUMN first_name_hash;
ALTER TABLE customer_component DROP COLUMN last_name_hash;
ALTER TABLE customer_component DROP COLUMN date_of_birth_hash;
ALTER TABLE customer_component DROP COLUMN phone_number_hash;
ALTER TABLE customer_component DROP COLUMN email_address_hash;
ALTER TABLE customer_component DROP COLUMN ani_hash;

ALTER TABLE comment DROP COLUMN content_hash;
ALTER TABLE comment DROP COLUMN migration_status;

DELETE FROM togglz where feature_name='ENCRYPTION_MIGRATION_CUSTOMER';
DELETE FROM togglz where feature_name='ENCRYPTION_MIGRATION_REFUND';
DELETE FROM togglz where feature_name='ENCRYPTION_MIGRATION_CALL';
DELETE FROM togglz where feature_name='ENCRYPTION_MIGRATION_COMMENT';

DELETE FROM cca_property where system_name='ENCRYPTION_MIGRATION_BATCH_SIZE_MIN';
DELETE FROM cca_property where system_name='ENCRYPTION_MIGRATION_BATCH_SIZE_MAX';
