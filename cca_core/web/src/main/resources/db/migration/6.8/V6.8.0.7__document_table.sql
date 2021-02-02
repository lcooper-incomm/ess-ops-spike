CREATE TABLE document (
    id                     BIGINT IDENTITY (1, 1) NOT NULL,
    documents_component_id BIGINT                 NOT NULL,
    name                   VARCHAR(64)            NOT NULL,
    link                   VARCHAR(512)           NOT NULL,
    created_date           DATETIME2              NOT NULL,
    created_by             BIGINT                 NOT NULL,
    modified_date          DATETIME2              NOT NULL,
    modified_by            BIGINT                 NOT NULL,
    CONSTRAINT pk_document PRIMARY KEY CLUSTERED (id),
    CONSTRAINT fk_document_documents_component FOREIGN KEY (documents_component_id) REFERENCES documents_component (id),
    CONSTRAINT fk_document_created_by FOREIGN KEY (created_by) REFERENCES cca_user (id),
    CONSTRAINT fk_document_modified_by FOREIGN KEY (modified_by) REFERENCES cca_user (id)
);

--We will be querying these by documents_component_id often
CREATE NONCLUSTERED INDEX idx_document_documents_component_id
    ON document (documents_component_id);