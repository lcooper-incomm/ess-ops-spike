import {Component, OnInit} from '@angular/core';
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {Selection} from "../../../../core/session/model/selection";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app-state";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {ExportType} from "../export-type.enum";
import {SecurityService} from "../../../../core/security/security.service";
import {Permission} from "../../../../core/auth/permission";
import {SelectionType} from "../../../../core/session/model/selection-type.enum";
import * as _ from "lodash";
import {FormControl, FormGroup} from "@angular/forms";
import {DateService} from "../../../../core/date/date.service";
import {TransactionDateRangeService} from "../transaction-date-range.service";
import {GenericOption} from "../../../../core/model/generic-option";
import {DateRangePreset} from "../../../../core/date/date-range-presets/date-range-preset";
import {PlatformType} from "../../../../core/platform/platform-type.enum";
import {CustomerAccountType} from "../customer-account-type.enum";
import {CustomerTransactionFilterType} from "../customer-transaction-filter-type.enum";
import {TransactionService} from "../transaction.service";
import {
  SetSelectionTransactionsAction,
  SetSelectionTransactionSearchRequestAction
} from "../../../../core/session/action/session-actions";
import {Transactions} from "../../../../core/transaction/transactions";
import {debounceTime, finalize} from "rxjs/operators";
import {LocalStorage} from "../../../../core/local-storage/local-storage.service";
import {ExportService} from "../export.service";
import {ReportTransactionFraudWizard} from 'src/app/core/action/vms-actions/report-transaction-fraud-wizard/report-transaction-fraud-wizard';
import {Customer} from 'src/app/core/customer/customer';
import {WizardRunner} from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import {RaiseDisputeWizard} from 'src/app/core/action/vms-actions/raise-dispute/raise-dispute-wizard';
import {Session} from 'src/app/core/session/model/session';
import {MaplesDateRange} from '@cscore/maples-client-model';
import {DateFormat} from 'src/app/core/date/date-format';

const accountTypeOptions: GenericOption<CustomerAccountType>[] = [
  { value: CustomerAccountType.ALL, displayValue: 'All Accounts' },
  { value: CustomerAccountType.SAVINGS, displayValue: 'Savings' },
  { value: CustomerAccountType.SPENDING, displayValue: 'Spending' }
];

const transactionFilterOptions: GenericOption<CustomerTransactionFilterType>[] = [
  { value: CustomerTransactionFilterType.ALL, displayValue: 'All Transactions', sortOrder: 100 },
  { value: CustomerTransactionFilterType.ACCOUNT_ACTIVITY, displayValue: 'Account Activity', sortOrder: 150 },
  {
    value: CustomerTransactionFilterType.IS_DISPUTABLE,
    displayValue: 'Disputable',
    sortOrder: 200
  },
  { value: CustomerTransactionFilterType.FEES, displayValue: 'Fees', sortOrder: 300 },
  {
    value: CustomerTransactionFilterType.IS_IN_DISPUTE,
    displayValue: 'In Dispute',
    sortOrder: 400
  },
  {
    value: CustomerTransactionFilterType.ALL_FINANCIAL,
    displayValue: 'All Financial',
    sortOrder: 500
  },
  { value: CustomerTransactionFilterType.ACH, displayValue: '-- ACH', sortOrder: 501 },
  { value: CustomerTransactionFilterType.ADMIN, displayValue: '-- Admin', sortOrder: 502 },
  { value: CustomerTransactionFilterType.DECLINED, displayValue: '-- Declined', sortOrder: 503 },
  {
    value: CustomerTransactionFilterType.HOLDS,
    displayValue: '-- Pending Pre-Auth',
    sortOrder: 504
  },
  { value: CustomerTransactionFilterType.POSTED, displayValue: '-- Posted', sortOrder: 505 },
  { value: CustomerTransactionFilterType.PRE_AUTH, displayValue: '-- Pre-Auth', sortOrder: 506 },
  { value: CustomerTransactionFilterType.SETTLED, displayValue: '-- Settled', sortOrder: 507 },
];

