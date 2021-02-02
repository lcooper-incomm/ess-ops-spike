CREATE TABLE search_type_category (
    id   BIGINT IDENTITY (1, 1) NOT NULL,
    name VARCHAR(64)            NOT NULL,
    CONSTRAINT pk_search_type_category PRIMARY KEY (id),
    CONSTRAINT uk_search_type_category_name UNIQUE (name)
);

CREATE TABLE search_parameter (
    id    BIGINT IDENTITY (1, 1) NOT NULL,
    name  VARCHAR(64)            NOT NULL, --Display name
    type  VARCHAR(64)            NOT NULL, --Enum name, to correlate to front-end components
    value VARCHAR(64)            NOT NULL, --Parameter name for use in requests
    CONSTRAINT pk_search_parameter PRIMARY KEY (id)
);

CREATE TABLE search_type (
    id                                BIGINT IDENTITY (1, 1) NOT NULL,
    name                              VARCHAR(64)            NOT NULL,
    category_id                       BIGINT                 NOT NULL,
    platform                          VARCHAR(64)            NOT NULL,
    selection_type                    VARCHAR(64),
    type                              VARCHAR(64)            NOT NULL,
    default_quick_search_parameter_id BIGINT,
    CONSTRAINT pk_search_type PRIMARY KEY (id),
    CONSTRAINT uk_search_type_name UNIQUE (name),
    CONSTRAINT uk_search_type_type UNIQUE (type),
    CONSTRAINT fk_search_type_category_id FOREIGN KEY (category_id) REFERENCES search_type_category (id),
    CONSTRAINT fk_search_type_default_quick_search_parameter_id FOREIGN KEY (default_quick_search_parameter_id) REFERENCES search_parameter (id)
);

CREATE TABLE search_type_permission (
    search_type_id BIGINT NOT NULL,
    permission_id  BIGINT NOT NULL,
    CONSTRAINT pk_search_type_permission PRIMARY KEY (search_type_id, permission_id),
    CONSTRAINT fk_search_type_search_type_id FOREIGN KEY (search_type_id) REFERENCES search_type (id),
    CONSTRAINT fk_search_type_permission_id FOREIGN KEY (permission_id) REFERENCES permission (id)
);

CREATE TABLE search_type_parameter_group (
    id             BIGINT IDENTITY (1, 1) NOT NULL,
    name           VARCHAR(64)            NOT NULL,
    priority       INT                    NOT NULL,
    search_type_id BIGINT                 NOT NULL,
    CONSTRAINT pk_search_type_parameter_group PRIMARY KEY (id),
    CONSTRAINT fk_search_type_parameter_group_search_type_id FOREIGN KEY (search_type_id) REFERENCES search_type (id)
);

CREATE TABLE search_type_parameter_group_parameter (
    id                  BIGINT IDENTITY (1, 1) NOT NULL,
    group_id            BIGINT                 NOT NULL,
    search_parameter_id BIGINT                 NOT NULL,
    priority            INT                    NOT NULL,
    is_advanced         BIT                    NOT NULL,
    CONSTRAINT pk_search_type_parameter PRIMARY KEY (id),
    CONSTRAINT uk_search_type_group_id_search_parameter_id UNIQUE (group_id, search_parameter_id),
    CONSTRAINT fk_search_type_parameter_group_id FOREIGN KEY (group_id) REFERENCES search_type_parameter_group (id),
    CONSTRAINT fk_search_type_parameter_search_parameter_id FOREIGN KEY (search_parameter_id) REFERENCES search_parameter (id)
);

CREATE TABLE search_type_quick_search_parameter (
    search_type_id      BIGINT NOT NULL,
    search_parameter_id BIGINT NOT NULL,
    CONSTRAINT pk_search_type_quick_search_parameter PRIMARY KEY (search_type_id, search_parameter_id),
    CONSTRAINT fk_search_type_quick_search_parameter_search_type_id FOREIGN KEY (search_type_id) REFERENCES search_type (id),
    CONSTRAINT fk_search_type_quick_search_parameter_search_parameter_id FOREIGN KEY (search_parameter_id) REFERENCES search_parameter (id)
);

