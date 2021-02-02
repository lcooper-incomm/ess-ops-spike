import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { Workflow } from "../../../../core/workflow/workflow.service";
import { SearchState } from "../../../../core/search/search-state";
import { snapshot } from "../../../../core/store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";
import { SearchTypeType } from "../../../../core/search/search-type/search-type-type.enum";
import { SearchTypeContainer } from "../../../../core/search/search-type-container";
import * as _ from "lodash";
import { SearchParameterValueType } from "../../../../core/search/search-type/search-parameter-value-type.enum";
import { finalize } from "rxjs/operators";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-card-srl-section',
  templateUrl: './card-srl-section.component.html',
  styleUrls: [ './card-srl-section.component.scss' ]
} )
export class CardSrlSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  @ViewChild ( 'srlOwnerSpinner' )
  spinner: SpinnerComponent;

  constructor ( protected store: Store<AppState>,
                private workflow: Workflow ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

  linkToMerchant (): void {
    //Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer ();
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.MERCHANT_NAME, this.selection.getCard ().srlData.productOwner );

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

}