@Component ( {
  selector: 'cca-transaction-history-toolbar',
  templateUrl: './transaction-history-toolbar.component.html',
  styleUrls: [ './transaction-history-toolbar.component.scss' ]
} )
export class TransactionHistoryToolbarComponent extends CcaBaseComponent implements OnInit {

  accountTypeOptions: GenericOption<CustomerAccountType>[]               = accountTypeOptions;
  bulkActionsButtonTooltip: string;
  dateFormat: DateFormat                                                 = DateFormat.MOMENT_DATE_FORMAT;
  dateRangeOptions: GenericOption<DateRangePreset>[]                     = [];
  defaultDateRange: MaplesDateRange;
  ExportType                                                             = ExportType;
  filterControl: FormControl                                             = new FormControl ();
  form: FormGroup                                                        = new FormGroup ( {
    startDate: new FormControl (),
    endDate: new FormControl ()
  } );
  isAccountTypeFilterEnabled: boolean                                    = false;
  isAnyFilterEnabled: boolean                                                  = false;
  isBulkActionsAllowed: boolean                                                = false;
  isCashierIdFilterEnabled: boolean                                            = false;
  isExportToCsvAllowed: boolean                                                = false;
  isExportToPdfAllowed: boolean                                                = false;
  isExportToXlsxAllowed: boolean                                               = false;
  isRaiseDisputeAllowed: boolean                                               = false;
  isReportAsFraudAllowed: boolean                                              = false;
  isShowBillableOnlyAllowed: boolean                                           = false;
  isTokenFilterEnabled: boolean                                                = false;
  isTransactionTypeFilterEnabled: boolean                                      = false;
  isTransactionsSelected: boolean                                              = false;
  platformOptions: GenericOption<PlatformType>[]                               = [];
  raiseDisputeDisabledReason: string;
  reportAsFraudDisabledReason: string;
  searching: boolean                                                           = false;
  selection: Selection<any>;
  transactionTypeOptions: GenericOption<CustomerTransactionFilterType>[]       = transactionFilterOptions;

  private allTransactionsNotAllowed: string = 'Not allowed when all transactions selected';
  private session: Session;

  constructor ( private dateService: DateService,
                private dateRangeService: TransactionDateRangeService,
                private exportService: ExportService,
                private localStorage: LocalStorage,
                private securityService: SecurityService,
                private store: Store<AppState>,
                private transactionService: TransactionService,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.initForm ();
    this.subscribeToSessionState ();

    this.addSubscription (
      this.filterControl.valueChanges
        .pipe ( debounceTime ( 300 ) )
        .subscribe ( ( value: string ) => {
          if ( value ) {
            value = value.trim ();
            value = value.toLowerCase ();
          }
          if ( value !== this.selection.getDefaultTransactionSearchRequest ().localFilter ) {
            this.selection.getDefaultTransactionSearchRequest ().localFilter = value;
            this.store.dispatch ( new SetSelectionTransactionSearchRequestAction ( this.selection ) );
          }
        } )
    );
  }

  applyDateRange ( dateRange: MaplesDateRange ): void {
    let request = this.selection.getDefaultTransactionSearchRequest ();

    request.startDate = dateRange.startDate;
    request.endDate = dateRange.endDate;

    this.form.get ( 'startDate' ).setValue ( this.dateService.buildMomentFromDateString ( request.startDate ).toDate () );
    this.form.get ( 'endDate' ).setValue ( this.dateService.buildMomentFromDateString ( request.endDate ).toDate () );

    this.search ();
  }

  export ( type: ExportType ): void {
    this.exportService.exportForSelection ( this.selection, type );
    this.transactionService.clearSelectedTransactionsForSelection ( this.selection );
  }

  openRaiseDispute (): void {
    const wizard              = new RaiseDisputeWizard ();
    wizard.model.selection    = this.selection as Selection<Customer>;
    wizard.model.session      = this.session;
    wizard.model.transactions = this.selection.getSelectedTransactions ();
    this.wizardRunner.run ( wizard );
  }

