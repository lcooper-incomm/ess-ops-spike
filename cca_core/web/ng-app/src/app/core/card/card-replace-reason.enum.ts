import {GenericOption} from '../model/generic-option';

/**
 * TODO: Replace with a service to get codes.  This exists on SERVE, but not in MAPLES.
 */
export enum CardReplaceReason {
  COMPROMISED  = 'COMPROMISED',
  DAMAGED      = 'DAMAGED',
  EXPIRED      = 'EXPIRED',
  LOST         = 'LOST',
  NOT_RECEIVED = 'NOT RECEIVED',
  STOLEN       = 'STOLEN',
  UPGRADE      = 'UPGRADE'
}

export const cardReplaceReasonDisplayMap = new Map([
  ['COMPROMISED', 'Card was Compromised'],
  ['DAMAGED', 'Card was Damaged'],
  ['EXPIRED', 'Card will Expire'],
  ['LOST', 'Card was Lost'],
  ['NOT RECEIVED', 'Ordered Card not Received'],
  ['STOLEN', 'Card was Stolen'],
  ['UPGRADE', 'Upgrading to new Card'],
]);

export function buildCardReplaceReasonOptions(): GenericOption<any>[] {
  let options: GenericOption<any>[] = [];

  for (let value of Object.values(CardReplaceReason)) {
    options.push({
      value: value,
      displayValue: cardReplaceReasonDisplayMap.get(value)
    })
  }

  return options;
}
