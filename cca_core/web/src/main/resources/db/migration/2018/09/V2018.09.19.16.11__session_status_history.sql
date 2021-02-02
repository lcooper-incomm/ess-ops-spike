CREATE TABLE session_status_history (
    id           BIGINT IDENTITY (1,1) NOT NULL,
    session_id   BIGINT                NOT NULL,
    user_id      BIGINT                NOT NULL,
    from_status  VARCHAR(64)           NOT NULL,
    to_status    VARCHAR(64)           NOT NULL,
    created_date DATETIME2             NOT NULL,
    CONSTRAINT pk_session_status_history PRIMARY KEY ( id ),
    CONSTRAINT fk_session_status_history_session_id FOREIGN KEY ( session_id ) REFERENCES cca_session ( id ),
    CONSTRAINT fk_session_status_history_user_id FOREIGN KEY ( user_id ) REFERENCES cca_user ( id )
);