UPDATE cca_property
SET value = 'PAYMENT_COMPLETE,PAYMENT_PARTIAL,COMPLETED,CLOSED'
WHERE system_name = 'BOL_CREDIT_ORDER_SUPPORTED_STATUSES';

UPDATE cca_property
SET value = 'PAYMENT_COMPLETE,PAYMENT_PARTIAL,COMPLETED,REFUND_DECLINED'
WHERE system_name = 'BOL_REFUND_ORDER_SUPPORTED_STATUSES';

UPDATE cca_property
SET value = 'CANCELLED,CLOSED,COMPLETED,FRAUD_DECLINED,FRAUD_FAILED,FRAUD_INIT,FRAUD_PENDING,FRAUD_REMEDIATION,FRAUD_RETRYING,FULFILLMENT_ACCEPTED,FULFILLMENT_COMPLETE,FULFILLMENT_DECLINED,FULFILLMENT_FAILED,FULFILLMENT_INIT,FULFILLMENT_PARTIAL,FULFILLMENT_PENDING,FULFILLMENT_READY,FULFILLMENT_REJECTED,FULFILLMENT_RETRYING,ORDER_DEFERRED,PARTIAL_COMPLETE,PAYMENT_COMPLETE,PAYMENT_FAILED,PAYMENT_PARTIAL,PAYMENT_SUCCESS,PRINTER_ACCEPTED,PRINTER_READY,REFUND_DECLINED,RISK_FAILED,RISK_PENDING,RISK_SUCCESS,USER_OPENED,USER_RECEIVED'
WHERE system_name = 'BOL_HOLD_ORDER_SUPPORTED_STATUSES';