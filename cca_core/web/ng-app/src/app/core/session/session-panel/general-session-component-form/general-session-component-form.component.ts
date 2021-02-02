import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { CcaBaseComponent } from "../../../cca-base-component";
import { SessionType } from "../../model/session-type";
import { SessionQueue } from '../../model/session-queue';
import { WrapUpCodeCategory } from "../../model/wrap-up-code-category";
import { WrapUpCode } from "../../model/wrap-up-code";
import { Team } from '../../../auth/team';
import { snapshot } from "../../../store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";
import { SupportState } from '../../../support/support-state';
import { Session } from "../../model/session";
import { SpinnerComponent } from "../../../spinner/spinner.component";
import { QueueService } from "../../../queue/queue.service";
import {debounceTime, finalize, tap} from "rxjs/operators";
import * as _ from "lodash";
import { WrapUpCodeCategoryService } from "../../../wrap-up-code-category/wrap-up-code-category.service";
import { WrapUpCodeService } from "../../../wrap-up-code/wrap-up-code.service";
import { UpdateSessionView } from "../../model/update-session-view";
import { SessionService } from "../../session.service";
import {
  UpdateSessionAction,
  UpdateSessionInWorkspaceAction,
  UpdateSessionStatusAction
} from "../../action/session-actions";
import { SessionTypeType } from "../../session-type-type.enum";
import { SessionDefinitionService } from "../../session-definition.service";
import { User } from "../../../user/user";
import { SecurityService } from "../../../security/security.service";
import { SessionValidator } from "../../session-validator.service";
import { SessionClassType } from "../../session-class-type.enum";
import { SessionState } from "../../session-state";
import {interval, Observable, Subscription} from 'rxjs';
import { SessionFeedbackService } from "../../session-feedback.service";

@Component ( {
  selector: 'cca-general-session-component-form',
  templateUrl: './general-session-component-form.component.html',
  styleUrls: [ './general-session-component-form.component.scss' ]
} )
export class GeneralSessionComponentFormComponent extends CcaBaseComponent implements OnInit {

  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  @Input ()
  form: FormGroup;

  assigneeOptions: User[]               = [];
  categoryOptions: WrapUpCodeCategory[] = [];
  currentUser: User;
  isAssignedToCurrentUser: boolean      = false;
  queueOptions: SessionQueue[]          = [];
  session: Session;
  sessionTypeOptions: SessionType[]     = [];
  statusOptions: any[]                  = [];
  teamOptions: any[]                    = [];
  wrapUpCodeOptions: WrapUpCode[]       = [];

  summarySubscription: Subscription;

  @ViewChild ( 'categorySpinner' )
  categorySpinner: SpinnerComponent;
  @ViewChild ( 'queueSpinner' )
  queueSpinner: SpinnerComponent;
  @ViewChild ( 'wrapUpCodeSpinner' )
  wrapUpCodeSpinner: SpinnerComponent;

  private missingComponentsForClosure: string[] = [];

  constructor ( private queueService: QueueService,
                private securityService: SecurityService,
                private sessionDefinitionService: SessionDefinitionService,
                private sessionService: SessionService,
                private sessionValidator: SessionValidator,
                private sessionFeedbackService: SessionFeedbackService,
                private store: Store<AppState>,
                private wrapUpCodeCategoryService: WrapUpCodeCategoryService,
                private wrapUpCodeService: WrapUpCodeService ) {
    super ();
  }

