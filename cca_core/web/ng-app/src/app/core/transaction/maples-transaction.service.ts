import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {forkJoin, Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {
  MaplesCancelPreauthRequest,
  MaplesAdjustTransactionRequest,
  MaplesCancelTransactionRequest,
  MaplesDisputeTransactionRequest, MaplesIdCodeResponse, MaplesNode,
  MaplesPlatform, MaplesResultMessageResponse,
  MaplesTransaction,
  MaplesTransactionQuery,
  MaplesTransactionQueryFilter,
  MaplesTransactionQueryIdentifier,
  MaplesTransactionsResponse,
  MaplesTransactionType,
} from '@cscore/maples-client-model';
import {RequestQueryParam} from '../routing/request-query-param.enum';
import {Selection} from '../session/model/selection';
import {CompositeTransactionRequest} from '../../detail/details-panel/transaction-history-tab/composite-transaction-request';
import {
  SetSelectionMaplesTransactionsAction,
  SetSelectionTransactionSearchRequestAction
} from '../session/action/session-actions';
import {TransactionDateRangeService} from '../../detail/details-panel/transaction-history-tab/transaction-date-range.service';
import {LocalStorage} from '../local-storage/local-storage.service';
import {Logger} from '../../logging/logger.service';
import {SecurityService} from '../security/security.service';
import {AppState} from '../../app-state';
import {OpCodeDescriptor} from './op-code';
import {mergeEmitResults} from "tsickle";

const buildTransaction  = map((response: MaplesTransactionsResponse) => new MaplesTransaction(response.transactions[0]));
const buildTransactions = map((response: MaplesTransactionsResponse) => response.transactions.map((transaction) => new MaplesTransaction(transaction)));

const buildOpCode = map(value => new OpCodeDescriptor(value));

const buildAllOpCode = map((values: any[]) => {
  let results: OpCodeDescriptor[] = [];
  values.forEach(value => results.push(new OpCodeDescriptor(value)));
  return results;
});

/**
 * Mirror the TransactionService, but for Maples related requests starting with the SERVE platform.  Will eventually need
 * to support the same behavior as platforms in APLS are migrated.
 */
@Injectable({
  providedIn: 'root'
})
export class MaplesTransactionService {
  private static readonly basePath: string = '/rest/transaction';

  scheduledTransactionsRefreshed: Subject<boolean> = new Subject<boolean>();

  constructor(private dateRangeService: TransactionDateRangeService,
              private http: HttpClient,
              private localStorage: LocalStorage,
              private logger: Logger,
              private securityService: SecurityService,
              private store: Store<AppState>) {
  }

  public getTransactionDetails(accountId: string, transactionId: string, platform: MaplesPlatform): Observable<MaplesTransaction> {
    let params = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${MaplesTransactionService.basePath}/${accountId}/${transactionId}`, {params: params})
      .pipe(buildTransaction);

  }

  public getPreAuthTransactionDetails(accountId: string, transactionId: string, platform: MaplesPlatform): Observable<MaplesTransaction> {
    let params = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${MaplesTransactionService.basePath}/preauth/${accountId}/${transactionId}`, {params: params})
      .pipe(buildTransaction);
  }

  clearSelectedTransactionsForSelection(selection: Selection<any>): void {
    if (selection) {
      if (selection.transactionRequests) {
        selection.transactionRequests.isSelectAllChecked = false;
        this.store.dispatch(new SetSelectionTransactionSearchRequestAction(selection));
      }
      if (selection && selection.maplesTransactions) {
        selection.maplesTransactions.forEach((transaction: MaplesTransaction) => {
          transaction['isSelected'] = false;
        });
        this.store.dispatch(new SetSelectionMaplesTransactionsAction(selection));
      }
    }
  }

  /**
   * Set the default transaction query.  Currently for SERVE, only account id and transaction type are available filters.
   *
   * @param selection
   */
  setDefaultRequestForSelection(selection: Selection<any>): void {
    if (!selection.transactionRequests) {
      selection.transactionRequests = new CompositeTransactionRequest();
    }

    let query = selection.getDefaultMaplesTransactionSearchRequest();
    if (query) {
      query.filters     = new MaplesTransactionQueryFilter({
        accountType: MaplesTransactionType.ALL
      });
      query.identifiers = [];
      query.identifiers.push(new MaplesTransactionQueryIdentifier({
        type: 'account_id',
        id: selection.getCustomerAccount() ? selection.getCustomerAccount().id : ''
      }));
    }
  }

  /**
   * Search based upon the maples transaction query stored on the selection.
   *
   * @param selection
   */
  searchForSelection(selection: Selection<any>): Observable<MaplesTransaction[]> {
    this.preProcessRequest(selection);

    return this.doCurrentSearch(selection);
  }

  searchForSelectionScheduled(selection: Selection<any>): Observable<MaplesTransaction[]> {
    let query: MaplesTransactionQuery = selection.getDefaultMaplesScheduledTransactionSearchRequest();
    if (!query.identifiers) {
      query.identifiers = [];
    }
    if (query.identifiers.length === 0) {
      query.identifiers.push(new MaplesTransactionQueryIdentifier({
        type: 'account_id',
        id: selection.getCustomerAccount().id
      }));
    }

    return this.doScheduledSearch(selection);
  }


  findAllOpCodes(): Observable<OpCodeDescriptor[]> {
    return this.http.get<OpCodeDescriptor[]>('/rest/opcode')
      .pipe(buildAllOpCode);
  }

  createOpCode(opcode: OpCodeDescriptor): Observable<OpCodeDescriptor> {
    return this.http.post<OpCodeDescriptor>(`/rest/opcode`, opcode)
      .pipe(buildOpCode);
  }

  updateOpCode(opcode: OpCodeDescriptor): Observable<OpCodeDescriptor> {
    return this.http.put<OpCodeDescriptor>(`/rest/opcode/${opcode.id}`, opcode)
      .pipe(buildOpCode);
  }

  deleteOpCode(opcode: OpCodeDescriptor): Observable<OpCodeDescriptor> {
    return this.http.delete<OpCodeDescriptor>(`/rest/opcode/${opcode.id}`)
      .pipe(buildOpCode);
  }

  getMerchantName(transaction: MaplesTransaction): string {
    const node: MaplesNode = transaction.nodes.find((node: MaplesNode) => {
      return node.type === 'MERCHANT';
    });
    return (node) ? node.name : undefined;
  }

  private preProcessRequest(selection: Selection<any>): void {
    this.setDefaultValuesIfNecessary(selection);
    this.finalizePreProcessing(selection);
  }

  private setDefaultValuesIfNecessary(selection: Selection<any>): void {
    let query: MaplesTransactionQuery = selection.getDefaultMaplesTransactionSearchRequest();

    if (!query.filters) {
      query.filters = new MaplesTransactionQueryFilter({
        accountType: MaplesTransactionType.ALL
      });
    } else if (!query.filters.accountType) {
      query.filters.accountType = MaplesTransactionType.ALL;
    }

    if (!query.identifiers) {
      query.identifiers = [];
    }
    if (query.identifiers.length === 0) {
      query.identifiers.push(new MaplesTransactionQueryIdentifier({
        type: 'account_id',
        id: selection.getCustomerAccount().id
      }));
    }
  }

  private finalizePreProcessing(selection: Selection<any>): void {
    this.store.dispatch(new SetSelectionTransactionSearchRequestAction(selection));
    this.localStorage.updateLocalStorageFromSelection(selection);
  }

  search(query: MaplesTransactionQuery, platform: MaplesPlatform): Observable<MaplesTransaction[]> {
    let params  = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    let headers = new HttpHeaders()
      .set('maples-query', JSON.stringify(query));

    return this.http.get<MaplesTransactionsResponse>(`${MaplesTransactionService.basePath}/maples-search`, {
      params: params,
      headers: headers
    })
      .pipe(buildTransactions);
  }

  adjustTransaction(transactionId: string, request: MaplesAdjustTransactionRequest): Observable<MaplesResultMessageResponse> {
    return this.http.post<MaplesResultMessageResponse>(`${MaplesTransactionService.basePath}/${transactionId}/adjust`, request);
  }

  createDispute(transactionId: string, request: MaplesDisputeTransactionRequest): Observable<MaplesIdCodeResponse> {
    return this.http.post<MaplesIdCodeResponse>(`${MaplesTransactionService.basePath}/${transactionId}/create-dispute`, request);
  }

  cancelPreauthTransaction(accountId: string, request: MaplesCancelPreauthRequest): Observable<MaplesResultMessageResponse> {
    return this.http.post<MaplesResultMessageResponse>(`${MaplesTransactionService.basePath}/account/${accountId}/cancel`, request);
  }

  cancelTransaction(eventId: string, request: MaplesCancelTransactionRequest): Observable<MaplesResultMessageResponse> {
    return this.http.post<MaplesResultMessageResponse>(`${MaplesTransactionService.basePath}/${eventId}/cancel`, request);
  }

  /**
   * Search request based upon the MaplesTransactionQuery currently stored in the selection.
   *
   * @param selection
   */
  private doCurrentSearch(selection: Selection<any>): Observable<MaplesTransaction[]> {
    let request = selection.transactionRequests.maplesCurrent;
    return this.search(request, selection.getMaplesPlatform());
  }

  private doScheduledSearch(selection: Selection<any>): Observable<MaplesTransaction[]> {
    let request = selection.transactionRequests.maplesScheduled;
    return this.search(request, selection.getMaplesPlatform());
  }
}
