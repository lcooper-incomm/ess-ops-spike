import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {NodeType} from "../../../../core/node/node-type.enum";
import {SecurityService} from "../../../../core/security/security.service";
import {Permission} from "../../../../core/auth/permission";
import {Transaction} from "../../../../core/transaction/transaction";
import {AppState} from "../../../../app-state";
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Selection} from "../../../../core/session/model/selection";
import {
  SetSelectionSelectedTabAction,
  SetSelectionTransactionSearchRequestAction,
  UpdateSelectionTransactionAction
} from "../../../../core/session/action/session-actions";
import {SelectionType} from "../../../../core/session/model/selection-type.enum";
import {PlatformType} from "../../../../core/platform/platform-type.enum";
import {TogglzService} from "../../../../core/config/togglz.service";
import {TogglzType} from "../../../../core/config/togglz-type.enum";
import {CsCoreCodeType} from '@cscore/core-client-model';
import {DetailTabType} from "../../../detail-tab-type.enum";
import * as _ from "lodash";
import {KeyValuePair} from "../../../../core/utils/key-value-pair";
import {SearchParameterValueType} from "../../../../core/search/search-type/search-parameter-value-type.enum";
import {SearchTypeContainer} from "../../../../core/search/search-type-container";
import {SearchState} from "../../../../core/search/search-state";
import {snapshot} from "../../../../core/store-utils/store-utils";
import {SearchTypeType} from "../../../../core/search/search-type/search-type-type.enum";
import {Workflow} from "../../../../core/workflow/workflow.service";
import {Logger} from "../../../../logging/logger.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TransactionService} from "../transaction.service";
import {TRANSACTION_SEARCH_MAX} from '../transaction-search-request';

@Component ( {
  selector: 'cca-transaction-history-table',
  templateUrl: './transaction-history-table.component.html',
  styleUrls: [ './transaction-history-table.component.scss' ],
  animations: [
    trigger ( 'detailExpand', [
      state ( 'collapsed', style ( { height: '0', minHeight: '0' } ) ),
      state ( 'expanded', style ( { height: '*' } ) ),
      transition ( 'expanded <=> collapsed', animate ( '225ms cubic-bezier(0.4, 0.0, 0.2, 1)' ) ),
    ] ),
  ],
} )
export class TransactionHistoryTableComponent extends CcaBaseComponent implements OnInit {
  CsCoreCodeType                                = CsCoreCodeType;
  dataSource                                    = new MatTableDataSource<Transaction> ();
  displayedColumns: string[]                    = [];
  expandedElements: Set<Transaction>            = new Set ();
  filterSummary: string;
  hasFastCardSearchPermission: boolean          = false;
  hasGreenCardReleasePreAuthPermission: boolean = false;
  hasLocationSearchPermission: boolean          = false;
  isGreenCardCardNumberToggleEnabled: boolean   = false;
  selection: Selection<any>;
  SelectionType                                 = SelectionType;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor ( private logger: Logger,
                private securityService: SecurityService,
                private store: Store<AppState>,
                private togglzService: TogglzService,
                private transactionService: TransactionService,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.setPermissionFlags ();
    this.setTogglzFlags ();
    this.subscribeToSessionState ();

    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( transaction: Transaction, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'acquirerEntity':
          let acquirer = transaction.getPreferredEntityNode ();
          sortValue    = (acquirer && acquirer.name) ? acquirer.name.toLowerCase () : null;
          break;
        case 'authorizedAmount':
          sortValue = transaction.amounts.authorizedAmount ? transaction.amounts.authorizedAmount.value : null;
          break;
        case 'availableBalance':
          sortValue = transaction.amounts.availableBalance ? transaction.amounts.availableBalance.value : null;
          break;
        case 'createdDate':
          sortValue = transaction.createDate ? transaction.createDate.value : null;
          break;
        case 'description':
          sortValue = transaction.description ? transaction.description.toLowerCase () : null;
          break;
        case 'entity':
          if ( transaction.isUserCodeDisplayable ) {
            sortValue = transaction.request.userCode.toLowerCase ();
          } else {
            let entity = transaction.getPreferredEntityNode ();
            sortValue  = (entity && entity.name) ? entity.name.toLowerCase () : null;
          }
          break;
        case 'fee':
          let fee   = transaction.fee ? transaction.fee.amount : null;
          sortValue = fee ? fee.value : null;
          break;
        case 'holds':
          sortValue = transaction.amounts.pendingAmount ? transaction.amounts.pendingAmount.value : null;
          break;
        case 'id':
          sortValue = transaction.id ? transaction.id.toLowerCase () : null;
          break;
        case 'lastFour':
          sortValue = transaction.identifiers.panLastFour;
          break;
        case 'locationEntity':
          let location = transaction.nodes ? transaction.nodes.location : null;
          sortValue    = (location && location.name) ? location.name.toLowerCase () : null;
          break;
        case 'merchantSource':
          let merchant = transaction.nodes ? transaction.nodes.merchant : null;
          sortValue    = (merchant && merchant.name) ? merchant.name.toLowerCase () : null;
          break;
        case 'request':
          sortValue = transaction.getRequestDisplayValue ();
          break;
        case 'response':
          sortValue = transaction.getResponseDisplayValue ();
          break;
        case 'serialNumber':
          sortValue = transaction.identifiers.serialNumber;
          break;
        case 'source':
          let deliveryChannelCode = transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL );
          sortValue               = deliveryChannelCode ? deliveryChannelCode.description : null;
          break;
        case 'totalAmount':
          sortValue = transaction.amounts.totalAmount ? transaction.amounts.totalAmount.value : null;
          break;
        default:
          sortValue = transaction[ property ];
          break;
      }

