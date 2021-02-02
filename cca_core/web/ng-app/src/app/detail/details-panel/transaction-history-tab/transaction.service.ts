import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, Observable, of} from "rxjs";
import {Transactions} from "../../../core/transaction/transactions";
import {PlatformType} from "../../../core/platform/platform-type.enum";
import {SecurityService} from "../../../core/security/security.service";
import {Selection} from "../../../core/session/model/selection";
import {TransactionDateRangeService} from "./transaction-date-range.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {
  SetSelectionTransactionsAction,
  SetSelectionTransactionSearchRequestAction
} from "../../../core/session/action/session-actions";
import * as _ from "lodash";
import {TransactionSearchRequest} from "./transaction-search-request";
import {map} from "rxjs/operators";
import {RequestQueryParam} from "../../../core/routing/request-query-param.enum";
import {Logger} from "../../../logging/logger.service";
import {SelectionType} from "../../../core/session/model/selection-type.enum";
import {IdentifierType} from "../../../core/session/model/identifier-type.enum";
import {Identifier} from "../../../core/session/model/identifier";
import {CompositeTransactionRequest} from "./composite-transaction-request";
import {SortType} from "../../../core/utils/sort-type.enum";
import {LocalStorage} from "../../../core/local-storage/local-storage.service";
import {CustomerTransactionFilterType} from "./customer-transaction-filter-type.enum";
import {CustomerAccountType} from "./customer-account-type.enum";
import {Transaction} from "../../../core/transaction/transaction";
import {CsCoreCurrency} from "@cscore/gringotts";
import {TransactionFee} from "../../../core/transaction/transaction-fee";
import {CsCoreCodeType} from '@cscore/core-client-model';
import {EnhancedDispute} from '../../../core/action/vms-actions/models/vms-response-models';

