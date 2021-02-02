export enum DetailTabType {
  ACCOUNT_ALERTS             = 'ACCOUNT_ALERTS',
  ACCOUNT_DOCUMENTS          = 'ACCOUNT_DOCUMENTS',
  ACCOUNT_FEES               = 'ACCOUNT_FEES',
  ACCOUNT_FUNDING            = 'ACCOUNT_FUNDING',
  ACCOUNT_HISTORY            = 'ACCOUNT_HISTORY',
  ACCOUNT_HOLDER             = 'ACCOUNT_HOLDER',
  ACCOUNT_LIMITS             = 'ACCOUNT_LIMITS',
  ACCOUNT_NOTIFICATIONS      = 'ACCOUNT_NOTIFICATIONS',
  ACCOUNT_STATUS_CODES       = 'ACCOUNT_STATUS_CODES',
  ALERTS                     = 'ALERTS',
  CARDS                      = 'CARDS',
  COMMENTS                   = 'COMMENTS',
  CONTACTS                   = 'CONTACTS',
  CUSTOMER_ORDERS            = 'CUSTOMER_ORDERS',
  DOCUMENTS                  = 'DOCUMENTS',
  FEES                       = 'FEES',
  LIMITS                     = 'LIMITS',
  LOCATION_TERMINALS         = 'LOCATION_TERMINALS',
  MAPLES_TRANSACTION_HISTORY = 'MAPLES_TRANSACTION_HISTORY',
  MOBILE_WALLET              = 'MOBILE_WALLET',
  ORDER_CONFIGURATIONS       = 'ORDER_CONFIGURATIONS',
  ORDER_ITEMS                = 'ORDER_ITEMS',
  ORDER_NOTIFICATIONS        = 'ORDER_NOTIFICATIONS',
  ORDER_PROCESSING_HISTORY   = 'ORDER_PROCESSING_HISTORY',
  ORDER_DELIVERIES           = 'ORDER_DELIVERIES',
  RELATED_ACCOUNTS           = 'RELATED_ACCOUNTS',
  RELATED_CASES              = 'RELATED_CASES',
  RELATED_JOBS               = 'RELATED_JOBS',
  TRANSACTION_HISTORY        = 'TRANSACTION_HISTORY'
}

export function getDetailTabTypeByValue ( value: string ): DetailTabType {
  let type: DetailTabType;

  Object.keys ( DetailTabType ).map ( key => {
    if ( DetailTabType[ key ] === value ) {
      type = DetailTabType[ key ];
    }
  } );

  return type;
}

export function getDetailTabTypeDisplayValue ( type: DetailTabType ): string {
  let displayValue: string;

  if ( type ) {
    switch ( type ) {
      case DetailTabType.ACCOUNT_ALERTS:
        displayValue = 'Alerts';
        break;
      case DetailTabType.ACCOUNT_DOCUMENTS:
        displayValue = 'Documents';
        break;
      case DetailTabType.ACCOUNT_FEES:
        displayValue = 'Fees';
        break;
      case DetailTabType.ACCOUNT_FUNDING:
        displayValue = 'Funding';
        break;
      case DetailTabType.ACCOUNT_HISTORY:
        displayValue = 'History';
        break;
      case DetailTabType.ACCOUNT_HOLDER:
        displayValue = 'Account';
        break;
      case DetailTabType.ACCOUNT_LIMITS:
        displayValue = 'Limits';
        break;
      case DetailTabType.ACCOUNT_NOTIFICATIONS:
        displayValue = 'Notifications';
        break;
      case DetailTabType.ACCOUNT_STATUS_CODES:
        displayValue = 'Status Codes';
        break;
      case DetailTabType.ALERTS:
        displayValue = 'Alerts';
        break;
      case DetailTabType.CARDS:
        displayValue = 'Cards';
        break;
      case DetailTabType.COMMENTS:
        displayValue = 'Comments';
        break;
      case DetailTabType.CONTACTS:
        displayValue = 'Contacts';
        break;
      case DetailTabType.CUSTOMER_ORDERS:
        displayValue = 'Orders';
        break;
      case DetailTabType.DOCUMENTS:
        displayValue = 'Documents';
        break;
      case DetailTabType.FEES:
        displayValue = 'Fees';
        break;
      case DetailTabType.LIMITS:
        displayValue = 'Limits';
        break;
      case DetailTabType.LOCATION_TERMINALS:
        displayValue = 'Terminals';
        break;
      case DetailTabType.MAPLES_TRANSACTION_HISTORY:
        displayValue = 'Transactions';
        break;
      case DetailTabType.MOBILE_WALLET:
        displayValue = 'Wallet';
        break;
      case DetailTabType.ORDER_CONFIGURATIONS:
        displayValue = 'Configurations';
        break;
      case DetailTabType.ORDER_ITEMS:
        displayValue = 'Items';
        break;
      case DetailTabType.ORDER_NOTIFICATIONS:
        displayValue = 'Notifications';
        break;
      case DetailTabType.ORDER_PROCESSING_HISTORY:
        displayValue = 'Processing';
        break;
      case DetailTabType.ORDER_DELIVERIES:
        displayValue = 'Deliveries';
        break;
      case DetailTabType.RELATED_ACCOUNTS:
        displayValue = 'Related Accounts';
        break;
      case DetailTabType.RELATED_CASES:
        displayValue = 'Related Cases';
        break;
      case DetailTabType.RELATED_JOBS:
        displayValue = 'Jobs';
        break;
      case DetailTabType.TRANSACTION_HISTORY:
        displayValue = 'Transactions';
        break;
      default:
        displayValue = type;
        break;
    }
  }

  return displayValue;
}
