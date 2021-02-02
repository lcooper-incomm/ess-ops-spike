import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CcaBaseComponent} from "../core/cca-base-component";
import {Store} from "@ngrx/store";
import {AppState} from "../app-state";
import {SessionType} from "../core/session/model/session-type";
import {SpinnerSize} from "../core/spinner/spinner-size.enum";
import {SessionQueue} from "../core/session/model/session-queue";
import {Team} from "../core/auth/team";
import {forkJoin, Observable, of, Subscription} from "rxjs";
import {User} from "../core/user/user";
import {CaseSearchRequest} from "./case-search-request";
import {CaseWorkspaceState} from "./case-workspace-state";
import {snapshot} from "../core/store-utils/store-utils";
import {AppStateType} from "../app-state-type.enum";
import {LocalStorage} from "../core/local-storage/local-storage.service";
import {SpinnerComponent} from "../core/spinner/spinner.component";
import {TeamService} from "../core/team/team.service";
import {debounceTime, delay, finalize, flatMap, tap} from "rxjs/operators";
import {
  CaseWorkspaceLoadQueuesAction,
  CaseWorkspaceLoadStatusOptionsAction,
  CaseWorkspaceLoadTeamsAction,
  CaseWorkspaceSetRequestAction,
  CaseWorkspaceSetResultsAction
} from "./case-workspace-actions";
import {SessionDefinitionService} from "../core/session/session-definition.service";
import {SupportState} from "../core/support/support-state";
import {QueueService} from "../core/queue/queue.service";
import {GenericOption} from "../core/model/generic-option";
import {getSessionStatusTypeDisplayValue, SessionStatusType} from "../core/session/model/session-status-type.enum";
import * as _ from "lodash";
import {CaseWorkspaceSearchCodexFieldType, CaseWorkspaceSearchCodexSeed} from "./case-workspace-search-codex-seed";
import {CodexService} from "../codex/codex.service";
import {UserService} from "../core/user/user.service";
import {CaseService} from "../core/session/case.service";
import {Page} from "../core/model/page";
import {Session} from "../core/session/model/session";
import {MatPaginator, MatSort, MatTableDataSource, SortDirection} from "@angular/material";
import {ViewSessionWizard} from "../core/session/view-session-wizard/view-session-wizard";
import {WizardRunner} from "../core/wizard/wizard-runner/wizard-runner.service";
import {SessionService} from "../core/session/session.service";
import {SecurityService} from "../core/security/security.service";
import {UpdateSessionView} from "../core/session/model/update-session-view";
import {Workflow} from "../core/workflow/workflow.service";
import {EditCaseWizard} from "./edit-case-wizard/edit-case-wizard";
import {ActivatedRoute, Params} from '@angular/router';
import {Logger} from '../logging/logger.service';
import {Permission} from "../core/auth/permission";
import {RoutingService} from "../core/routing/routing.service";
import {UrlQueryParam} from "../core/routing/url-query-param.enum";

@Component ( {
  selector: 'cca-case-workspace',
  templateUrl: './case-workspace.component.html',
  styleUrls: [ './case-workspace.component.scss' ]
} )
export class CaseWorkspaceComponent extends CcaBaseComponent implements OnInit {

  public readonly ANY_PLACEHOLDER: string = 'ANY';
  private readonly KEY: string            = 'case-workspace-request';
  private readonly CODEX_NAME: string     = 'cca-case-workspace-search';

