import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CcaBaseComponent } from "../../../cca-base-component";
import { Store } from "@ngrx/store";
import { AppStateType } from "../../../../app-state-type.enum";
import { AppState } from '../../../../app-state';
import { Session } from '../../model/session';
import { SpinnerComponent } from "../../../spinner/spinner.component";
import { SessionFeedbackService } from "../../session-feedback.service";
import { SessionClassType } from "../../session-class-type.enum";
import * as _ from "lodash";
import { SessionClass } from "../../model/session-class";
import { snapshot } from "../../../store-utils/store-utils";
import {
  CloseSessionAction,
  DismissSessionAction,
  RemoveSessionFromWorkspaceAction
} from "../../action/session-actions";
import { RoutingService } from "../../../routing/routing.service";
import { UrlQueryParam } from "../../../routing/url-query-param.enum";
import { CloseDockTabAction } from "../../../dock/action/close-dock-tab-action";
import { SessionService } from "../../session.service";
import { finalize } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { interval, Observable, of, Subject } from 'rxjs';
import { CommentRequest } from "../../../model/comment-request";
import { SessionState } from "../../session-state";
import { CommentService } from "../../../comment/comment.service";
import { SessionDefinitionService } from "../../session-definition.service";
import { ClearSearchTypesAction } from "../../../search/action/clear-search-types-action";
import { Workflow } from '../../../workflow/workflow.service';
import { ClearDockSelectionsTabAction } from "../../../dock/dock/selections-tab/dock-selections-tab-actions";
import { WizardRunner } from "../../../wizard/wizard-runner/wizard-runner.service";
import { ChangeSessionTypeWizard } from "./change-session-type/change-session-type-wizard";
import { RaiseCaseWizard } from "./raise-case/raise-case-wizard";
import { Selection } from "../../model/selection";
import { PersonalInfoWizard } from "./personal-info-wizard/personal-info-wizard";
import { SecurityService } from "../../../security/security.service";
import { Permission } from "../../../auth/permission";
import { LogComplaintWizard } from "./log-complaint/log-complaint-wizard";

