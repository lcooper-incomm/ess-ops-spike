import { Component } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { Selection } from "../../../core/session/model/selection";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { RelatedAccount } from "../../../core/customer/related-account";
import { SelectionType } from '../../../core/session/model/selection-type.enum';

@Component ( {
  selector: 'cca-account-holder-tab',
  templateUrl: './account-holder-tab.component.html',
  styleUrls: [ './account-holder-tab.component.scss' ]
} )
export class AccountHolderTabComponent extends CcaBaseComponent {

  PlatformType                      = PlatformType;
  SelectionType                     = SelectionType;
  selection: Selection<any>;
  relatedAccounts: RelatedAccount[] = [];

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  get isServePlatform (): boolean {
    return this.selection && this.selection.platform === PlatformType.SERVE;
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            if ( this.selection.getCustomer() && this.selection.getCustomer ().relatedAccounts ) {
              this.relatedAccounts = this.selection.getCustomer ().relatedAccounts
            }
          }
        } )
    );
  }
}
