CREATE TABLE card (
    id                        BIGINT IDENTITY (1, 1) NOT NULL,
    card_component_id         BIGINT                 NOT NULL,
    selection_id              BIGINT                 NOT NULL,
    card_set                  INT                    NOT NULL,
    card_type                 VARCHAR(64)            NOT NULL,
    incomm_load_amount        DECIMAL(19, 2),
    merchant_load_amount      DECIMAL(19, 2),
    recovered_amount          DECIMAL(19, 2),
    note                      VARCHAR(512),
    is_seeking_approval       BIT                    NOT NULL DEFAULT 0,
    is_approved               BIT                    NOT NULL DEFAULT 0,
    is_denied                 BIT                    NOT NULL DEFAULT 0,
    is_activated              BIT                    NOT NULL DEFAULT 0,
    is_needing_replacement    BIT                    NOT NULL DEFAULT 0,
    is_needing_check_issued   BIT                    NOT NULL DEFAULT 0,
    is_replaced               BIT                    NOT NULL DEFAULT 0,
    is_check_issued           BIT                    NOT NULL DEFAULT 0,
    is_awaiting_it_activation BIT                    NOT NULL DEFAULT 0,
    is_it_activated           BIT                    NOT NULL DEFAULT 0,
    is_deactivated            BIT                    NOT NULL DEFAULT 0,
    is_funds_removed          BIT                    NOT NULL DEFAULT 0,
    is_loaded                 BIT                    NOT NULL DEFAULT 0,
    is_shipped                BIT                    NOT NULL DEFAULT 0,
    CONSTRAINT pk_card PRIMARY KEY CLUSTERED (id),
    CONSTRAINT fk_card_card_component FOREIGN KEY (card_component_id) REFERENCES card_component (id),
    CONSTRAINT fk_card_selection FOREIGN KEY (selection_id) REFERENCES selection (id),
    /*
    We will both often be querying by these three values, and want these values to remain unique. Up to one card of each
    type per card_set per card_component.
     */
    CONSTRAINT uk_card_card_component_set_type UNIQUE (card_component_id, card_set, card_type)
);

--We will be querying these by card_component_id often
CREATE NONCLUSTERED INDEX idx_card_card_component_id
    ON card (card_component_id);