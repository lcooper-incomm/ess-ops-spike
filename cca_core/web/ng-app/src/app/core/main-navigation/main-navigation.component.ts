import {Component, OnInit, ViewChild} from '@angular/core';
import {RoutePath} from '../routing/route-path.enum';
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {CcaBaseComponent} from "../cca-base-component";
import {Permission} from "../auth/permission";
import {AuthenticationService} from "../../auth/authentication.service";
import {UserService} from "../user/user.service";
import {User} from '../user/user';
import {AppStateType} from "../../app-state-type.enum";
import {SearchTypeService} from "../search/search-type/search-type.service";
import {SearchType} from "../search/search-type/search-type";
import {MatMenuTrigger} from "@angular/material";
import {SearchTypeCategory} from "../search/search-type/search-type-category";
import {UrlQueryParam} from "../routing/url-query-param.enum";
import {SearchTypeContainer} from "../search/search-type-container";
import {CloseDockTabAction} from "../dock/action/close-dock-tab-action";
import {WizardRunner} from '../wizard/wizard-runner/wizard-runner.service';
import {CreateSessionWizard} from "../session/create-session-wizard/create-session-wizard";
import {ReportService} from "../../reports/report.service";
import {EmailSupportWizard} from "../../user-menu/email-support-wizard/email-support-wizard";
import {Report} from "../../reports/report";
import {LogoutType} from "../../auth/login/logout-type.enum";
import {CollapseSessionPanelAction} from "../session/action/session-actions";
import {ServicesPanelTypeService} from "../service/services-panel-type.service";
import {ServicePanelType} from "../service/service-panel-type.enum";
import {OrderNewCardWizard} from "../../services/services/order-new-card/order-new-card-wizard/order-new-card-wizard";
import {controlPanelRouteGroups} from '../../control-panel/routing/control-panel-routes';

@Component ( {
  selector: 'cca-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: [ './main-navigation.component.scss' ]
} )
export class MainNavigationComponent extends CcaBaseComponent implements OnInit {

  controlPanelRouteGroups                    = controlPanelRouteGroups;
  currentUser: User;
  currentReportId: string;
  hasCaseWorkspacePermission: boolean        = false;
  hasReportsPermissions: boolean             = false;
  hasSearchPermissions: boolean              = false;
  hasServicesPermissions: boolean            = false;
  hasSelection: boolean                      = false;
  lastVisitedControlPanelPath: string        = null;
  navigationQueryParams                      = {};
  reports: any[]                             = [];
  RoutePath                                  = RoutePath;
  searchTypeCategories: SearchTypeCategory[] = [];
  selectedSearchType: SearchTypeContainer;
  selectedServiceType: ServicePanelType;

  @ViewChild ( 'controlPanelMenuTrigger' )
  controlPanelMenuTrigger: MatMenuTrigger;
  @ViewChild ( 'reportsMenuTrigger' )
  reportsMenuTrigger: MatMenuTrigger;
  @ViewChild ( 'searchMenuTrigger' )
  searchMenuTrigger: MatMenuTrigger;
  @ViewChild ( 'servicesMenuTrigger' )
  servicesMenuTrigger: MatMenuTrigger;

