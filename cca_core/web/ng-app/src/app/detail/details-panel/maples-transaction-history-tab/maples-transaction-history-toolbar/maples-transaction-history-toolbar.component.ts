import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {debounceTime, finalize} from 'rxjs/operators';
import * as moment from 'moment';
import {Moment} from 'moment';
import {
  MaplesStatement,
  MaplesTransaction,
  MaplesDateRange,
  MaplesTransactionQueryFilter,
  MaplesTransactionType
} from '@cscore/maples-client-model';
import {DateService} from '../../../../core/date/date.service';
import {TransactionDateRangeService} from '../../transaction-history-tab/transaction-date-range.service';
import {ExportService} from '../../transaction-history-tab/export.service';
import {LocalStorage} from '../../../../core/local-storage/local-storage.service';
import {SecurityService} from '../../../../core/security/security.service';
import {AppState} from '../../../../app-state';
import {CcaBaseComponent} from '../../../../core/cca-base-component';
import {MaplesTransactionService} from '../../../../core/transaction/maples-transaction.service';
import {Selection} from '../../../../core/session/model/selection';
import {
  SetSelectionMaplesTransactionsAction,
  SetSelectionTransactionSearchRequestAction
} from '../../../../core/session/action/session-actions';
import {AppStateType} from '../../../../app-state-type.enum';
import {SessionState} from '../../../../core/session/session-state';
import {Session} from '../../../../core/session/model/session';
import {SelectionType} from '../../../../core/session/model/selection-type.enum';
import {GenericOption} from '../../../../core/model/generic-option';
import {DateRangePreset} from '../../../../core/date/date-range-presets/date-range-preset';
import {ExportType} from '../../transaction-history-tab/export-type.enum';
import {Permission} from '../../../../core/auth/permission';
import {MaplesTransactionHistoryService} from '../maples-transaction-history.service';
import {ServeRaiseDisputeWizard} from '../../../../core/action/serve-actions/serve-raise-dispute/serve-raise-dispute-wizard';
import {WizardRunner} from '../../../../core/wizard/wizard-runner/wizard-runner.service';
import {DateFormat} from 'src/app/core/date/date-format';

@Component({
  selector: 'cca-maples-transaction-history-toolbar',
  templateUrl: './maples-transaction-history-toolbar.component.html',
  styleUrls: ['./maples-transaction-history-toolbar.component.scss']
})
export class MaplesTransactionHistoryToolbarComponent extends CcaBaseComponent implements OnInit {

  form: FormGroup                                                        = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  filterControl: FormControl                                             = new FormControl();
  dateFormat: DateFormat = DateFormat.MOMENT_DATE_ISO_FORMAT;
  dateRangeOptions: GenericOption<DateRangePreset>[] = [];
  defaultDateRange: MaplesDateRange = {
    startDate: this.dateService.formatMomentToDateStringISO(moment().subtract(30, DateService.MOMENT_DAY_UNIT)),
    endDate: this.dateService.formatMomentToDateStringISO(moment()),
  };
  statementDateRangeOptions: GenericOption<MaplesDateRange>[] = [];

  ExportType                                                     = ExportType;
  bulkActionsButtonTooltip: string                               = 'Actions';
  nSelectedTransactions: string                                  = '0';
  isAnyFilterEnabled: boolean                                    = false;
  isBulkActionsAllowed: boolean                                  = false;
  isDisputeAllowed: boolean                                      = false;
  isExportToCsvAllowed: boolean                                  = false;
  isExportToXlsxAllowed: boolean                                 = false;
  isLoadDisputeAllowed: boolean                                  = false;
  isTransactionsSelected: boolean                                = false;
  isTransactionTypeFilterEnabled: boolean                        = false;
  searching: boolean                                             = false;
  selection: Selection<any>;
  transactionTypeOptions: GenericOption<MaplesTransactionType>[] = [];

  private session: Session;

  constructor(private dateService: DateService,
              private wizardRunner: WizardRunner,
              private dateRangeService: TransactionDateRangeService,
              private exportService: ExportService,
              private localStorage: LocalStorage,
              private securityService: SecurityService,
              private store: Store<AppState>,
              private maplesTransactionService: MaplesTransactionService,
              private maplesTransactionHistoryService: MaplesTransactionHistoryService) {
    super();
  }

