import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { Workflow } from "../../../../core/workflow/workflow.service";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { SearchParameterValueType } from "../../../../core/search/search-type/search-parameter-value-type.enum";
import { finalize } from "rxjs/operators";
import { SearchTypeContainer } from "../../../../core/search/search-type-container";
import { SearchState } from "../../../../core/search/search-state";
import { snapshot } from "../../../../core/store-utils/store-utils";
import { SearchTypeType } from "../../../../core/search/search-type/search-type-type.enum";
import * as _ from "lodash";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-card-product-owner-section',
  templateUrl: './card-product-owner-section.component.html',
  styleUrls: [ './card-product-owner-section.component.scss' ]
} )
export class CardProductOwnerSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  productOwner: string;

  @ViewChild ( 'productOwnerSpinner' )
  spinner: SpinnerComponent;

  constructor ( protected store: Store<AppState>,
                private workflow: Workflow ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  linkToMerchant (): void {
    //Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer ();
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.MERCHANT_NAME, this.productOwner );

    this.spinner.start ();
    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .pipe ( finalize ( () => this.spinner.stop () ) )
      .subscribe ();
  }

  private getSearchTypeContainer (): SearchTypeContainer {
    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.cloneDeep ( _.find ( searchState.searchTypeContainers, ( searchTypeContainer: SearchTypeContainer ) => {
      return searchTypeContainer.searchType.type === SearchTypeType.LOCATION;
    } ) );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection && state.selection.getCard () ) {
            this.productOwner = state.selection.getCard ().productOwner;
          }
        } )
    );
  }
}
