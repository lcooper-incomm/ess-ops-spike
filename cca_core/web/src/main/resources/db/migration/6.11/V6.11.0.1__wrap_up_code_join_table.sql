CREATE TABLE wrap_up_code_category_wrap_up_code (
    category_id BIGINT NOT NULL,
    code_id     BIGINT NOT NULL,
    CONSTRAINT pk_wrap_up_code_category_wrap_up_code PRIMARY KEY CLUSTERED (category_id, code_id),
    CONSTRAINT fk_wrap_up_code_category_wrap_up_code_category_id FOREIGN KEY (category_id) REFERENCES wrap_up_code_category (id),
    CONSTRAINT fk_wrap_up_code_category_wrap_up_code_code_id FOREIGN KEY (code_id) REFERENCES wrap_up_code (id)
);

INSERT INTO wrap_up_code_category_wrap_up_code
    SELECT
        wrap_up_code_category_id,
        id
    FROM wrap_up_code
    WHERE wrap_up_code_category_id IS NOT NULL
    ORDER BY wrap_up_code_category_id ASC;