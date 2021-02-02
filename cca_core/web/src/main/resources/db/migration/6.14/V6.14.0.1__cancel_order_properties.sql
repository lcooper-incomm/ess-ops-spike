INSERT INTO cca_property (system_name, display_name, description, value) VALUES
    ( 'ECOMM_CANCEL_ORDER_BALANCE_ADJUSTMENT_REASON_CODE', 'E-Comm Cancel Order Reason Code',
      'The reason code used for Balance Adjustment during the cancellation of an E-Comm Order', '90' ),
    ( 'ECOMM_CANCEL_ORDER_JOB_NAME', 'E-Comm Cancel Order Job Name',
      'The Minion job name used when performing tasks related to the cancellation of an E-Comm Order. Order Number is provided, and a "%s" placeholder is used to represent it.',
      'Cancellation Tasks for Order Number %s' );