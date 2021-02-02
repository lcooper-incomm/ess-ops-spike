INSERT INTO cca_property (system_name, display_name, description, value) VALUES
    ( 'DEFAULT_SEND_DISPUTE_FORM_BCC_DISTRIBUTION_GIFT_CARD', 'Default Send Dispute Form BCC Distribution - Gift Card',
      'The BCC group for emails related to send dispute form requests for VMS Gift Cards', 'gprdisputes@incomm.com' ),
    ( 'DEFAULT_SEND_FORM_FAX_DISTRIBUTION_DISPUTES_GIFT_CARD',
      'Default Send Form Fax Distribution - Disputes - Gift Card',
      'The email address to which Minion should forward Send Dispute Form requests when the delivery method is Fax, for VMS Gift Cards',
      'gprdisputes@incomm.com' ),
    ( 'DEFAULT_SEND_FORM_MAIL_DISTRIBUTION_DISPUTES_GIFT_CARD',
      'Default Send Form Mail Distribution - Disputes - Gift Card',
      'The email address to which Minion should forward Send Dispute Form requests when the delivery method is Mail, for VMS Gift Cards',
      'gprdisputes@incomm.com' );

UPDATE cca_property
SET display_name = 'Default Send Dispute Form BCC Distribution - GPR'
WHERE system_name = 'DEFAULT_SEND_DISPUTE_FORM_BCC_DISTRIBUTION';

UPDATE cca_property
SET display_name = 'Default Send Form Fax Distribution - Disputes - GPR'
WHERE system_name = 'DEFAULT_SEND_FORM_FAX_DISTRIBUTION_DISPUTES';

UPDATE cca_property
SET display_name = 'Default Send Form Mail Distribution - Disputes - GPR'
WHERE system_name = 'DEFAULT_SEND_FORM_MAIL_DISTRIBUTION_DISPUTES';