  dataSource                                   = new MatTableDataSource<Session> ();
  displayedColumns: string[]                   = [ 'sid', 'createdDate', 'modifiedDate', 'type', 'queue', 'status', 'team', 'assignee', 'actions' ];
  queues: SessionQueue[]                       = [];
  request: CaseSearchRequest;
  results: Page<Session>;
  sessionTypes: SessionType[]                  = [];
  SpinnerSize                                  = SpinnerSize;
  statuses: GenericOption<SessionStatusType>[] = [];
  teams: Team[]                                = [];
  users: User[]                                = [];
  workspaceForm: FormGroup                     = new FormGroup ( {} );
  supportSubscription: Subscription;
  routeSubscription: Subscription;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  @ViewChild ( 'caseTypeSpinner' )
  caseTypeSpinner: SpinnerComponent;
  @ViewChild ( 'queueSpinner' )
  queueSpinner: SpinnerComponent;
  @ViewChild ( 'statusSpinner' )
  statusSpinner: SpinnerComponent;
  @ViewChild ( 'teamSpinner' )
  teamSpinner: SpinnerComponent;
  @ViewChild ( 'assigneeSpinner' )
  assigneeSpinner: SpinnerComponent;
  @ViewChild ( 'searchSpinner' )
  searchSpinner: SpinnerComponent;
  @ViewChild ( 'resultsSpinner' )
  resultsSpinner: SpinnerComponent;

  private assigneeSearchText: string;
  private formSubscription: Subscription;
  private excludedStatuses = [
    SessionStatusType.ABANDONED,
    SessionStatusType.DISCONNECTED,
    SessionStatusType.CANCELLED,
    SessionStatusType.FORCED_CLOSED,
    SessionStatusType.QUEUED,
    SessionStatusType.VMS_SESSION_FAILED,
    SessionStatusType.WRAPPEDUP
  ];

  constructor ( private caseService: CaseService,
                private codexService: CodexService,
                private localStorage: LocalStorage,
                private queueService: QueueService,
                private routingService: RoutingService,
                private securityService: SecurityService,
                private sessionService: SessionService,
                private sessionDefinitionService: SessionDefinitionService,
                private store: Store<AppState>,
                private teamService: TeamService,
                private userService: UserService,
                private wizardRunner: WizardRunner,
                private workflow: Workflow,
                private activatedRoute: ActivatedRoute,
                private logger: Logger) {
    super ();
  }

  ngOnInit () {
    this.initRequest ();
    this.initForm ();
    this.initData ();
    this.initDataSource ();
    this.setQueryParam();
    this.subscribeToCaseWorkspaceState ();
    this.subscribeToSupportState ();
    this.watchUserChanges ();
    this.watchTeamChanges ();
    this.watchSupportState();

    if ( !this.results ) {
      setTimeout ( () => {
        this.search ();
      }, 500 );
    }

  }

  clearForm (): void {
    this.store.dispatch ( new CaseWorkspaceSetRequestAction ( null ) );
    this.store.dispatch ( new CaseWorkspaceSetResultsAction ( null ) );
    //this.initForm ();
    this.updateForm ();
    this.runFormValidation ();
  }

  compareById ( a: any, b: any ): boolean {
    return a && b && a.id === b.id;
  }

  openAssignSessionDialog ( session: Session ): void {
    let wizard           = new EditCaseWizard ();
    wizard.model.session = _.cloneDeep ( session );
    wizard.model.teams   = this.teams;
    this.wizardRunner.run ( wizard )
      .afterClosed ()
      .subscribe ( () => this.search () );
  }

  openViewSessionDialog ( session: Session ): void {
    let skipActivate = true;
    this.sessionService.findSession ( session.id, skipActivate )
      .subscribe ( ( session: Session ) => {
        let wizard           = new ViewSessionWizard ();
        wizard.model.session = session;
        this.wizardRunner.run ( wizard );
      } );
  }

  search ( page: number = 0, clearResults: boolean = true ): void {
    this.logger.debug('CaseWorkspaceComponent.search');

    this.searchSpinner.start ();
    this.resultsSpinner.start ();
    let request = this.getRequestFromForm ();

    //We only need to update the request or clear the results if this is a new search, not just a next page search
    if ( clearResults ) {
      this.localStorage.set ( this.KEY, request );
      this.store.dispatch ( new CaseWorkspaceSetRequestAction ( request ) );
      this.store.dispatch ( new CaseWorkspaceSetResultsAction ( null ) );
    }

    this.caseService.search ( request, page )
      .pipe (
        finalize ( () => {
          this.searchSpinner.stop ();
          this.resultsSpinner.stop ();
        } )
      )
      .subscribe ( ( results: Page<Session> ) => {
        this.store.dispatch ( new CaseWorkspaceSetResultsAction ( results ) );
      } );
  }

