import { Component, OnInit, ViewChild } from '@angular/core';
import { Selection } from "../../../core/session/model/selection";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { CustomerAccountLimitService } from "../../../core/customer/customer-account-limit.service";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { CustomerAccountLimit } from "../../../core/customer/customer-account-limit";
import { debounceTime, finalize, map } from "rxjs/operators";
import { SetSelectionCustomerLimitsAction } from "../../../core/session/action/session-actions";
import { FormControl, FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-customer-limits-tab',
  templateUrl: './customer-limits-tab.component.html',
  styleUrls: [ './customer-limits-tab.component.scss' ]
} )
export class CustomerLimitsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                 = new MatTableDataSource<CustomerAccountLimit> ();
  displayedColumns: string[] = [ 'name', 'count', 'min', 'max', 'daily', 'weekly', 'monthly', 'yearly' ];
  filterControl: FormControl;
  filterForm: FormGroup      = new FormGroup ( {} );
  selection: Selection<any>;

  @ViewChild ( 'limitsSpinner' )
  spinner: SpinnerComponent;
  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private isInitialLoadTriggered: boolean = false;

  constructor ( private limitService: CustomerAccountLimitService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.initDataSource ();
    this.initForm ();
    this.subscribeToSessionState ();
    this.subscribeToFilterChanges ();
  }

  loadLimits (): void {
    this.spinner.start ();

    this.limitService.findAllByCustomerId ( this.selection.getCustomer ().id, this.selection.platform )
      .pipe (
        finalize ( () => this.spinner.stop () ),
        map ( ( limits: CustomerAccountLimit[] ) => {
          this.store.dispatch ( new SetSelectionCustomerLimitsAction ( limits ) );
        } )
      )
      .subscribe ();
  }

  private initDataSource (): void {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.filterPredicate     = ( limit: CustomerAccountLimit, filterValue: string ): boolean => {
      let dailyCountVelocity = limit.getVelocityByType ( 'DAILY_TRANSACTION_COUNT' );

      return (limit.groupName && limit.groupName.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (!limit.groupName && limit.id && limit.id.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (limit.amounts.minAmount && limit.amounts.minAmount.displayValue && limit.amounts.minAmount.displayValue.indexOf ( filterValue ) !== -1)
        || (limit.amounts.maxAmount && limit.amounts.maxAmount.displayValue && limit.amounts.maxAmount.displayValue.indexOf ( filterValue ) !== -1)
        || (limit.amounts.dailyAmount && limit.amounts.dailyAmount.displayValue && limit.amounts.dailyAmount.displayValue.indexOf ( filterValue ) !== -1)
        || (limit.amounts.weeklyAmount && limit.amounts.weeklyAmount.displayValue && limit.amounts.weeklyAmount.displayValue.indexOf ( filterValue ) !== -1)
        || (limit.amounts.monthlyAmount && limit.amounts.monthlyAmount.displayValue && limit.amounts.monthlyAmount.displayValue.indexOf ( filterValue ) !== -1)
        || (limit.amounts.yearlyAmount && limit.amounts.yearlyAmount.displayValue && limit.amounts.yearlyAmount.displayValue.indexOf ( filterValue ) !== -1)
        || (dailyCountVelocity && dailyCountVelocity.count && dailyCountVelocity.count.remaining.indexOf ( filterValue ) !== -1);
    };
    this.dataSource.sortingDataAccessor = ( limit: CustomerAccountLimit, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'name':
          let name  = limit.groupName ? limit.groupName : limit.id;
          sortValue = name ? name.toLowerCase () : null;
          break;
        case 'min':
          sortValue = limit.amounts.minAmount ? limit.amounts.minAmount.value : null;
          break;
        case 'max':
          sortValue = limit.amounts.maxAmount ? limit.amounts.maxAmount.value : null;
          break;
        case 'daily':
          sortValue = limit.amounts.dailyAmount ? limit.amounts.dailyAmount.value : null;
          break;
        case 'weekly':
          sortValue = limit.amounts.weeklyAmount ? limit.amounts.weeklyAmount.value : null;
          break;
        case 'monthly':
          sortValue = limit.amounts.monthlyAmount ? limit.amounts.monthlyAmount.value : null;
          break;
        case 'yearly':
          sortValue = limit.amounts.yearlyAmount ? limit.amounts.yearlyAmount.value : null;
          break;
        case 'count':
          let dailyCountVelocity = limit.getVelocityByType ( 'DAILY_TRANSACTION_COUNT' );
          sortValue              = (dailyCountVelocity && dailyCountVelocity.count) ? dailyCountVelocity.count.remaining : '0';
          break;
        default:
          sortValue = limit[ property ];
          break;
      }

      return sortValue;
    };
  }

  private initForm (): void {
    this.filterControl = new FormControl ( '', [] );
    this.filterForm    = new FormGroup ( {
      filter: this.filterControl
    } );
  }

  private subscribeToFilterChanges (): void {
    this.addSubscription (
      this.filterControl.valueChanges
        .pipe ( debounceTime ( 500 ) )
        .subscribe ( ( value: string ) => {
          if ( value ) {
            value = value.trim ();
            value = value.toLowerCase ();
          }
          this.dataSource.filter = value;
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;

            if ( state.selection.limits.length ) {
              this.dataSource.data = state.selection.limits;
            } else if ( !this.isInitialLoadTriggered ) {
              this.isInitialLoadTriggered = true;
              this.dataSource.data        = [];
              this.loadLimits ();
            }
          }
        } )
    );
  }

}
