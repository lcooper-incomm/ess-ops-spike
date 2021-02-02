import {Component, OnInit, ViewChild} from '@angular/core';
import {AppStateType} from "../../../app-state-type.enum";
import {SessionState} from "../../../core/session/session-state";
import {CcaBaseComponent} from "../../../core/cca-base-component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {Selection} from "../../../core/session/model/selection";
import {SpinnerComponent} from "../../../core/spinner/spinner.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MaplesAccountWithdrawal, MaplesLimitedAccount, MaplesAccountDocument} from "@cscore/maples-client-model";
import {debounceTime} from "rxjs/operators";


@Component({
  selector: 'cca-account-limits-tab',
  templateUrl: './account-limits-tab.component.html',
  styleUrls: ['./account-limits-tab.component.scss']
})
export class AccountLimitsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                 = new MatTableDataSource<MaplesLimitedAccount | MaplesAccountWithdrawal>();
  displayedColumns: string[] = ['transaction', 'frequency_code', 'count_limit', 'amount_limit', 'count_actual', 'amount_actual'];
  filterControl: FormControl;
  filterForm: FormGroup      = new FormGroup({});
  selection: Selection<any>;

  @ViewChild('limitsSpinner')
  spinner: SpinnerComponent;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.initDataSource();
    this.initForm();
    this.subscribeToSessionState();
    this.subscribeToFilterChanges();
  }

  private initDataSource(): void {
    this.sort.disableClear          = true;
    this.dataSource.paginator       = this.paginator;
    this.dataSource.sort            = this.sort;
    this.dataSource.filterPredicate = (limit: MaplesLimitedAccount | MaplesAccountWithdrawal, filterValue: string): boolean => {

      return (limit instanceof MaplesAccountWithdrawal && limit.type && limit.type.toLowerCase().indexOf(filterValue) !== -1)
        || (limit instanceof MaplesLimitedAccount && limit.transactionLimitCode && limit.transactionLimitCode.toLowerCase().indexOf(filterValue) !== -1)
        || (limit instanceof MaplesLimitedAccount && limit.frequency && limit.frequency.toLowerCase().indexOf(filterValue) !== -1)
        || (limit instanceof MaplesLimitedAccount && limit.countLimit && limit.countLimit.indexOf(filterValue) !== -1)
        || (limit instanceof MaplesLimitedAccount && limit.accountLimits && limit.accountLimits[0].accountLimit.value.toString().indexOf(filterValue) !== -1)
        || (limit instanceof MaplesLimitedAccount && limit.accountLimits && limit.accountLimits[1].accountLimit.value.toString().indexOf(filterValue) !== -1)
        || (limit instanceof MaplesAccountWithdrawal && limit.withdrawLimit && limit.withdrawLimit.value.toString().indexOf(filterValue) !== -1)
        || (limit instanceof MaplesLimitedAccount && limit.count && limit.count.indexOf(filterValue) !== -1);

    };

    this.dataSource.sortingDataAccessor = (limit: MaplesLimitedAccount | MaplesAccountWithdrawal, property: string) => {
      let sortValue: any;

      switch (property) {
        case 'transaction':
          let transaction = limit instanceof MaplesLimitedAccount? limit.transactionLimitCode : limit.type;
          sortValue       = transaction ? transaction.toLowerCase() : null;
          break;
        case 'frequency_code':
          sortValue = limit instanceof MaplesLimitedAccount ? limit.frequency ? limit.frequency : null : limit.type;
          break;
        case 'count_limit':
          sortValue = limit instanceof MaplesLimitedAccount && limit.countLimit ? limit.countLimit : 0;
          break;
        case 'amount_limit':
          sortValue =limit instanceof MaplesLimitedAccount ?  limit.accountLimits ? limit.accountLimits[0].accountLimit.value : null : limit.withdrawLimit.value;
          break;
        case 'count_actual':
          sortValue = limit instanceof MaplesLimitedAccount ? limit.count ? limit.count : null : limit.withdrawLimit.value;
          break;
        case 'amount_actual':
          sortValue = limit instanceof MaplesLimitedAccount ?  limit.accountLimits ? limit.accountLimits[1].accountLimit.value : null : limit.withdrawLimit.value;
          break;
        default:
          sortValue = limit[property];
          break;
      }

      return sortValue;
    };
  }

  private initForm(): void {
    this.filterControl = new FormControl('', []);
    this.filterForm    = new FormGroup({
      filter: this.filterControl
    });
  }

  private subscribeToFilterChanges(): void {
    this.addSubscription(
      this.filterControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((value: string) => {
          if (value) {
            value = value.trim();
            value = value.toLowerCase();
          }
          this.dataSource.filter = value;
        })
    );
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.selection = state.selection;

            if (state && state.selection && this.selection.data.limits) {
              const limitedAccounts = this.selection.data.limits.accountsLimited.map((limitedAccount: any) => new MaplesLimitedAccount(limitedAccount));
              const withdrawals     = this.selection.data.limits.withdrawal.map((withdrawal: any) => new MaplesAccountWithdrawal(withdrawal));
              this.dataSource.data  = limitedAccounts.concat(withdrawals);
            } else {
              this.dataSource.data = [];
            }
          }
        })
    );
  }

}