  userDisplay ( user: User ): string {
    let value: string;

    if ( user ) {
      value = user.username;
      if ( user.displayName ) {
        value = `${value} (${user.displayName})`;
      }
    }
    return value;
  }

  private findQueues(): Observable<SessionQueue[]> {
    if (this.isEncor) {
      return this.queueService.findAllPermitted();
    } else {
      return this.queueService.findAll();
    }
  }

  private findSessionTypes(): SessionType[] {
    if (this.isEncor) {
      return this.sessionDefinitionService.getPermittedCaseTypesForCaseWorkspace();
    } else {
      return this.sessionDefinitionService.getAllSessionTypes();
    }
  }

  private findTeams(): Observable<Team[]> {
    if (this.isEncor) {
      return this.teamService.findAllPermittedForCaseWorkspace();
    } else {
      return this.teamService.findAll();
    }
  }

  private getFormFieldNameFromCodexFieldName ( field: CaseWorkspaceSearchCodexFieldType ): string {
    let name: string = field;

    switch ( field ) {
      case CaseWorkspaceSearchCodexFieldType.ASSIGNEE:
        name = 'assignee';
        break;
      case CaseWorkspaceSearchCodexFieldType.CASE_ID:
        name = 'sid';
        break;
      case CaseWorkspaceSearchCodexFieldType.CASE_TYPE:
        name = 'caseType';
        break;
      case CaseWorkspaceSearchCodexFieldType.QUEUE:
        name = 'queue';
        break;
      case CaseWorkspaceSearchCodexFieldType.SERIAL_NUMBER:
        name = 'serialNumber';
        break;
      case CaseWorkspaceSearchCodexFieldType.STATUS:
        name = 'status';
        break;
      case CaseWorkspaceSearchCodexFieldType.TEAM:
        name = 'team';
        break;
      case CaseWorkspaceSearchCodexFieldType.VAN:
        name = 'van';
        break;
      default:
        break;
    }

    return name;
  }

  private getRequestFromForm (): CaseSearchRequest {
    let request = null;

    let formValue = this.workspaceForm.getRawValue ();
    if ( formValue ) {
      request                    = new CaseSearchRequest ();
      request.assigneeSearchText = this.assigneeSearchText;
      request.sortValue          = this.request ? this.request.sortValue : 'createdDate';
      request.sortDirection      = this.request ? this.request.sortDirection : 'asc';
      request.sid                = formValue.sid;
      request.serialNumber       = formValue.serialNumber;
      request.van                = formValue.van;
      request.sessionType        = formValue.caseType !== this.ANY_PLACEHOLDER ? formValue.caseType : null;
      request.queueId            = formValue.queue !== this.ANY_PLACEHOLDER ? formValue.queue : null;
      request.status             = formValue.status !== this.ANY_PLACEHOLDER ? formValue.status : null;
      request.teamId             = formValue.team !== this.ANY_PLACEHOLDER ? formValue.team : null;
      request.userId             = (formValue.assignee && formValue.assignee !== this.ANY_PLACEHOLDER) ? formValue.assignee.id : null;
    }

    return request;
  }

  private getRequestFromLocalStorage (): CaseSearchRequest {
    return this.localStorage.get ( this.KEY );
  }

  private getRequestFromState (): CaseSearchRequest {
    let caseWorkspaceState: CaseWorkspaceState = snapshot ( this.store, AppStateType.CASE_WORKSPACE_STATE );
    return caseWorkspaceState ? caseWorkspaceState.request : null;
  }

  private initData (): void {
    forkJoin (
      this.loadTeams (),
      this.loadQueues (),
      this.loadStatuses ()
    ).subscribe ();
  }