CREATE TABLE search_type_partner (
    search_type_id BIGINT NOT NULL,
    partner_id     BIGINT NOT NULL,
    CONSTRAINT pk_search_type_partner PRIMARY KEY (search_type_id, partner_id),
    CONSTRAINT fk_search_type_partner_search_type_id FOREIGN KEY (search_type_id) REFERENCES search_type (id),
    CONSTRAINT fk_search_type_partner_partner_id FOREIGN KEY (partner_id) REFERENCES partner (id)
);

GO

INSERT INTO search_type_category (name)
VALUES ('Locations'),
       ('Gift'),
       ('Financial'),
       ('System');

INSERT INTO search_parameter (name, type, value)
VALUES ('Account Number', 'ACCOUNT_NUMBER', 'accountNumber'),
       ('Address', 'ADDRESS', 'address'),
       ('Address Line 1', 'ADDRESS_LINE_1', 'address1'),
       ('Address Line 2', 'ADDRESS_LINE_2', 'address2'),
       ('CAN', 'CAN', 'can'),
       ('Card ID', 'CARD_ID', 'cardId'),
       ('City', 'CITY', 'city'),
       ('Customer Name', 'CUSTOMER_NAME', 'customerName'),
       ('Control Number', 'CONTROL_NUMBER', 'controlNumber'),
       ('Customer Phone', 'CUSTOMER_PHONE', 'customerPhone'),
       ('Date of Birth', 'DATE_OF_BIRTH', 'dateOfBirth'),
       ('Description', 'DESCRIPTION', 'description'),
       ('Email Address', 'EMAIL_ADDRESS', 'email'),
       ('End Date', 'END_DATE', 'endDate'),
       ('First Name', 'FIRST_NAME', 'firstName'),
       ('Identification', 'IDENTIFICATION', 'identification'),
       ('Issue ID', 'ISSUE_ID', 'issueId'),
       ('Last Four', 'LAST_FOUR', 'lastFour'),
       ('Last Name', 'LAST_NAME', 'lastName'),
       ('Location', 'LOCATION_NAME', 'locationName'),
       ('Merchant', 'MERCHANT_NAME', 'merchantName'),
       ('Online User ID', 'ONLINE_USER_ID', 'onlineUserId'),
       ('Order ID', 'ORDER_ID', 'orderId'),
       ('Order Number', 'ORDER_NUMBER', 'orderNumber'),
       ('Card Number', 'PAN_VMS', 'PAN'),
       ('Partner', 'PARTNER', 'partner'),
       ('Phone Number', 'PHONE_NUMBER', 'phoneNumber'),
       ('PIN', 'PIN', 'pin'),
       ('Postal Code', 'POSTAL_CODE', 'postalCode'),
       ('Pre-Auth Key', 'PRE_AUTH_KEY', 'preauthKey'),
       ('Proxy Number', 'PROXY_NUMBER', 'proxyNumber'),
       ('Recent Activity', 'RECENT_ACTIVITY', 'recentActivity'),
       ('PAN', 'REVERSE_VRN', 'reverseVrn'),
       ('PAN', 'PAN', 'pan'),
       ('Control Number', 'REVERSE_VRN_BY_CONTROL_NUMBER', 'reverseVrnByControlNumber'),
       ('Serial Number', 'SERIAL_NUMBER', 'serialNumber'),
       ('Shipment Number', 'SHIPMENT_NUMBER', 'shipmentId'),
       ('SID', 'SESSION_ID', 'sid'),
       ('Start Date', 'START_DATE', 'startDate'),
       ('State/Province', 'STATE_PROVINCE', 'state'),
       ('State', 'STATE', 'state'),
       ('Summary', 'SUMMARY', 'summary'),
       ('Terminal ID', 'TERMINAL_ID', 'terminalID'),
       ('Transaction ID', 'TRANSACTION_ID', 'transactionId'),
       ('VAN', 'VAN', 'van16'),
       ('Vendor Serial Number', 'VENDOR_SERIAL_NUMBER', 'vendorSerialNumber');