  ngOnInit() {
    this.buildOptions();
    this.initForm();
    this.subscribe();
    this.setDateRangeOptions();
    this.applyDateRange(this.defaultDateRange);

    this.addSubscription(
      this.filterControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value: string) => {
          if (value) {
            value = value.trim();
            value = value.toLowerCase();
          }
          if (value !== this.selection.transactionRequests.maplesLocalFilter) {
            this.selection.transactionRequests.maplesLocalFilter = value;
            this.store.dispatch(new SetSelectionTransactionSearchRequestAction(this.selection));
          }
        })
    );
    this.addSubscription(
      this.form.get('startDate').valueChanges.subscribe((value: any) => {
        if (value && this.form.get('startDate').valid) {
          this.selection.getDefaultMaplesTransactionSearchRequest().date.startDate =
            this.dateService.formatDateToDateStringISO(value);
        }
      })
    );
    this.addSubscription(
      this.form.get('endDate').valueChanges.subscribe((value: any) => {
        if (value && this.form.get('endDate').valid) {
          this.selection.getDefaultMaplesTransactionSearchRequest().date.endDate =
            this.dateService.formatDateToDateStringISO(value);
        }
      })
    );
  }

  dispute(): void {
    const wizard              = new ServeRaiseDisputeWizard();
    wizard.model.selection    = this.selection;
    wizard.model.session      = this.session;
    wizard.model.transactions = this.selection.maplesTransactions.filter((transaction: MaplesTransaction) => {
      return transaction['isSelected'];
    });

    if (wizard.model.transactions.length > 0) {
      this.wizardRunner.run(wizard);
    }
  }

  loadDispute(): void {
    const wizard               = new ServeRaiseDisputeWizard();
    wizard.model.selection     = this.selection;
    wizard.model.session       = this.session;
    wizard.model.transactions  = [];
    wizard.model.isLoadDispute = true;
    this.wizardRunner.run(wizard);
  }

  export(type: ExportType): void {
    this.addSubscription(
      this.maplesTransactionHistoryService.exportTransactions(this.selection, type).subscribe()
    );
  }

  search(): void {
    this.updateSelectionFromForm();
    this.searching = true;
    let it         = new Selection();
    this.store.dispatch(new SetSelectionMaplesTransactionsAction(it));
    this.maplesTransactionService.searchForSelection(this.selection)
      .pipe(finalize(() => this.searching = false))
      .subscribe((response: MaplesTransaction[]) => {
        this.selection.maplesTransactions = response;
        this.store.dispatch(new SetSelectionMaplesTransactionsAction(this.selection));
      });
  }

  applyDateRange(dateRange: MaplesDateRange): void {
    const request = this.selection.getDefaultMaplesTransactionSearchRequest();

    if (request && dateRange) {
      request.date = dateRange;

      this.form.get('startDate').setValue(this.dateService.buildMomentFromDateStringISO(dateRange.startDate).toDate());
      this.form.get('endDate').setValue(this.dateService.buildMomentFromDateStringISO(dateRange.endDate).toDate());

      this.search();
    }
  }

  /**
   * Manually specify the currently supported types.
   */
  private buildOptions(): void {
    this.transactionTypeOptions = [
      {
        value: MaplesTransactionType.ALL,
        displayValue: 'All',
        sortOrder: 1
      },
      {
        value: MaplesTransactionType.CASHBACK_EARNED,
        displayValue: 'Cashback Earned',
        sortOrder: 2
      },
      {
        value: MaplesTransactionType.CASHBACK_REDEEMED,
        displayValue: 'Cashback Redeemed',
        sortOrder: 3
      },
      {
        value: MaplesTransactionType.DISPUTE,
        displayValue: 'Disputed',
        sortOrder: 4
      },
      {
        value: MaplesTransactionType.FRAUD,
        displayValue: 'Fraud',
        sortOrder: 5
      },
      {
        value: MaplesTransactionType.PREAUTH,
        displayValue: 'PreAuth',
        sortOrder: 6
      }
    ];
  }

  private setFlags(): void {
    this.setExportToCsvAllowedFlag();
    this.setExportToXlsxAllowedFlag();
    this.setTransactionFilterEnabledFlag();
    this.setAnyFilterEnabledFlag();
    this.setDateRangeOptions();
    this.setDateRangeOptionsByStatement();
    this.setBulkActionsAllowedFlag();
    this.setIsTransactionsSelected();
    this.setIsDisputeAllowed();
    this.countSelectedTransactions();
  }

  private setIsTransactionsSelected(): void {
    this.isTransactionsSelected = !!this.selection.transactionRequests
      && (this.selection.transactionRequests.isSelectAllChecked
        || !!this.selection.getSelectedTransactions().length);
  }

  private setExportToCsvAllowedFlag(): void {
    this.isExportToCsvAllowed = this.securityService.hasPermission(Permission.EXPORT_CSV);
  }

  private setExportToXlsxAllowedFlag(): void {
    this.isExportToXlsxAllowed = this.securityService.hasPermission(Permission.EXPORT_XLSX);
  }

  private setTransactionFilterEnabledFlag(): void {
    this.isTransactionTypeFilterEnabled = this.selection.type === SelectionType.CUSTOMER_ACCOUNT;
  }

  private setAnyFilterEnabledFlag(): void {
    this.isAnyFilterEnabled = this.isTransactionTypeFilterEnabled;
  }

  private initForm(): void {
    this.form = new FormGroup({
      accountType: new FormControl(),
      cashierId: new FormControl(),
      endDate: new FormControl(),
      filter: this.filterControl,
      platform: new FormControl(),
      showBillableOnly: new FormControl(),
      startDate: new FormControl(),
      token: new FormControl(),
      transactionType: new FormControl()
    });
  }

  private setDateRangeOptions(): void {
    this.dateRangeOptions = this.dateRangeService.getDateRangeOptions();
  }

  private setDateRangeOptionsByStatement(): void {
    this.statementDateRangeOptions = [];

    // Sort statements in descending order.
    let recentStatements: MaplesStatement[] = [];
    if (this.selection.getCustomerAccount().statements) {
      recentStatements = this.selection.getCustomerAccount().statements.sort((a: MaplesStatement, b: MaplesStatement) => {
        if (a.endDate.getAsMilliseconds() < b.endDate.getAsMilliseconds()) {
          return 1;
        } else if (a.endDate.getAsMilliseconds() < b.endDate.getAsMilliseconds()) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    let mostRecentDate: Moment = (recentStatements.length > 0) ? moment(recentStatements[0].endDate.getAsMilliseconds()) : undefined;

    // Create date ranges for the STATEMENT_DATE_HISTORY_SIZE most recent statements in descending order.
    for (let statement of recentStatements) {
      // Only include statements within a year of the most recent statement end date.
      if (mostRecentDate.diff(moment(statement.startDate.getAsMilliseconds()), 'd') >= 366) {
        break;
      }

      let dateRange: MaplesDateRange             = new MaplesDateRange();
      dateRange.startDate                                   = this.dateService.formatMomentToDateStringISO(this.dateService.buildMomentFromDateString(statement.startDate.getDateOnly()));
      dateRange.endDate                                     = this.dateService.formatMomentToDateStringISO(this.dateService.buildMomentFromDateString(statement.endDate.getDateOnly()));
      let option: GenericOption<MaplesDateRange> = new GenericOption<MaplesDateRange>();
      option.value                                          = dateRange;
      let formattedStartDate: string                        = this.dateService.formatMomentToDateString(this.dateService.buildMomentFromDateString(statement.startDate.getDateOnly()));
      let formattedEndDate: string                          = this.dateService.formatMomentToDateString(this.dateService.buildMomentFromDateString(statement.endDate.getDateOnly()));
      option.displayValue                                   = 'Statement ' + formattedStartDate + ' to ' + formattedEndDate;
      this.statementDateRangeOptions.push(option);
    }
  }

  private setIsDisputeAllowed(): void {
    this.isDisputeAllowed     = true;
    this.isLoadDisputeAllowed = false;
    if (this.securityService.hasPermission(Permission.SERVE_RAISE_DISPUTE)) {
      this.isLoadDisputeAllowed = true;

      for (let transaction of this.selection.maplesTransactions) {
        if (transaction['isSelected']) {
          if (!transaction.alerts.isDisputable) {
            this.isDisputeAllowed = false;
            break;
          } else if (!transaction.amounts || !transaction.amounts.authorizedAmount) {
            this.isDisputeAllowed = false;
            break;
          } else if (transaction.amounts.authorizedAmount.value <= 0) {
            this.isDisputeAllowed = false;
            break;
          }
        }
      }
    }
  }

  private subscribe(): void {
    this.addSubscription(
      this.maplesTransactionHistoryService.getSelectionUpdatedSubject().subscribe((isTransactionsSelected: boolean) => {
        this.isTransactionsSelected = isTransactionsSelected;
        this.countSelectedTransactions();

        this.setIsDisputeAllowed();
      })
    );

    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.session   = state.session;
            this.selection = state.selection;

            if (this.selection.getDefaultMaplesTransactionSearchRequest()) {
              this.updateForm();

              this.localStorage.updateLocalStorageFromSelection(this.selection);
            }

            this.setFlags();

            if ((!this.selection.maplesTransactions || this.selection.maplesTransactions.length === 0)
              && this.selection.transactionRequests
              && !this.selection.transactionRequests.isInitialMaplesSearchTriggered) {
              this.selection.transactionRequests.isInitialMaplesSearchTriggered = true;
              this.store.dispatch(new SetSelectionTransactionSearchRequestAction(this.selection));
              this.search();
            }
          }
        })
    );
  }

  private updateForm(): void {
    let transactionType = this.selection.getDefaultMaplesTransactionSearchRequest().filters.accountType;

    if (this.selection.transactionRequests.maplesLocalFilter !== this.filterControl.value) {
      this.filterControl.setValue(this.selection.transactionRequests.maplesLocalFilter);
    }

    this.form.get('transactionType').setValue(transactionType);
  }

  private updateSelectionFromForm(): void {
    let query          = this.selection.getDefaultMaplesTransactionSearchRequest();
    let formValue: any = this.form.getRawValue();

    if (!query.filters) {
      query.filters = new MaplesTransactionQueryFilter();
    }
    query.filters.accountType = formValue.transactionType;
    this.store.dispatch(new SetSelectionTransactionSearchRequestAction(this.selection));
  }

  private setBulkActionsAllowedFlag(): void {
    this.isBulkActionsAllowed = this.isExportToCsvAllowed || this.isExportToXlsxAllowed;
  }

  private countSelectedTransactions(): void {
    if (this.selection.transactionRequests.isSelectAllChecked) {
      this.nSelectedTransactions = 'All';
    } else {
      let count: number = 0;
      this.selection.maplesTransactions.forEach((transaction: MaplesTransaction) => {
        if (transaction['isSelected']) {
          count++;
        }
      });
      this.nSelectedTransactions = count.toString();
    }
  }
}
