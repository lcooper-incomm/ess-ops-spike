import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {WizardPage} from "../../../../../wizard/wizard-page";
import {PersonalInfoWizard} from "../personal-info-wizard";
import {WizardWidth} from "../../../../../wizard/wizard-width.enum";
import {RoutingService} from "../../../../../routing/routing.service";
import {Workflow} from "../../../../../workflow/workflow.service";
import {Session} from "../../../../model/session";
import {AppState} from "../../../../../../app-state";
import {Permission} from "../../../../../auth/permission";
import {SecurityService} from "../../../../../security/security.service";

@Component({
  selector: 'cca-personal-info-results-page',
  templateUrl: './personal-info-results-page.component.html',
  styleUrls: ['./personal-info-results-page.component.scss']
})
export class PersonalInfoResultsPageComponent extends WizardPage<PersonalInfoWizard> implements OnInit {
  addressForm: FormGroup         = new FormGroup({});
  key: string                    = 'confirmation-page';
  wizardForm: FormGroup          = new FormGroup({});
  canWorkPrivacySession: boolean = false;

  constructor(private securityService: SecurityService,
              private routingService: RoutingService,
              private store: Store<AppState>,
              private workflow: Workflow) {
    super();
    this.isNextable      = false;
    this.isBackable      = false;
    this.isCloseable     = true;
    this.closeButtonText = 'Close';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit() {
    this.canWorkPrivacySession = this.securityService.hasPermission(Permission.PERSONAL_INFO_REQUEST);
  }

  gotoSession(): void {
    this.close().subscribe();

    this.workflow.loadSessionFromId(this.wizard.model.privacyRequestSessionId).subscribe((session: Session) => {});
  }
}