      return sortValue;
    };
    this.dataSource.filterPredicate     = ( transaction: Transaction, filterValue: string ): boolean => {
      let acquirer         = transaction.getPreferredEntityNode ();
      let authorizedAmount = transaction.amounts.authorizedAmount;
      let availableBalance = transaction.amounts.availableBalance;
      let createdDate      = transaction.createDate;
      let description      = transaction.description;
      let entity;
      if ( transaction.isUserCodeDisplayable ) {
        entity = transaction.request.userCode;
      } else if ( transaction.getPreferredEntityNode () ) {
        entity = transaction.getPreferredEntityNode ().name;
      }

      let fee            = transaction.fee ? transaction.fee.amount : null;
      let holds          = transaction.amounts.pendingAmount;
      let id             = transaction.id;
      let lastFour       = transaction.identifiers.panLastFour;
      let locationEntity = transaction.nodes.location;
      let merchantSource = transaction.nodes.merchant;
      let request        = transaction.getRequestDisplayValue ();
      let response       = transaction.getResponseDisplayValue ();
      let serialNumber   = transaction.identifiers.serialNumber;
      let source         = transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ) ? transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).description : null;
      let totalAmount    = transaction.amounts.totalAmount;

      return (this.isColumnDisplayed ( 'acquirerEntity' ) && acquirer && acquirer.name && acquirer.name.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'authorizedAmount' ) && authorizedAmount && authorizedAmount.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'availableBalance' ) && availableBalance && availableBalance.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'createdDate' ) && createdDate && createdDate.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'description' ) && description && description.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'entity' ) && entity && entity.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'fee' ) && fee && fee.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'holds' ) && holds && holds.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'id' ) && id && id.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'lastFour' ) && lastFour && lastFour.indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'locationEntity' ) && locationEntity && locationEntity.name && locationEntity.name.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'merchantSource' ) && merchantSource && merchantSource.name && merchantSource.name.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'request' ) && request && request.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'response' ) && response && response.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'serialNumber' ) && serialNumber && serialNumber.indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'source' ) && source && source.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (this.isColumnDisplayed ( 'totalAmount' ) && totalAmount && totalAmount.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1);
    };
  }

  linkToCard ( transaction: Transaction ): void {

    let searchTypeContainer = this.getSearchTypeContainerByType ( SearchTypeType.FINANCIAL_GIFT );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, transaction.identifiers.serialNumber );

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();
  }

  linkToNode ( transaction: Transaction ): void {
    let searchTypeContainer = this.getSearchTypeContainerByType ( SearchTypeType.LOCATION );
    searchTypeContainer.clear ();

    let node = transaction.getPreferredEntityNode ();
    switch ( node.type ) {
      case NodeType.LOCATION:
        if ( node.id ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.LOCATION_ID, node.id );
        } else if ( node.legacyId ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.LEGACY_LOCATION_ID, node.legacyId );
        } else {
          this.logger.error ( 'No node ID found for location node in linkToNode!', node );
          return;
        }
        break;
      case NodeType.MERCHANT:
        if ( node.name ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.MERCHANT_NAME, node.name );
        } else {
          this.logger.error ( 'No node name found for merchant node in linkToNode!', node );
          return;
        }
        break;
      case NodeType.TERMINAL:
        if ( node.name ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.TERMINAL_ID, node.name );
        } else {
          this.logger.error ( 'No node name found for terminal node in linkToNode!', node );
          return;
        }
        break;
      default:
        this.logger.error ( 'Unexpected node type in linkToNode!', node );
        return;
    }

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();
  }

  get showLastPageHint (): boolean {
    const totalExceedsMax = this.selection.transactions && this.selection.transactions.pagination.totalResults > TRANSACTION_SEARCH_MAX;
    const onLastPage      = !this.dataSource.paginator.hasNextPage ();
    return totalExceedsMax && onLastPage;
  }

  navigateToFeesTab (): void {
    this.selection.selectedTab = DetailTabType.FEES;
    this.store.dispatch ( new SetSelectionSelectedTabAction ( this.selection ) );
  }

  toggleSelectAll (): void {
    this.selection.transactionRequests.isSelectAllChecked = !this.selection.transactionRequests.isSelectAllChecked;

    //If we've deselected all, we need to clear any specifically-selected transactions
    if ( !this.selection.transactionRequests.isSelectAllChecked ) {
      //This both clears individual transactions and updates isSelectAllChecked
      this.transactionService.clearSelectedTransactionsForSelection ( this.selection );
    } else {
      this.store.dispatch ( new SetSelectionTransactionSearchRequestAction ( this.selection ) );
    }
  }

  toggleSelectTransaction ( transaction: Transaction ): void {
    transaction.isSelected = !transaction.isSelected;
    this.store.dispatch ( new UpdateSelectionTransactionAction ( transaction ) );
  }

  private buildFilterSummary (): void {
    if ( this.selection && this.selection.transactions && this.selection.getDefaultTransactionSearchRequest () ) {
      let request = this.selection.getDefaultTransactionSearchRequest ();

      let entries: string[] = [];
      request.getAsKeyValuePairs ().forEach ( ( entry: KeyValuePair ) => {
        entries.push ( `${entry.key}: ${entry.value}` );
      } );

      let joinedEntries = entries.join ( ', ' );

      this.filterSummary = `for ${joinedEntries}`;

    } else {
      this.filterSummary = null;
    }
  }

  private getSearchTypeContainerByType ( searchType: SearchTypeType ): SearchTypeContainer {
    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.cloneDeep ( _.find ( searchState.searchTypeContainers, ( searchTypeContainer: SearchTypeContainer ) => {
      return searchTypeContainer.searchType.type === searchType;
    } ) );
  }

  private isColumnDisplayed ( key: string ): boolean {
    return _.includes ( this.displayedColumns, key );
  }

  private setDisplayedColumns (): void {
    let columns: string[] = ['caret', 'selection'];

    switch ( this.selection.type ) {
      case SelectionType.ACCOUNT:
        columns = [ 'createdDate', 'id', 'locationEntity', 'merchantSource', 'response', 'fee', 'authorizedAmount', 'totalAmount' ];
        break;
      case SelectionType.CUSTOMER:
        switch ( this.selection.platform ) {
          case PlatformType.CCL:
            columns = [ 'createdDate', 'lastFour', 'source', 'entity', 'request', 'response', 'authorizedAmount', 'fee', 'holds', 'availableBalance' ];
            break;
          default:
            columns = [ ...columns, 'createdDate', 'lastFour', 'source', 'entity', 'request', 'response', 'authorizedAmount', 'fee', 'holds', 'availableBalance' ];
            break;
        }
        break;
      case SelectionType.LOCATION:
        columns = [ ...columns, 'createdDate', 'id', 'serialNumber', 'description', 'entity', 'request', 'response', 'authorizedAmount' ];
        break;
      case SelectionType.CARD:
        switch ( this.selection.platform ) {
          case PlatformType.GREENCARD:
            if ( this.isGreenCardCardNumberToggleEnabled ) {
              columns = [ ...columns, 'createdDate', 'id', 'lastFour', 'acquirerEntity', 'request', 'response', 'authorizedAmount', 'holds', 'availableBalance' ];
            } else {
              columns = [ ...columns, 'createdDate', 'id', 'acquirerEntity', 'request', 'response', 'authorizedAmount', 'holds', 'availableBalance' ];
            }
            break;
          case PlatformType.LOTTERY:
            columns = [ ...columns, 'createdDate', 'id', 'source', 'entity', 'request', 'response', 'authorizedAmount', 'availableBalance' ];
            break;
          default:
            columns = [ ...columns, 'createdDate', 'id', 'entity', 'request', 'response', 'authorizedAmount' ];
            break;
        }
        break;
      default:
        break;
    }

    this.displayedColumns = columns;
  }

  private setPermissionFlags (): void {
    this.hasFastCardSearchPermission          = this.securityService.hasPermission ( Permission.SEARCH_BY_INCOMM );
    this.hasGreenCardReleasePreAuthPermission = this.securityService.hasPermission ( Permission.GC_RELEASE_PREAUTH );
    this.hasLocationSearchPermission          = this.securityService.hasPermission ( Permission.SEARCH_BY_LOCATION );
  }

  private setTogglzFlags (): void {
    this.isGreenCardCardNumberToggleEnabled = this.togglzService.isActive ( TogglzType.SHOW_GC_CARD_NUMBER_IN_TRANSACTION_HISTORY );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            if ( this.selection && this.selection.transactions ) {
              this.setDisplayedColumns ();
              this.dataSource.data = [ ...this.selection.transactions.transactions ];
            } else {
              this.dataSource.data = [];
            }
            if ( this.selection && this.selection.getDefaultTransactionSearchRequest () ) {
              this.dataSource.filter = this.selection.getDefaultTransactionSearchRequest ().localFilter;
            } else {
              this.dataSource.filter = null;
            }
            this.buildFilterSummary ();
          }
        } )
    );
  }

  toggleExpanded ( element: any ): void {
    if ( this.expandedElements.has ( element ) ) {
      this.expandedElements.delete ( element );
    } else {
      this.expandedElements.add ( element );
    }
  }

  isExpanded ( element: any ): boolean {
    return this.expandedElements.has ( element );
  }
}
