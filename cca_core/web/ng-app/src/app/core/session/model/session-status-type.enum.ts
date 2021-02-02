export enum SessionStatusType {
  ABANDONED                         = 'ABANDONED',
  ACTIVATION_REQUEST                = 'ACTIVATION_REQUEST',
  ACTIVATION_REVERSAL               = 'ACTIVATION_REVERSAL',
  ACTIVE                            = 'ACTIVE',
  AWAITING_ADDITIONAL_DOCS          = 'AWAITING_ADDITIONAL_DOCS',
  AWAITING_DOCS                     = 'AWAITING_DOCS',
  AWAITING_MERCH_RESPONSE           = 'AWAITING_MERCH_RESPONSE',
  CALLBACK                          = 'CALLBACK',
  CALLBACK_AWAITING_ADDITIONAL_DOCS = 'CALLBACK_AWAITING_ADDITIONAL_DOCS',
  CANCELLED                         = 'CANCELLED',
  CHARGEBACK_PENDING                = 'CHARGEBACK_PENDING',
  CLOSED                            = 'CLOSED',
  DISCONNECTED                      = 'DISCONNECTED',
  DOCS_RECEIVED                     = 'DOCS_RECEIVED',
  FORCED_CLOSED                     = 'FORCED_CLOSED',
  OFAC_PENDING                      = 'OFAC_PENDING',
  QUEUED                            = 'QUEUED',
  REFUND_NOT_RECEIVED               = 'REFUND_NOT_RECEIVED',
  REFUND_REQUESTED                  = 'REFUND_REQUESTED',
  REPLACEMENT_CARD_ACTIVATION       = 'REPLACEMENT_CARD_ACTIVATION',
  REPLACEMENT_REQUESTED             = 'REPLACEMENT_REQUESTED',
  VMS_SESSION_FAILED                = 'VMS_SESSION_FAILED',
  WORKING                           = 'WORKING',
  WRAPPEDUP                         = 'WRAPPEDUP'
}

export function getSessionStatusTypeDisplayValue ( type: SessionStatusType | string ): string {
  let displayValue: string;

  switch ( type ) {
    case SessionStatusType.ABANDONED:
      displayValue = 'Abandoned';
      break;
    case SessionStatusType.ACTIVATION_REQUEST:
      displayValue = 'Activation Request';
      break;
    case SessionStatusType.ACTIVATION_REVERSAL:
      displayValue = 'Activation Reversal';
      break;
    case SessionStatusType.ACTIVE:
      displayValue = 'Open';
      break;
    case SessionStatusType.AWAITING_ADDITIONAL_DOCS:
      displayValue = 'Awaiting Additional Docs (24h)';
      break;
    case SessionStatusType.AWAITING_DOCS:
      displayValue = 'Awaiting Docs';
      break;
    case SessionStatusType.AWAITING_MERCH_RESPONSE:
      displayValue = 'Awaiting Merch Response (72h)';
      break;
    case SessionStatusType.CALLBACK:
      displayValue = 'Callback';
      break;
    case SessionStatusType.CALLBACK_AWAITING_ADDITIONAL_DOCS:
      displayValue = 'Callback - Awaiting Additional Docs';
      break;
    case SessionStatusType.CANCELLED:
      displayValue = 'Cancelled';
      break;
    case SessionStatusType.CHARGEBACK_PENDING:
      displayValue = 'Chargeback Pending';
      break;
    case SessionStatusType.CLOSED:
      displayValue = 'Closed';
      break;
    case SessionStatusType.DISCONNECTED:
      displayValue = 'Disconnected';
      break;
    case SessionStatusType.DOCS_RECEIVED:
      displayValue = 'Docs Received';
      break;
    case SessionStatusType.FORCED_CLOSED:
      displayValue = 'Forced Closed';
      break;
    case SessionStatusType.OFAC_PENDING:
      displayValue = 'OFAC Pending';
      break;
    case SessionStatusType.QUEUED:
      displayValue = 'Queued';
      break;
    case SessionStatusType.REFUND_NOT_RECEIVED:
      displayValue = 'Refund Not Received';
      break;
    case SessionStatusType.REFUND_REQUESTED:
      displayValue = 'Refund Requested';
      break;
    case SessionStatusType.REPLACEMENT_CARD_ACTIVATION:
      displayValue = 'Replacement Card Activation';
      break;
    case SessionStatusType.REPLACEMENT_REQUESTED:
      displayValue = 'Replacement Requested';
      break;
    case SessionStatusType.VMS_SESSION_FAILED:
      displayValue = 'VMS Session Failed';
      break;
    case SessionStatusType.WORKING:
      displayValue = 'Working';
      break;
    case SessionStatusType.WRAPPEDUP:
      displayValue = 'Wrapped-Up';
      break;
    default:
      displayValue = type;
      break;
  }

  return displayValue;
}
