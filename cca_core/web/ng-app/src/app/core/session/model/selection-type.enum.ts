import {GenericOption} from '../../model/generic-option';
import {getSessionTypeDisplayName, SessionTypeType} from '../session-type-type.enum';

export enum SelectionType {

  ACCOUNT          = 'ACCOUNT',
  CARD             = 'CARD',
  CUSTOMER         = 'CUSTOMER',
  CUSTOMER_ACCOUNT = 'CUSTOMER_ACCOUNT',
  JIRA             = 'JIRA',
  LOCATION         = 'LOCATION',
  MAPLES_CUSTOMER  = 'MAPLES_CUSTOMER',
  ORDER            = 'ORDER'
}

export function getSelectionTypeDisplayValue ( type: SelectionType ): string {
  let value: string;

  switch ( type ) {
    case SelectionType.ACCOUNT:
      value = 'Account';
      break;
    case SelectionType.CARD:
      value = 'Card';
      break;
    case SelectionType.CUSTOMER:
      value = 'Customer';
      break;
    case SelectionType.CUSTOMER_ACCOUNT:
      value = 'Customer Account';
      break;
    case SelectionType.LOCATION:
      value = 'Location';
      break;
    case SelectionType.MAPLES_CUSTOMER:
      value = 'Maples Customer';
      break;
    case SelectionType.ORDER:
      value = 'Order';
      break;
    default:
      value = !!type ? type.toString () : 'Unknown';
      break;
  }

  return value;
}

export function getSelectionTypeOptions(nullDisplay: boolean = false): GenericOption<any>[] {
  let options: GenericOption<any>[] = [];

  if (nullDisplay) {
    options.push({
      value: null,
      displayValue: ''
    });
  }

  for (let option of Object.keys(SelectionType)) {
    options.push({
      value: option,
      displayValue: getSelectionTypeDisplayValue(SelectionType[option])
    });
  }

  return options;
}
