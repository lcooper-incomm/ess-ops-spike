CREATE TABLE session_class (
    id            BIGINT IDENTITY (1, 1) NOT NULL,
    name          VARCHAR(64)            NOT NULL,
    permission_id BIGINT,
    CONSTRAINT pk_session_class PRIMARY KEY (id),
    CONSTRAINT uk_session_class UNIQUE (name),
    CONSTRAINT fk_session_class_permission_id FOREIGN KEY (permission_id) REFERENCES permission (id)
);

GO

CREATE TABLE session_type (
    id               BIGINT IDENTITY (1, 1) NOT NULL,
    name             VARCHAR(64)            NOT NULL,
    session_class_id BIGINT                 NOT NULL,
    CONSTRAINT pk_session_type PRIMARY KEY (id),
    CONSTRAINT uk_session_type UNIQUE (name),
    CONSTRAINT fk_session_type_session_class_id FOREIGN KEY (session_class_id) REFERENCES session_class (id)
);

GO

CREATE TABLE session_component (
    id   BIGINT IDENTITY (1, 1) NOT NULL,
    name VARCHAR(64)            NOT NULL,
    CONSTRAINT pk_session_component PRIMARY KEY (id),
    CONSTRAINT uk_session_component_name UNIQUE (name)
);

GO

CREATE TABLE session_type_session_component (
    session_type_id      BIGINT NOT NULL,
    session_component_id BIGINT NOT NULL,
    CONSTRAINT pk_session_type_session_component PRIMARY KEY (session_type_id, session_component_id),
    CONSTRAINT fk_session_type_session_component_session_type_id FOREIGN KEY (session_type_id) REFERENCES session_type (id),
    CONSTRAINT fk_session_type_session_component_session_component_id FOREIGN KEY (session_component_id) REFERENCES session_component (id)
);

GO

INSERT INTO session_class (name, permission_id)
VALUES ('GENERAL', null),
       ('CALL', (SELECT id FROM permission WHERE system_name = 'SESSION_TYPE_CALL_CENTER')),
       ('CASE', (SELECT id FROM permission WHERE system_name = 'SESSION_TYPE_CASE'));

GO

INSERT INTO session_type (name, session_class_id)
VALUES ('GENERAL', (SELECT id FROM session_class WHERE name = 'GENERAL')),
       ('CALL', (SELECT id FROM session_class WHERE name = 'CALL')),
       ('BAD_CREDIT', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('CONSUMED_CARD', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('DISPUTE', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('ECOMM_FRAUD', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('LAW_ENFORCEMENT', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('DAMAGED_PINS', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('PAYPAL_REDEMPTION_ISSUE', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('MERCHANT_FRAUD', (SELECT id FROM session_class WHERE name = 'CASE')),
       ('OTHER_FRAUD', (SELECT id FROM session_class WHERE name = 'CASE'));

GO

INSERT INTO session_component (name)
VALUES ('GENERAL_COMPONENT'),
       ('CALL_COMPONENT'),
       ('CARDS_COMPONENT'),
       ('CUSTOMER_COMPONENT'),
       ('MERCHANT_COMPONENT'),
       ('RECEIPT_COMPONENT'),
       ('REFUND_REQUEST_COMPONENT'),
       ('LAW_ENFORCEMENT_COMPONENT'),
       ('DOCUMENTS_COMPONENT');

GO

INSERT INTO session_type_session_component (session_type_id, session_component_id)
VALUES ((SELECT id FROM session_type WHERE name = 'GENERAL'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'CALL'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'CALL'),
        (SELECT id FROM session_component WHERE name = 'CALL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'BAD_CREDIT'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'BAD_CREDIT'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'CONSUMED_CARD'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'CONSUMED_CARD'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'CONSUMED_CARD'),
        (SELECT id FROM session_component WHERE name = 'MERCHANT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'CONSUMED_CARD'),
        (SELECT id FROM session_component WHERE name = 'RECEIPT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'CONSUMED_CARD'),
        (SELECT id FROM session_component WHERE name = 'CARDS_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DISPUTE'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DISPUTE'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DISPUTE'),
        (SELECT id FROM session_component WHERE name = 'MERCHANT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DISPUTE'),
        (SELECT id FROM session_component WHERE name = 'CARDS_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'ECOMM_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'ECOMM_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'LAW_ENFORCEMENT'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'LAW_ENFORCEMENT'),
        (SELECT id FROM session_component WHERE name = 'LAW_ENFORCEMENT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DAMAGED_PINS'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DAMAGED_PINS'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DAMAGED_PINS'),
        (SELECT id FROM session_component WHERE name = 'MERCHANT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DAMAGED_PINS'),
        (SELECT id FROM session_component WHERE name = 'CARDS_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'DAMAGED_PINS'),
        (SELECT id FROM session_component WHERE name = 'LAW_ENFORCEMENT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'PAYPAL_REDEMPTION_ISSUE'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'PAYPAL_REDEMPTION_ISSUE'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'PAYPAL_REDEMPTION_ISSUE'),
        (SELECT id FROM session_component WHERE name = 'MERCHANT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'PAYPAL_REDEMPTION_ISSUE'),
        (SELECT id FROM session_component WHERE name = 'CARDS_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'PAYPAL_REDEMPTION_ISSUE'),
        (SELECT id FROM session_component WHERE name = 'LAW_ENFORCEMENT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'MERCHANT_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'MERCHANT_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'MERCHANT_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'MERCHANT_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'MERCHANT_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'CARDS_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'OTHER_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'GENERAL_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'OTHER_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'CUSTOMER_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'OTHER_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'CARDS_COMPONENT')),
       ((SELECT id FROM session_type WHERE name = 'OTHER_FRAUD'),
        (SELECT id FROM session_component WHERE name = 'REFUND_REQUEST_COMPONENT'));


