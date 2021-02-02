
-- Drop drop_obsolete_cca_session_columns
ALTER TABLE cca_session
    DROP CONSTRAINT fk_cca_session_note;
ALTER TABLE cca_session
    DROP COLUMN note_id;
ALTER TABLE cca_session
    DROP COLUMN reason;

-- drop_obsolete_call_detail_columns
ALTER TABLE call_detail
    DROP CONSTRAINT fk_call_detail_user;
ALTER TABLE call_detail
    DROP COLUMN user_id;
ALTER TABLE call_detail
    DROP COLUMN wrap_up_sent_date;
ALTER TABLE call_detail
    DROP COLUMN mobile_reload_number;
ALTER TABLE call_detail
    DROP COLUMN wrap_up_recorded;
ALTER TABLE call_detail
    DROP COLUMN wrap_up_success;
ALTER TABLE call_detail
    DROP COLUMN wrapped_up_date;
ALTER TABLE call_detail
    DROP COLUMN auto_wrapped;
ALTER TABLE call_detail
    DROP COLUMN auto_wrap_type;

-- drop_obsolete_cca_user_columns
--Drop default constraint...
DECLARE @tableId INT = (SELECT OBJECT_ID('cca_user'));
DECLARE @columnId INT = (SELECT column_id
                         FROM sys.columns
                         WHERE object_id = @tableId
                           AND name = 'pref_default_search_type');
DECLARE @constraintName VARCHAR(255) = (SELECT name
                                        FROM sys.default_constraints
                                        WHERE parent_object_id = @tableId
                                          AND parent_column_id = @columnId);
DECLARE @sql NVARCHAR(255) = (SELECT CONCAT('ALTER TABLE cca_user DROP CONSTRAINT ', @constraintName));

EXECUTE sp_executesql @sql;

ALTER TABLE cca_user
    DROP COLUMN pref_default_search_type;

-- rename_call_detail_table
EXECUTE sp_rename 'call_detail', 'call_component';
EXECUTE sp_rename 'pk_call_detail', 'pk_call_component', 'OBJECT';
EXECUTE sp_rename 'fk_call_detail_session', 'fk_call_component_session_id', 'OBJECT';

-- rename_customer_detail_table
EXECUTE sp_rename 'customer_detail', 'customer_component';
EXECUTE sp_rename 'pk_customer_detail', 'pk_customer_component', 'OBJECT';
EXECUTE sp_rename 'uk_customer_detail_session', 'uk_customer_component_session_id', 'OBJECT';
EXECUTE sp_rename 'fk_customer_detail_session', 'fk_customer_component_session_id', 'OBJECT';

-- rename_dispute_detail_table
EXECUTE sp_rename 'detail_dispute', 'dispute_component';
EXECUTE sp_rename 'pk_detail_dispute', 'pk_dispute_component', 'OBJECT';
EXECUTE sp_rename 'fk_detail_dispute_identifier', 'fk_dispute_component_identifier_id', 'OBJECT';

-- dispute_detail_session_contraint
ALTER TABLE dispute_component
    ADD CONSTRAINT fk_dispute_component_session_id FOREIGN KEY (session_id) REFERENCES cca_session (id);

-- rename_dispute_transaction_detail_table
EXECUTE sp_rename 'detail_dispute_transaction', 'disputed_transaction';
EXECUTE sp_rename 'pk_detail_dispute_transaction', 'pk_disputed_transaction', 'OBJECT';
EXECUTE sp_rename 'fk_detail_dispute_transaction_detail_dispute', 'fk_disputed_transaction_dispute_component_id',
        'OBJECT';

EXECUTE sp_rename 'disputed_transaction.detail_dispute_id', 'dispute_component_id', 'COLUMN';

-- rename_law_enforcement_detail_table
EXECUTE sp_rename 'law_enforcement_detail', 'law_enforcement_component';
EXECUTE sp_rename 'pk_law_enforcement_detail', 'pk_law_enforcement_component', 'OBJECT';
EXECUTE sp_rename 'uk_law_enforcement_detail_session', 'uk_law_enforcement_component_session_id', 'OBJECT';
EXECUTE sp_rename 'fk_law_enforcement_detail_session', 'fk_law_enforcement_component_session_id', 'OBJECT';