  openReportAsFraud (): void {
    const wizard              = new ReportTransactionFraudWizard ();
    wizard.model.selection    = this.selection as Selection<Customer>;
    wizard.model.transactions = this.selection.getSelectedTransactions ();
    this.wizardRunner.run ( wizard );
  }

  search (): void {
    this.searching = true;
    this.updateSelectionFromForm ();
    this.transactionService.searchForSelection ( this.selection )
      .pipe ( finalize ( () => this.searching = false ) )
      .subscribe ( ( response: Transactions ) => {
        this.selection.transactions = response;
        this.store.dispatch ( new SetSelectionTransactionsAction ( this.selection ) );
      } );
  }

  private initDate ( value: string ): Date {
    if ( value ) {
      let dateMoment = this.dateService.buildMomentFromDateString ( value );
      return dateMoment.toDate ();
    }
    return null;
  }

  private initForm (): void {
    this.form = new FormGroup ( {
      accountType: new FormControl (),
      cashierId: new FormControl (),
      endDate: new FormControl (),
      filter: this.filterControl,
      platform: new FormControl (),
      showBillableOnly: new FormControl (),
      startDate: new FormControl (),
      token: new FormControl (),
      transactionType: new FormControl ()
    } );
  }

  private setAccountFilterEnabledFlag (): void {
    this.isAccountTypeFilterEnabled = this.selection.type === SelectionType.CUSTOMER;
  }

  private setAnyFilterEnabledFlag (): void {
    this.isAnyFilterEnabled = this.isAccountTypeFilterEnabled
      || this.isShowBillableOnlyAllowed
      || this.isCashierIdFilterEnabled
      || this.platformOptions.length > 1
      || this.isTokenFilterEnabled
      || this.isTransactionTypeFilterEnabled;
  }

  private setBulkActionsAllowedFlag (): void {
    this.isBulkActionsAllowed = this.isExportToCsvAllowed
      || this.isExportToPdfAllowed
      || this.isExportToXlsxAllowed
      || this.isRaiseDisputeAllowed
      || this.isReportAsFraudAllowed;
  }

  private setBulkActionsTooltip (): void {
    if ( !this.isBulkActionsAllowed ) {
      this.bulkActionsButtonTooltip = 'No Bulk Actions Available';
    } else if ( !this.isTransactionsSelected ) {
      this.bulkActionsButtonTooltip = 'No Transactions Selected';
    } else {
      let transactionsCount         = this.selection.transactionRequests.isSelectAllChecked ? 'All' : this.selection.getSelectedTransactions ().length;
      this.bulkActionsButtonTooltip = `Bulk Actions (${transactionsCount})`;
    }
  }

  private setCashierIdFilterEnabledFlag (): void {
    this.isCashierIdFilterEnabled = this.selection.platform === PlatformType.CCL;
  }

  private setDateRangeOptions (): void {
    this.dateRangeOptions = this.dateRangeService.getDateRangeOptionsForSelection ( this.selection );
  }

  private setExportToCsvAllowedFlag (): void {
    this.isExportToCsvAllowed = _.includes([SelectionType.CUSTOMER, SelectionType.CARD], this.selection.type)
      || (this.selection.type === SelectionType.LOCATION && this.securityService.hasPermission ( Permission.VIEW_UNMASKED_LOCATION_HISTORY ));
  }

  private setExportToPdfAllowedFlag (): void {
    this.isExportToPdfAllowed = this.selection.type === SelectionType.CARD
      || (this.selection.type === SelectionType.LOCATION && this.securityService.hasPermission ( Permission.VIEW_UNMASKED_LOCATION_HISTORY ));
  }

  private setExportToXlsxAllowedFlag (): void {
    this.isExportToXlsxAllowed = this.selection.type === SelectionType.CARD
      || (this.selection.type === SelectionType.LOCATION && this.securityService.hasPermission ( Permission.VIEW_UNMASKED_LOCATION_HISTORY ));
  }