  private initDataSource (): void {
    this.sort.disableClear = true;

    if ( this.request ) {
      this.sort.active    = this.request.sortValue;
      this.sort.direction = <SortDirection>this.request.sortDirection;
    }

    /*
    Because we're manually managing the sort and pagination in our query here, we do NOT want to connect the sort and
    paginator objects to the dataSource as we do nearly everywhere else in CCA.
     */

    //Listen for sort changes so we can re-run the search with the new sort
    this.addSubscription (
      this.sort.sortChange.subscribe ( ( event: any ) => {
        if ( this.request ) {
          this.request.sortValue     = event.active;
          this.request.sortDirection = event.direction;
        }
        this.search ( 0, false );
      } )
    );

    //Listen for page changes so we can fetch the specified page
    this.addSubscription (
      this.paginator.page.subscribe ( ( event: any ) => {
        this.search ( event.pageIndex, false );
      } )
    );
  }

  private initForm (): void {
    if ( this.formSubscription ) {
      this.formSubscription.unsubscribe ();
    }

    this.workspaceForm = new FormGroup ( {
      sid: new FormControl ( null ),
      serialNumber: new FormControl ( null ),
      van: new FormControl ( null ),
      caseType: new FormControl ( this.ANY_PLACEHOLDER ),
      queue: new FormControl ( this.ANY_PLACEHOLDER ),
      status: new FormControl ( this.ANY_PLACEHOLDER ),
      team: new FormControl ( this.ANY_PLACEHOLDER ),
      assignee: new FormControl ( this.ANY_PLACEHOLDER )
    } );

    this.formSubscription = this.workspaceForm.valueChanges
      .subscribe ( () => {
        this.runFormValidation ();
      } );
    this.addSubscription ( this.formSubscription );

    this.updateForm ();
  }

  private initRequest (): void {
    //First, try from state
    this.request = this.getRequestFromState ();
    //Then from local storage
    if ( !this.request ) {
      this.request = this.getRequestFromLocalStorage ();
    }
  }

  private get isEncor(): boolean {
    return this.securityService.hasPermission(Permission.ENCOR_CASE_WORKSPACE)
      && !this.securityService.hasPermission(Permission.VIEW_CASE_WORKSPACE);
  }

  private loadQueues (): Observable<SessionQueue[]> {
    //First, try from state
    let caseWorkspaceState: CaseWorkspaceState = snapshot ( this.store, AppStateType.CASE_WORKSPACE_STATE );
    if ( caseWorkspaceState && caseWorkspaceState.queues && caseWorkspaceState.queues.length ) {
      this.queues = caseWorkspaceState.queues;
      return of ( null );
    } else {
      //Then from server
      this.queueSpinner.start();
      return this.findQueues()
        .pipe(
          finalize(() => this.queueSpinner.stop()),
          tap((queues: SessionQueue[]) => {
            this.store.dispatch(new CaseWorkspaceLoadQueuesAction(queues));
          })
        );
    }
  }

  private loadStatuses (): Observable<SessionStatusType[]> {
    //First, try from state
    let caseWorkspaceState: CaseWorkspaceState = snapshot ( this.store, AppStateType.CASE_WORKSPACE_STATE );
    if ( caseWorkspaceState && caseWorkspaceState.statusOptions && caseWorkspaceState.statusOptions.length ) {
      this.statuses = caseWorkspaceState.statusOptions;
      return of ( null );
    } else {
      //Then from server
      this.statusSpinner.start ();
      return this.sessionDefinitionService.findAllSessionStatuses ()
        .pipe (
          finalize ( () => this.statusSpinner.stop () ),
          tap ( ( values: SessionStatusType[] ) => {
            let options: GenericOption<SessionStatusType>[] = [];
            values.forEach ( ( value: string ) => {
              if ( !_.includes ( this.excludedStatuses, value ) ) {
                options.push ( new GenericOption ( {
                  value: value,
                  displayValue: getSessionStatusTypeDisplayValue ( value )
                } ) );
              }
            } );
            this.store.dispatch ( new CaseWorkspaceLoadStatusOptionsAction ( options ) );
          } )
        );
    }
  }

