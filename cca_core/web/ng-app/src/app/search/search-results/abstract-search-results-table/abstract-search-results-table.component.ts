import { Component } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { Workflow } from "../../../core/workflow/workflow.service";
import { SearchState } from "../../../core/search/search-state";
import { snapshot } from "../../../core/store-utils/store-utils";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchTypeContainer } from "../../../core/search/search-type-container";
import { switchMap, filter } from "rxjs/operators";
import { SearchResultType } from 'src/app/core/search/search.service';
import { SelectionDataType } from 'src/app/core/session/model/selection';
import { CustomerVerificationService } from './customer-verification/customer-verification.service';

@Component ( {
  selector: 'cca-abstract-search-results-table',
  template: ''
} )
export class AbstractSearchResultsTableComponent extends CcaBaseComponent {

  constructor (
    protected customerVerificationService: CustomerVerificationService,
    protected store: Store<AppState>,
    protected workflow: Workflow,
  ) {
    super ();
  }

  /**
   * @param result
   */
  selectResult ( result: SearchResultType ): void {
    let searchState: SearchState                 = snapshot ( this.store, AppStateType.SEARCH_STATE );
    let searchTypeContainer: SearchTypeContainer = searchState.selectedSearchType;

    this.addSubscription (
      this.customerVerificationService.verifyCustomerForSearchResult ( result, searchTypeContainer )
        .pipe (
          filter ( isVerified => isVerified ),
          switchMap ( () => this.workflow.selectSearchResult ( searchTypeContainer, result as SelectionDataType ) )
        )
        .subscribe ()
    );
  }
}
