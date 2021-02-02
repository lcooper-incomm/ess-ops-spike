import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/core/customer/customer';
import { AbstractSearchResultsTableComponent } from '../abstract-search-results-table/abstract-search-results-table.component';
import { AppStateType } from '../../../app-state-type.enum';
import { SearchState } from '../../../core/search/search-state';
import { Partner } from 'src/app/core/session/selection/partner';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { SearchParameterValueType } from 'src/app/core/search/search-type/search-parameter-value-type.enum';

@Component ( {
  selector: 'cca-kyc-search-results-table',
  templateUrl: './kyc-search-results-table.component.html',
  styleUrls: [ './kyc-search-results-table.component.scss' ]
} )
export class KycSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {
  data: Customer[] = [];
  partner: Partner;
  platform: PlatformType;
  textFilter: string;

  ngOnInit () {
    this.subscribeToSearchState ();
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            this.textFilter = searchState.textFilter;
            if ( searchState.selectedSearchType ) {
              this.data         = searchState.selectedSearchType.results;
              const partnerType = searchState.selectedSearchType.parameters.get ( SearchParameterValueType.PARTNER );
              this.partner      = new Partner ( { type: partnerType } );
              this.platform     = searchState.selectedSearchType.searchType.platform;
            }
          }
        }
      } )
    );
  }
}
