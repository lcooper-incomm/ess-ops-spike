ALTER TABLE customer_detail
    ADD created_date DATETIME2;
ALTER TABLE customer_detail
    ADD modified_date DATETIME2;

GO

WITH joined_records AS ( SELECT cd.id AS customer_detail_id, s.created_date AS created_date
                         FROM customer_detail cd
                                  JOIN cca_session s ON s.id = cd.session_id )
UPDATE customer_detail
SET created_date = ( SELECT created_date
                     FROM joined_records
                     WHERE customer_detail_id = id );

UPDATE customer_detail
SET modified_date = created_date;

GO

ALTER TABLE customer_detail
    ALTER COLUMN created_date DATETIME2 NOT NULL;
ALTER TABLE customer_detail
    ALTER COLUMN modified_date DATETIME2 NOT NULL;