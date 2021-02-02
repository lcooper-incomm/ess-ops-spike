CREATE TABLE audit_card_workflow_activity (
    id           BIGINT IDENTITY (1, 1) NOT NULL,
    card_id      BIGINT                 NOT NULL,
    field_name   VARCHAR(64)            NOT NULL,
    from_value   BIT                    NOT NULL,
    to_value     BIT                    NOT NULL,
    created_date DATETIME2              NOT NULL,
    user_id      BIGINT                 NOT NULL,
    CONSTRAINT pk_audit_card_workflow_activity PRIMARY KEY CLUSTERED (id),
    CONSTRAINT fk_audit_card_workflow_activity_card FOREIGN KEY (card_id) REFERENCES card (id),
    CONSTRAINT fk_audit_card_workflow_activity_user FOREIGN KEY (user_id) REFERENCES cca_user (id)
);

CREATE NONCLUSTERED INDEX idx_audit_card_workflow_activity_card_id
    ON audit_card_workflow_activity (card_id);