@Component ( {
  selector: 'cca-session-actions',
  templateUrl: './session-actions.component.html',
  styleUrls: [ './session-actions.component.scss' ]
} )
export class SessionActionsComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;

  closeTooltip: string                        = null;
  hasPersonalInfoRequestPermission: boolean   = false;
  hasPermissionToLogComplaint: boolean        = false;
  ivrTooltip: string                          = null;
  permittedSessionDefinitions: SessionClass[] = [];
  session: Session;
  SessionClassType                            = SessionClassType;

  @ViewChild ( 'closeSessionSpinner' )
  closeSessionSpinner: SpinnerComponent;
  @ViewChild ( 'dismissSessionSpinner' )
  dismissSessionSpinner: SpinnerComponent;
  @ViewChild ( 'ivrSpinner' )
  ivrSpinner: SpinnerComponent;

  private missingComponentsForClosure: string[] = [];
  private selection: Selection<any>;

  constructor ( private commentService: CommentService,
                private routingService: RoutingService,
                private securityService: SecurityService,
                private sessionDefinitionService: SessionDefinitionService,
                private sessionFeedbackService: SessionFeedbackService,
                private sessionService: SessionService,
                private store: Store<AppState>,
                private wizardRunner: WizardRunner,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.checkLogComplaintPermissions ();
    this.startWatcher ();
    this.subscribeToSessionState ();
    this.permittedSessionDefinitions      = this.sessionDefinitionService.getPermittedDefinitions ();
    this.hasPersonalInfoRequestPermission = this.securityService.hasPermission ( Permission.PERSONAL_INFO_REQUEST );
  }

  closeSession (): void {
    this.closeSessionSpinner.start ();

    //If there's content in the comment field, we need to save it before we close the session
    this.addSubscription (
      this.saveComment ()
        .subscribe ( () => {
          //Now we close the session
          this.sessionService.closeSession ( this.session.id )
            .subscribe ( ( session: Session ) => {
              //And clear necessary states
              this.store.dispatch ( new CloseSessionAction ( session ) );
              this.store.dispatch ( new ClearSearchTypesAction () );

              this.routingService.setQueryParam ( UrlQueryParam.SESSION_SESSION_ID, null );
              this.routingService.navigateToDefaultLandingPage ();

              this.store.dispatch ( new CloseDockTabAction () );
              this.store.dispatch ( new ClearDockSelectionsTabAction () );
            } );
        } )
    );
  }

  dismissSession (): void {
    this.dismissSessionSpinner.start ();

    this.routingService.setQueryParam ( UrlQueryParam.SESSION_SESSION_ID, null );
    this.routingService.navigateToDefaultLandingPage ();

    //Either Cancel or Dismiss the session as appropriate, auto-cancelling only if "clean" session is NOT a case
    if ( this.session.isDirty () || this.session.sessionClassType === SessionClassType.CASE ) {
      this.dismissSessionSpinner.stop ();
    } else {
      this.sessionService.cancelSession ( this.session.id )
        .pipe ( finalize ( () => {
          this.dismissSessionSpinner.stop ();
          this.store.dispatch ( new RemoveSessionFromWorkspaceAction ( this.session ) );
        } ) )
        .subscribe ();
    }

    this.store.dispatch ( new CloseDockTabAction () );
    this.store.dispatch ( new DismissSessionAction () );
    this.store.dispatch ( new ClearSearchTypesAction () );
    this.store.dispatch ( new ClearDockSelectionsTabAction () );
  }

  isCommentInProgress (): boolean {
    let commentValue = this.form.get ( 'commentsComponent' ).value.comment;

    return this.session
      && this.session.sessionClassType === SessionClassType.CALL_CENTER
      && commentValue
      && commentValue.length >= 5;
  }

  openChangeSessionTypeDialog (): void {
    let wizard           = new ChangeSessionTypeWizard ();
    wizard.model.session = this.session;
    this.wizardRunner.run ( wizard );
  }

  openPersonalInfo (): void {
    let wizard             = new PersonalInfoWizard ();
    wizard.model.session   = this.session;
    wizard.model.selection = this.selection;
    this.wizardRunner.run ( wizard );
  }

  openLogComplaint (): void {
    let wizard             = new LogComplaintWizard ();
    wizard.model.session   = this.session;
    wizard.model.selection = this.selection;
    this.wizardRunner.run ( wizard );
  }

  openRaiseCase (): void {
    let wizard             = new RaiseCaseWizard ();
    wizard.model.session   = this.session;
    wizard.model.selection = this.selection;
    this.wizardRunner.run ( wizard );
  }

  retryCallConnectSearch (): void {
    this.ivrSpinner.start ();

    this.addSubscription (
      this.workflow.forwardingSearchForCallConnect ()
        .pipe ( finalize ( () => this.ivrSpinner.stop () ) )
        .subscribe ()
    );
  }

  private buildCloseTooltip (): void {
    this.closeTooltip = null;
    if ( this.missingComponentsForClosure.length ) {
      this.closeTooltip =
        `
The Session is missing:
${this.missingComponentsForClosure.map ( ( value ) => `* ${value}
` ).join ( '' )}
                        `;
    }
  }

  private buildIvrTooltip (): void {
    this.ivrTooltip = null;
    if ( this.session
      && this.session.callComponent ) {
      this.ivrTooltip =
        `
Click to retry IVR Search.

Original IVR Data for this Call:
${_.padEnd ( 'UID', 15 )}${this.session.callComponent.uid || ''}
${_.padEnd ( 'ANI', 15 )}${this.session.callComponent.originalAni || ''}
${_.padEnd ( 'DNIS', 15 )}${this.session.callComponent.originalDnis || ''}
${_.padEnd ( 'Account Number', 15 )}${this.session.callComponent.accountNumber || ''}
${_.padEnd ( 'Account ID', 15 )}${this.session.callComponent.accountId || ''}
${_.padEnd ( 'Last Four', 15 )}${this.session.callComponent.lastFour || ''}
${_.padEnd ( 'Order Number', 15 )}${this.session.callComponent.orderNumber || ''}
${_.padEnd ( 'PIN', 15 )}${this.session.callComponent.pin || ''}
${_.padEnd ( 'Platform', 15 )}${this.session.callComponent.platform || ''}
${_.padEnd ( 'Proxy Number', 15 )}${this.session.callComponent.proxyNumber || ''}
${_.padEnd ( 'Serial Number', 15 )}${this.session.callComponent.serialNumber || ''}
${_.padEnd ( 'VAN', 15 )}${this.session.callComponent.van || ''}
                      `;
    }
  }

  private checkLogComplaintPermissions (): void {
    this.hasPermissionToLogComplaint = this.securityService.hasAnyPermission ( [
      Permission.CREATE_COMPLAINT_AMERICAN_EXPRESS,
      Permission.CREATE_COMPLAINT_BANCORP,
      Permission.CREATE_COMPLAINT_MASTERCARD,
      Permission.CREATE_COMPLAINT_METABANK,
    ] );
  }

  /**
   * If content is still sitting in the comment field, we need to save it before closing the session.
   */
  private saveComment (): Observable<any> {
    let commentForm      = this.form.get ( 'commentsComponent' );
    let commentFormValue = commentForm.value;
    if ( commentFormValue && commentFormValue.comment ) {
      let request: CommentRequest = {
        isPrivate: commentFormValue.isPrivate,
        content: commentFormValue.comment
      };

      let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
      let sessionId                  = sessionState.session.id;

      let subject = new Subject ();

      this.commentService.addOne ( sessionId, request )
        .subscribe ( () => {
          subject.next ( true );
          subject.complete ();
        } );

      return subject;
    } else {
      return of ( true );
    }
  }

  //TODO: remove this in favor of subscribing to an Observable
  private startWatcher (): void {
    this.addSubscription (
      interval ( 50 ).subscribe ( {
        next: value => {
          this.missingComponentsForClosure = _.orderBy ( this.sessionFeedbackService.getClosureFeedback ( this.session, this.isCommentInProgress () ) );
          this.buildCloseTooltip ();
        }
      } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
        next: sessionState => {
          if ( sessionState ) {
            this.session   = sessionState.session;
            this.selection = sessionState.selection;
          } else {
            this.missingComponentsForClosure = [];
          }
          this.buildIvrTooltip ();
        }
      } )
    );
  }

}
