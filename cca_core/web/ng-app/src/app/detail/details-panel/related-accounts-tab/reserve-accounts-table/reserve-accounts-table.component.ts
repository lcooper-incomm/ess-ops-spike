import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Store} from '@ngrx/store';
import {CsCoreTableColumn} from '@cscore/components';
import {MaplesAccount, MaplesReserveAccount} from '@cscore/maples-client-model';
import {CcaBaseComponent} from '../../../../core/cca-base-component';
import {AppStateType} from '../../../../app-state-type.enum';
import {SessionState} from '../../../../core/session/session-state';
import {Logger} from '../../../../logging/logger.service';
import {SecurityService} from '../../../../core/security/security.service';
import {AppState} from '../../../../app-state';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'cca-reserve-accounts-table',
  templateUrl: './reserve-accounts-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ReserveAccountsTableComponent extends CcaBaseComponent implements OnInit {

  accountId: string;
  @ViewChild('spinner') spinner: SpinnerComponent;
  dataSource = new MatTableDataSource<MaplesReserveAccount>();
  reserveAccountColumns: CsCoreTableColumn<MaplesReserveAccount>[] = [
    {
      key: 'accountName',
      label: 'Account Name',
      getValue: (reserveAccount: MaplesReserveAccount) => reserveAccount.name,
    },
    {
      key: 'accountId',
      label: 'Account ID',
      getValue: (reserveAccount: MaplesReserveAccount) => reserveAccount.id,
    },
    {
      key: 'balanceTotal',
      label: 'Balance Total',
      getValue: (reserveAccount: MaplesReserveAccount) => reserveAccount.amount && reserveAccount.amount.displayValue,
    }
  ];

  constructor(private customerAccountService: CustomerAccountService,
              private logger: Logger,
              private securityService: SecurityService,
              private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();
  }

  private getReserveAccounts(account: MaplesAccount): void {
    this.accountId = account.id;
    this.spinner.start();

    this.customerAccountService.findReserveAccounts(account.id, account.platform)
      .pipe(
        catchError(() => of([])),
        finalize(() => {
          this.spinner.stop();
        })
      )
      .subscribe((reserveAccounts: MaplesReserveAccount[]) => {
        this.dataSource.data = reserveAccounts;
      });
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            if (!this.accountId || this.accountId !== state.selection.getCustomerAccount().id) {
              this.getReserveAccounts(state.selection.getCustomerAccount());
            }
          }
        })
    );
  }
}
