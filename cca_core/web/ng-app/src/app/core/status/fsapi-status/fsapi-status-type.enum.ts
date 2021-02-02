export enum FsapiStatusType {
  ACTIVE              = 'ACTIVE',
  ACTIVE_UNREGISTERED = 'ACTIVE_UNREGISTERED',
  ALERT               = 'ALERT',
  BAD_CREDIT          = 'BAD_CREDIT',
  CARD_ACTIVATION     = 'CARD_ACTIVATION',
  CLOSED              = 'CLOSED',
  CONSUMED            = 'CONSUMED',
  DAMAGE              = 'DAMAGE',
  EXPIRED             = 'EXPIRED',
  FRAUD_HOLD          = 'FRAUD_HOLD',
  HOT_CARDED          = 'HOT_CARDED',
  INACTIVE            = 'INACTIVE',
  LOST_STOLEN         = 'LOST_STOLEN',
  MONITORED           = 'MONITORED',
  OFAC_FAILED         = 'OFAC_FAILED',
  ON_HOLD             = 'ON_HOLD',
  PASSIVE             = 'PASSIVE',
  RESTRICTED          = 'RESTRICTED',
  RETURNED_MAIL       = 'RETURNED_MAIL',
  RISK_INVESTIGATION  = 'RISK_INVESTIGATION',
  SPEND_DOWN          = 'SPEND_DOWN',
  SUSPENDED_CREDIT    = 'SUSPENDED_CREDIT'
}

export function getStatusTypeDisplayName ( type: FsapiStatusType ): string {

  let displayName: string;

  switch ( type ) {
    case FsapiStatusType.ACTIVE:
      displayName = 'Active';
      break;
    case FsapiStatusType.ACTIVE_UNREGISTERED:
      displayName = 'Active Unregistered';
      break;
    case FsapiStatusType.ALERT:
      displayName = 'Alert';
      break;
    case FsapiStatusType.BAD_CREDIT:
      displayName = 'Bad Credit';
      break;
    case FsapiStatusType.CARD_ACTIVATION:
      displayName = 'Card Activation';
      break;
    case FsapiStatusType.CLOSED:
      displayName = 'Closed';
      break;
    case FsapiStatusType.CONSUMED:
      displayName = 'Consumed';
      break;
    case FsapiStatusType.DAMAGE:
      displayName = 'Damage';
      break;
    case FsapiStatusType.EXPIRED:
      displayName = 'Expired';
      break;
    case FsapiStatusType.FRAUD_HOLD:
      displayName = 'Fraud Hold';
      break;
    case FsapiStatusType.HOT_CARDED:
      displayName = 'Hot Carded';
      break;
    case FsapiStatusType.INACTIVE:
      displayName = 'Inactive';
      break;
    case FsapiStatusType.LOST_STOLEN:
      displayName = 'Lost Stolen';
      break;
    case FsapiStatusType.MONITORED:
      displayName = 'Monitored';
      break;
    case FsapiStatusType.OFAC_FAILED:
      displayName = 'OFAC Failed';
      break;
    case FsapiStatusType.ON_HOLD:
      displayName = 'On Hold';
      break;
    case FsapiStatusType.PASSIVE:
      displayName = 'Passive';
      break;
    case FsapiStatusType.RESTRICTED:
      displayName = 'Restricted';
      break;
    case FsapiStatusType.RETURNED_MAIL:
      displayName = 'Returned Mail';
      break;
    case FsapiStatusType.RISK_INVESTIGATION:
      displayName = 'Risk Investigation';
      break;
    case FsapiStatusType.SPEND_DOWN:
      displayName = 'Spend Down';
      break;
    case FsapiStatusType.SUSPENDED_CREDIT:
      displayName = 'Suspend Credit';
      break;
  }
  return displayName;
}

