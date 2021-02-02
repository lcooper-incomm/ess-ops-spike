import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {WizardPage} from '../../../../wizard/wizard-page';
import {ChangeAccountStatusWizard} from '../change-account-status-wizard';
import {IdentifierRequest} from '../../../../session/model/identifier';
import {IdentifierType} from '../../../../session/model/identifier-type.enum';
import {PlatformType} from '../../../../platform/platform-type.enum';
import {IdentifierService} from '../../../../identifier/identifier.service';
import {AuditService} from '../../../../audit/audit.service';
import {AuditActivityType} from '../../../../audit/audit-activity-type.enum';
import {CustomerAccountService} from '../../../../customer-account/customer-account.service';

@Component({
  selector: 'cca-change-account-status-confirmation-page',
  templateUrl: './change-account-status-confirmation-page.component.html',
  styleUrls: ['./change-account-status-confirmation-page.component.scss']
})
export class ChangeAccountStatusConfirmationPageComponent extends WizardPage<ChangeAccountStatusWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private customerAccountService: CustomerAccountService,
              private auditService: AuditService,
              private identifierService: IdentifierService) {
    super();
  }

  ngOnInit(): void {
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  /**
   * Try changing the account status.  If successful, comment and audit.
   */
  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.changeAccountStatus,
      [
        this.updateAudit,
        this.updateIdentifier
      ]
    );
  }

  changeAccountStatus(): Observable<any> {
    return this.customerAccountService.changeAccountStatus(this.wizard.model.accountId, this.wizard.model.accountChangeStatusRequest, this.wizard.model.platform);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(AuditActivityType.CLOSE_ACCOUNT);
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: IdentifierType.ACCOUNT_ID,
      value: this.wizard.model.accountId,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizard.model.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }
}