  private loadTeams (): Observable<Team[]> {
    //First, try from state
    let caseWorkspaceState: CaseWorkspaceState = snapshot ( this.store, AppStateType.CASE_WORKSPACE_STATE );
    if ( caseWorkspaceState && caseWorkspaceState.teams && caseWorkspaceState.teams.length ) {
      this.teams = caseWorkspaceState.teams;
      return of ( null );
    } else {
      //Then from server
      this.teamSpinner.start ();
      return this.findTeams()
        .pipe(
          finalize(() => this.teamSpinner.stop()),
          tap((teams: Team[]) => {
            this.store.dispatch(new CaseWorkspaceLoadTeamsAction(teams));
          })
        );
    }
  }

  private runFormValidation(): void {
    let request = this.getRequestFromForm();
    let seed    = new CaseWorkspaceSearchCodexSeed();
    seed.updateFromSearchRequest(request);

    this.codexService.runOne(this.CODEX_NAME, seed)
      .subscribe((result: CaseWorkspaceSearchCodexSeed) => {
        let seed = new CaseWorkspaceSearchCodexSeed(result);
        this.updateFormState(seed);
      } );
  }

  private setQueryParam(): void {
    if (this.isEncor) {
      this.routingService.setQueryParam(UrlQueryParam.CASE_WORKSPACE_TYPE, 'encor');
    } else {
      this.routingService.setQueryParam(UrlQueryParam.CASE_WORKSPACE_TYPE, 'default');
    }
  }