  ngOnInit () {
    this.currentUser = this.securityService.getCurrentUser();
    this.subscribeToSessionState();
    this.startWatcher();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.summarySubscription) {
      this.summarySubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) {
      if (this.summarySubscription) {
        this.summarySubscription.unsubscribe();
      }

      this.summarySubscription = this.form.get('summary').valueChanges
        .pipe(
          debounceTime(500)
        )
        .subscribe(() => {
          this.saveSession();
        });
    }
  }

  compareById ( a: any, b: any ): boolean {
    return a && b && a.id === b.id;
  }

  handleCategorySelection (): void {
    this.form.get ( 'wrapUpCode' ).reset ();
    this.saveSession ();
  }

  handleQueueSelection (): void {
    this.form.get ( 'category' ).reset ();
    this.form.get ( 'wrapUpCode' ).reset ( { value: null, disabled: true } );
    this.saveSession ();
  }

  handleSessionTypeSelection (): void {
    this.form.get ( 'queue' ).reset ();
    this.form.get ( 'category' ).reset ();
    this.form.get ( 'wrapUpCode' ).reset ();
    this.saveSession ();
  }

  saveSession (): void {
    this.addSubscription (
      this._saveSession ()
        .subscribe ()
    );
  }

  private _saveSession (): Observable<Session> {
    const request: UpdateSessionView = this.buildUpdateSessionView ();
    return this.sessionService.updateOne ( request )
      .pipe (
        tap ( session => {
          this.store.dispatch ( new UpdateSessionAction ( session ) );
          this.store.dispatch ( new UpdateSessionInWorkspaceAction( session ) );
        } )
      );
  }

  statusChanged (): void {
    this.addSubscription (
      this._saveSession ()
        .subscribe ( session => {
          this.store.dispatch ( new UpdateSessionStatusAction ( session ) );
        } )
    );
  }

  private autoSelectAssignee (): void {
    //If the session has a user, select it in the FormControl
    if ( this.session.user ) {
      //Find the user matching the session's user from the array of options
      let component  = this;
      let user: User = _.find ( this.assigneeOptions, function ( user: User ) {
        return user.id === component.session.user.id;
      } );
      //If we found a match, select it in the FormControl
      if ( user ) {
        this.form.get ( 'assignee' ).setValue ( user );
      }
      //Else, add the user to the array of options and select it
      else {
        this.assigneeOptions.push ( this.session.user );
        this.form.get ( 'assignee' ).setValue ( this.session.user );
      }
    }
  }

  private autoSelectQueue (): void {
    //If the session has a queue, select it in the FormControl
    if ( this.session.queue ) {
      //Find the queue matching the session's queue from the array of options
      let component                  = this;
      let sessionQueue: SessionQueue = _.find ( this.queueOptions, function ( queue: SessionQueue ) {
        return queue.id === component.session.queue.id;
      } );
      //If we found a match, select it in the FormControl
      if ( sessionQueue ) {
        this.form.get ( 'queue' ).setValue ( sessionQueue );
      }
      //Else, add the session's queue to the array of options and select it
      else {
        this.queueOptions.push ( this.session.queue );
        this.form.get ( 'queue' ).setValue ( this.session.queue );
      }
    }
    //Else if there is only one option, select it and trigger a save
    else if ( this.queueOptions.length === 1 ) {
      this.form.get ( 'queue' ).setValue ( this.queueOptions[ 0 ] );
      this.saveSession ();
    }

    this.updateCategoryOptions ();
  }

  private autoSelectCategory (): void {
    //If the session has a category, select it in the FormControl
    if ( this.session.wrapUpCodeCategory ) {
      //Find the category matching the session's category from the array of options
      let component                    = this;
      let category: WrapUpCodeCategory = _.find ( this.categoryOptions, function ( category: WrapUpCodeCategory ) {
        return category.id === component.session.wrapUpCodeCategory.id;
      } );
      //If we found a match, select it in the FormControl
      if ( category ) {
        this.form.get ( 'category' ).setValue ( category );
      }
      //Else, add the session's category to the array of options and select it
      else {
        this.categoryOptions.push ( this.session.wrapUpCodeCategory );
        this.form.get ( 'category' ).setValue ( this.session.wrapUpCodeCategory );
      }
    }
    //Else if there is only one option, select it and trigger a save
    else if ( this.categoryOptions.length === 1 ) {
      this.form.get ( 'category' ).setValue ( this.categoryOptions[ 0 ] );
      this.saveSession ();
    }

    this.updateWrapUpCodeOptions ();
  }

  private autoSelectWrapUpCode (): void {
    //If the session has a wrapUpCode, select it in the FormControl
    if ( this.session.wrapUpCode ) {
      //Find the code matching the session's code from the array of options
      let component        = this;
      let code: WrapUpCode = _.find ( this.wrapUpCodeOptions, function ( code: WrapUpCode ) {
        return code.id === component.session.wrapUpCode.id;
      } );
      //If we found a match, select it in the FormControl
      if ( code ) {
        this.form.get ( 'wrapUpCode' ).setValue ( code );
      }
      //Else, add the session's code to the array of options and select it
      else {
        this.wrapUpCodeOptions.push ( this.session.wrapUpCode );
        this.form.get ( 'wrapUpCode' ).setValue ( this.session.wrapUpCode );
      }
    }
    //Else if there is only one option, select it and trigger a save
    else if ( this.wrapUpCodeOptions.length === 1 ) {
      this.form.get ( 'wrapUpCode' ).setValue ( this.wrapUpCodeOptions[ 0 ] );
      this.saveSession ();
    }
  }

  private autoSelectTeam (): void {
    //If the session has a team, select it in the FormControl
    if ( this.session.team ) {
      //Find the team matching the session's team from the array of options
      let component  = this;
      let team: Team = _.find ( this.teamOptions, function ( team: Team ) {
        return team.id === component.session.team.id;
      } );
      //If we found a match, select it in the FormControl
      if ( team ) {
        this.form.get ( 'team' ).setValue ( team );
      }
      //Else, add the session's team to the array of options and select it
      else {
        this.teamOptions.push ( this.session.team );
        this.form.get ( 'team' ).setValue ( this.session.team );
      }

    }
  }

  private buildUpdateSessionView (): UpdateSessionView {
    let view: UpdateSessionView = new UpdateSessionView ();
    view.id                     = this.session.id;

    view.summary = this.form.get('summary').value;

    let categoryControl: AbstractControl = this.form.get ( 'category' );
    view.categoryId                      = (categoryControl && categoryControl.value) ? categoryControl.value.id : null;

    let queueControl: AbstractControl = this.form.get ( 'queue' );
    view.queueId                      = (queueControl && queueControl.value) ? queueControl.value.id : null;

    let wrapUpCodeControl: AbstractControl = this.form.get ( 'wrapUpCode' );
    view.wrapUpCodeId                      = (wrapUpCodeControl && wrapUpCodeControl.value) ? wrapUpCodeControl.value.id : null;

    let sessionTypeControl: AbstractControl = this.form.get ( 'sessionType' );
    view.sessionType                        = sessionTypeControl ? sessionTypeControl.value : this.session.sessionTypeType;

    let statusControl: AbstractControl = this.form.get ( 'status' );
    view.status                        = statusControl ? statusControl.value : this.session.status.value;

    let teamControl: AbstractControl = this.form.get ( 'team' );
    view.teamId                      = teamControl ? (teamControl.value ? teamControl.value.id : null) : (this.session.team ? this.session.team.id : null);

    let assigneeControl: AbstractControl = this.form.get ( 'assignee' );
    if ( assigneeControl && assigneeControl.value === 'ASSIGN_TO_ME' ) {
      view.userId = this.currentUser.id;
    } else {
      view.userId = assigneeControl ? (assigneeControl.value ? assigneeControl.value.id : null) : (this.session.user ? this.session.user.id : null);
    }

    return view;
  }

  //TODO: remove this in favor of subscribing to an Observable
  private startWatcher (): void {
    this.addSubscription (
      interval ( 50 ).subscribe ( {
        next: value => {
          this.missingComponentsForClosure = _.orderBy ( this.sessionFeedbackService.getClosureFeedback ( this.session, false ) );
        }
      } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            let lastSessionType: SessionTypeType = this.session ? this.session.sessionTypeType : null;
            let lastQueue: SessionQueue          = this.session ? this.session.queue : null;
            let lastCategory: WrapUpCodeCategory = this.session ? this.session.wrapUpCodeCategory : null;
            let lastTeam: Team                   = this.session ? this.session.team : null;

            this.isAssignedToCurrentUser = false;
            this.session                 = state.session;
            if ( this.session ) {
              this.isAssignedToCurrentUser = this.securityService.isCurrentUser ( this.session.user );

              if ( !lastSessionType || lastSessionType !== this.session.sessionTypeType ) {
                this.updateQueueOptions ();
                if ( this.session.sessionClassType === SessionClassType.CASE ) {
                  this.updateStatusOptions ();
                }
              } else if ( !lastQueue || lastQueue.id !== this.session.queue.id || (!lastCategory && this.session.wrapUpCodeCategory) || (lastCategory && this.session.wrapUpCodeCategory && this.session.wrapUpCodeCategory.id !== lastCategory.id) ) {
                this.updateCategoryOptions ();
              } else if ( !lastCategory || lastCategory.id !== this.session.wrapUpCodeCategory.id ) {
                this.updateWrapUpCodeOptions ();
              }

              if ( this.session.sessionClassType === SessionClassType.CASE ) {
                if ( !lastTeam || (this.session.team && lastTeam.id !== this.session.team.id) ) {
                  this.updateTeamOptions ();
                }
                this.updateAssigneeOptions ();
              }
            }
          }
        } )
    );
  }

  private triggerFormDisable (): void {
    if ( this.session && this.sessionValidator.isDisabled ( this.session ) ) {
      this.form.disable ();
    }
  }

  private updateAssigneeOptions (): void {
    if ( this.sessionValidator.isDisabled ( this.session ) && this.session.team ) {
      this.assigneeOptions = this.session.team.members;
    }
    this.autoSelectAssignee ();
    this.triggerFormDisable ();
  }

  private updateCategoryOptions (): void {
    if ( !this.sessionValidator.isDisabled ( this.session ) ) {
      if ( this.session.queue ) {
        if ( !this.session.callComponent ) {
          this.form.get ( 'category' ).enable ();
        }
        if ( this.categorySpinner ) {
          this.categorySpinner.start ();
        }
        this.wrapUpCodeCategoryService.findAllByQueueId ( this.session.queue.id )
          .pipe ( finalize ( () => {
            this.categorySpinner.stop ();
          } ) )
          .subscribe ( {
            next: categories => {
              this.categoryOptions = categories;
              this.autoSelectCategory ();
              if ( this.categoryOptions.length === 1 ) {
                this.form.get ( 'category' ).disable ();
              } else {
                this.form.get ( 'category' ).enable ();
              }
            }
          } );
      } else {
        this.form.get ( 'category' ).disable ();
      }
      this.form.get ( 'wrapUpCode' ).disable ();
    } else {
      this.autoSelectCategory ();
    }
    this.triggerFormDisable ();
  }

  private updateQueueOptions (): void {
    if ( !this.sessionValidator.isDisabled ( this.session ) ) {
      if ( this.session.sessionTypeType ) {
        if ( !this.session.callComponent ) {
          this.form.get ( 'queue' ).enable ();
        }
        if ( this.queueSpinner ) {
          this.queueSpinner.start ();
        }
        this.queueService.findAllBySessionType ( this.session.sessionTypeType )
          .pipe ( finalize ( () => {
            this.queueSpinner.stop ();
          } ) )
          .subscribe ( {
            next: queues => {
              this.queueOptions = queues;
              this.autoSelectQueue ();
              if ( this.queueOptions.length === 1 ) {
                this.form.get ( 'queue' ).disable ();
              } else {
                this.form.get ( 'queue' ).enable ();
              }
            }
          } );
      } else {
        this.form.get ( 'queue' ).disable ();
      }
      this.form.get ( 'category' ).disable ();
      this.form.get ( 'wrapUpCode' ).disable ();
    } else {
      this.autoSelectQueue ();
    }

    this.triggerFormDisable ();
  }

  private updateStatusOptions (): void {
    if ( this.session.sessionType ) {
      this.statusOptions = this.sessionDefinitionService.getExpandedStatuses ( this.session.sessionType.statuses );
    }
    this.triggerFormDisable ();
  }

  private updateTeamOptions (): void {
    if ( !this.sessionValidator.isDisabled ( this.session ) ) {
      let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
      this.teamOptions               = supportState.teams;
      this.updateAssigneeOptions ();
    }
    this.autoSelectTeam ();
    this.triggerFormDisable ();
  }

  private updateWrapUpCodeOptions (): void {
    if ( !this.sessionValidator.isDisabled ( this.session ) ) {
      if ( this.session.wrapUpCodeCategory ) {
        if ( !this.session.callComponent ) {
          this.form.get ( 'wrapUpCode' ).enable ();
        }
        if ( this.wrapUpCodeSpinner ) {
          this.wrapUpCodeSpinner.start ();
        }
        this.wrapUpCodeService.findAllByCategoryId ( this.session.wrapUpCodeCategory.id )
          .pipe ( finalize ( () => {
            this.wrapUpCodeSpinner.stop ();
          } ) )
          .subscribe ( {
            next: wrapUpCodes => {
              this.wrapUpCodeOptions = wrapUpCodes;
              this.autoSelectWrapUpCode ();
              if ( this.wrapUpCodeOptions.length === 1 ) {
                this.form.get ( 'wrapUpCode' ).disable ();
              } else {
                this.form.get ( 'wrapUpCode' ).enable ();
              }
            }
          } )
      } else {
        this.form.get ( 'wrapUpCode' ).disable ();
      }
    } else {
      this.autoSelectWrapUpCode ();
    }

    this.triggerFormDisable ();
  }

}
