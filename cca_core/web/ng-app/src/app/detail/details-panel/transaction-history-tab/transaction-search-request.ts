import { IdentifierType } from "../../../core/session/model/identifier-type.enum";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { SortType } from "../../../core/utils/sort-type.enum";
import { KeyValuePair } from "../../../core/utils/key-value-pair";

export const TRANSACTION_SEARCH_MAX = 1000;

export class TransactionSearchRequest {

  accountType: string;
  cashierId: string;
  endDate: string;
  identifier: string;
  identifierType: IdentifierType;
  isArchive: boolean     = false;
  isBillable: boolean    = false;
  localFilter: string;
  page: number           = 1;
  platform: PlatformType;
  resultsPerPage: number = TRANSACTION_SEARCH_MAX;
  selectionId: number;
  sort: string;
  sortOrder: SortType    = SortType.DESC;
  startDate: string;
  token: string;
  transactionFilter: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.identifierType ) {
        this.identifierType = IdentifierType[ <string>data.identifierType ];
      }
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.sortOrder ) {
        this.sortOrder = SortType[ <string>data.sortOrder ];
      }
    }
  }

  getAsKeyValuePairs (): KeyValuePair[] {
    let pairs: KeyValuePair[] = [];

    if ( this.platform ) {
      pairs.push ( new KeyValuePair ( { key: 'Platform', value: this.platform } ) );
    }
    if ( this.startDate ) {
      pairs.push ( new KeyValuePair ( { key: 'Start Date', value: this.startDate } ) );
    }
    if ( this.endDate ) {
      pairs.push ( new KeyValuePair ( { key: 'End Date', value: this.endDate } ) );
    }
    if ( this.accountType ) {
      pairs.push ( new KeyValuePair ( { key: 'Account Type', value: this.accountType } ) );
    }
    if ( this.transactionFilter ) {
      pairs.push ( new KeyValuePair ( { key: 'Transaction Type', value: this.transactionFilter } ) );
    }
    if ( this.localFilter ) {
      pairs.push ( new KeyValuePair ( { key: 'Local Filter', value: this.localFilter } ) );
    }
    if ( this.token ) {
      pairs.push ( new KeyValuePair ( { key: 'Token', value: this.token } ) );
    }
    if ( this.cashierId ) {
      pairs.push ( new KeyValuePair ( { key: 'Cashier ID', value: this.cashierId } ) );
    }
    if ( this.isBillable ) {
      pairs.push ( new KeyValuePair ( { key: 'Is Billable', value: 'Yes' } ) );
    }

    return pairs;
  }
}