  private subscribeToCaseWorkspaceState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.CASE_WORKSPACE_STATE )
        .subscribe ( ( state: CaseWorkspaceState ) => {
          if ( state ) {
            this.teams           = state.teams;
            this.queues          = state.queues;
            this.statuses        = state.statusOptions;
            this.request         = state.request;
            this.results         = state.results;
            this.dataSource.data = state.results ? state.results.content : [];
            if ( this.results ) {
              this.paginator.length = this.results.totalElements;
            }
          }
        } )
    );
  }

  private subscribeToSupportState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SUPPORT_STATE )
        .subscribe ( ( state: SupportState ) => {
          if ( state && state.sessionDefinitions && state.sessionDefinitions.length ) {
            this.sessionTypes = this.findSessionTypes();
          }
        } )
    );
  }

  private updateFieldState ( field: CaseWorkspaceSearchCodexFieldType, seed: CaseWorkspaceSearchCodexSeed ): void {
    let formFieldName = this.getFormFieldNameFromCodexFieldName ( field );
    let validators    = seed.isFieldRequired ( field ) ? [ Validators.required ] : [];

    let formControl = this.workspaceForm.get ( formFieldName );
    seed.isFieldEnabled ( field ) ? formControl.enable ( { emitEvent: false } ) : formControl.disable ( { emitEvent: false } );
    formControl.setValidators ( validators );
  }

  private updateForm (): void {
    let request = this.getRequestFromState ();
    if ( request ) {
      this.workspaceForm.get ( 'sid' ).setValue ( request.sid );
      this.workspaceForm.get ( 'serialNumber' ).setValue ( request.serialNumber );
      this.workspaceForm.get ( 'van' ).setValue ( request.van );
      this.workspaceForm.get ( 'caseType' ).setValue ( request.sessionType ? request.sessionType : this.ANY_PLACEHOLDER );
      this.workspaceForm.get ( 'queue' ).setValue ( request.queueId ? request.queueId : this.ANY_PLACEHOLDER );
      this.workspaceForm.get ( 'status' ).setValue ( request.status ? request.status : this.ANY_PLACEHOLDER );
      this.workspaceForm.get ( 'team' ).setValue ( request.teamId ? request.teamId : this.ANY_PLACEHOLDER );
      this.workspaceForm.get ( 'assignee' ).setValue ( request.userId ? request.userId : this.ANY_PLACEHOLDER );
    } else {
      this.workspaceForm.get ( 'sid' ).setValue ( null, { emitEvent: false } );
      this.workspaceForm.get ( 'serialNumber' ).setValue ( null, { emitEvent: false } );
      this.workspaceForm.get ( 'van' ).setValue ( null, { emitEvent: false } );
      this.workspaceForm.get ( 'caseType' ).setValue ( this.ANY_PLACEHOLDER, { emitEvent: false } );
      this.workspaceForm.get ( 'queue' ).setValue ( this.ANY_PLACEHOLDER, { emitEvent: false } );
      this.workspaceForm.get ( 'status' ).setValue ( this.ANY_PLACEHOLDER, { emitEvent: false } );
      this.workspaceForm.get ( 'team' ).setValue ( this.ANY_PLACEHOLDER, { emitEvent: false } );
      this.workspaceForm.get ( 'assignee' ).setValue ( this.ANY_PLACEHOLDER, { emitEvent: false } );
    }
  }

  private updateFormState ( seed: CaseWorkspaceSearchCodexSeed ): void {
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.ASSIGNEE, seed );
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.CASE_ID, seed );
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.CASE_TYPE, seed );
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.QUEUE, seed );
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.SERIAL_NUMBER, seed );
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.STATUS, seed );
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.TEAM, seed );
    this.updateFieldState ( CaseWorkspaceSearchCodexFieldType.VAN, seed );
  }

  private watchTeamChanges (): void {
    this.addSubscription (
      this.workspaceForm.get ( 'team' ).valueChanges
        .subscribe ( ( id: any ) => {
          if ( id && id !== this.ANY_PLACEHOLDER ) {
            this.workspaceForm.get ( 'assignee' ).setValue ( this.ANY_PLACEHOLDER );
            this.teamService.findOne ( id )
              .subscribe ( ( team: Team ) => {
                this.users = team.members;
              } );
          }
        } )
    );
  }

  private watchUserChanges (): void {
    this.addSubscription (
      this.workspaceForm.get ( 'assignee' ).valueChanges
        .pipe (
          debounceTime ( 300 ),
          flatMap ( ( value: any ) => {

            if ( value && !(value instanceof User) && value !== this.ANY_PLACEHOLDER ) {
              this.assigneeSearchText = value;
              return this.userService.search ( value )
                .pipe (
                  tap ( ( users: User[] ) => {
                    this.users = users;
                  } )
                );
            } else {
              return of ( [] );
            }
          } )
        )
        .subscribe ()
    );

    if ( this.request && this.request.assigneeSearchText && this.request.userId ) {
      this.userService.search ( this.request.assigneeSearchText )
        .subscribe ( ( users: User[] ) => {
          let assignee = _.find ( users, ( user: User ) => {
            return user.id === this.request.userId;
          } );
          this.workspaceForm.get ( 'assignee' ).setValue ( assignee );
          this.runFormValidation ();
        } );
    }
  }

  /**
   * Wait for support data, then watch for route query params.
   */
  private watchSupportState(): void {
    this.supportSubscription = this.store.select(AppStateType.SUPPORT_STATE).subscribe((support: SupportState) => {
      if (support.sessionDefinitions && support.partners) {
        if (this.supportSubscription) {
          this.supportSubscription.unsubscribe();
        }
        this.watchRouteChange();
      }
    });
    this.addSubscription(this.supportSubscription);
  }

  /**
   * Watch for route query params.  If any are valid search fields, then update the form and search on them.
   * Do this once so unsubscribe.  This is intended to use the query params as the route changes, and not by
   * dynamically updating the query params on this route.
   */
  private watchRouteChange(): void {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      let request: CaseSearchRequest = new CaseSearchRequest();
      if (params[CaseWorkspaceSearchCodexFieldType.CASE_ID]) {
        request.sid = params[CaseWorkspaceSearchCodexFieldType.CASE_ID];
      }

      if (request.sid && request.sid.length > 0) {
        if (this.routeSubscription) {
          this.routeSubscription.unsubscribe();
        }
        this.logger.debug('CaseWorkspaceComponent: Query param route change');
        of(null).pipe(delay(500)).subscribe(() => {
          this.store.dispatch(new CaseWorkspaceSetRequestAction(request));
          this.updateForm();
          this.search();
        });
      }
    });
    this.addSubscription(this.routeSubscription);
  }
}
