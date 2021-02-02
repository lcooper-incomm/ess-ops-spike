
EXECUTE add_permission 'SERVE_RAISE_DISPUTE', 'SERVE Raise Dispute',
        'Ability to raise a dispute in SERVE';

ALTER TABLE detail_dispute ADD external_reason_code varchar(64) NULL;

ALTER TABLE detail_dispute_transaction ADD source_ref_num varchar(32) NULL;

-- Queue
EXECUTE add_permission 'QUEUE_FRD_DISPUTE_SERVE_TRANSACTIONS', 'Queue - Disputes: SERVE Transactions',
        'Permission to use this Session Queue.';

DECLARE @idPermission int = (select id from permission where system_name='QUEUE_FRD_DISPUTE_SERVE_TRANSACTIONS');

INSERT INTO [session_queue] (i3_name, active, display_name, autowrap_time, [type], locale, system_name, permission_id, is_locked)
    VALUES ('FRD_DISPUTE_SERVE_TRANSACTIONS', 1, 'Disputes: SERVE Transactions', 30000, 'ACCOUNT', 'FRAUD', 'QUEUE_FRD_DISPUTE_SERVE_TRANSACTIONS', @idPermission, 0);

DECLARE @idQueue int = (select id from session_queue where system_name='QUEUE_FRD_DISPUTE_SERVE_TRANSACTIONS');

INSERT INTO session_queue_session_type (session_queue_id, session_type) VALUES
	(@idQueue, 'DISPUTE');

INSERT INTO queue_wrap_up_code_category (queue_id, wrap_up_code_category_id) VALUES
    (@idQueue, (select id from wrap_up_code_category where i3_name='FRD_EMPLOYEE_FRAUD')),
    (@idQueue, (select id from wrap_up_code_category where i3_name='FRD_TECHNICAL_ISSUES')),
    (@idQueue, (select id from wrap_up_code_category where i3_name='FRD_CARD_SWAP_AT_POS')),
    (@idQueue, (select id from wrap_up_code_category where i3_name='FRD_CARD_TAMPERING')),
    (@idQueue, (select id from wrap_up_code_category where i3_name='FRD_ACTIVATION_ISSUE'));
