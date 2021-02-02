import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {CsCoreTableColumn} from '@cscore/components';
import {SessionService} from '../../../core/session/session.service';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {AppState} from '../../../app-state';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {Session} from '../../../core/session/model/session';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {EditCaseWizard} from '../../../case-workspace/edit-case-wizard/edit-case-wizard';
import * as _ from 'lodash';
import {UpdateSessionView} from '../../../core/session/model/update-session-view';
import {SessionStatusType} from '../../../core/session/model/session-status-type.enum';
import {flatMap} from 'rxjs/operators';
import {SecurityService} from '../../../core/security/security.service';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {Workflow} from '../../../core/workflow/workflow.service';
import {TeamService} from '../../../core/team/team.service';
import {Team} from '../../../core/auth/team';
import {ViewSessionWizard} from '../../../core/session/view-session-wizard/view-session-wizard';
import {CaseService} from '../../../core/session/case.service';

@Component({
  selector: 'cca-related-cases-tab',
  templateUrl: './related-cases-tab.component.html'
})
export class RelatedCasesTabComponent extends CcaBaseComponent implements OnInit {

  @ViewChild('spinner') spinner: SpinnerComponent;
  dataSource                            = new MatTableDataSource<Session>();
  columns: CsCoreTableColumn<Session>[] = [
    {
      key: 'sid',
      label: 'Case ID (SID)',
      getValue: (session: Session) => session.id,
    },
    {
      key: 'createdDate',
      label: 'Created Date',
      getValue: (session: Session) => session.createdDate && session.createdDate.displayValue,
    },
    {
      key: 'type',
      label: 'Type',
      getValue: (session: Session) => session.sessionType && session.sessionType.displayName,
    },
    {
      key: 'queue',
      label: 'Queue',
      getValue: (session: Session) => session.queue && session.queue.displayName,
    },
    {
      key: 'status',
      label: 'Status',
      getValue: (session: Session) => session.status && session.status.displayValue
    },
    {
      key: 'team',
      label: 'Team',
      getValue: (session: Session) => session.team && session.team.displayName
    },
    {
      key: 'assignee',
      label: 'Assignee',
      getValue: (session: Session) => session.user && session.user.username
    },
    {
      key: 'actions',
      label: 'Actions',
      getValue: (session: Session) => null
    }
  ];

  constructor(private caseService: CaseService,
              private sessionService: SessionService,
              private securityService: SecurityService,
              private teamService: TeamService,
              private wizardRunner: WizardRunner,
              private workflow: Workflow,
              private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToSessionState();
  }

  openViewSessionDialog(session: Session): void {
    let skipActivate = true;
    this.sessionService.findSession(session.id, skipActivate)
      .subscribe((session: Session) => {
        let wizard           = new ViewSessionWizard();
        wizard.model.session = session;
        this.wizardRunner.run(wizard);
      });
  }

  openAssignSessionDialog(session: Session): void {
    this.teamService.findAll().subscribe((teams: Team[]) => {
      let wizard           = new EditCaseWizard();
      wizard.model.session = _.cloneDeep(session);
      wizard.model.teams   = teams;
      this.wizardRunner.run(wizard);
    });
  }

  workSession(session: Session): void {
    let request    = new UpdateSessionView();
    request.id     = session.id;
    request.userId = this.securityService.getCurrentUser().id;

    // These just need to be populated to ensure we don't accidentally clear anything out while we reassign the case
    request.categoryId   = session.wrapUpCodeCategory ? session.wrapUpCodeCategory.id : null;
    request.queueId      = session.queue ? session.queue.id : null;
    request.sessionType  = session.sessionTypeType;
    request.status       = session.status.value;
    request.teamId       = session.team ? session.team.id : null;
    request.wrapUpCodeId = session.wrapUpCode ? session.wrapUpCode.id : null;

    if (session.isInClosedStatus()) {
      request.status = SessionStatusType.ACTIVE;
    }
    this.sessionService.updateOne(request)
      .pipe(flatMap(() => {
        return this.workflow.loadSessionFromId(session.id);
      }))
      .subscribe();
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            this.spinner.start();
            this.sessionService.findAllCasesRelatedToSelection(state.selection)
              .subscribe((sessions: Session[]) => {
                for (let session of sessions) {
                  this.caseService.setIsWorkable(session);
                }
                this.dataSource.data = sessions;
                this.spinner.stop();
              });
          }
        })
    );
  }
}
