CREATE TABLE codex (
    id          BIGINT IDENTITY (1, 1) NOT NULL,
    name        VARCHAR(64)            NOT NULL,
    description VARCHAR(512),
    CONSTRAINT pk_codex PRIMARY KEY CLUSTERED (id),
    CONSTRAINT uk_codex_system_name UNIQUE (name)
);

CREATE TABLE codex_rule (
    id          BIGINT IDENTITY (1, 1) NOT NULL,
    codex_id    BIGINT                 NOT NULL,
    description VARCHAR(512)           NOT NULL,
    rule_flow   VARCHAR(64)            NOT NULL,
    rule_order  INT,
    CONSTRAINT pk_codex_rule PRIMARY KEY (id),
    CONSTRAINT fk_codex_rule_codex FOREIGN KEY (codex_id) REFERENCES codex (id)
);

CREATE TABLE codex_when (
    id            BIGINT IDENTITY (1, 1) NOT NULL,
    codex_rule_id BIGINT                 NOT NULL,
    when_type     VARCHAR(64)            NOT NULL,
    when_value    VARCHAR(64),
    negate        BIT,
    CONSTRAINT pk_codex_when PRIMARY KEY CLUSTERED (id),
    CONSTRAINT fk_codex_when_codex_rule FOREIGN KEY (codex_rule_id) REFERENCES codex_rule (id)
);

CREATE TABLE codex_then (
    id            BIGINT IDENTITY (1, 1) NOT NULL,
    codex_rule_id BIGINT                 NOT NULL,
    then_type     VARCHAR(64)            NOT NULL,
    then_value    VARCHAR(64),
    CONSTRAINT pk_codex_then PRIMARY KEY CLUSTERED (id),
    CONSTRAINT fk_codex_then_codex_rule FOREIGN KEY (codex_rule_id) REFERENCES codex_rule (id)
);

CREATE NONCLUSTERED INDEX idx_codex_rule_codex_id
    ON codex_rule (codex_id);
CREATE NONCLUSTERED INDEX idx_codex_when_codex_rule_id
    ON codex_when (codex_rule_id);
CREATE NONCLUSTERED INDEX idx_codex_then_codex_rule_id
    ON codex_then (codex_rule_id);

