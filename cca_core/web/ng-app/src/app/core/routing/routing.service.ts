import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from './route-path.enum';
import { UrlQueryParam } from './url-query-param.enum';
import { SearchState } from "../search/search-state";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { SessionState } from '../session/session-state';
import { Session } from "../session/model/session";
import { Selection } from "../session/model/selection";
import { SelectionType } from "../session/model/selection-type.enum";
import { SecurityService } from "../security/security.service";

@Injectable ( {
  providedIn: 'root'
} )
export class RoutingService {

  private queryParams: any;

  private static readonly REDIRECT_PARAMS = 'REDIRECT_PARAMS';
  private static readonly REDIRECT_URL    = 'REDIRECT_URL';

  constructor ( private activatedRoute: ActivatedRoute,
                private router: Router,
                private securityService: SecurityService,
                private store: Store<AppState> ) {
    this.activatedRoute.queryParams.subscribe ( { next: value => this.queryParams = value } );
  }

  getQueryParam ( key: string ): string {
    return this.queryParams[ key ];
  }

  getQueryParams (): any {
    return this.queryParams;
  }

  getRedirectParams (): object {
    let queryParamString = localStorage.getItem ( RoutingService.REDIRECT_PARAMS );
    return queryParamString ? JSON.parse ( queryParamString ) : null;
  }

  getRedirectPath (): string {
    return localStorage.getItem ( RoutingService.REDIRECT_URL );
  }

  isOn ( route: RoutePath ): boolean {
    return this.router.isActive ( route, false );
  }

  isQueryParamPresent ( key: UrlQueryParam ): boolean {
    return !!this.queryParams[ key ];
  }

  isQueryParameterSelectionCurrentSelection ( selection: Selection<any> ): boolean {
    let parameter = this.getQueryParam ( UrlQueryParam.SESSION_SELECTION_ID );
    return parameter ? selection.id === Number ( parameter ) : false;
  }

  navigateTo ( route: any, queryParams: object = {}, preserveSessionId: boolean = true ): Promise<boolean> {
    //Preserve the session ID parameter on navigation
    if ( preserveSessionId && this.isQueryParamPresent ( UrlQueryParam.SESSION_SESSION_ID ) ) {
      queryParams[ UrlQueryParam.SESSION_SESSION_ID ] = this.getQueryParam ( UrlQueryParam.SESSION_SESSION_ID );
    }

    this.setRedirect ( route, queryParams );
    return this.router.navigate ( [ route ], { queryParams: queryParams } );
  }

  navigateToDefaultLandingPage (): Promise<boolean> {
    let user = this.securityService.getCurrentUser ();
    if ( user.prefDefaultLandingPage === 'WORKSPACE' ) {
      return this.navigateTo ( RoutePath.CASE_WORKSPACE, null, false );
    } else {
      return this.navigateTo ( RoutePath.DASHBOARD, null, false );
    }
  }

  navigateToRedirect (): Promise<boolean> {
    let queryParams = this.getRedirectParams ();
    let path        = this.getRedirectPath ();
    if ( path && path !== '/' && path !== '/dashboard' ) {
      return this.navigateTo ( path, queryParams );
    } else {
      this.navigateToDefaultLandingPage ();
    }
  }

  navigateToDetails (): Promise<boolean> {
    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    let session: Session           = sessionState.session;
    let selection: Selection<any>  = sessionState.selection;

    if ( !session || !selection ) {
      throw new Error ( 'Cannot navigate to Details without a Session AND Selection available!' );
    }

    let queryParams                                   = {};
    queryParams[ UrlQueryParam.SESSION_SESSION_ID ]   = session.id;
    queryParams[ UrlQueryParam.SESSION_SELECTION_ID ] = selection.id;

    if ( selection.type === SelectionType.CUSTOMER && selection.selectedCard ) {
      queryParams[ UrlQueryParam.DETAILS_LAST_FOUR ] = selection.selectedCard.identifiers.pan.slice ( -4 );
    }

    return this.navigateTo ( RoutePath.DETAIL, queryParams );
  }

  navigateToSearch (): Promise<boolean> {
    let queryParams = {};

    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    let searchTypeContainer      = searchState.selectedSearchType;
    if ( searchTypeContainer ) {
      queryParams[ UrlQueryParam.SEARCH_SEARCH_TYPE ] = searchTypeContainer.searchType.type;
    }

    return this.navigateTo ( RoutePath.SEARCH, queryParams );
  }

  redirectToLoginIfNecessary (): boolean {
    this.setRedirect ();
    if ( !this.isOn ( RoutePath.LOGIN ) ) {
      this.router.navigate ( [ RoutePath.LOGIN ] );
      return true;
    }
    return false;
  }

  setQueryParam ( key: string, value: any ): Promise<boolean> {
    let queryParams    = {
      ...this.activatedRoute.snapshot.queryParams
    };
    queryParams[ key ] = value;

    return this.router.navigate ( [], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
    } )
      .then ( ( value ) => {
        this.setRedirectParams ();
        return value;
      } );
  }

  setQueryParams ( params: any ): Promise<boolean> {
    let queryParams = {
      ...this.activatedRoute.snapshot.queryParams,
      ...params
    };

    return this.router.navigate ( [], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
    } )
      .then ( ( value ) => {
        this.setRedirectParams ();
        return value;
      } );
  }

  setRedirect ( path: string = null, queryParams: any = null ): void {
    this.setRedirectPath ( path );
    this.setRedirectParams ( queryParams );
  }

  setRedirectParams ( queryParams: any = null ): void {
    if ( !queryParams ) {
      queryParams = this.activatedRoute.snapshot.queryParams;
    }
    localStorage.setItem ( RoutingService.REDIRECT_PARAMS, JSON.stringify ( queryParams ) );
  }

  setRedirectPath ( path: string = null ): void {
    if ( !path ) {
      path = window.location.pathname;
    }
    if ( path === '/login' ) {
      path = '/';
    }

    localStorage.setItem ( RoutingService.REDIRECT_URL, path );
  }
}
