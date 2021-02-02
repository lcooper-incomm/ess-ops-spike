import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { SearchTypeContainer } from "../../../core/search/search-type-container";
import { SearchParameterType } from "../../../core/search/search-type/search-parameter-type.enum";
import { SearchParameter } from "../../../core/search/search-type/search-parameter";
import * as _ from "lodash";
import { SearchParameterValueType } from "../../../core/search/search-type/search-parameter-value-type.enum";
import { IdentificationTypeUtil } from "../../../core/form/identification-field/identification-type-util";

@Component ( {
  selector: 'cca-search-result-summary',
  templateUrl: './search-result-summary.component.html',
  styleUrls: [ './search-result-summary.component.scss' ]
} )
export class SearchResultSummaryComponent extends CcaBaseComponent implements OnInit {

  summary: string;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSearchState ();
  }

  private generateSummary ( searchTypeContainer: SearchTypeContainer ): void {
    if ( searchTypeContainer ) {
      const excludedParameters: SearchParameterType[] = [
        SearchParameterType.RECENT_ACTIVITY
      ];

      let summarizedParameters: string[] = [];

      //Go through all the search type's parameters, and if a value is found, add it to the summary
      searchTypeContainer.searchType.getAllParameters ().forEach ( ( parameter: SearchParameter ) => {
        if ( !_.includes ( excludedParameters, parameter.type ) ) {
          //Handle Identification as special case
          if ( parameter.type === SearchParameterType.IDENTIFICATION ) {
            let identificationType   = searchTypeContainer.parameters.get ( SearchParameterValueType.IDENTIFICATION_TYPE );
            let identificationNumber = searchTypeContainer.parameters.get ( SearchParameterValueType.IDENTIFICATION_NUMBER );
            if ( !!identificationType && !!identificationNumber ) {
              let formattedIdentificationType = IdentificationTypeUtil.getDisplayValue ( identificationType );
              summarizedParameters.push ( `${formattedIdentificationType}: ${identificationNumber}` );
            }
          } else {
            let value = searchTypeContainer.parameters.get ( parameter.value );
            if ( !!value ) {
              summarizedParameters.push ( `${parameter.name}: "${value}"` );
            }
          }
        }
      } );

      /*
      Since the GREENCARD_EPAN is used under-the-covers, and we don't want it included in the database configuration,
      check for it manually and append it to the summary
       */
      if ( searchTypeContainer.parameters.get ( SearchParameterValueType.GREENCARD_EPAN ) ) {
        summarizedParameters.push ( 'Replacement PAN' );
      }

      let preparedSummary = summarizedParameters.join ( ', ' );
      let resultsString   = searchTypeContainer.results.length === 1 ? 'Result' : 'Results';
      this.summary        = `${searchTypeContainer.results.length} ${resultsString} for ${preparedSummary}`;
    } else {
      this.summary = null;
    }
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            this.generateSummary ( searchState.selectedSearchType );
          }
        }
      } )
    );
  }

}
