CREATE TABLE order_cancellation_task (
    id            BIGINT IDENTITY (1, 1) NOT NULL,
    order_id      INT                    NOT NULL,
    job_id        INT                    NOT NULL,
    target_status VARCHAR(64)            NOT NULL,
    created_date  DATETIME2              NOT NULL,
    created_by    BIGINT                 NOT NULL,
    CONSTRAINT pk_order_cancellation_task PRIMARY KEY (id),
    CONSTRAINT fk_order_cancellation_task_created_by FOREIGN KEY (created_by) REFERENCES cca_user (id)
);

CREATE NONCLUSTERED INDEX idx_order_cancellation_task_order_id
    ON order_cancellation_task (order_id);