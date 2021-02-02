ALTER TABLE identifier
    DROP CONSTRAINT uk_identifier_composite;

GO

ALTER TABLE identifier
    ADD CONSTRAINT uk_identifier UNIQUE (identifier, identifier_type, platform, partner);