  constructor ( private authenticationService: AuthenticationService,
                private reportService: ReportService,
                private searchTypeService: SearchTypeService,
                private serviceTypeService: ServicesPanelTypeService,
                private store: Store<AppState>,
                private userService: UserService,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit (): void {

    this.subscribeToAuthenticationState ();
    this.subscribeToControlPanelState ();
    this.subscribeToReportState ();
    this.subscribeToServiceState ();
    this.subscribeToSessionState ();
    this.subscribeToSearchState ();
    this.subscribeToSearchCategoriesState ();
  }

  closeDockAndSession (): void {
    this.store.dispatch ( new CloseDockTabAction () );
    this.store.dispatch ( new CollapseSessionPanelAction () );
  }

  closeMenusAllButSearch (): void {
    this.controlPanelMenuTrigger.closeMenu ();
    this.reportsMenuTrigger.closeMenu ();
    this.servicesMenuTrigger.closeMenu ();
  }

  closeMenusAllButReports (): void {
    this.controlPanelMenuTrigger.closeMenu ();
    this.searchMenuTrigger.closeMenu ();
    this.servicesMenuTrigger.closeMenu ();
  }

  closeMenusAllButServices (): void {
    this.controlPanelMenuTrigger.closeMenu ();
    this.reportsMenuTrigger.closeMenu ();
    this.searchMenuTrigger.closeMenu ();
  }

  closeMenusAllButControlPanel (): void {
    this.reportsMenuTrigger.closeMenu ();
    this.searchMenuTrigger.closeMenu ();
    this.servicesMenuTrigger.closeMenu ();
  }

  emailSupport (): void {
    this.wizardRunner.run ( new EmailSupportWizard () );
  }

  logout (): void {
    this.authenticationService.logout ( LogoutType.NORMAL );
  }

  openCreateSessionDialog (): void {
    this.wizardRunner.run ( new CreateSessionWizard () );
  }

  openOrderCardWizard () {
    let wizard = new OrderNewCardWizard ();
    this.wizardRunner.run ( wizard );
  }

  setServicePanelType ( serviceType: ServicePanelType ): void {
    this.serviceTypeService.setServicePanelType ( serviceType );
    this.store.dispatch ( new CloseDockTabAction () );
    this.store.dispatch ( new CollapseSessionPanelAction () );
  }

  setSearchType ( searchType: SearchType ): void {
    this.searchTypeService.setSearchType ( searchType.type );
    this.store.dispatch ( new CloseDockTabAction () );
    this.store.dispatch ( new CollapseSessionPanelAction () );
  }

  openReport(report: Report) {
    this.reportService.openReportInNewTab(report);
  }

  private setHasCaseWorkspacePermission (): void {
    this.hasCaseWorkspacePermission = this.userService.hasAnyOfThesePermissions(this.currentUser, [Permission.VIEW_CASE_WORKSPACE, Permission.ENCOR_CASE_WORKSPACE])
  }

  private setHasReportsPermissionsFlag () {
    this.hasReportsPermissions = this.userService.hasAnyPermissionWithPrefix ( this.currentUser, 'REPORT_' );
  }

  private setHasSearchPermissionsFlag () {
    this.hasSearchPermissions = !!this.searchTypeCategories.length;
  }

  private setHasServicesPermissionsFlag () {
    this.hasServicesPermissions = this.userService.hasAnyOfThesePermissions ( this.currentUser, [
      Permission.BULK_DEACTIVATE,
      Permission.BULK_PRODUCT_EXPORT,
      Permission.FAILED_KYC_REGISTRATION_SEARCH,
      Permission.JOB_QUEUE,
      Permission.SEARCH_JIRA,
      Permission.VMS_ORDER_NEW_CARD
    ] );
  }

  private subscribeToControlPanelState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.CONTROL_PANEL_STATE ).subscribe ( {
        next: controlPanelState => {
          this.lastVisitedControlPanelPath = controlPanelState.lastVisitedChildRoute && controlPanelState.lastVisitedChildRoute.split ( '/' ).slice ( -1 )[ 0 ];
        }
      } )
    )
  }

  private subscribeToAuthenticationState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.AUTHENTICATION_STATE ).subscribe ( {
        next: authenticationState => {
          if ( authenticationState ) {
            this.currentUser = authenticationState.user;
            this.setHasCaseWorkspacePermission ();
            this.setHasReportsPermissionsFlag ();
            this.setHasServicesPermissionsFlag ();
          }
        }
      } )
    );
  }

  private subscribeToSearchCategoriesState (): void {
    this.addSubscription (
      this.searchTypeService.getAllPermittedCategories ()
        .subscribe ( searchTypeCategories => {
          this.searchTypeCategories = searchTypeCategories;
          this.setHasSearchPermissionsFlag ();
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
        next: sessionState => {
          if ( sessionState ) {
            this.hasSelection          = !!sessionState.selection;
            this.navigationQueryParams = {};
            if ( sessionState.session ) {
              this.navigationQueryParams[ UrlQueryParam.SESSION_SESSION_ID ] = sessionState.session.id;
            }
          }
        }
      } )
    );
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: searchState => {
          if ( searchState ) {
            this.selectedSearchType = searchState.selectedSearchType;
          }
        }
      } )
    );
  }

  private subscribeToServiceState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SERVICE_STATE ).subscribe ( {
        next: serviceState => {
          if ( serviceState ) {
            this.selectedServiceType = serviceState.selectedServiceType;
          }
        }
      } )
    );
  }

  private subscribeToReportState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.REPORT_STATE ).subscribe ( {
        next: reportState => {
          if ( reportState ) {
            this.reports         = this.reportService.splitIntoColumns ( reportState.reports, 2 );
            this.currentReportId = reportState.reportId;
          }
        }
      } )
    );
  }
}
