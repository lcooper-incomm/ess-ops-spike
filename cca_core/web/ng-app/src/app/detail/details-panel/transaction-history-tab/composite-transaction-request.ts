import {MaplesTransactionQuery} from "@cscore/maples-client-model";
import {TransactionSearchRequest} from "./transaction-search-request";

/**
 * Support ALPS transaction requests and MAPLES together during the conversion process.
 */
export class CompositeTransactionRequest {

  archive: TransactionSearchRequest       = new TransactionSearchRequest();
  current: TransactionSearchRequest       = new TransactionSearchRequest();
  isInitialSearchTriggered: boolean       = false;
  isSelectAllChecked: boolean             = false;
  maplesCurrent: MaplesTransactionQuery   = new MaplesTransactionQuery();
  maplesScheduled: MaplesTransactionQuery = new MaplesTransactionQuery();
  isInitialMaplesSearchTriggered: boolean = false;
  maplesLocalFilter: string;

  constructor(data: any = null) {
    if (data) {
      if (data.archive) {
        this.archive = new TransactionSearchRequest(data.archive);
      }
      if (data.current) {
        this.current = new TransactionSearchRequest(data.current);
      }
      if (data.maplesCurrent) {
        this.maplesCurrent = new MaplesTransactionQuery(data.maplesCurrent);
      }
      if (data.maplesScheduled) {
        this.maplesScheduled = new MaplesTransactionQuery(data.maplesScheduled);
      }
    }
  }
}
