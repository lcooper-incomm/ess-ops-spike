import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AlderResendEmailWizard} from '../alder-resend-email-wizard';
import {OrderService} from '../../../../core/order/order.service';
import {IdentifierRequest} from '../../../../core/session/model/identifier';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {IdentifierService} from '../../../../core/identifier/identifier.service';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {AuditService} from '../../../../core/audit/audit.service';

@Component({
  selector: 'cca-alder-resend-email-confirmation',
  templateUrl: './confirmation-page.html'
})
export class AlderResendEmailConfirmationComponent extends WizardPage<AlderResendEmailWizard> implements OnInit {

  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup({});
  footer: string          = 'Are you sure?';
  isNextable: boolean     = true;
  nextButtonText: string  = 'Yes';
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  title: string           = 'Resend Email';
  navigationTitle: string = 'Confirm';

  constructor(private orderService: OrderService,
              private auditService: AuditService,
              private identifierService: IdentifierService) {
    super();
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.resendEmail,
      [
        this.updateAudit,
        this.updateIdentifier
      ]
    );
  }

  private resendEmail(): Observable<any> {
    return this.orderService.resendEmail(
      this.wizard.model.selection.getOrder().checkout.emailReferenceId,
      this.wizard.model.request,
      this.wizard.model.selection.getMaplesPlatform()
    );
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(AuditActivityType.RESEND_EMAIL);
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: this.wizard.model.identifierType,
      value: this.wizard.model.identifier,
      platform: PlatformType.ALDER,
      comments: [
        {
          content: this.wizard.model.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }
}
