import {Injectable} from '@angular/core';
import {ExportType} from "./export-type.enum";
import {Selection} from "../../../core/session/model/selection";
import {ExportComponentType} from "./export-component-type.enum";
import {Transaction} from "../../../core/transaction/transaction";
import {SelectionType} from "../../../core/session/model/selection-type.enum";
import {snapshot} from "../../../core/store-utils/store-utils";
import {AppStateType} from "../../../app-state-type.enum";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {SessionState} from "../../../core/session/session-state";
import {getNodeTypeNameByValue} from "../../../core/node/node-type.enum";

const cardComponents = [
  ExportComponentType.PRODUCT_DETAILS,
  ExportComponentType.PRODUCT_HISTORY_DETAILS,
  ExportComponentType.TRANSACTION_SUMMARY,
  ExportComponentType.DEFAULT_FOOTER
];

const customerComponents = [
  ExportComponentType.CUSTOMER_DETAILS,
  ExportComponentType.CUSTOMER_HISTORY_DETAILS
];

const locationComponents = [
  ExportComponentType.LOCATION_DETAILS,
  ExportComponentType.LOCATION_HISTORY_DETAILS,
  ExportComponentType.TERMINAL_DETAILS,
  ExportComponentType.TRANSACTION_SUMMARY,
  ExportComponentType.DEFAULT_FOOTER
];

@Injectable ( {
  providedIn: 'root'
} )
export class ExportService {

  constructor ( private store: Store<AppState> ) {
  }

  exportForSelection ( selection: Selection<any>, exportType: ExportType ): void {
    let request = selection.getDefaultTransactionSearchRequest ();

    //Calculate total pages of current/archive requests to send to server for convenience
    let archivePages: number = 0;
    let currentPages: number = 0;
    if ( selection.transactions && selection.transactions.currentPagination ) {
      currentPages = Math.ceil ( selection.transactions.currentPagination.totalResults / request.resultsPerPage );
    }
    if ( selection.transactions && selection.transactions.archivePagination ) {
      archivePages = Math.ceil ( selection.transactions.archivePagination.totalResults / request.resultsPerPage );
    }

    //Separate cherry-picked transactions by isArchive
    let currentSelectedTransactions: ExportTransactionRequest[] = [];
    let archiveSelectedTransactions: ExportTransactionRequest[] = [];
    selection.getSelectedTransactions ().forEach ( ( transaction: Transaction ) => {
      if ( transaction.isArchive ) {
        archiveSelectedTransactions.push ( new ExportTransactionRequest ( transaction ) );
      } else {
        currentSelectedTransactions.push ( new ExportTransactionRequest ( transaction ) );
      }
    } );

    let componentTypes             = this.getExportComponentsForSelection ( selection );
    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );

    //We can't do this with HttpParams without running into encoding issues...
    let params: string[] = [];
    params.push ( `startDate=${request.startDate}` );
    params.push ( `endDate=${request.endDate}` );
    params.push ( `currentPages=${currentPages}` );
    params.push ( `archivePages=${archivePages}` );
    params.push ( `platform=${request.platform}` );
    params.push ( `isBillable=${request.isBillable ? 'true' : 'false'}` );
    params.push ( `selectedOptions=LAYOUT_PORTRAIT,FORMAT_${exportType}` );
    params.push ( `selectedComponents=${componentTypes.join ( ',' )}` );
    params.push ( `selectionId=${selection.id}` );
    params.push ( `sessionId=${sessionState.session.id}` );

    if ( currentSelectedTransactions.length ) {
      let currentSelectionsString = JSON.stringify ( currentSelectedTransactions );
      params.push ( `currentSelections=${currentSelectionsString}` );
    }
    if ( archiveSelectedTransactions.length ) {
      let archiveSelectionsString = JSON.stringify ( archiveSelectedTransactions );
      params.push ( `archiveSelections=${archiveSelectionsString}` );
    }
    if ( request.transactionFilter ) {
      params.push ( `transactionFilter=${request.transactionFilter}` );
    }
    if ( request.accountType ) {
      params.push ( `accountType=${request.accountType}` );
    }
    if ( selection.selectedCard ) {
      params.push ( `panLastFour=${selection.selectedCard.identifiers.panLastFour}` );
    }
    if ( request.token ) {
      params.push ( `token=${request.token}` );
    }

    let paramsString     = params.join ( '&' );
    let url              = encodeURI ( `/rest/export/${request.identifierType}/${request.identifier}?${paramsString}` );
    window.location.href = url;
  }

  private getExportComponentsForSelection ( selection: Selection<any> ): ExportComponentType[] {
    let components: ExportComponentType[] = [];

    switch ( selection.type ) {
      case SelectionType.CUSTOMER:
        components = customerComponents;
        break;
      case SelectionType.LOCATION:
        components = locationComponents;
        break;
      case SelectionType.CARD:
        components = cardComponents;
        break;
      default:
        break;
    }

    return components;
  }
}

export class ExportTransactionRequest {
  nLogId: string;
  nRootNode: string;
  nNodeType: string;

  constructor ( transaction: Transaction ) {
    let node       = transaction.getPreferredEntityNode ();
    this.nLogId    = transaction.id;
    this.nRootNode = node ? node.legacyId : null;
    this.nNodeType = node ? getNodeTypeNameByValue ( node.type ) : null;
  }
}
