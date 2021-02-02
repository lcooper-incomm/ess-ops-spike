import { Component, OnInit, ViewChild } from '@angular/core';
import { Action, ActionsSubject, Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { CcaBaseComponent } from "../core/cca-base-component";
import { AppStateType } from "../app-state-type.enum";
import { SearchTypeContainer } from "../core/search/search-type-container";
import { SearchState } from "../core/search/search-state";
import { CardPanelComponent } from "../core/panel/card-panel/card-panel.component";
import { SearchActionType } from "../core/search/action/search-action-type.enum";

@Component ( {
  selector: 'cca-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
} )
export class SearchComponent extends CcaBaseComponent implements OnInit {

  selectedSearchTypeContainer: SearchTypeContainer;

  @ViewChild ( 'parametersCard' )
  parametersCard: CardPanelComponent;
  @ViewChild ( 'resultsCard' )
  resultsCard: CardPanelComponent;

  constructor ( private actions$: ActionsSubject,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSearchActions ();
    this.subscribeToSearchState ();
  }

  private subscribeToSearchActions (): void {
    this.addSubscription (
      this.actions$.subscribe ( {
        next: ( action: Action ) => {
          if ( action.type === SearchActionType.SET_SEARCH_RESULTS ) {
            this.parametersCard.isCollapsed = true;
            this.resultsCard.isCollapsed    = false;
          } else if ( action.type === SearchActionType.SELECT_SEARCH_TYPE ) {
            this.parametersCard.isCollapsed = false;
            this.resultsCard.isCollapsed    = false;
          }
        }
      } )
    );
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            this.selectedSearchTypeContainer = searchState.selectedSearchType;
          }
        }
      } )
    );
  }
}
