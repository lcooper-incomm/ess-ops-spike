import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Store} from '@ngrx/store';
import {CsCoreTableComponent, CsCoreTableColumn} from '@cscore/components';
import {CsCoreCodeType} from '@cscore/core-client-model';
import {MaplesNode, MaplesTransaction} from '@cscore/maples-client-model';
import {SecurityService} from '../../../../core/security/security.service';
import {AppState} from '../../../../app-state';
import {CcaBaseComponent} from '../../../../core/cca-base-component';
import {AppStateType} from '../../../../app-state-type.enum';
import {SessionState} from '../../../../core/session/session-state';
import {Selection} from '../../../../core/session/model/selection';
import {SelectionType} from '../../../../core/session/model/selection-type.enum';
import {TogglzService} from '../../../../core/config/togglz.service';
import {Workflow} from '../../../../core/workflow/workflow.service';
import {Logger} from '../../../../logging/logger.service';
import {MaplesTransactionService} from '../../../../core/transaction/maples-transaction.service';
import {MaplesTransactionHistoryService} from '../maples-transaction-history.service';

@Component({
  selector: 'cca-maples-transaction-history-table',
  templateUrl: './maples-transaction-history-table.component.html',
  styleUrls: ['./maples-transaction-history-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MaplesTransactionHistoryTableComponent extends CcaBaseComponent implements OnInit {
  CsCoreCodeType                                           = CsCoreCodeType;
  dataSource                                               = new MatTableDataSource<MaplesTransaction>();
  displayedColumns: CsCoreTableColumn<MaplesTransaction>[] = [];
  expandedElements: Set<MaplesTransaction>                 = new Set();
  filterSummary: string;
  hasFastCardSearchPermission: boolean                     = false;
  hasGreenCardReleasePreAuthPermission: boolean            = false;
  hasLocationSearchPermission: boolean                     = false;
  isGreenCardCardNumberToggleEnabled: boolean              = false;
  selection: Selection<any>;
  SelectionType                                            = SelectionType;
  expandedRow: MaplesTransaction                           = null;

  customerAccountColumns: CsCoreTableColumn<MaplesTransaction>[] = [
    {
      key: 'date',
      label: 'Date',
      getValue: (transaction: MaplesTransaction) => transaction.getDisplayDate(),
      getSortValue: (transaction: MaplesTransaction) => transaction.getDate() ? transaction.getDate().getAsMilliseconds() : null,
    },
    {
      key: 'source',
      label: 'Source',
      getValue: (transaction: MaplesTransaction) => transaction.source,
    },
    {
      key: 'entity',
      label: 'Entity',
      getValue: (transaction: MaplesTransaction) => this.getEntity(transaction),
    },
    {
      key: 'description',
      label: 'Description',
      getValue: (transaction: MaplesTransaction) => transaction.description,
    },
    {
      key: 'responseStatus',
      label: 'Status',
      getValue: (transaction: MaplesTransaction) => transaction.status,
    },
    {
      key: 'authorizedAmount',
      label: 'Amount',
      getValue: (transaction: MaplesTransaction) => transaction.amounts && transaction.amounts.authorizedAmount && transaction.amounts.authorizedAmount.displayValue,
      getSortValue: (transaction: MaplesTransaction) => transaction.amounts && transaction.amounts.authorizedAmount && transaction.amounts.authorizedAmount.value,
    },
    {
      key: 'availableBalance',
      label: 'Available',
      getValue: (transaction: MaplesTransaction) => transaction.amounts && transaction.amounts.availableBalance && transaction.amounts.availableBalance.displayValue,
      getSortValue: (transaction: MaplesTransaction) => transaction.amounts && transaction.amounts.availableBalance && transaction.amounts.availableBalance.value,
    }
  ];

  @ViewChild('transactionTable')
  transactionTable: CsCoreTableComponent<MaplesTransaction>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  trackBy: any = (item: MaplesTransaction) => item.sourceRefNum;

  constructor(private logger: Logger,
              private securityService: SecurityService,
              private store: Store<AppState>,
              private togglzService: TogglzService,
              private maplesTransactionService: MaplesTransactionService,
              private maplesTransactionHistoryService: MaplesTransactionHistoryService,
              private workflow: Workflow) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();

    this.addSubscription(
      this.maplesTransactionHistoryService.getSelectionUpdatedSubject().subscribe((areTransactionsSelected: boolean) => {
        if (!areTransactionsSelected) {
          for (let transaction of this.dataSource.data) {
            transaction['isSelected'] = false;
          }
        }
      })
    );

    this.dataSource.paginator           = this.paginator;

    this.dataSource.filterPredicate = (transaction: MaplesTransaction, filterValue: string): boolean => {
      let authorizedAmount = transaction.amounts ? transaction.amounts.authorizedAmount : null;
      let availableBalance = transaction.amounts ? transaction.amounts.availableBalance : null;
      let date             = transaction.getDate();
      let description      = transaction.description;
      let entity           = this.getEntity(transaction);
      let responseStatus   = transaction.status;
      let id               = transaction.id;
      let request          = transaction.request ? transaction.request.description : null;
      let response         = transaction.response ? transaction.response.description : null;
      let cardNumber       = transaction.identifiers ? transaction.identifiers.cardNumber : null;
      let source           = transaction.source;

      return (this.isColumnDisplayed('authorizedAmount') && authorizedAmount && authorizedAmount.displayValue.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('availableBalance') && availableBalance && availableBalance.displayValue.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('date') && date && date.displayValue.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('description') && description && description.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('locationEntity') && entity && entity.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('responseStatus') && responseStatus && responseStatus.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('id') && id && id.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('request') && request && request.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('response') && response && response.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('cardNumber') && cardNumber && cardNumber.indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('source') && source && source.toLowerCase().indexOf(filterValue) !== -1)
        || (this.isColumnDisplayed('entity') && entity && entity.toLowerCase().indexOf(filterValue) !== -1);
    };
  }

  /**
   * Maintain memory of the expanded row if the table is refreshed.
   *
   * @param row
   */
  rowClick(row: MaplesTransaction): void {
    if (!this.expandedRow || (this.expandedRow && this.expandedRow.sourceRefNum !== row.sourceRefNum)) {
      this.expandedRow = row;
    } else {
      this.expandedRow = null;
    }
  }

  highlightDisputed: (row: MaplesTransaction) => { [name: string]: boolean } = (row: MaplesTransaction) => {
    if (row.alerts.inDispute || row.alerts.isFraudulent) {
      return {
        'disputed': true
      };
    }

    return null;
  }

  toggleSelectAll(): void {
    this.selection.transactionRequests.isSelectAllChecked = !this.selection.transactionRequests.isSelectAllChecked;

    // If we've deselected all, we need to clear any specifically-selected transactions
    if (this.selection.transactionRequests.isSelectAllChecked) {
      this.maplesTransactionHistoryService.setSelectionUpdated(true);
    } else {
      // This both clears individual transactions and updates isSelectAllChecked
      this.maplesTransactionService.clearSelectedTransactionsForSelection(this.selection);
    }
  }

  toggleSelectTransaction(transaction: MaplesTransaction): void {
    transaction['isSelected'] = !transaction['isSelected'];

    let isTransactionSelected: boolean = false;
    if (transaction['isSelected']) {
      isTransactionSelected = true;
    } else {
      for (let transaction of this.dataSource.data) {
        if (transaction['isSelected']) {
          isTransactionSelected = true;
          break;
        }
      }
    }

    this.maplesTransactionHistoryService.setSelectionUpdated(isTransactionSelected);
  }

  private isColumnDisplayed(key: string): boolean {
    return this.displayedColumns.filter((column: CsCoreTableColumn<MaplesTransaction>) => column.key === key).length > 0;
  }

  private setDisplayedColumns(): void {
    let columns: CsCoreTableColumn<MaplesTransaction>[] = [
      {
        key: 'caret',
        label: '',
        getValue: (transaction: MaplesTransaction) => undefined,
        disableSort: true
      },
      {
        key: 'selection',
        label: '',
        getValue: (transaction: MaplesTransaction) => undefined,
        disableSort: true
      }
    ];

    switch (this.selection.type) {
      case SelectionType.CUSTOMER_ACCOUNT:
        columns = [...columns, ...this.customerAccountColumns];
        break;
      default:
        break;
    }

    this.displayedColumns = columns;
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            this.selection = state.selection;


            if (this.selection && this.selection.maplesTransactions) {
              this.setDisplayedColumns();
              this.dataSource.data = [...this.selection.maplesTransactions];
            } else {
              this.dataSource.data = [];
            }

            if (this.selection && this.selection.transactionRequests && this.selection.transactionRequests.maplesLocalFilter) {
              this.dataSource.filter = this.selection.transactionRequests.maplesLocalFilter;
            } else {
              this.dataSource.filter = null;
            }
          }
        })
    );
  }

  getEntity(transaction: MaplesTransaction): string {
    const node: MaplesNode = transaction.nodes.find((node: MaplesNode) => {
      return node.type === 'MERCHANT';
    });
    if (node) {
      return node.name;
    } else if (transaction.identifiers && transaction.identifiers.accountIdentifier) {
      return transaction.identifiers.accountIdentifier;
    } else {
      return null;
    }
  }
}
