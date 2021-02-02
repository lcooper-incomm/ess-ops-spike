import { Transaction } from "./transaction";
import { AplsPagination } from "../utils/apls-pagination";

export class Transactions {

  //These three fields are only temporarily used internally to the TransactionService
  archivePagination: AplsPagination;
  currentPagination: AplsPagination;
  isArchive: boolean = false;

  pagination: AplsPagination;
  transactions: Transaction[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      if ( data.pagination ) {
        this.pagination = new AplsPagination ( data.pagination );
      }
      if ( data.transactions ) {
        data.transactions.forEach ( transaction => {
          this.transactions.push ( new Transaction ( transaction ) );
        } );
      }
    }
  }
}
