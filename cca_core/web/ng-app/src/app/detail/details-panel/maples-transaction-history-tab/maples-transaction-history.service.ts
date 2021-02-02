import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {MaplesTransaction, MaplesTransactionsResponse} from '@cscore/maples-client-model';
import {Selection} from '../../../core/session/model/selection';
import {ExportType} from '../transaction-history-tab/export-type.enum';

/**
 * A service created for an instance of the maples transaction history component.  This allows listening between the
 * toolbar and table components without sending the entire session back and forth between the two via ngrx.
 */
@Injectable()
export class MaplesTransactionHistoryService {

  private selectionUpdated: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getSelectionUpdatedSubject(): Subject<boolean> {
    return this.selectionUpdated;
  }

  setSelectionUpdated(isTransactionSelected: boolean): void {
    this.selectionUpdated.next(isTransactionSelected);
  }

  /**
   * Sends the selected transactions to the backend to be converted in to the desired export type.
   *
   * @param selection
   * @param exportType
   */
  exportTransactions(selection: Selection<any>, exportType: ExportType): Observable<any> {
    let params: HttpParams = new HttpParams().set('selectedOptions', `LAYOUT_PORTRAIT,FORMAT_${exportType}`);
    let headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    let request: MaplesTransactionsResponse = new MaplesTransactionsResponse();
    if (selection.transactionRequests.isSelectAllChecked) {
      request.transactions = selection.maplesTransactions;
    } else {
      request.transactions = selection.maplesTransactions.filter((transaction: MaplesTransaction) => transaction['isSelected']);
    }

    return this.http.post('/rest/export/maples-transactions', request, {
      observe: 'response',
      responseType: 'blob',
      params: params,
      headers: headers
    })
      .pipe(map((response: HttpResponse<any>) => response.body))
      .pipe(tap((blob: any) => {
        let date: string = moment().format('YYYY-MM-DD');
        saveAs(blob, `cca-transaction-history-${date}.${exportType.toString().toLowerCase()}`);
        selection.transactionRequests.isSelectAllChecked = false;
        this.setSelectionUpdated(false);
      }));
  }
}
