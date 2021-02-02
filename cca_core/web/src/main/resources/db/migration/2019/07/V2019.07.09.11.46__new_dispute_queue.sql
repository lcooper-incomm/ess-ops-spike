EXECUTE add_permission 'QUEUE_FRD_DISPUTE_VMS_TRANSACTIONS', 'Queue - Disputes: VMS Transactions',
                       'Permission to use this Session Queue.';

GO

INSERT INTO session_queue ( i3_name,
                            active,
                            display_name,
                            autowrap_time,
                            autoclose,
                            type,
                            locale,
                            system_name,
                            permission_id,
                            is_locked )
VALUES ( 'FRD_DISPUTE_VMS_TRANSACTIONS',
         1,
         'Disputes: VMS Transactions',
         30000,
         0,
         'CUSTOMER',
         'FRAUD',
         'QUEUE_FRD_DISPUTE_VMS_TRANSACTIONS',
         (
         SELECT id FROM permission WHERE permission.system_name = 'QUEUE_FRD_DISPUTE_VMS_TRANSACTIONS' ),
         1 );

DECLARE
@queueId BIGINT =
(
SELECT SCOPE_IDENTITY() );

INSERT INTO session_queue_session_type ( session_queue_id, session_type )
VALUES ( @queueId, 'DISPUTE' );

DECLARE
@categoryIds TABLE(
    id BIGINT
);
INSERT INTO @categoryIds
SELECT c.id
FROM wrap_up_code_category c
         LEFT JOIN queue_wrap_up_code_category qwucc on c.id = qwucc.wrap_up_code_category_id
WHERE qwucc.queue_id =
      (
      SELECT id FROM session_queue WHERE system_name = 'QUEUE_FRD_GPR_DISPUTE' );

INSERT INTO queue_wrap_up_code_category ( queue_id, wrap_up_code_category_id )
SELECT @queueId, c.id
FROM @categoryIds c;
