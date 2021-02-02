EXECUTE add_permission 'QUEUE_COMPLAINT_AMERICAN_EXPRESS', 'Queue - Complaint: American Express',
        'Ability to work this queue.';
EXECUTE add_permission 'QUEUE_COMPLAINT_BANCORP', 'Queue - Complaint: Bancorp', 'Ability to work this queue.';
EXECUTE add_permission 'QUEUE_COMPLAINT_METABANK', 'Queue - Complaint: MetaBank', 'Ability to work this queue.';

GO

DECLARE
    @amexPermissionId BIGINT = (SELECT id
                                FROM permission
                                WHERE system_name = 'QUEUE_COMPLAINT_AMERICAN_EXPRESS');
DECLARE
    @bancorpPermissionId BIGINT = (SELECT id
                                   FROM permission
                                   WHERE system_name = 'QUEUE_COMPLAINT_BANCORP');
DECLARE
    @metabankPermissionId BIGINT = (SELECT id
                                    FROM permission
                                    WHERE system_name = 'QUEUE_COMPLAINT_METABANK');

INSERT INTO session_queue (i3_name, active, display_name, autowrap_time, autoclose, type, locale, system_name,
                           permission_id, is_locked)
VALUES ('COMPLAINT_AMERICAN_EXPRESS', 1, 'Complaint: American Express', 30000, 1, 'NONE', 'FRAUD',
        'COMPLAINT_AMERICAN_EXPRESS', @amexPermissionId, 0),
('COMPLAINT_BANCORP', 1, 'Complaint: Bancorp', 30000, 1, 'NONE', 'FRAUD', 'COMPLAINT_BANCORP', @bancorpPermissionId, 0),
('COMPLAINT_METABANK', 1, 'Complaint: MetaBank', 30000, 1, 'NONE', 'FRAUD', 'COMPLAINT_METABANK', @metabankPermissionId,
 0);

INSERT INTO wrap_up_code_category (i3_name, active, display_name)
VALUES ('COMPLAINT', 1, 'Complaint');

INSERT INTO wrap_up_code (i3_name, active, display_name, locked)
VALUES ('COMPLAINT', 1, 'Complaint', 0);

GO

DECLARE
    @amexQueueId BIGINT = (SELECT id
                           FROM session_queue
                           WHERE system_name = 'COMPLAINT_AMERICAN_EXPRESS');
DECLARE
    @bancorpQueueId BIGINT = (SELECT id
                              FROM session_queue
                              WHERE system_name = 'COMPLAINT_BANCORP');
DECLARE
    @metabankQueueId BIGINT = (SELECT id
                               FROM session_queue
                               WHERE system_name = 'COMPLAINT_METABANK');
DECLARE
    @complaintCategoryId BIGINT = (SELECT id
                                   FROM wrap_up_code_category
                                   WHERE i3_name = 'COMPLAINT');
DECLARE
    @complaintCodeId BIGINT = (SELECT id
                               FROM wrap_up_code
                               WHERE i3_name = 'COMPLAINT');

INSERT INTO session_queue_session_type (session_queue_id, session_type)
VALUES (@amexQueueId, 'COMPLAINT'),
    (@bancorpQueueId, 'COMPLAINT'),
    (@metabankQueueId, 'COMPLAINT');

INSERT INTO queue_wrap_up_code_category (queue_id, wrap_up_code_category_id)
VALUES (@amexQueueId, @complaintCategoryId),
    (@bancorpQueueId, @complaintCategoryId),
    (@metabankQueueId, @complaintCategoryId);

INSERT INTO wrap_up_code_category_wrap_up_code (category_id, code_id)
VALUES (@complaintCategoryId, @complaintCodeId);

