INSERT INTO cca_property (system_name, display_name, description, value) VALUES
    ( 'CANCEL_ORDER_SUPPORTED_STATUSES', 'Cancel E-Comm Order Supported Statuses',
      'Statuses supported for cancelling an E-Comm Order',
      'RISK_SUCCESS,RISK_PENDING,RISK_DECLINED,ORDER_INIT,HOLD,FRAUD_INIT,FRAUD_FAILED,FRAUD_RETRYING,FRAUD_PENDING,FRAUD_SUCCESS,FRAUD_DECLINED,FULFILLMENT_READY' );

INSERT INTO cca_property (system_name, display_name, description, value) VALUES
    ( 'REFUND_ORDER_SUPPORTED_STATUSES', 'Refund E-Comm Order Supported Statuses',
      'Statuses supported for refunding an E-Comm Order',
      'FULFILLMENT_INIT,FULFILLMENT_DECLINED,FULFILLMENT_REJECTED,FULFILLMENT_ACCEPTED,FULFILLMENT_PENDING,FULFILLMENT_PARTIAL,FULFILLMENT_COMPLETE,PAYMENT_PARTIAL_COMPLETE,PAYMENT_COMPLETE,COMPLETE' );