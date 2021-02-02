ALTER TABLE cca_property
    ALTER COLUMN value VARCHAR(MAX) NOT NULL;

GO

INSERT INTO cca_property (system_name, display_name, description, value)
VALUES ('BOL_CANCEL_ORDER_SUPPORTED_STATUSES', 'Cancel BOL Order Supported Statuses',
        'Statuses supported for cancelling a BOL Order',
        'PAYMENT_FAILED,RISK_FAILED,PAYMENT_SUCCESS,RISK_SUCCESS,RISK_PENDING,ORDER_DEFERRED,HOLD,FRAUD_INIT,FRAUD_FAILED,FRAUD_RETRYING,FRAUD_PENDING,FRAUD_REMEDIATION,FRAUD_DECLINED');

INSERT INTO cca_property (system_name, display_name, description, value)
VALUES ('BOL_CREDIT_ORDER_SUPPORTED_STATUSES', 'Credit BOL Order Supported Statuses',
        'Statuses supported for crediting a BOL Order',
        'PAYMENT_COMPLETE,PAYMENT_PARTIAL,COMPLETE,CLOSED');

INSERT INTO cca_property (system_name, display_name, description, value)
VALUES ('BOL_REFUND_ORDER_SUPPORTED_STATUSES', 'Refund BOL Order Supported Statuses',
        'Statuses supported for refunding a BOL Order',
        'PAYMENT_COMPLETE,PAYMENT_PARTIAL,COMPLETE');

INSERT INTO cca_property (system_name, display_name, description, value)
VALUES ('BOL_HOLD_ORDER_SUPPORTED_STATUSES', 'Hold BOL Order Supported Statuses',
        'Statuses supported for holding a BOL Order',
        'CANCELLED,CLOSED,COMPLETE,FRAUD_DECLINED,FRAUD_FAILED,FRAUD_INIT,FRAUD_PENDING,FRAUD_REMEDIATION,FRAUD_RETRYING,FULFILLMENT_ACCEPTED,FULFILLMENT_COMPLETE,FULFILLMENT_DECLINED,FULFILLMENT_FAILED,FULFILLMENT_INIT,FULFILLMENT_PARTIAL,FULFILLMENT_PENDING,FULFILLMENT_READY,FULFILLMENT_REJECTED,FULFILLMENT_RETRYING,ORDER_DEFERRED,PARTIAL_COMPLETE,PAYMENT_COMPLETE,PAYMENT_FAILED,PAYMENT_PARTIAL,PAYMENT_SUCCESS,PRINTER_ACCEPTED,PRINTER_READY,RISK_FAILED,RISK_PENDING,RISK_SUCCESS,USER_OPENED,USER_RECEIVED');
