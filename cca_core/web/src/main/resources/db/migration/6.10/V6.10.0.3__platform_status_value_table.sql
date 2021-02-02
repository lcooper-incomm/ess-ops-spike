CREATE TABLE platform_status_value (
    id       BIGINT IDENTITY (1, 1) NOT NULL,
    platform VARCHAR(64)            NOT NULL,
    name  VARCHAR(64) NOT NULL,
    value VARCHAR(64) NOT NULL,
    CONSTRAINT pk_platform_status_value PRIMARY KEY CLUSTERED (id),
    CONSTRAINT uk_platform_status_value_platform_name UNIQUE (platform, name)
);