export enum BolOrderStatusType {
  CANCELLED            = 'CANCELLED',
  CLOSED               = 'CLOSED',
  COMPLETE             = 'COMPLETE',
  COMPLETED            = 'COMPLETED',
  FRAUD_DECLINED       = 'FRAUD_DECLINED',
  FRAUD_FAILED         = 'FRAUD_FAILED',
  FRAUD_INIT           = 'FRAUD_INIT',
  FRAUD_PENDING        = 'FRAUD_PENDING',
  FRAUD_REMEDIATION    = 'FRAUD_REMEDIATION',
  FRAUD_RETRYING       = 'FRAUD_RETRYING',
  FULFILLMENT_ACCEPTED = 'FULFILLMENT_ACCEPTED',
  FULFILLMENT_COMPLETE = 'FULFILLMENT_COMPLETE',
  FULFILLMENT_DECLINED = 'FULFILLMENT_DECLINED',
  FULFILLMENT_FAILED   = 'FULFILLMENT_FAILED',
  FULFILLMENT_INIT     = 'FULFILLMENT_INIT',
  FULFILLMENT_PARTIAL  = 'FULFILLMENT_PARTIAL',
  FULFILLMENT_PENDING  = 'FULFILLMENT_PENDING',
  FULFILLMENT_READY    = 'FULFILLMENT_READY',
  FULFILLMENT_REJECTED = 'FULFILLMENT_REJECTED',
  FULFILLMENT_RETRYING = 'FULFILLMENT_RETRYING',
  HOLD                 = 'HOLD',
  IN_PROGRESS          = 'IN_PROGRESS',
  ORDER_DEFERRED       = 'ORDER_DEFERRED',
  PARTIAL_COMPLETE     = 'PARTIAL_COMPLETE',
  PAYMENT_COMPLETE     = 'PAYMENT_COMPLETE',
  PAYMENT_FAILED       = 'PAYMENT_FAILED',
  PAYMENT_PARTIAL      = 'PAYMENT_PARTIAL',
  PAYMENT_SUCCESS      = 'PAYMENT_SUCCESS',
  PRINTER_ACCEPTED     = 'PRINTER_ACCEPTED',
  PRINTER_READY        = 'PRINTER_READY',
  REFUND_DECLINED      = 'REFUND_DECLINED',
  RISK_FAILED          = 'RISK_FAILED',
  RISK_PENDING         = 'RISK_PENDING',
  RISK_SUCCESS         = 'RISK_SUCCESS',
  USER_OPENED          = 'USER_OPENED',
  USER_RECEIVED        = 'USER_RECEIVED'
}
