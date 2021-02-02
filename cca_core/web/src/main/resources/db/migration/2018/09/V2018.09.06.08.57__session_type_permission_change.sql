ALTER TABLE session_class
    DROP CONSTRAINT fk_session_class_permission_id;

ALTER TABLE session_class
    DROP COLUMN permission_id;

ALTER TABLE session_type
    ADD permission_id BIGINT;
ALTER TABLE session_type
    ADD CONSTRAINT fk_session_type_permission_id FOREIGN KEY (permission_id) REFERENCES permission (id);

GO

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_CALL')
WHERE name = 'CALL';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_BAD_CREDIT')
WHERE name = 'BAD_CREDIT';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_CONSUMED_CARD')
WHERE name = 'CONSUMED_CARD';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_DISPUTE')
WHERE name = 'DISPUTE';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_ECOMM_FRAUD')
WHERE name = 'ECOMM_FRAUD';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_LAW_ENFORCEMENT')
WHERE name = 'LAW_ENFORCEMENT';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_DAMAGED_PINS')
WHERE name = 'DAMAGED_PINS';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_PAYPAL_REDEMPTION_ISSUE')
WHERE name = 'PAYPAL_REDEMPTION_ISSUE';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_MERCHANT_FRAUD')
WHERE name = 'MERCHANT_FRAUD';

UPDATE session_type
SET permission_id = (SELECT id
                     FROM permission
                     WHERE system_name = 'SESSION_TYPE_OTHER_FRAUD')
WHERE name = 'OTHER_FRAUD';
