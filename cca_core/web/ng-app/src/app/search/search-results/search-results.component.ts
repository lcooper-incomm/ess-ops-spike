import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Action, ActionsSubject, Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { CcaBaseComponent } from "../../core/cca-base-component";
import { AppStateType } from "../../app-state-type.enum";
import { SearchState } from "../../core/search/search-state";
import { SearchTypeType } from "../../core/search/search-type/search-type-type.enum";
import { SetTextFilterAction } from "../../core/search/action/set-text-filter-action";
import { SearchActionType } from "../../core/search/action/search-action-type.enum";
import {SearchParameterValueType} from "../../core/search/search-type/search-parameter-value-type.enum";
import {AlderSearchType} from "../../core/order/alder-search-type.enum";

@Component ( {
  selector: 'cca-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: [ './search-results.component.scss' ]
} )
export class SearchResultsComponent extends CcaBaseComponent implements OnInit {

  filterForm: FormGroup;
  searchType: SearchTypeType;
  SearchTypeType = SearchTypeType;
  subSearchType: AlderSearchType;
  AlderSearchtype = AlderSearchType;

  constructor ( private actionsSubject: ActionsSubject,
                private store: Store<AppState> ) {
    super ();
    this.filterForm = new FormGroup ( {
      filter: new FormControl ( null, [] )
    } );
  }

  ngOnInit () {
    this.subscribeToFilterFormChanges ();
    this.subscribeToSearchState ();
  }

  private subscribeToFilterFormChanges (): void {
    this.addSubscription (
      this.filterForm.valueChanges.subscribe ( {
        next: value => {
          this.store.dispatch ( new SetTextFilterAction ( value.filter ) );
        }
      } )
    );
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState && searchState.selectedSearchType ) {
            this.searchType = searchState.selectedSearchType.searchType.type;
            this.subSearchType =  searchState.selectedSearchType.parameters.get(SearchParameterValueType.ALDER_SEARCH_TYPE);
          }
        }
      } )
    );
    this.addSubscription (
      this.actionsSubject.subscribe ( ( action: Action ) => {
        if ( action.type === SearchActionType.SET_SEARCH_RESULTS ) {
          this.filterForm.reset ();
        }
      } )
    )
  }

}
