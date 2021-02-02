import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from "../../../../app-state";
import {Store} from "@ngrx/store";
import {CsCoreTableColumn} from "@cscore/components";
import {
  MaplesTransaction,
  MaplesDateRange,
  MaplesTransactionQueryFilter,
  MaplesTransactionQueryIdentifier
} from "@cscore/maples-client-model";
import {MatSort, MatTableDataSource} from "@angular/material";
import {SelectionType} from "../../../../core/session/model/selection-type.enum";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {CsCoreCodeType} from "@cscore/core-client-model";
import {Selection} from "../../../../core/session/model/selection";
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {MaplesTransactionService} from "../../../../core/transaction/maples-transaction.service";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";
import * as moment from "moment";
import {DateService} from "../../../../core/date/date.service";
import {SetSelectionTransactionSearchRequestAction} from "../../../../core/session/action/session-actions";
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'cca-maples-scheduled-transactions',
  templateUrl: './maples-scheduled-transactions.component.html',
  styleUrls: ['./maples-scheduled-transactions.component.scss']
})
export class MaplesScheduledTransactionsComponent extends CcaBaseComponent implements OnInit {
  form: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  CsCoreCodeType                                           = CsCoreCodeType;
  dataSource                                               = new MatTableDataSource<MaplesTransaction>();
  displayedColumns: CsCoreTableColumn<MaplesTransaction>[] = [];
  selection: Selection<any>;
  SelectionType                                            = SelectionType;
  searching: boolean                                       = false;
  showScheduled: boolean                                   = false;

  customerAccountColumns: CsCoreTableColumn<MaplesTransaction>[] = [
    {
      key: 'eventDate',
      label: 'Scheduled Date',
      getValue: (transaction: MaplesTransaction) => transaction.schedule && transaction.schedule.eventDate && transaction.schedule.eventDate.displayValue,
      getSortValue: (transaction: MaplesTransaction) => transaction.schedule && transaction.schedule.eventDate && transaction.schedule.eventDate.getAsMilliseconds(),
    },
    {
      key: 'authorizedAmount',
      label: 'Amount',
      getValue: (transaction: MaplesTransaction) => transaction.amounts && transaction.amounts.authorizedAmount && transaction.amounts.authorizedAmount.displayValue,
      getSortValue: (transaction: MaplesTransaction) => transaction.amounts && transaction.amounts.authorizedAmount && transaction.amounts.authorizedAmount.value,
    },
    {
      key: 'description',
      label: 'Description',
      getValue: (transaction: MaplesTransaction) => transaction.description,
    },
    {
      key: 'responseStatus',
      label: 'Status',
      getValue: (transaction: MaplesTransaction) => {
        if (transaction.schedule && transaction.schedule.overrideStatus) {
          return transaction.schedule.overrideStatus;
        } else {
          return transaction.schedule && transaction.schedule.status && transaction.schedule.status.toLowerCase();
        }
      },
    },
    {
      key: 'frequency',
      label: 'Frequency',
      getValue: (transaction: MaplesTransaction) => transaction.schedule && transaction.schedule.frequency,
    },
    {
      key: 'source',
      label: 'Funding Source',
      getValue: (transaction: MaplesTransaction) => transaction.schedule && transaction.schedule.source,
    }
  ];
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dateService: DateService,
              private maplesTransactionService: MaplesTransactionService,
              private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.subscribeToSessionState();
    this.setAccountTypeToScheduled();
    this.applyDefaultDateRange();
    this.search();

    this.maplesTransactionService.scheduledTransactionsRefreshed.subscribe((refresh: boolean) => {
      this.search();
    });
  }

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  search(): void {
    this.dataSource.data = [];
    this.searching       = true;
    this.updateSelectionFromForm();
    this.maplesTransactionService.searchForSelectionScheduled(this.selection)
      .pipe(finalize(() => this.searching = false))
      .subscribe((response: MaplesTransaction[]) => {
        this.dataSource.data = response;
        this.selection.maplesScheduledTransactions = response;
      });
  }

  toggleShowScheduled() {
    this.showScheduled = !this.showScheduled;
  }

  private applyDefaultDateRange(): void {
    let request = this.selection.getDefaultMaplesScheduledTransactionSearchRequest();

    if (!request) {
      return;
    } else if (!request.date) {
      request.date = new MaplesDateRange();
    }

    request.date.startDate = this.dateService.formatMomentToDateStringISO(moment());
    request.date.endDate   = this.dateService.formatMomentToDateStringISO(moment().add(30, DateService.MOMENT_DAY_UNIT));

    this.form.get('startDate').setValue(this.dateService.buildMomentFromDateStringISO(request.date.startDate).toDate());
    this.form.get('endDate').setValue(this.dateService.buildMomentFromDateStringISO(request.date.endDate).toDate());

  }

  private initForm(): void {
    this.form = new FormGroup({
      endDate: new FormControl(),
      startDate: new FormControl(),
    });
  }

  private setAccountTypeToScheduled(): void {
    let query = this.selection.getDefaultMaplesScheduledTransactionSearchRequest();
    if (!query) {
      if (!query.filters) {
        query.filters = new MaplesTransactionQueryFilter();
      }
      query.filters.accountType = 'SCHEDULED';
    }
  }

  private setDisplayedColumns(): void {
    let columns: CsCoreTableColumn<MaplesTransaction>[] = [
      {
        key: 'caret',
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
            if (!this.dataSource.data.length) {
              if (this.selection && this.selection.maplesScheduledTransactions) {
                this.setDisplayedColumns();
                this.dataSource.data = [...this.selection.maplesScheduledTransactions];
              } else {
                this.dataSource.data = [];
              }
            }
          }
        })
    );
  }

  private updateSelectionFromForm(): void {
    let query                 = this.selection.getDefaultMaplesScheduledTransactionSearchRequest();
    query.date.startDate      = this.dateService.formatMomentToDateStringISO(this.dateService.buildMomentFromDateString(this.form.get('startDate').value));
    query.date.endDate        = this.dateService.formatMomentToDateStringISO(this.dateService.buildMomentFromDateString(this.form.get('endDate').value));

    query.identifiers = [];
    query.identifiers.push(new MaplesTransactionQueryIdentifier({
      type: 'account_id',
      id: this.selection.getCustomerAccount().id
    }));

    if (!query.filters) {
      query.filters = new MaplesTransactionQueryFilter();
    }
    query.filters.accountType = 'SCHEDULED';
    this.store.dispatch(new SetSelectionTransactionSearchRequestAction(this.selection));
  }

}
