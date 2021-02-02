import {CsCoreCurrency} from '@cscore/gringotts';

/**
 * Basic information needed when looking at all combined accounts.  This may include primary, reserve and sub-accounts.
 * This will include the available balance and status (except no status on reserve account).
 */
export class MaplesSimpleAccountInfo {

  id: string;
  accountType: string;
  zeroBalance: boolean = true;
  availableBalance: CsCoreCurrency;
  pendingBalance: CsCoreCurrency;
  status: string;
}