const build            = map ( value => new Transactions ( value ) );
const buildDispute     = map ( value => new EnhancedDispute ( value ) );
const buildTransaction = map ( value => new Transaction ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class TransactionService {
  private static readonly basePath: string = '/rest/transaction';

  constructor ( private dateRangeService: TransactionDateRangeService,
                private http: HttpClient,
                private localStorage: LocalStorage,
                private logger: Logger,
                private securityService: SecurityService,
                private store: Store<AppState> ) {
  }

  public getTransactionDetails ( identifierType, identifier, transactionId, params ): Observable<Transaction> {
    return this.http.get ( `${TransactionService.basePath}/${identifierType}/${identifier}/details/${transactionId}`, { params: params } )
      .pipe ( buildTransaction );
  }

  clearSelectedTransactionsForSelection ( selection: Selection<any> ): void {
    if ( selection ) {
      if ( selection.transactionRequests ) {
        selection.transactionRequests.isSelectAllChecked = false;
        this.store.dispatch ( new SetSelectionTransactionSearchRequestAction ( selection ) );
      }
      if ( selection && selection.transactions && selection.transactions.transactions.length ) {
        selection.transactions.transactions.forEach ( ( transaction: Transaction ) => {
          transaction.isSelected = false;
        } );
        this.store.dispatch ( new SetSelectionTransactionsAction ( selection ) );
      }
    }
  }

  getDisputeForTransaction ( identifier: Identifier, transaction: Transaction, platform: PlatformType ): Observable<EnhancedDispute> {
    const url = `${TransactionService.basePath}/${identifier.type}/${identifier.value}/dispute/${transaction.id}`;

    const options = {
      params: {
        platform: platform,
        businessDate: transaction.businessDate.getAsMilliseconds ().toString (),
        deliveryChannel: transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ) && transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).code,
        requestCode: transaction.request && transaction.request.code,
        responseCode: transaction.response && transaction.response.code,
      }
    };

    return this.http.get ( url, options ).pipe ( buildDispute );
  }

  search ( request: TransactionSearchRequest ): Observable<Transactions> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, request.platform );

    let requestCopy = _.clone ( request );
    if ( requestCopy.transactionFilter === CustomerTransactionFilterType.ALL ) {
      requestCopy.transactionFilter = null;
    }

    return this.http.post ( `${TransactionService.basePath}/search`, request, { params: params } )
      .pipe ( build );
  }

  searchForSelection ( selection: Selection<any> ): Observable<Transactions> {
    this.preProcessRequest ( selection );

    return forkJoin ( [
      this.doArchiveSearch ( selection ),
      this.doCurrentSearch ( selection )
    ] ).pipe (
      map ( ( results: Transactions[] ) => {
        let combinedResults = this.combineResults ( results );
        combinedResults.transactions.forEach ( ( transaction: Transaction ) => {
          this.postProcess ( transaction, selection );
        } );
        return combinedResults;
      } )
    );
  }

  setDefaultRequestForSelection ( selection: Selection<any> ): void {
    if ( !selection.transactionRequests ) {
      selection.transactionRequests = new CompositeTransactionRequest ();
    }

    let request        = selection.getDefaultTransactionSearchRequest ();
    request.isBillable = this.securityService.getCurrentUser ().prefShowBillableOnly;
    request.sort       = 'createdDate';
    request.sortOrder  = SortType.DESC;

    // If after that, we still have missing values, set them now
    if ( !request.platform ) {
      request.platform = selection.platform;
    }
    if ( !request.startDate ) {
      request.startDate = this.dateRangeService.getDefaultStartDateForSelection ( selection );
    }
    if ( !request.endDate ) {
      request.endDate = this.dateRangeService.getDefaultEndDateForSelection ( selection );
    }
    if ( _.includes ( [ PlatformType.CCL, PlatformType.VMS ], selection.platform ) ) {
      if ( !request.accountType ) {
        request.accountType = CustomerAccountType.ALL;
      }
      if ( !request.transactionFilter ) {
        request.transactionFilter = CustomerTransactionFilterType.ALL_FINANCIAL;
      }
    }

  }

  /**
   * We want to merge both current and archive results together in the same view, so we're mashing them together.
   *
   * Note that CCA will not go fetch the next page (at least until MAPLES transactions is ready). We get the first 1000
   * transactions from both current and archive, merge them together, and if they need more, they need to narrow their
   * search.
   */
  private combineResults ( results: Transactions[] ): Transactions {
    let combinedResults: Transactions = new Transactions ();

    results.forEach ( ( result: Transactions ) => {
      if ( result ) {
        // Store the unadulterated paginations for later use
        if ( result.isArchive ) {
          combinedResults.archivePagination = _.cloneDeep ( result.pagination );
        } else {
          combinedResults.currentPagination = _.cloneDeep ( result.pagination );
        }

        result.transactions.forEach ( ( transaction: Transaction ) => {
          transaction.isArchive = result.isArchive;
        } );

        if ( !combinedResults.pagination ) {
          combinedResults.transactions = result.transactions;
          combinedResults.pagination   = result.pagination;
        } else {
          combinedResults.transactions.push.apply ( combinedResults.transactions, result.transactions );
          combinedResults.pagination.totalResults += result.pagination.totalResults;
        }

      }
    } );

    return combinedResults;
  }

  /**
   * The only difference between a current and archive request is the isArchive flag.
   */
  private copyCurrentParametersToArchive ( selection: Selection<any> ): void {
    selection.transactionRequests.archive           = _.cloneDeep ( selection.transactionRequests.current );
    selection.transactionRequests.archive.isArchive = true;
  }

  /**
   * We only perform the archive search for platform INCOMM products whose date range starts more than 60 days ago
   */
  private doArchiveSearch ( selection: Selection<any> ): Observable<Transactions> {
    if ( this.dateRangeService.isArchiveRequestRequired ( selection ) ) {
      let request = selection.transactionRequests.archive;
      return this.search ( request )
        .pipe ( map ( ( response: Transactions ) => {
          response.isArchive = true;
          return response;
        } ) );
    } else {
      return of ( null );
    }
  }

  /**
   * This is the default transaction search and will always be executed
   */
  private doCurrentSearch ( selection: Selection<any> ): Observable<Transactions> {
    let request = selection.transactionRequests.current;
    return this.search ( request );
  }

  private finalizePreProcessing ( selection: Selection<any> ): void {
    this.store.dispatch ( new SetSelectionTransactionSearchRequestAction ( selection ) );
    this.localStorage.updateLocalStorageFromSelection ( selection );
  }

  private isDefaultDataSourceSEJ (): boolean {
    return this.securityService.getCurrentUser ().prefDefaultDataSource === PlatformType.SEJ;
  }

  /**
   * Handle determining the correct platform to use for transaction history, based on the requested platform. Some have
   * to be overridden to INCOMM (or SEJ).
   */
  private overridePlatformIfNecessary ( selection: Selection<any> ): void {
    let request = selection.getDefaultTransactionSearchRequest ();

    switch ( request.platform ) {
      case PlatformType.CASHTIE:
      case PlatformType.CCL:
      case PlatformType.GREENCARD:
      case PlatformType.JIRA:
      case PlatformType.VMS:
        break;
      case PlatformType.LOTTERY:
        request.platform = PlatformType.LOTTERY;
        break;
      default:
        request.platform = this.isDefaultDataSourceSEJ () ? PlatformType.SEJ : PlatformType.INCOMM;
        break;
    }
  }

  private postProcess ( transaction: Transaction, selection: Selection<any> ): void {
    switch ( transaction.platform ) {
      case PlatformType.CASHTIE:
        this.postProcessCashtieTransaction ( transaction, selection );
        break;
      default:
        break;
    }
  }

  private postProcessCashtieTransaction ( transaction: Transaction, selection: Selection<any> ): void {
    if ( selection.getAccount () ) {
      if ( !transaction.fee ) {
        transaction.fee = new TransactionFee ();
      }
      transaction.fee.amount = selection.getAccount ().getTransactionFee ( transaction );

      // Calculate total
      if ( transaction.amounts.authorizedAmount ) {
        let total = transaction.amounts.authorizedAmount.value;
        if ( transaction.fee.amount ) {
          total += transaction.fee.amount.value;
        }
        let totalAmount                 = new CsCoreCurrency ( {
          displayValue: `$${total.toFixed ( 2 )}`,
          value: total
        } );
        transaction.amounts.totalAmount = totalAmount;
      }
    }
  }

  private preProcessRequest ( selection: Selection<any> ): void {
    this.setDefaultValuesIfNecessary ( selection );
    this.overridePlatformIfNecessary ( selection );
    this.dateRangeService.validateDateRange ( selection );
    this.copyCurrentParametersToArchive ( selection );
    this.finalizePreProcessing ( selection );
  }

  private setDefaultValuesIfNecessary ( selection: Selection<any> ): void {
    let request         = selection.getDefaultTransactionSearchRequest ();
    request.selectionId = selection.id;

    if ( !request.platform ) {
      request.platform = selection.platform;
    }
    if ( !request.identifierType || !request.identifier ) {
      this.setIdentifiers ( selection );
    }
    if ( !request.startDate ) {
      request.startDate = this.dateRangeService.getDefaultStartDateForSelection ( selection );
    }
    if ( !request.endDate ) {
      request.endDate = this.dateRangeService.getDefaultEndDateForSelection ( selection );
    }
    if ( typeof request.isBillable === 'undefined' ) {
      request.isBillable = !!this.securityService.getCurrentUser ().prefShowBillableOnly;
    }
  }

  /**
   * We can only choose one identifier to search on, so we must choose wisely.
   */
  private setIdentifiers ( selection: Selection<any> ) {
    let request = selection.getDefaultTransactionSearchRequest ();
    let identifier: Identifier;

    switch ( selection.type ) {
      case SelectionType.ACCOUNT:
        request.identifierType = IdentifierType.ACCOUNT_NUMBER;
        request.identifier     = selection.getAccount ().identifiers.accountNumber;
        break;
      case SelectionType.CUSTOMER:
        identifier             = selection.getIdentifierByType ( IdentifierType.CUSTOMERID );
        request.identifierType = identifier.type;
        request.identifier     = identifier.value;
        break;
      case SelectionType.LOCATION:
        identifier             = selection.getIdentifierByType ( IdentifierType.LOCATIONID );
        request.identifierType = identifier.type;
        request.identifier     = identifier.value;
        break;
      case SelectionType.CARD:
        // For cards, we prefer Serial Number > Van > Pin
        if ( selection.getCard ().identifiers.van && selection.platform === PlatformType.LOTTERY ) {
          request.identifierType = IdentifierType.VAN;
          request.identifier     = selection.getCard ().identifiers.van;
        } else if ( selection.getCard ().identifiers.serialNumber ) {
          request.identifierType = IdentifierType.SERIALNUMBER;
          request.identifier     = selection.getCard ().identifiers.serialNumber;
        } else if ( selection.getCard ().identifiers.van ) {
          request.identifierType = IdentifierType.VAN;
          request.identifier     = selection.getCard ().identifiers.van;
        } else if ( selection.getCard ().identifiers.pin ) {
          request.identifierType = IdentifierType.PIN;
          request.identifier     = selection.getCard ().identifiers.pin;
        }
        break;
      default:
        break;
    }

    if ( !request.identifierType || !request.identifier ) {
      this.logger.error ( 'Unable to determine identifiers to use for transaction search!', selection );
    }
  }
}
