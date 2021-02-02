import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MultiPack } from "../../../../../core/card/multi-pack";
import { SpinnerComponent } from "../../../../../core/spinner/spinner.component";
import { AbstractSelectionAwareComponent } from "../../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { SearchTypeContainer } from "../../../../../core/search/search-type-container";
import { SearchState } from "../../../../../core/search/search-state";
import { snapshot } from "../../../../../core/store-utils/store-utils";
import { AppStateType } from "../../../../../app-state-type.enum";
import { SearchTypeType } from "../../../../../core/search/search-type/search-type-type.enum";
import * as _ from "lodash";
import { Workflow } from "../../../../../core/workflow/workflow.service";
import { SearchParameterValueType } from "../../../../../core/search/search-type/search-parameter-value-type.enum";
import { finalize } from "rxjs/operators";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-multipack-wrapper',
  templateUrl: './multipack-wrapper.component.html',
  styleUrls: [ './multipack-wrapper.component.scss' ]
} )
export class MultipackWrapperComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  @Input ()
  multipack: MultiPack;

  @ViewChild ( 'multipackWrapperSpinner' )
  spinner: SpinnerComponent;

  constructor ( protected store: Store<AppState>,
                private workflow: Workflow ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

  linkToCard (): void {
    //Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer ();
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, this.multipack.serialNumber );

    this.spinner.start ();
    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .pipe ( finalize ( () => this.spinner.stop () ) )
      .subscribe ();
  }

  private getSearchTypeContainer (): SearchTypeContainer {
    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.cloneDeep ( _.find ( searchState.searchTypeContainers, ( searchTypeContainer: SearchTypeContainer ) => {
      return searchTypeContainer.searchType.type === SearchTypeType.FINANCIAL_GIFT;
    } ) );
  }

}
