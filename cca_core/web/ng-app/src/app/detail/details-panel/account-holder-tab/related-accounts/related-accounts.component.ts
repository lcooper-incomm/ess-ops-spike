import { Component, Input, OnInit } from '@angular/core';
import { SearchParameterValueType } from "../../../../core/search/search-type/search-parameter-value-type.enum";
import { SearchTypeContainer } from "../../../../core/search/search-type-container";
import { SearchState } from "../../../../core/search/search-state";
import { snapshot } from "../../../../core/store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";
import * as _ from "lodash";
import { SearchTypeType } from "../../../../core/search/search-type/search-type-type.enum";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Workflow } from "../../../../core/workflow/workflow.service";
import { RelatedAccount } from "../../../../core/customer/related-account";
import { SessionState } from "../../../../core/session/session-state";
import { Selection } from "../../../../core/session/model/selection";
import { CcaBaseComponent } from "../../../../core/cca-base-component";

@Component ( {
  selector: 'cca-related-accounts',
  templateUrl: './related-accounts.component.html',
  styleUrls: [ './related-accounts.component.scss' ]
} )
export class RelatedAccountsComponent extends CcaBaseComponent implements OnInit {
  @Input ()
  relatedAccounts: RelatedAccount[] = [];
  selection: Selection<any>;

  constructor ( protected store: Store<AppState>,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  public openRelatedAccount ( accountNumber: number ) {
    //Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer ();
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.ACCOUNT_NUMBER, accountNumber );
    searchTypeContainer.parameters.set ( SearchParameterValueType.PARTNER, this.selection.partner.type );

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();
  }

  private getSearchTypeContainer (): SearchTypeContainer {
    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.cloneDeep ( _.find ( searchState.searchTypeContainers, ( searchTypeContainer: SearchTypeContainer ) => {
      return searchTypeContainer.searchType.type === SearchTypeType.VMS_GPR;
    } ) );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
          }
        } )
    );
  }
}
