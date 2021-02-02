import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { EditCaseWizard } from "../edit-case-wizard";
import { WizardWidth } from "../../../core/wizard/wizard-width.enum";
import { Observable, of } from "rxjs";
import { Team } from "../../../core/auth/team";
import { TeamService } from "../../../core/team/team.service";
import { User } from "../../../core/user/user";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { SecurityService } from "../../../core/security/security.service";
import { EditCaseRequest } from "../edit-case-request";
import { SessionDefinitionService } from "../../../core/session/session-definition.service";
import { SessionClassType } from "../../../core/session/session-class-type.enum";
import {
  getSessionStatusTypeDisplayValue,
  SessionStatusType
} from "../../../core/session/model/session-status-type.enum";

@Component ( {
  selector: 'cca-edit-case-wizard',
  templateUrl: './edit-case-wizard.component.html',
  styleUrls: [ './edit-case-wizard.component.scss' ]
} )
export class EditCaseWizardComponent extends WizardPage<EditCaseWizard> implements OnInit {
  isClosedCase: boolean;
  key: string           = 'form-page';
  members: User[]       = [];
  statusOptions: any[]  = [];
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private store: Store<AppState>,
                private securityService: SecurityService,
                private sessionDefinitionService: SessionDefinitionService,
                private teamService: TeamService ) {
    super ();
    this.isCloseable = true;
    this.isNextable  = true;
    this.width       = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.isClosedCase = this.wizard.model.session.sessionClassType === SessionClassType.CASE && this.wizard.model.session.status.value === SessionStatusType.CLOSED;

    this.initForm ();
    this.subscribeToFormChanges ();

    if ( this.wizard.model.session.team ) {
      this.populateTeamDropDown ();
    }
    if ( this.isClosedCase ) {
      this.updateStatusOptions ();
    }
    this.addCurrentAssignee ( this.wizard.model.session.user );
  }

  onNext (): Observable<string> {
    this.manageClosedCase ();
    this.manageReviewData ();
    this.wizard.model.request = this.buildRequest ();

    return of ( 'review-page' );
  }

  private addCurrentAssignee ( user: User ) {
    this.members = this.addUser ( this.members, user );
    this.wizardForm.get ( 'members' ).setValue ( user );
  }

  private addUser ( assignees: User[], userToAdd: User ): User[] {
    if ( !assignees.find ( user => user.id === userToAdd.id ) ) {
      assignees.push ( userToAdd );
    }
    return assignees;
  }

  private buildRequest (): EditCaseRequest {
    let request          = new EditCaseRequest ();
    request.id           = this.wizard.model.session.id;
    request.categoryId   = this.wizard.model.session.wrapUpCodeCategory ? this.wizard.model.session.wrapUpCodeCategory.id : null;
    request.queueId      = this.wizard.model.session.queue ? this.wizard.model.session.queue.id : null;
    request.sessionType  = this.wizard.model.session.sessionType.getType ();
    request.status       = this.wizard.model.session.status.value;
    request.teamId       = this.wizardForm.get ( 'team' ).value ? this.wizardForm.get ( 'team' ).value.id : null;
    request.userId       = this.wizardForm.get ( 'members' ).value ? this.wizardForm.get ( 'members' ).value.id : null;
    request.wrapUpCodeId = this.wizard.model.session.wrapUpCode ? this.wizard.model.session.wrapUpCode.id : null;

    return request;
  }

  private findOne ( id ): void {
    this.teamService.findOne ( id )
      .subscribe ( ( team: Team ) => {
        // Add the current user to the list => this is a change from legacy that had an "Assign to Me" button
        this.members = this.addUser ( team.members, this.securityService.getCurrentUser () );

        // Add the current assignee to the list and pre-populate
        if ( this.wizard.model.session.user ) {
          this.addCurrentAssignee ( this.wizard.model.session.user );
          this.populateMemberDropDown ();
        }
      } )
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      team: new FormControl ( [] ),
      members: new FormControl ( [] ),
      status: new FormControl ( [] )
    } );
  }

  private manageClosedCase () {
    if ( this.isClosedCase && this.wizardForm.get ( 'status' ).value ) {
      this.wizard.model.session.status.value        = this.wizardForm.get ( 'status' ).value;
      this.wizard.model.session.status.displayValue = getSessionStatusTypeDisplayValue ( this.wizardForm.get ( 'status' ).value );
    }
  }

  private manageReviewData () {
    this.wizard.model.assignedTeam = this.wizardForm.get ( 'team' ).value ? this.wizardForm.get ( 'team' ).value : null;
    this.wizard.model.assignedUser = this.wizardForm.get ( 'members' ).value ? this.wizardForm.get ( 'members' ).value : null;
  }

  private populateMemberDropDown (): void {
    const toSelect = this.members.find ( member => member.id === this.wizard.model.session.user.id );
    if ( toSelect ) {
      this.wizardForm.get ( 'members' ).setValue ( toSelect );
    }
  }

  private populateTeamDropDown (): void {
    const toSelect = this.wizard.model.teams.find ( team => team.id === this.wizard.model.session.team.id );
    if ( toSelect ) {
      this.wizardForm.get ( 'team' ).setValue ( toSelect );
    }
  }

  private subscribeToFormChanges (): void {
    this.addSubscription (
      this.wizardForm.get ( 'team' ).valueChanges
        .subscribe ( {
          next: value => {
            this.findOne ( value.id );
          }
        } )
    );
  }

  private updateStatusOptions (): void {
    this.statusOptions = this.sessionDefinitionService.getExpandedStatuses ( this.wizard.model.session.sessionType.statuses );
    const result       = this.statusOptions.find ( option => option.displayName === this.wizard.model.session.status.displayValue );
    this.wizardForm.get ( 'status' ).setValue ( result.systemName );
  }
}
