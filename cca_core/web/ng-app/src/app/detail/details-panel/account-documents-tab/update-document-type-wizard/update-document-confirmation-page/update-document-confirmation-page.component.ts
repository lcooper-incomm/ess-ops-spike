import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {CustomerAccountService} from '../../../../../core/customer-account/customer-account.service';
import {AuditService} from '../../../../../core/audit/audit.service';
import {IdentifierService} from '../../../../../core/identifier/identifier.service';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {IdentifierRequest} from '../../../../../core/session/model/identifier';
import {PlatformType} from '../../../../../core/platform/platform-type.enum';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {UpdateDocumentWizard} from '../update-document-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';

@Component({
  selector: 'cca-update-document-confirmation-page',
  templateUrl: './update-document-confirmation-page.component.html'
})
export class UpdateDocumentConfirmationPageComponent extends WizardPage<UpdateDocumentWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private customerAccountService: CustomerAccountService,
              private auditService: AuditService,
              private identifierService: IdentifierService) {
    super();

    this.title           = 'Update Document';
    this.footer          = 'Are you sure you want to perform this action?';
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
    this.width           = WizardWidth.LARGE;
  }

  ngOnInit() {
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.updateDocument,
      [
        this.updateAudit,
        this.updateIdentifier
      ]
    );
  }

  updateDocument(): Observable<any> {
    return this.customerAccountService.updateDocument(
      this.wizard.model.accountId,
      this.wizard.model.document.id,
      this.wizard.model.request,
      this.wizard.model.platform);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(this.wizard.model.auditActivityType);
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: this.wizard.model.identifierType,
      value: this.wizard.model.identifier,
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
