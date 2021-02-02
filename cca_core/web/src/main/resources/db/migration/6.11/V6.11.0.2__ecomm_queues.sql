EXECUTE add_permission 'QUEUE_FRD_NOT_RECEIVED', 'Queue - Not Received', 'Permission to use this Session Queue.';
EXECUTE add_permission 'QUEUE_FRD_NOT_ORDERED', 'Queue - Not Ordered', 'Permission to use this Session Queue.';

INSERT INTO session_queue (i3_name, active, display_name, autowrap_time, autoclose, type, locale, system_name, permission_id)
VALUES
    ( 'FRD_NOT_RECEIVED', 1, 'Not Received', 30000, 0, 'NONE', 'FRAUD', 'FRD_NOT_RECEIVED', (
        SELECT id
        FROM permission
        WHERE permission.system_name = 'QUEUE_FRD_NOT_RECEIVED' ) ),
    ( 'FRD_NOT_ORDERED', 1, 'Not Ordered', 30000, 0, 'NONE', 'FRAUD', 'FRD_NOT_ORDERED', (
        SELECT id
        FROM permission
        WHERE permission.system_name = 'QUEUE_FRD_NOT_ORDERED' ) );

INSERT INTO session_queue_session_type (session_queue_id, session_type) VALUES
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_RECEIVED' ), 'ECOMM_FRAUD' ),
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_ORDERED' ), 'ECOMM_FRAUD' );

INSERT INTO wrap_up_code_category (i3_name, active, display_name) VALUES
    ( 'FRD_CREDIT_ISSUED', 1, 'Credit Issued' ),
    ( 'FRD_CREDIT_DENIED', 1, 'Credit Denied' ),
    ( 'FRD_RESHIPPED', 1, 'Reshipped' );

INSERT INTO queue_wrap_up_code_category (queue_id, wrap_up_code_category_id) VALUES
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_RECEIVED' ), (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_CREDIT_ISSUED' ) ),
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_RECEIVED' ), (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_CREDIT_DENIED' ) ),
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_RECEIVED' ), (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_RESHIPPED' ) ),
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_ORDERED' ), (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_CREDIT_ISSUED' ) ),
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_ORDERED' ), (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_CREDIT_DENIED' ) ),
    ( (
          SELECT id
          FROM session_queue
          WHERE system_name = 'FRD_NOT_ORDERED' ), (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_RESHIPPED' ) );

INSERT INTO wrap_up_code (i3_name, active, display_name, locked) VALUES
    ( 'FRD_NO_LOSS', 1, 'No Loss', 0 ),
    ( 'FRD_LOSS_INCURRED', 1, 'Loss Incurred', 0 ),
    ( 'FRD_FRIENDLY_FRAUD', 1, 'Friendly Fraud', 0 );

INSERT INTO wrap_up_code_category_wrap_up_code (category_id, code_id) VALUES
    ( (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_CREDIT_ISSUED' ), (
          SELECT id
          FROM wrap_up_code
          WHERE i3_name = 'FRD_NO_LOSS' ) ),
    ( (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_CREDIT_ISSUED' ), (
          SELECT id
          FROM wrap_up_code
          WHERE i3_name = 'FRD_LOSS_INCURRED' ) ),
    ( (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_CREDIT_DENIED' ), (
          SELECT id
          FROM wrap_up_code
          WHERE i3_name = 'FRD_FRIENDLY_FRAUD' ) ),
    ( (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_RESHIPPED' ), (
          SELECT id
          FROM wrap_up_code
          WHERE i3_name = 'FRD_NO_LOSS' ) ),
    ( (
          SELECT id
          FROM wrap_up_code_category
          WHERE i3_name = 'FRD_RESHIPPED' ), (
          SELECT id
          FROM wrap_up_code
          WHERE i3_name = 'FRD_LOSS_INCURRED' ) );