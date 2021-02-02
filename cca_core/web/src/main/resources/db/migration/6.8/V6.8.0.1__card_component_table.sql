/*
For now, this table is simply a means to organize cards together. Future requirements, though, will add more columns to
this table.
 */
CREATE TABLE card_component (
    id         BIGINT IDENTITY (1, 1) NOT NULL,
    session_id BIGINT                 NOT NULL,
    CONSTRAINT pk_card_component PRIMARY KEY CLUSTERED (id),
    CONSTRAINT fk_card_component_session FOREIGN KEY (session_id) REFERENCES cca_session (id)
);

--We will be querying these by session_id often
CREATE NONCLUSTERED INDEX idx_card_component_session_id
    ON card_component (session_id);