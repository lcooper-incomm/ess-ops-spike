export enum GreencardStatusType {
  INITIAL                  = '1',
  ASSIGNED                 = '2',
  PRINT_REQUEST            = '3',
  SENT_TO_PRINTERS         = '4',
  IN_PRODUCTION            = '5',
  IN_TRANSIT               = '6',
  IN_STORE                 = '7',
  ACTIVE                   = '8',
  FAILED_ACTIVATION        = '9',
  ON_HOLD                  = '10',
  HOLD_REQUESTED           = '11',
  LOST_STOLEN              = '12',
  REPLACEMENT_REQUESTED    = '13',
  DEACTIVE                 = '14',
  EXPIRED                  = '15',
  HOT_CARD                 = '16',
  ACTIVATION_REQUESTED     = '17',
  REPLACEMENT_PROCESSED    = '18',
  REQUIRES_CARD_NUMBER     = '19',
  STOLEN                   = '20',
  LOST                     = '21',
  COMPROMISED_INACTIVE     = '22',
  ON_HOLD_NEGATIVE_BALANCE = '23',
  FRAUD_WATCH              = '24',
  RETURNED                 = '25',
  RISK_INVESTIGATION       = '26',
  BAD_CREDIT               = '27',
  GIFT_CARD_REPLACEMENT    = '28',
  CONSUMED_IN_FCMS         = '29',
  BALANCE_TRANSFERRED      = '30',
  OFAC_FAILED              = '31',
  BALANCE_WRITE_OFF        = '32',
  PROCESSING               = '99',
  INVALID                  = 'X'
}

export function getGreencardStatusTypeDisplayName ( type: string ): string {

  let displayName: string;

  switch ( type ) {
    case 'ACTIVATION_REQUESTED':
      displayName = 'Activation Requested';
      break;
    case 'ACTIVE':
      displayName = 'Active';
      break;
    case 'ASSIGNED':
      displayName = 'Assigned';
      break;
    case 'BAD_CREDIT':
      displayName = 'Bad Credit';
      break;
    case 'BALANCE_TRANSFERRED':
      displayName = 'Balance Transferred';
      break;
    case 'BALANCE_WRITE_OFF':
      displayName = 'Balance Write Off';
      break;
    case 'COMPROMISED_INACTIVE':
      displayName = 'Compromised Inactive';
      break;
    case 'CONSUMED_IN_FCMS':
      displayName = 'Consumed In FCMS';
      break;
    case 'DEACTIVE':
      displayName = 'Deactive';
      break;
    case 'EXPIRED':
      displayName = 'Expired';
      break;
    case 'FAILED_ACTIVATION':
      displayName = 'Failed Activation';
      break;
    case 'FRAUD_WATCH':
      displayName = 'Fraud Watch';
      break;
    case 'GIFT_CARD_REPLACEMENT':
      displayName = 'Gift Card Replacement';
      break;
    case 'HOLD_REQUESTED':
      displayName = 'Hold Requested';
      break;
    case 'HOT_CARD':
      displayName = 'Hot Card';
      break;
    case 'IN_PRODUCTION':
      displayName = 'In Production';
      break;
    case 'IN_STORE':
      displayName = 'In Store';
      break;
    case 'IN_TRANSIT':
      displayName = 'In Transit';
      break;
    case 'INITIAL':
      displayName = 'Initial';
      break;
    case 'INVALID':
      displayName = 'Invalid';
      break;
    case 'LOST':
      displayName = 'Lost';
      break;
    case 'LOST_STOLEN':
      displayName = 'Lost Stolen';
      break;
    case 'ON_HOLD_NEGATIVE_BALANCE':
      displayName = 'On Hold Negative Balance';
      break;
    case 'OFAC_FAILED':
      displayName = 'OFAC failed';
      break;
    case 'ON_HOLD':
      displayName = 'On Hold';
      break;
    case 'PRINT_REQUEST':
      displayName = 'Print Request';
      break;
    case 'PROCESSING':
      displayName = 'Processing';
      break;
    case 'REPLACEMENT_PROCESSED':
      displayName = 'Replacement Processed';
      break;
    case 'REPLACEMENT_REQUESTED':
      displayName = 'Replacement Requested';
      break;
    case 'REQUIRES_CARD_NUMBER':
      displayName = 'Requires Card Number';
      break;
    case 'RETURNED':
      displayName = 'Returned';
      break;
    case 'RISK_INVESTIGATION':
      displayName = 'Risk Investigation';
      break;
    case 'SENT_TO_PRINTERS':
      displayName = 'Sent To Printers';
      break;
    case 'STOLEN':
      displayName = 'Stolen';
      break;
    default:
      displayName = type.toString ();
      break;
  }
  return displayName;
}
