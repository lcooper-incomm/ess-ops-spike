import {GenericOption} from '../model/generic-option';

export enum SessionTypeType {
  BAD_CREDIT              = 'BAD_CREDIT',
  CALL                    = 'CALL',
  COMPLAINT               = 'COMPLAINT',
  CONSUMED_CARD           = 'CONSUMED_CARD',
  DAMAGED_PINS            = 'DAMAGED_PINS',
  DISPUTE                 = 'DISPUTE',
  ECOMM_FRAUD             = 'ECOMM_FRAUD',
  GENERAL                 = 'GENERAL',
  LAW_ENFORCEMENT         = 'LAW_ENFORCEMENT',
  LEGACY                  = 'LEGACY',
  MERCHANT_FRAUD          = 'MERCHANT_FRAUD',
  OTHER_FRAUD             = 'OTHER_FRAUD',
  PAYPAL_REDEMPTION_ISSUE = 'PAYPAL_REDEMPTION_ISSUE',
  PRIVACY_REQUEST         = 'PRIVACY_REQUEST',
  REWARDS                 = 'REWARDS',
  REWARDS_TRAINING        = 'REWARDS_TRAINING',
  SYSTEM                  = 'SYSTEM'
}

export function getSessionTypeDisplayName ( type: SessionTypeType ): string {
  let displayName: string;

  switch ( type ) {
    case SessionTypeType.BAD_CREDIT:
      displayName = 'Bad Credit';
      break;
    case SessionTypeType.CALL:
      displayName = 'Call';
      break;
    case SessionTypeType.COMPLAINT:
      displayName = 'Complaint';
      break;
    case SessionTypeType.CONSUMED_CARD:
      displayName = 'Consumed Card';
      break;
    case SessionTypeType.DAMAGED_PINS:
      displayName = 'Damaged Pins';
      break;
    case SessionTypeType.DISPUTE:
      displayName = 'Dispute';
      break;
    case SessionTypeType.ECOMM_FRAUD:
      displayName = 'E-Comm Fraud';
      break;
    case SessionTypeType.GENERAL:
      displayName = 'General';
      break;
    case SessionTypeType.LAW_ENFORCEMENT:
      displayName = 'Law Enforcement';
      break;
    case SessionTypeType.LEGACY:
      displayName = 'Legacy';
      break;
    case SessionTypeType.MERCHANT_FRAUD:
      displayName = 'Merchant Fraud';
      break;
    case SessionTypeType.OTHER_FRAUD:
      displayName = 'Other';
      break;
    case SessionTypeType.PAYPAL_REDEMPTION_ISSUE:
      displayName = 'PayPal Redemption Issue';
      break;
    case SessionTypeType.PRIVACY_REQUEST:
      displayName = 'Privacy Request';
      break;
    case SessionTypeType.REWARDS:
      displayName = 'Rewards';
      break;
    case SessionTypeType.REWARDS_TRAINING:
      displayName = 'Rewards Training';
      break;
    case SessionTypeType.SYSTEM:
      displayName = 'System';
      break;
    default:
      displayName = type;
      break;
  }

  return displayName;
}

export function getSessionTypeOptions(nullDisplay: boolean = false): GenericOption<any>[] {
  let options: GenericOption<any>[] = [];

  if (nullDisplay) {
    options.push({
      value: null,
      displayValue: ''
    });
  }

  for (let option of Object.keys(SessionTypeType)) {
    options.push({
      value: option,
      displayValue: getSessionTypeDisplayName(SessionTypeType[option])
    });
  }

  return options;
}
