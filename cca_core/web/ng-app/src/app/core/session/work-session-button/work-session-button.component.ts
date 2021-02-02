import { Component, Input, OnInit } from '@angular/core';
import { SecurityService } from "../../security/security.service";
import { Session } from "../model/session";
import { SessionTypeType } from "../session-type-type.enum";
import { UpdateSessionView } from "../model/update-session-view";
import { flatMap } from "rxjs/operators";
import { SessionService } from "../session.service";
import { Workflow } from "../../workflow/workflow.service";
import { SessionStatusType } from "../model/session-status-type.enum";

@Component ( {
  selector: 'cca-work-session-button',
  templateUrl: './work-session-button.component.html',
  styleUrls: [ './work-session-button.component.scss' ]
} )
export class WorkSessionButtonComponent implements OnInit {

  @Input ()
  session: Session;
  @Input()
  canWork: boolean = false;

  hasPermission: boolean = false;
  tooltip: string;

  constructor ( private securityService: SecurityService,
                private sessionService: SessionService,
                private workflow: Workflow ) {
  }

  ngOnInit () {
    this.setHasPermission ();
    this.setTooltip ();
  }

  workSession (): void {
    let request    = new UpdateSessionView ();
    request.id     = this.session.id;
    request.userId = this.securityService.getCurrentUser ().id;

    //These just need to be populated to ensure we don't accidentally clear anything out while we reassign the case
    request.categoryId   = this.session.wrapUpCodeCategory ? this.session.wrapUpCodeCategory.id : null;
    request.queueId      = this.session.queue ? this.session.queue.id : null;
    request.sessionType  = this.session.sessionTypeType;
    request.status       = this.session.status.value;
    request.teamId       = this.session.team ? this.session.team.id : null;
    request.wrapUpCodeId = this.session.wrapUpCode ? this.session.wrapUpCode.id : null;

    if ( this.session.isInClosedStatus () ) {
      request.status = SessionStatusType.ACTIVE;
    }

    this.sessionService.updateOne ( request )
      .pipe ( flatMap ( () => {
        return this.workflow.loadSessionFromId ( this.session.id );
      } ) )
      .subscribe ();
  }

  private setHasPermission (): void {
    const isGeneralOrCall = this.session.sessionTypeType === SessionTypeType.GENERAL || this.session.sessionTypeType === SessionTypeType.CALL;
    const isSessionOwner = this.session.user && this.session.user.id === this.securityService.getCurrentUser ().id;
    const hasQueuePermission = !!this.session.queue && this.securityService.hasPermission ( this.session.queue.permission.systemName );
    this.hasPermission = this.canWork || (isGeneralOrCall && isSessionOwner) || hasQueuePermission;
  }

  private setTooltip (): void {
    this.tooltip = 'Work';

    if ( !this.hasPermission ) {
      this.tooltip = 'You do not have sufficient privileges to work this Session';
    } else if ( this.session.isInSystemStatus () ) {
      this.tooltip = 'Session cannot be worked due to its system status';
    } else if ( this.session.isInClosedStatus () ) {
      this.tooltip = 'Re-Open';
    }
  }
}
