import { Component, OnInit } from '@angular/core';
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { AppState } from "../../../app-state";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { SearchType } from "../../../core/search/search-type/search-type";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Workflow } from "../../../core/workflow/workflow.service";
import { SearchTypeContainer } from "../../../core/search/search-type-container";
import * as _ from "lodash";
import { Partner } from "../../../core/session/selection/partner";
import { SearchParameterValueType } from "../../../core/search/search-type/search-parameter-value-type.enum";
import { SecurityService } from "../../../core/security/security.service";
import { SearchParameter } from "../../../core/search/search-type/search-parameter";
import { SearchParameterType } from "../../../core/search/search-type/search-parameter-type.enum";
import { PlatformType } from "../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-quick-search-widget',
  templateUrl: './quick-search-widget.component.html',
  styleUrls: [ './quick-search-widget.component.scss' ],
} )

export class QuickSearchWidgetComponent extends CcaBaseComponent implements OnInit {
  quickSearchForm: FormGroup;
  containers: SearchTypeContainer[];
  searchTypes: SearchType[];

  constructor ( private securityService: SecurityService,
                private store: Store<AppState>,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.initForm ();
    this.subscribeToSearchState ();
  }

  private initForm (): void {
    this.quickSearchForm = new FormGroup ( {
      quickSearchControl: new FormControl ( [], [ Validators.required ] ),
      searchTextControl: new FormControl ( [], [ Validators.required ] )
    } );
  }

  private getDefaultSearchTypeContainer (): SearchTypeContainer {
    let defaultSearchId            = this.securityService.getCurrentUser ().prefDefaultSearchTypeId;
    let defaultSearchTypeContainer = this.containers.find ( container => container.searchType.id === defaultSearchId );

    return defaultSearchTypeContainer;
  }

  private setDefaultSearchTypeParameter (): void {
    let defaultContainer = this.getDefaultSearchTypeContainer ();
    if ( defaultContainer ) {
      let defaultParameter = defaultContainer.searchType.quickSearchParameters[ 0 ]; //TODO wire this up to a user preference...
      this.quickSearchForm.get ( 'quickSearchControl' ).setValue ( defaultParameter )
    }
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState.searchTypeContainers ) {
            this.containers = _.cloneDeep ( searchState.searchTypeContainers );
            this.containers.forEach ( ( container: SearchTypeContainer ) => {
              container.searchType.quickSearchParameters.forEach ( ( searchParameter: SearchParameter ) => {
                searchParameter.parentSearchTypeContainer = _.cloneDeep ( container );
              } );
            } );
            this.setDefaultSearchTypeParameter ();
          }
        }
      } )
    );
  }

  public search (): void {
    let selectedSearchTypeParameter = <SearchParameter>this.quickSearchForm.get ( 'quickSearchControl' ).value;
    let selectedSearchTypeContainer = selectedSearchTypeParameter.parentSearchTypeContainer;

    // Set the partner, if necessary
    let partnerName: string = null;
    switch ( selectedSearchTypeContainer.searchType.platform ) {
      case PlatformType.CCL:
        partnerName = this.securityService.getCurrentUser ().prefDefaultCclPartner ? this.securityService.getCurrentUser ().prefDefaultCclPartner.type : Partner.GLOBAL;
        break;
      case PlatformType.VMS:
        partnerName = this.securityService.getCurrentUser ().prefDefaultPartner ? this.securityService.getCurrentUser ().prefDefaultPartner.type : Partner.INCOMM;
        break;
      default:
        break;
    }
    if ( partnerName ) {
      selectedSearchTypeContainer.parameters.set ( SearchParameterValueType.PARTNER, partnerName );
    }

    selectedSearchTypeContainer.parameters.set ( SearchParameterValueType.PLATFORM, selectedSearchTypeContainer.searchType.platform );

    const searchText: string = this.quickSearchForm.get ( 'searchTextControl' ).value;

    if ( selectedSearchTypeParameter.getType () === SearchParameterType.CUSTOMER_NAME ) {
      let [ firstName, lastName ] = searchText.split ( ' ' ).slice ( 0, 1 );

      selectedSearchTypeContainer.parameters.set ( SearchParameterValueType.FIRST_NAME, firstName );
      selectedSearchTypeContainer.parameters.set ( SearchParameterValueType.LAST_NAME, lastName );
    } else {
      selectedSearchTypeContainer.parameters.set ( selectedSearchTypeParameter.value, searchText );
    }

    this.workflow.forwardingSearch ( selectedSearchTypeContainer, true ).subscribe ();
  }
}
