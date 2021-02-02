/*
Future requirements will add more columns to this table, it's not going to stay this empty for long.
 */
CREATE TABLE documents_component (
    id         BIGINT IDENTITY (1, 1) NOT NULL,
    session_id BIGINT                 NOT NULL,
    CONSTRAINT pk_documents_component PRIMARY KEY CLUSTERED (id),
    CONSTRAINT fk_documents_component_session FOREIGN KEY (session_id) REFERENCES cca_session (id)
);

--We will be querying these by session_id often
CREATE NONCLUSTERED INDEX idx_documents_component_session_id
    ON documents_component (session_id);