import { Injectable } from '@angular/core';
import { PropertyService } from "../config/property.service";
import { TogglzService } from "../config/togglz.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import {
  LoadBalanceAdjustmentActivityAction,
  LoadCanaryInfoAction,
  LoadPartnersAction,
  LoadPropertiesAction,
  LoadSessionDefinitionsAction,
  LoadTeamsAction,
  LoadTogglzAction,
  SetIsSupportInitCompleteAction
} from "./support-actions";
import { BalanceAdjustmentService } from "../balance-adjustment/balance-adjustment.service";
import { PartnerService } from "../partner/partner.service";
import { forkJoin, Observable } from "rxjs";
import { finalize, map, tap } from "rxjs/operators";
import { TransitionService } from "../transition/transition.service";
import { SessionDefinitionService } from "../session/session-definition.service";
import { SessionService } from "../session/session.service";
import { TeamService } from '../team/team.service';
import { SearchTypeService } from "../search/search-type/search-type.service";
import { LoadSearchTypesAction } from '../search/action/load-search-types-action';
import { SecurityService } from "../security/security.service";
import { SessionState } from "../session/session-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { UrlQueryParam } from "../routing/url-query-param.enum";
import { Workflow } from "../workflow/workflow.service";
import { RoutingService } from "../routing/routing.service";
import { ReportService } from "../../reports/report.service";
import { LoadReportsAction } from "../../reports/action/load-reports-action";
import { CanaryService } from "../canary/canary.service";
import { VersionAndEnvironmentView } from "../canary/version-and-environment-view";

@Injectable ( {
  providedIn: 'root'
} )
export class SupportService {

  constructor ( private balanceAdjustmentService: BalanceAdjustmentService,
                private canaryService: CanaryService,
                private partnerService: PartnerService,
                private propertyService: PropertyService,
                private reportService: ReportService,
                private routingService: RoutingService,
                private searchTypeService: SearchTypeService,
                private securityService: SecurityService,
                private sessionService: SessionService,
                private sessionDefinitionService: SessionDefinitionService,
                private store: Store<AppState>,
                private teamService: TeamService,
                private togglzService: TogglzService,
                private transitionService: TransitionService,
                private workflow: Workflow ) {
  }

  runStartupSequence (): void {
    this.transitionService.on ();
    setTimeout ( () => {
      forkJoin (
        this.loadPartners (),
        this.loadProperties (),
        this.loadReports (),
        this.loadSearchTypes (),
        this.loadSessionDefinitions (),
        this.loadTogglz ()
      )
        .pipe ( finalize ( () => {
          this.store.dispatch ( new SetIsSupportInitCompleteAction () );
          this.transitionService.off ();
          this.triggerLoadSessionFromUrl ();
        } ) )
        .subscribe (
          () => {},
          (error) => {
            console.error(error);
          });
    }, 50 );

    // These items are not critical, and don't need to be waited on
    this.loadBalanceAdjustmentActivity ().subscribe ();
    this.loadTeams ().subscribe ();
    this.loadCanaryInfo ().subscribe ();
  }

  loadBalanceAdjustmentActivity (): Observable<any> {
    return this.balanceAdjustmentService.findBalanceAdjustmentActivity ()
      .pipe (
        map ( value => this.store.dispatch ( new LoadBalanceAdjustmentActivityAction ( value ) ) )
      );
  }

  loadCanaryInfo (): Observable<any> {
    return this.canaryService.findEnvVersion ()
      .pipe (
        tap ( ( value: VersionAndEnvironmentView ) => this.store.dispatch ( new LoadCanaryInfoAction ( value ) ) )
      );
  }

  loadPartners (): Observable<any> {
    return this.partnerService.findAllGrantedPartners ()
      .pipe (
        map ( value => this.store.dispatch ( new LoadPartnersAction ( value ) ) )
      );
  }

  loadProperties (): Observable<any> {
    return this.propertyService.findAll ()
      .pipe (
        map ( value => this.store.dispatch ( new LoadPropertiesAction ( value ) ) )
      );
  }

  loadReports (): Observable<any> {
    return this.reportService.findAllForCurrentUser ()
      .pipe ( map ( ( value ) => {
        this.store.dispatch ( new LoadReportsAction ( value ) );
      } ) );
  }

  loadSearchTypes (): Observable<any> {
    return this.searchTypeService.findAll ()
      .pipe (
        map ( searchTypes => {
          this.store.dispatch ( new LoadSearchTypesAction ( searchTypes ) );
          this.searchTypeService.setDefaultSearchType ( searchTypes );
        } )
      );
  }

  loadSessionDefinitions (): Observable<any> {
    return this.sessionDefinitionService.findAll ()
      .pipe (
        map ( value => this.store.dispatch ( new LoadSessionDefinitionsAction ( value ) ) )
      );
  }

  loadTeams (): Observable<any> {
    return this.teamService.findAll ()
      .pipe (
        map ( value => this.store.dispatch ( new LoadTeamsAction ( value ) ) )
      );
  }

  loadTogglz (): Observable<any> {
    return this.togglzService.findAll ()
      .pipe (
        map ( value => this.store.dispatch ( new LoadTogglzAction ( value ) ) )
      );
  }

  triggerLoadSessionFromUrl (): void {
    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    let urlSessionId: string       = this.routingService.getQueryParam ( UrlQueryParam.SESSION_SESSION_ID );
    if ( urlSessionId && (!sessionState.session || sessionState.session.id !== parseInt ( urlSessionId )) ) {
      this.workflow.loadSessionFromId ( urlSessionId )
        .subscribe ();
    }
  }
}
