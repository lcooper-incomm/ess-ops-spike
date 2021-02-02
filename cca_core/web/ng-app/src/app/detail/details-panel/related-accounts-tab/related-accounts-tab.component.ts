import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppStateType} from "../../../app-state-type.enum";
import {SessionState} from "../../../core/session/session-state";
import {CcaBaseComponent} from "../../../core/cca-base-component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {Selection} from "../../../core/session/model/selection";
import {AccountType} from "./account-type";
import {MaplesAccount, MaplesRelatedAccount} from "@cscore/maples-client-model";
import {CustomerAccountService} from "../../../core/customer-account/customer-account.service";
import {PlatformType} from "../../../core/platform/platform-type.enum";
import {SpinnerComponent} from "../../../core/spinner/spinner.component";

@Component({
  selector: 'cca-related-accounts-tab',
  templateUrl: './related-accounts-tab.component.html',
  styleUrls: ['./related-accounts-tab.component.scss']
})
export class RelatedAccountsTabComponent extends CcaBaseComponent  {
  selection: Selection<any>;
  primary = AccountType.MASTER;
  subaccount = AccountType.SUB_ACCOUNT;
  reserve = AccountType.RESERVE;
  associated = AccountType.ASSOCIATED;
  primaryAccount: MaplesRelatedAccount | any;
  subaccounts: MaplesAccount[] = [];

  constructor ( private store: Store<AppState>,
                private customerAccountService: CustomerAccountService) {
    super ();
  }

  ngOnInit() {
    this.subscribeToSessionState ();
  }

  private checkPrimaryRelatedAccount() {
    if(this.selection.data.parentId && this.selection.data.parentId != "0") {
      this.primaryAccount = new MaplesRelatedAccount();
      this.primaryAccount.id = this.selection.data.parentId;
      this.primaryAccount.parentDisplayName = this.selection.getCustomerAccount().parentDisplayName;
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            this.checkPrimaryRelatedAccount();
          }
        } )
    );
  }

}
