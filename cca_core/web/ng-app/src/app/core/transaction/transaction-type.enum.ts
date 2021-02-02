import {GenericOption} from '../model/generic-option';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT  = 'DEBIT',
  OTHER  = 'OTHER'
}

export function getTransactionTypeOptions(nullDisplay: boolean = false): GenericOption<any>[] {
  let options: GenericOption<any>[] = [];

  if (nullDisplay) {
    options.push({
      value: null,
      displayValue: ''
    });
  }

  for (let option of Object.keys(TransactionType)) {
    options.push({
      value: option,
      displayValue: TransactionType[option]
    });
  }

  return options;
}