-- rename_merchant_detail_table
EXECUTE sp_rename 'merchant_detail', 'merchant_component';
EXECUTE sp_rename 'pk_merchant_detail', 'pk_merchant_component', 'OBJECT';
EXECUTE sp_rename 'fk_merchant_detail_session', 'fk_merchant_component_session_id', 'OBJECT';
EXECUTE sp_rename 'uk_merchant_detail_session', 'uk_merchant_component_session_id', 'OBJECT';

-- rename_receipt_detail_table
EXECUTE sp_rename 'receipt_detail', 'receipt_component';
EXECUTE sp_rename 'pk_receipt_detail', 'pk_receipt_component', 'OBJECT';
EXECUTE sp_rename 'fk_receipt_detail_session', 'fk_receipt_component_session_id', 'OBJECT';

-- rename_receipt_card_detail_table
EXECUTE sp_rename 'receipt_card_detail', 'receipt_card';
EXECUTE sp_rename 'pk_receipt_card_detail', 'pk_receipt_card', 'OBJECT';
EXECUTE sp_rename 'fk_receipt_card_detail_id', 'fk_receipt_card_receipt_component_id', 'OBJECT';

EXECUTE sp_rename 'receipt_card.receipt_detail_id', 'receipt_component_id', 'COLUMN';

-- rename_refund_request_detail_table
EXECUTE sp_rename 'refund_request_detail', 'refund_request_component';
EXECUTE sp_rename 'pk_refund_request_detail', 'pk_refund_request_component', 'OBJECT';
EXECUTE sp_rename 'fk_refund_request_detail_session', 'fk_refund_request_component_session_id', 'OBJECT';
EXECUTE sp_rename 'uk_refund_request_detail_session', 'uk_refund_request_component_session_id', 'OBJECT';

-- remove_duplicate_receipt_component_foreign_key
ALTER TABLE receipt_component
    DROP CONSTRAINT fk_receipt_detail;

-- rename_comment_note
EXECUTE sp_rename 'comment.encrypted_note', 'content', 'COLUMN';

-- rename_order_cancellation_task
EXECUTE sp_rename 'order_cancellation_task', 'order_related_job';
EXECUTE sp_rename 'pk_order_cancellation_task', 'pk_order_related_job', 'OBJECT';
EXECUTE sp_rename 'fk_order_cancellation_task_created_by', 'fk_order_related_job_created_by', 'OBJECT';

-- Drop unused tables
DROP TABLE cca_session_autowrap;
DROP TABLE codex_when;
DROP TABLE codex_then;
DROP TABLE codex_rule;
DROP TABLE codex;
DROP TABLE wizard_message;
DROP TABLE balance_adjustment_limit;
DROP TABLE cca_limit;
DROP TABLE disputed_card_tag;
DROP TABLE disputed_card_item_detail;
DROP TABLE disputed_card_detail;

GO

-- rename_product_selection_type
UPDATE selection
SET type = 'CARD'
WHERE type = 'PRODUCT';

-- remove_obsolete_selection_columns
ALTER TABLE selection
    DROP COLUMN search_complete;
ALTER TABLE selection
    DROP COLUMN results_found;
ALTER TABLE selection
    DROP COLUMN selection_made;

GO

-- rename_product_selection_type_continued
UPDATE search_type
SET selection_type = 'CARD'
WHERE selection_type = 'PRODUCT';

UPDATE session_queue
SET type = 'CARD'
WHERE type = 'PRODUCT';

-- drop_audit_activity_note
ALTER TABLE audit_activity
    DROP COLUMN system_note;

-- call_component_modified_date
ALTER TABLE call_component
    ADD modified_date DATETIME2;

GO

UPDATE call_component
SET modified_date = created_date;

ALTER TABLE call_component
    ALTER COLUMN modified_date DATETIME2 NOT NULL;

-- call_component_modified_date_index
CREATE INDEX idx_call_component_modified_date
    ON call_component (modified_date);

-- clean_up_empty_identifier_comments
WITH selected_records AS (SELECT c.id FROM comment c WHERE c.content IS NULL)
DELETE
FROM identifier_comment
WHERE comment_id IN (SELECT id FROM selected_records);

-- clean_up_empty_session_comments
WITH selected_records AS (SELECT c.id FROM comment c WHERE c.content IS NULL)
DELETE
FROM session_comment
WHERE comment_id IN (SELECT id FROM selected_records);

-- clean_up_empty_comments
DELETE
FROM comment
WHERE content IS NULL;

-- comment_modified_index
CREATE INDEX idx_comment_modified_date ON comment (modified_date);