INSERT INTO search_type (name, type, category_id, platform, selection_type, default_quick_search_parameter_id)
VALUES ('Location',
        'LOCATION',
        (SELECT id FROM search_type_category WHERE name = 'Locations'),
        'INCOMM',
        'LOCATION',
        (SELECT id FROM search_parameter WHERE type = 'LOCATION_NAME')),
       ('DDP',
        'DDP',
        (SELECT id FROM search_type_category WHERE name = 'Gift'),
        'DDP',
        'PRODUCT',
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ('E-Comm Order',
        'ECOMM_ORDER',
        (SELECT id FROM search_type_category WHERE name = 'Gift'),
        'ECOMM',
        'ORDER',
        NULL),
       ('VMS Gift Card',
        'VMS_GIFT',
        (SELECT id FROM search_type_category WHERE name = 'Gift'),
        'VMS',
        'CUSTOMER',
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS')),
       ('FastCard/FastPIN',
        'FASTCARD_FASTPIN',
        (SELECT id FROM search_type_category WHERE name = 'Financial'),
        'INCOMM',
        'PRODUCT',
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ('Financial Gift',
        'FINANCIAL_GIFT',
        (SELECT id FROM search_type_category WHERE name = 'Financial'),
        'GREENCARD',
        'PRODUCT',
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ('VMS GPR Card',
        'VMS_GPR',
        (SELECT id FROM search_type_category WHERE name = 'Financial'),
        'VMS',
        'CUSTOMER',
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS')),
       ('VRN/Swipe Reload',
        'VRN_SWIPE_RELOAD',
        (SELECT id FROM search_type_category WHERE name = 'Financial'),
        'SRL',
        'PRODUCT',
        (SELECT id FROM search_parameter WHERE type = 'REVERSE_VRN')),
       ('Vanilla Direct',
        'VANILLA_DIRECT',
        (SELECT id FROM search_type_category WHERE name = 'Financial'),
        'CASHTIE',
        'ACCOUNT',
        (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER')),
       ('JIRA',
        'JIRA',
        (SELECT id FROM search_type_category WHERE name = 'System'),
        'JIRA',
        'JIRA',
        (SELECT id FROM search_parameter WHERE type = 'ISSUE_ID')),
       ('Session', 'SESSION', (SELECT id FROM search_type_category WHERE name = 'System'), 'CCA', NULL, NULL);

INSERT INTO search_type_permission (search_type_id, permission_id)
VALUES ((SELECT id FROM search_type WHERE type = 'DDP'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_DDP')),
       ((SELECT id FROM search_type WHERE type = 'ECOMM_ORDER'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_ECOMM_ORDER')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_INCOMM')),
       ((SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_FINANCIAL_GIFT')),
       ((SELECT id FROM search_type WHERE type = 'JIRA'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_JIRA')),
       ((SELECT id FROM search_type WHERE type = 'LOCATION'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_LOCATION')),
       ((SELECT id FROM search_type WHERE type = 'SESSION'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_SESSIONS_ALL')),
       ((SELECT id FROM search_type WHERE type = 'SESSION'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_SESSIONS_CALL_CENTER')),
       ((SELECT id FROM search_type WHERE type = 'SESSION'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_SESSIONS_CASE')),
       ((SELECT id FROM search_type WHERE type = 'SESSION'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_SESSIONS_GENERAL')),
       ((SELECT id FROM search_type WHERE type = 'VANILLA_DIRECT'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_VANILLA_DIRECT')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GIFT'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_GPR')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GPR'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_GPR')),
       ((SELECT id FROM search_type WHERE type = 'VRN_SWIPE_RELOAD'),
        (SELECT id FROM permission WHERE system_name = 'SEARCH_BY_VRN'));

INSERT INTO search_type_parameter_group (name, priority, search_type_id)
VALUES ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'DDP')),
       ('Order Information', 0, (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
       ('Purchaser Information', 1, (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
       ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
       ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT')),
       ('Card Information', 0, (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
       ('Personal Information', 1, (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
       ('Address Information', 2, (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
       ('Card Information', 0, (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
       ('Transaction Information', 1, (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
       ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'JIRA')),
       ('Advanced Search', 1, (SELECT id FROM search_type WHERE type = 'JIRA')),
       ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'LOCATION')),
       ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'SESSION')),
       ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'VANILLA_DIRECT')),
       ('Basic Search', 0, (SELECT id FROM search_type WHERE type = 'VRN_SWIPE_RELOAD'));

INSERT INTO search_type_parameter_group_parameter (group_id, search_parameter_id, priority, is_advanced)
VALUES ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'DDP')),
        (SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'DDP')),
        (SELECT id FROM search_parameter WHERE type = 'PAN'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'DDP')),
        (SELECT id FROM search_parameter WHERE type = 'PIN'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'DDP')),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
        3,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Order Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
        (SELECT id FROM search_parameter WHERE type = 'ORDER_NUMBER'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Order Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
        (SELECT id FROM search_parameter WHERE type = 'SHIPMENT_NUMBER'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Order Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Purchaser Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
        (SELECT id FROM search_parameter WHERE type = 'FIRST_NAME'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Purchaser Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
        (SELECT id FROM search_parameter WHERE type = 'LAST_NAME'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Purchaser Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
        (SELECT id FROM search_parameter WHERE type = 'EMAIL_ADDRESS'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Purchaser Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'ECOMM_ORDER')),
        (SELECT id FROM search_parameter WHERE type = 'LAST_FOUR'),
        3,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
        (SELECT id FROM search_parameter WHERE type = 'VAN'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
        (SELECT id FROM search_parameter WHERE type = 'PIN'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
        (SELECT id FROM search_parameter WHERE type = 'VENDOR_SERIAL_NUMBER'),
        3,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
        (SELECT id FROM search_parameter WHERE type = 'PROXY_NUMBER'),
        4,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
        (SELECT id FROM search_parameter WHERE type = 'CONTROL_NUMBER'),
        5,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN')),
        (SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID'),
        6,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'PAN'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'VAN'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'CAN'),
        3,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID'),
        4,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'PRE_AUTH_KEY'),
        5,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'PROXY_NUMBER'),
        3,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'CARD_ID'),
        4,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Personal Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'FIRST_NAME'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Personal Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'LAST_NAME'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Personal Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'ONLINE_USER_ID'),
        2,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Personal Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'EMAIL_ADDRESS'),
        3,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Personal Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'DATE_OF_BIRTH'),
        4,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Personal Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'IDENTIFICATION'),
        5,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Address Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'ADDRESS_LINE_1'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Address Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'ADDRESS_LINE_2'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Address Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'POSTAL_CODE'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Address Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'CITY'),
        3,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Address Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GPR')),
        (SELECT id FROM search_parameter WHERE type = 'STATE_PROVINCE'),
        4,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'PAN_VMS'),
        0,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER'),
        1,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
        2,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'PROXY_NUMBER'),
        3,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Card Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'CARD_ID'),
        4,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Transaction Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Transaction Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'START_DATE'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Transaction Information'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VMS_GIFT')),
        (SELECT id FROM search_parameter WHERE type = 'END_DATE'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'JIRA')),
        (SELECT id FROM search_parameter WHERE type = 'ISSUE_ID'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'JIRA')),
        (SELECT id FROM search_parameter WHERE type = 'CUSTOMER_NAME'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Advanced Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'JIRA')),
        (SELECT id FROM search_parameter WHERE type = 'SUMMARY'),
        0,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Advanced Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'JIRA')),
        (SELECT id FROM search_parameter WHERE type = 'DESCRIPTION'),
        1,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Advanced Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'JIRA')),
        (SELECT id FROM search_parameter WHERE type = 'CUSTOMER_PHONE'),
        2,
        1),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'MERCHANT_NAME'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'LOCATION_NAME'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'TERMINAL_ID'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'PHONE_NUMBER'),
        3,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'ADDRESS'),
        4,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'CITY'),
        5,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'STATE_PROVINCE'),
        6,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'LOCATION')),
        (SELECT id FROM search_parameter WHERE type = 'POSTAL_CODE'),
        7,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'SESSION')),
        (SELECT id FROM search_parameter WHERE type = 'SESSION_ID'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'SESSION')),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER'),
        1,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'SESSION')),
        (SELECT id FROM search_parameter WHERE type = 'VAN'),
        2,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VANILLA_DIRECT')),
        (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VRN_SWIPE_RELOAD')),
        (SELECT id FROM search_parameter WHERE type = 'REVERSE_VRN_BY_CONTROL_NUMBER'),
        0,
        0),
       ((SELECT id
         FROM search_type_parameter_group
         WHERE name = 'Basic Search'
           AND search_type_id = (SELECT id FROM search_type WHERE type = 'VRN_SWIPE_RELOAD')),
        (SELECT id FROM search_parameter WHERE type = 'REVERSE_VRN'),
        1,
        0);