  private setFlags (): void {
    this.setExportToCsvAllowedFlag ();
    this.setExportToPdfAllowedFlag ();
    this.setExportToXlsxAllowedFlag ();
    this.setRaiseDisputeAllowedFlag ();
    this.setRaiseDisputeDisabledReason ();
    this.setReportAsFraudAllowedFlag ();
    this.setReportAsFraudDisabledReason ();
    this.setBulkActionsAllowedFlag ();
    this.setAccountFilterEnabledFlag ();
    this.setCashierIdFilterEnabledFlag ();
    this.setTokenFilterEnabledFlag ();
    this.setTransactionFilterEnabledFlag ();
    this.setShowBillableOnlyAllowedFlag ();
    this.setIsTransactionsSelected ();
    this.setBulkActionsTooltip ();
    this.setDateRangeOptions ();
    this.setPlatformOptions ();
    this.setAnyFilterEnabledFlag ();
  }

  private setIsTransactionsSelected (): void {
    this.isTransactionsSelected = !!this.selection.transactionRequests
      && (this.selection.transactionRequests.isSelectAllChecked
        || !!this.selection.getSelectedTransactions ().length);
  }

  private setPlatformOptions (): void {
    let options: GenericOption<PlatformType>[] = [];

    switch ( this.selection.type ) {
      case SelectionType.CARD:
        if ( this.selection.getCard () && this.selection.getCard ().isInCommSupportedProduct () ) {
          options.push ( { value: PlatformType.INCOMM, displayValue: 'InComm' } );
        }
        switch ( this.selection.platform ) {
          case PlatformType.GREENCARD:
            options.push ( { value: PlatformType.GREENCARD, displayValue: 'GreenCard' } );
            break;
          default:
            break;
        }
        break;
      case SelectionType.CUSTOMER:
        switch ( this.selection.platform ) {
          case PlatformType.CCL:
            options.push ( { value: PlatformType.CCL, displayValue: 'CCL' } );
            break;
          case PlatformType.VMS:
            options.push ( { value: PlatformType.VMS, displayValue: 'VMS' } );
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    this.platformOptions = options;
  }

  private setRaiseDisputeAllowedFlag (): void {
    switch ( this.selection.type ) {
      case SelectionType.CUSTOMER:
        this.isRaiseDisputeAllowed = this.selection.getDefaultTransactionSearchRequest ()
          && this.selection.getDefaultTransactionSearchRequest ().transactionFilter === 'isDisputable'
          && this.securityService.hasPermission ( Permission.VMS_RAISE_DISPUTE );
        break;
      case SelectionType.CARD:
        this.isRaiseDisputeAllowed = this.selection.platform === PlatformType.GREENCARD
          && this.securityService.hasPermission ( Permission.GC_RAISE_DISPUTE );
        break;
      default:
        break;
    }
  }

  private setRaiseDisputeDisabledReason (): void {
    const disabled                  = this.selection.transactionRequests && this.selection.transactionRequests.isSelectAllChecked;
    this.raiseDisputeDisabledReason = disabled ? this.allTransactionsNotAllowed : null;

  }

  private setReportAsFraudAllowedFlag (): void {
    this.isReportAsFraudAllowed = this.selection.type === SelectionType.CUSTOMER
      && this.securityService.hasPermission ( Permission.VMS_REPORT_TRANSACTION_AS_FRAUD );
  }

  private setReportAsFraudDisabledReason (): void {
    const disabled                   = this.selection.transactionRequests && this.selection.transactionRequests.isSelectAllChecked;
    this.reportAsFraudDisabledReason = disabled ? this.allTransactionsNotAllowed : null;
  }

  private setShowBillableOnlyAllowedFlag (): void {
    let isShowBillableOnlyAllowed = false;

    switch ( this.selection.type ) {
      case SelectionType.LOCATION:
        isShowBillableOnlyAllowed = true;
        break;
      case SelectionType.CARD:
        isShowBillableOnlyAllowed = this.selection.getCard () && _.includes ( [ PlatformType.INCOMM, PlatformType.GREENCARD ], this.selection.getCard ().platform );
        break;
      default:
        break;
    }

    this.isShowBillableOnlyAllowed = isShowBillableOnlyAllowed;
  }

  private setTokenFilterEnabledFlag (): void {
    this.isTokenFilterEnabled = this.selection.platform === PlatformType.VMS;
  }

  private setTransactionFilterEnabledFlag (): void {
    this.isTransactionTypeFilterEnabled = this.selection.type === SelectionType.CUSTOMER;
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.session   = state.session;
            this.selection = state.selection;
            if ( this.selection.getDefaultTransactionSearchRequest () ) {
              this.defaultDateRange = this.dateRangeService.getDefaultDateRangeForSelection(this.selection);
              this.updateForm ();
            }
            this.setFlags ();

            if ( this.selection.getDefaultTransactionSearchRequest () ) {
              this.localStorage.updateLocalStorageFromSelection ( this.selection );
            }

            if ( !this.selection.transactions && this.selection.transactionRequests && !this.selection.transactionRequests.isInitialSearchTriggered ) {
              this.selection.transactionRequests.isInitialSearchTriggered = true;
              this.store.dispatch ( new SetSelectionTransactionSearchRequestAction ( this.selection ) );
              this.search ();
            }
          }
        } )
    );
  }

  private updateForm (): void {
    let startDate: Date  = this.initDate ( this.selection.getDefaultTransactionSearchRequest ().startDate );
    let endDate: Date    = this.initDate ( this.selection.getDefaultTransactionSearchRequest ().endDate );
    let showBillableOnly = this.selection.getDefaultTransactionSearchRequest ().isBillable;
    let platform         = this.selection.getDefaultTransactionSearchRequest ().platform ? this.selection.getDefaultTransactionSearchRequest ().platform : this.selection.platform;
    let cashierId        = this.selection.getDefaultTransactionSearchRequest ().cashierId;
    let accountType      = this.selection.getDefaultTransactionSearchRequest ().accountType;
    let transactionType  = this.selection.getDefaultTransactionSearchRequest ().transactionFilter;
    let token            = this.selection.getDefaultTransactionSearchRequest ().token;
    let localFilter      = this.selection.getDefaultTransactionSearchRequest ().localFilter;

    //Check if the value changed before setting it, because we're subscribed to changes on the filterControl
    if ( localFilter !== this.filterControl.value ) {
      this.filterControl.setValue ( localFilter );
    }
    this.form.get ( 'accountType' ).setValue ( accountType );
    this.form.get ( 'cashierId' ).setValue ( cashierId );
    this.form.get ( 'endDate' ).setValue ( endDate );
    this.form.get ( 'platform' ).setValue ( platform );
    this.form.get ( 'showBillableOnly' ).setValue ( showBillableOnly );
    this.form.get ( 'startDate' ).setValue ( startDate );
    this.form.get ( 'token' ).setValue ( token );
    this.form.get ( 'transactionType' ).setValue ( transactionType );

    if ( !this.selection
      || this.selection.type !== SelectionType.CUSTOMER
      || !this.selection.getCustomer ()
      || !this.selection.getCustomer ().tokens.length ) {
      this.form.get ( 'token' ).disable ();
    }
  }

  private updateSelectionFromForm (): void {
    let request        = this.selection.getDefaultTransactionSearchRequest ();
    let formValue: any = this.form.getRawValue ();

    request.startDate         = this.dateService.formatDateToDateString ( formValue.startDate );
    request.endDate           = this.dateService.formatDateToDateString ( formValue.endDate );
    request.platform          = formValue.platform;
    request.isBillable        = !!formValue.showBillableOnly;
    request.cashierId         = formValue.cashierId;
    request.accountType       = formValue.accountType;
    request.token             = formValue.token;
    request.transactionFilter = formValue.transactionType;

    this.store.dispatch ( new SetSelectionTransactionSearchRequestAction ( this.selection ) );
  }
}
