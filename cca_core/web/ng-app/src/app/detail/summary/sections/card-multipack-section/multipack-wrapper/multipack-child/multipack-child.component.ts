import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../../../abstract-selection-aware/abstract-selection-aware.component";
import { MultiPackChild } from "../../../../../../core/card/multi-pack-child";
import { SpinnerComponent } from "../../../../../../core/spinner/spinner.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../app-state";
import { SearchParameterValueType } from "../../../../../../core/search/search-type/search-parameter-value-type.enum";
import { finalize } from "rxjs/operators";
import { SearchTypeContainer } from "../../../../../../core/search/search-type-container";
import { SearchState } from "../../../../../../core/search/search-state";
import { snapshot } from "../../../../../../core/store-utils/store-utils";
import { AppStateType } from "../../../../../../app-state-type.enum";
import { SearchTypeType } from "../../../../../../core/search/search-type/search-type-type.enum";
import { Workflow } from "../../../../../../core/workflow/workflow.service";
import * as _ from "lodash";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-multipack-child',
  templateUrl: './multipack-child.component.html',
  styleUrls: [ './multipack-child.component.scss' ]
} )
export class MultipackChildComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  @Input ()
  child: MultiPackChild;

  @ViewChild ( 'multipackChildSpinner' )
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
    searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, this.child.serialNumber );

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
