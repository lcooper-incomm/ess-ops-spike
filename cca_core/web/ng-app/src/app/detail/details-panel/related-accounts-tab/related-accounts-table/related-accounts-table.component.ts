import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {Store} from "@ngrx/store";
import {Workflow} from "../../../../core/workflow/workflow.service";
import {AppState} from "../../../../app-state";
import {AccountType} from "../account-type";
import {SearchTypeContainer} from "../../../../core/search/search-type-container";
import {SearchState} from "../../../../core/search/search-state";
import {snapshot} from "../../../../core/store-utils/store-utils";
import {AppStateType} from "../../../../app-state-type.enum";
import {PlatformType} from "../../../../core/platform/platform-type.enum";
import {MaplesRelatedAccount, MaplesAccount} from '@cscore/maples-client-model';
import {SearchParameterValueType} from "../../../../core/search/search-type/search-parameter-value-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {Selection} from "../../../../core/session/model/selection";
import {SpinnerComponent} from "../../../../core/spinner/spinner.component";
import {CustomerAccountService} from "../../../../core/customer-account/customer-account.service";
import {forkJoin, from, Observable, of, range} from "rxjs";
import {concatMap, finalize, flatMap, mergeMap, toArray} from "rxjs/operators";

@Component({
  selector: 'cca-related-accounts-table',
  templateUrl: './related-accounts-table.component.html',
  styleUrls: ['./related-accounts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedAccountsTableComponent  extends CcaBaseComponent {
  @Input() accounts: MaplesAccount[];
  @Input () type;
  @ViewChild ( 'accountSpinner' ) accountSpinner: SpinnerComponent;
  displayedColumns: string[] = [];
  selection: Selection<any>;

  constructor(private store: Store<AppState>,
              private workflow: Workflow,
              private customerAccountService: CustomerAccountService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();
  }

  ngOnChanges ( changes: SimpleChanges ) {
    switch ( this.type ) {
      case AccountType.SUB_ACCOUNT:
      case AccountType.ASSOCIATED:
        this.displayedColumns = [ 'accountHolder', 'accountId', 'cardNumber', 'availableBalance', 'status' ];
        break;
      case AccountType.RESERVE:
        this.displayedColumns = [ 'accountHolder', 'accountId', 'cardNumber', 'availableReserveBalance' ];
        break;
      case AccountType.MASTER:
        this.displayedColumns = [ 'accountHolder', 'accountId' ];
        break;
    }
  }

  get accountHolderLabel (): string {
    switch ( this.type ) {
      case AccountType.SUB_ACCOUNT:
        return 'Sub Account Holder';
      case AccountType.MASTER:
        return 'Master Account Holder';
      default:
        return 'Account Name';
    }
  }

  accountHolder (account: MaplesAccount): string {
    switch ( this.type ) {
      case AccountType.SUB_ACCOUNT:
        return account.customer.getDisplayName();
      case AccountType.MASTER:
        return account.parentDisplayName;
      default:
        return 'Account Holder';
    }
  }

  availableReserveBalance (account: MaplesRelatedAccount): string {
       let availableBalance = account.balance.filter((balance) => balance.type === 'AVAILABLE');
       return availableBalance &&  availableBalance[0].amount.displayValue;
  }

  availableBalance (account: MaplesAccount): string {
    let availableBalance = account.balances[0].balance.filter((balance) => balance.type === 'AVAILABLE');
    return availableBalance &&  availableBalance[0].amount.displayValue;
  }

  openAccount ( account: MaplesRelatedAccount ): void {
    this.workflow.forwardingSearch ( this.getSearchTypeContainer (account), true).subscribe ();
  }

  private getSearchTypeContainer (account: MaplesRelatedAccount): SearchTypeContainer {
    const searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    const searchTypeContainer      = _.cloneDeep ( searchState.searchTypeContainers.find ( container => container.searchType.platform === PlatformType.SERVE ) );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set(SearchParameterValueType.ACCOUNT_NUMBER, account.id);
    return searchTypeContainer;
  }

  private getSubAccountDetailInfo() {
    this.accountSpinner.start();
    let requests: Observable<any>[] = [];
    this.selection.data.subAccounts.forEach(account => requests.push(
      this.customerAccountService.findOneById(account.id, PlatformType.SERVE))
    );
    this.addSubscription(
      from(requests)
        .pipe(
          concatMap(o => o)
        ).pipe(
          toArray()
        )
        .subscribe((accounts: MaplesAccount[]) => {
          this.accounts = accounts;
          this.accountSpinner.stop();
          if (!this.changeDetectorRef['destroyed']) {
            this.changeDetectorRef.detectChanges();
          }
      })
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;

              if(this.selection.data.subAccounts && this.selection.data.subAccounts.length > 0) {
               this.getSubAccountDetailInfo();
              }
          }
        } )
    );
  }
}