INSERT INTO search_type_quick_search_parameter (search_type_id, search_parameter_id)
VALUES ((SELECT id FROM search_type WHERE type = 'DDP'),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'DDP'), (SELECT id FROM search_parameter WHERE type = 'PAN')),
       ((SELECT id FROM search_type WHERE type = 'DDP'), (SELECT id FROM search_parameter WHERE type = 'PIN')),
       ((SELECT id FROM search_type WHERE type = 'DDP'),
        (SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM search_parameter WHERE type = 'VAN')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM search_parameter WHERE type = 'PIN')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM search_parameter WHERE type = 'VENDOR_SERIAL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM search_parameter WHERE type = 'CONTROL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID')),
       ((SELECT id FROM search_type WHERE type = 'FASTCARD_FASTPIN'),
        (SELECT id FROM search_parameter WHERE type = 'PROXY_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'VAN')),
       ((SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'CAN')),
       ((SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'PRE_AUTH_KEY')),
       ((SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'PAN')),
       ((SELECT id FROM search_type WHERE type = 'FINANCIAL_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'TRANSACTION_ID')),
       ((SELECT id FROM search_type WHERE type = 'JIRA'), (SELECT id FROM search_parameter WHERE type = 'ISSUE_ID')),
       ((SELECT id FROM search_type WHERE type = 'JIRA'),
        (SELECT id FROM search_parameter WHERE type = 'CUSTOMER_NAME')),
       ((SELECT id FROM search_type WHERE type = 'LOCATION'),
        (SELECT id FROM search_parameter WHERE type = 'LOCATION_NAME')),
       ((SELECT id FROM search_type WHERE type = 'LOCATION'),
        (SELECT id FROM search_parameter WHERE type = 'MERCHANT_NAME')),
       ((SELECT id FROM search_type WHERE type = 'LOCATION'),
        (SELECT id FROM search_parameter WHERE type = 'TERMINAL_ID')),
       ((SELECT id FROM search_type WHERE type = 'LOCATION'),
        (SELECT id FROM search_parameter WHERE type = 'PHONE_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'VANILLA_DIRECT'),
        (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GIFT'), (SELECT id FROM search_parameter WHERE type = 'PAN_VMS')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GIFT'),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GPR'),
        (SELECT id FROM search_parameter WHERE type = 'CUSTOMER_NAME')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GPR'), (SELECT id FROM search_parameter WHERE type = 'PAN_VMS')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GPR'),
        (SELECT id FROM search_parameter WHERE type = 'ACCOUNT_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'VMS_GPR'),
        (SELECT id FROM search_parameter WHERE type = 'SERIAL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'VRN_SWIPE_RELOAD'),
        (SELECT id FROM search_parameter WHERE type = 'REVERSE_VRN_BY_CONTROL_NUMBER')),
       ((SELECT id FROM search_type WHERE type = 'VRN_SWIPE_RELOAD'),
        (SELECT id FROM search_parameter WHERE type = 'REVERSE_VRN'));

INSERT INTO search_type_partner (search_type_id, partner_id)
VALUES (( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
        ( SELECT id FROM partner WHERE type = 'COINBASE' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'DFC' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'EPP' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'INCOMM' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'JACKSONHEWITT' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'LYFE' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'NEXTCALA' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'PAYPAL' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'DOLLARGENERAL' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GIFT' ),
 ( SELECT id FROM partner WHERE type = 'GLOBAL' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'COINBASE' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'DFC' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'EPP' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'INCOMM' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'JACKSONHEWITT' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'LYFE' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'NEXTCALA' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'PAYPAL' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'DOLLARGENERAL' and platform = 'VMS' )),
(( SELECT id FROM search_type WHERE type = 'VMS_GPR' ),
 ( SELECT id FROM partner WHERE type = 'GLOBAL' and platform = 'VMS' ));
