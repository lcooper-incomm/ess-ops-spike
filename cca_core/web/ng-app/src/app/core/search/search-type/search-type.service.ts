import { Injectable } from '@angular/core';
import { SearchType } from "./search-type";
import { Observable, combineLatest } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map, filter, takeWhile, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { snapshot } from "../../store-utils/store-utils";
import { AppStateType } from "../../../app-state-type.enum";
import * as _ from "lodash";
import { SecurityService } from "../../security/security.service";
import { SearchTypeCategory } from "./search-type-category";
import { SearchState } from "../search-state";
import { User } from "../../user/user";
import { SelectSearchTypeAction } from "../action/select-search-type-action";
import { RoutingService } from "../../routing/routing.service";
import { SearchTypeType } from "./search-type-type.enum";
import { UrlQueryParam } from "../../routing/url-query-param.enum";
import { RoutePath } from "../../routing/route-path.enum";
import { Logger } from "../../../logging/logger.service";
import { SearchTypeContainer } from "../search-type-container";
import { PlatformType } from "../../platform/platform-type.enum";
import { SupportState } from "../../support/support-state";
import { Partner } from '../../session/selection/partner';

let build = map ( value => new SearchType ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: SearchType[] = [];
  values.forEach ( value => results.push ( new SearchType ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class SearchTypeService {

  constructor ( private http: HttpClient,
                private logger: Logger,
                private routingService: RoutingService,
                private securityService: SecurityService,
                private store: Store<AppState> ) {
  }

  findAll (): Observable<SearchType[]> {
    return this.http.get ( '/rest/search-type' )
      .pipe ( buildAll );
  }

  getAllPermitted (): SearchType[] {
    const searchState: SearchState   = snapshot ( this.store, AppStateType.SEARCH_STATE );
    const supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    const user                       = this.securityService.getCurrentUser ();

    return searchState.searchTypes.filter ( searchType => this.isPermitted ( searchType, supportState.partners, user ) );
  }

  getAllPermittedCategories (): Observable<SearchTypeCategory[]> {
    return combineLatest (
      this.getPartners (),
      this.getSearchTypes (),
      this.securityService.getCurrentUserAsync (),
    ).pipe (
      map ( ( [ partners, searchTypes, user ] ) => {
        const permittedSearchTypes = searchTypes.filter ( searchType => this.isPermitted ( searchType, partners, user ) );
        return this.buildSearchTypeCategories ( permittedSearchTypes );
      } )
    )
  }

  getCachedSearchTypeByType ( type: SearchTypeType ): SearchTypeContainer {
    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.find ( searchState.searchTypeContainers, function ( container: SearchTypeContainer ) {
      return container.searchType.type === type;
    } );
  }

  /**
   * Set the default Search Type following a particular hierarchy of preferred sources.
   */
  setDefaultSearchType ( searchTypes: SearchType[] ): void {
    let defaultSearchType: SearchType = this.getDefaultSearchTypeFromUrl ();
    if ( !defaultSearchType ) {
      defaultSearchType = this.getDefaultSearchTypeFromUserPreference ();
    }
    if ( !defaultSearchType ) {
      defaultSearchType = this.getDefaultSearchTypeFromBusinessRuleDefault ();
    }
    if ( !defaultSearchType ) {
      defaultSearchType = this.getDefaultSearchTypeFromFirstAvailable ();
    }

    if ( defaultSearchType ) {
      this.store.dispatch ( new SelectSearchTypeAction ( defaultSearchType.type ) );
    } else {
      this.logger.error ( 'Failed to load default Search Type!' );
    }
  }

  /**
   * Navigate to the search page and select the given Search Type.
   */
  setSearchType ( type: SearchTypeType ): void {
    let params                                 = {};
    params[ UrlQueryParam.SEARCH_SEARCH_TYPE ] = type;

    let searchType = this.getSearchTypeByType ( type );
    if ( searchType ) {
      this.logger.info ( 'Selected Search Type', type );
      this.store.dispatch ( new SelectSearchTypeAction ( type ) );
      this.routingService.navigateTo ( RoutePath.SEARCH, params );
    } else {
      this.logger.error ( 'Failed to find Search Type with given type', type );
    }
  }

  // Map search types into categories
  private buildSearchTypeCategories ( searchTypes: SearchType[] ): SearchTypeCategory[] {
    const searchTypesByCategoryId = _.groupBy ( searchTypes, searchType => searchType.category.id );
    return Object.keys ( searchTypesByCategoryId ).map ( categoryId => {
      const searchTypes    = searchTypesByCategoryId[ categoryId ];
      const category       = searchTypes[ 0 ].category;
      category.searchTypes = searchTypes;
      return category;
    } );
  }

  private getSearchTypeByType ( type: SearchTypeType ): SearchType {
    let searchTypes: SearchType[] = this.getAllPermitted ();
    return _.find ( searchTypes, function ( searchType: SearchType ) {
      return searchType.type === type;
    } );
  }

  /**
   * Attempt to load the FASTCARD_FASTPIN Search Type, if the User has Permission to it.
   */
  private getDefaultSearchTypeFromBusinessRuleDefault (): SearchType {
    let searchType = this.getSearchTypeByType ( SearchTypeType.FASTCARD_FASTPIN );

    if ( searchType ) {
      this.logger.info ( 'Loaded ' + SearchTypeType.FASTCARD_FASTPIN + ' Search Type as fallback default', searchType );
    }

    return searchType;
  }

  /**
   * Attempt to load the first available Search Type from all the User has Permission to.
   */
  private getDefaultSearchTypeFromFirstAvailable (): SearchType {
    let searchTypes: SearchType[] = this.getAllPermitted ();
    let searchType: SearchType;

    if ( searchTypes.length ) {
      searchType = searchTypes[ 0 ];
    }

    if ( searchType ) {
      this.logger.info ( 'Loaded first available Search Type', searchType );
    }

    return !!searchTypes.length ? searchTypes[ 0 ] : null;
  }

  /**
   * Attempt to load the Search Type specified by the User's preference, if the User still has Permission for it.
   */
  private getDefaultSearchTypeFromUserPreference (): SearchType {
    let user: User                = this.securityService.getCurrentUser ();
    let searchTypes: SearchType[] = this.getAllPermitted ();
    let searchType: SearchType;

    if ( user.prefDefaultSearchTypeId ) {
      searchType = _.find ( searchTypes, function ( searchType: SearchType ) {
        return searchType.id === user.prefDefaultSearchTypeId;
      } );
    }

    if ( searchType ) {
      this.logger.info ( 'Loaded Search Type from User preference', searchType );
    }

    return searchType;
  }

  /**
   * Attempt to load the Search Type specified in the current URL, if any, and if the user has Permission for it.
   */
  private getDefaultSearchTypeFromUrl (): SearchType {
    let searchTypes: SearchType[] = this.getAllPermitted ();
    let searchType: SearchType;

    if ( this.routingService.isQueryParamPresent ( UrlQueryParam.SEARCH_SEARCH_TYPE ) ) {
      let queryParamValue = this.routingService.getQueryParam ( UrlQueryParam.SEARCH_SEARCH_TYPE );
      searchType          = _.find ( searchTypes, function ( searchType: SearchType ) {
        return searchType.type === queryParamValue;
      } );
    }

    if ( searchType ) {
      this.logger.info ( 'Loaded Search Type from URL', searchType );
    }

    return searchType;
  }

  private getPartners (): Observable<Partner[]> {
    return this.store.select<SupportState> ( AppStateType.SUPPORT_STATE )
      .pipe (
        map ( supportState => supportState.partners ),
        takeWhile ( partners => partners.length === 0, true ),
      );
  }

  private getSearchTypes (): Observable<SearchType[]> {
    return this.store.select<SearchState> ( AppStateType.SEARCH_STATE )
      .pipe (
        map ( searchState => searchState.searchTypes ),
        filter ( searchTypes => searchTypes.length > 0 ),
        take ( 1 ),
      );
  }

  private isPermitted ( searchType: SearchType, partners: Partner[], user?: User ): boolean {
    // For VMS and CCL, the user must also have at least one Partner...
    let hasPartnerPermission: boolean;

    if ( [ PlatformType.CCL, PlatformType.VMS ].includes ( searchType.platform ) ) {
      hasPartnerPermission = !!partners.find ( partner => partner.platform === searchType.platform );
    } else {
      hasPartnerPermission = true;
    }

    return hasPartnerPermission
      && (!searchType.permissions
        || !searchType.permissions.length
        || this.securityService.hasAnyPermission ( searchType.permissions.map ( searchType => searchType.systemName ), user ));
  }
}
