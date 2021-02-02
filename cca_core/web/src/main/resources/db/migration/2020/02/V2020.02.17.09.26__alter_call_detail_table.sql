ALTER TABLE call_detail
  ADD account_id  VARCHAR(256) NULL,
      is_card_verified  BIT NULL,
      is_date_of_birth_verified  BIT NULL,
      is_last_four_ssn_verified  BIT NULL;
