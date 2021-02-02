import { Injectable } from '@angular/core';
import { Selection } from "../session/model/selection";
import { CompositeTransactionRequest } from "../../detail/details-panel/transaction-history-tab/composite-transaction-request";
import { TransactionSearchRequest } from "../../detail/details-panel/transaction-history-tab/transaction-search-request";
import { DetailTabType } from "../../detail/detail-tab-type.enum";
import {MaplesTransactionQuery} from "@cscore/maples-client-model";

@Injectable ( {
  providedIn: 'root'
} )
export class LocalStorage {

  constructor () {
  }

  get ( key: string ): any {
    let stringValue = localStorage.getItem ( key );
    return JSON.parse ( stringValue );
  }

  set ( key: string, value: any ): void {
    let stringValue = JSON.stringify ( value );
    localStorage.setItem ( key, stringValue );
  }

  updateLocalStorageFromSelection ( selection: Selection<any> ): void {
    let key  = this.generateLocalStorageKey ( selection );
    let item = this.buildParametersForSelection ( selection );
    this.set ( key, item );
  }

  updateSelectionFromLocalStorage ( selection: Selection<any> ): void {
    let key      = this.generateLocalStorageKey ( selection );
    let rawValue = this.get ( key );

    //We're only going to do this update if we have a stored value
    if ( rawValue ) {
      let parameters = new SelectionParameters ( rawValue );

      //Just in case, make sure the composite request object is ready
      if ( !selection.transactionRequests ) {
        selection.transactionRequests = new CompositeTransactionRequest ();
      }

      selection.selectedTab                         = parameters.selectedTab;
      selection.transactionRequests.current         = parameters.transactionSearchRequest;
      selection.transactionRequests.maplesCurrent   = parameters.maplesTransactionQuery;
      selection.transactionRequests.maplesScheduled = parameters.maplesTransactionScheduledQuery;
    }

    //This is as-convenient a place as any to set default values if we didn't find any stored
    if ( !selection.selectedTab ) {
      selection.setDefaultSelectedTab ();
    }
  }

  private buildParametersForSelection ( selection: Selection<any> ): SelectionParameters {
    let parameters                             = new SelectionParameters ();
    parameters.selectedTab                     = selection.selectedTab;
    parameters.transactionSearchRequest        = selection.getDefaultTransactionSearchRequest ();
    parameters.maplesTransactionQuery          = selection.getDefaultMaplesTransactionSearchRequest ();
    parameters.maplesTransactionScheduledQuery = selection.getDefaultMaplesScheduledTransactionSearchRequest();
    return parameters;
  }

  private generateLocalStorageKey ( selection: Selection<any> ): string {
    return `selection-${selection.id}-parameters`;
  }

}

export class SelectionParameters {

  selectedTab: DetailTabType;
  transactionSearchRequest: TransactionSearchRequest;
  maplesTransactionQuery: MaplesTransactionQuery;
  maplesTransactionScheduledQuery: MaplesTransactionQuery;

  constructor ( data: any = null ) {
    if ( data ) {
      if ( data.selectedTab ) {
        this.selectedTab = DetailTabType[ <string>data.selectedTab ];
      }
      if ( data.transactionSearchRequest ) {
        this.transactionSearchRequest = new TransactionSearchRequest ( data.transactionSearchRequest );
      }
      if ( data.maplesTransactionQuery ) {
        this.maplesTransactionQuery = new MaplesTransactionQuery ( data.maplesTransactionQuery );
      }
      if (data.maplesTransactionScheduledQuery) {
        this.maplesTransactionScheduledQuery = new MaplesTransactionQuery( data.maplesTransactionScheduledQuery );
      }
    }
  }
}
