import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddDocumentActionWizard} from '../add-document-action-wizard';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {IdentifierRequest} from '../../../../../core/session/model/identifier';
import {PlatformType} from '../../../../../core/platform/platform-type.enum';
import {CustomerAccountService} from '../../../../../core/customer-account/customer-account.service';
import {AuditService} from '../../../../../core/audit/audit.service';
import {IdentifierService} from '../../../../../core/identifier/identifier.service';

@Component({
  selector: 'cca-add-document-action-confirmation-page',
  templateUrl: './add-document-action-confirmation-page.component.html',
  styleUrls: ['./add-document-action-confirmation-page.component.scss']
})
export class AddDocumentActionConfirmationPageComponent extends WizardPage<AddDocumentActionWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private customerAccountService: CustomerAccountService,
              private auditService: AuditService,
              private identifierService: IdentifierService) {
    super();

    this.title           = 'Document Change Status';
    this.footer          = 'Are you sure you want to perform this action?';
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  ngOnInit() {
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.addDocumentAction,
      [
        this.updateAudit,
        this.updateIdentifier
      ]
    );
  }

  addDocumentAction(): Observable<any> {
    return this.customerAccountService.addDocumentAction(
      this.wizard.model.accountId,
      this.wizard.model.documentId,
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
          content: this.wizard.model.request.notes
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }
}
