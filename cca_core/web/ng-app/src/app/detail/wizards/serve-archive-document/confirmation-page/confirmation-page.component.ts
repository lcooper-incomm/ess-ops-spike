import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {MaplesAccountNotification} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {SpinnerSize} from '../../../../core/spinner/spinner-size.enum';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {AuditService} from '../../../../core/audit/audit.service';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {IdentifierRequest} from '../../../../core/session/model/identifier';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {IdentifierType} from '../../../../core/session/model/identifier-type.enum';
import {ServeArchiveDocumentWizard} from '../serve-archive-document-wizard';
import {IdentifierService} from '../../../../core/identifier/identifier.service';

@Component({
  selector: 'cca-serve-archive-document-confirmation-page',
  templateUrl: './confirmation-page.component.html'
})
export class ServeArchiveDocumentConfirmationPageComponent extends WizardPage<ServeArchiveDocumentWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});
  notificationPreview: MaplesAccountNotification;
  spinnerSize           = SpinnerSize.EXTRA_LARGE;

  @ViewChild(SpinnerComponent) loadingSpinner: SpinnerComponent;

  constructor(private customerAccountService: CustomerAccountService,
              private identifierService: IdentifierService,
              private auditService: AuditService) {
    super();
  }

  ngOnInit() {
    this.title           = 'Archive Document';
    this.navigationTitle = 'Confirm';
    this.footer          = 'Are you sure you want to perform this action?';
    this.isNextable      = true;
    this.isBackable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Yes';
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onBack(): Observable<string> {
    return of('form-page');
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.archiveDocument,
      [
        this.updateAudit,
        this.updateIdentifier
      ]
    );
  }

  private archiveDocument(): Observable<any> {
    return this.customerAccountService.archiveDocument(
      this.wizard.model.accountId,
      this.wizard.model.document.id,
      this.wizard.model.platform);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(AuditActivityType.ARCHIVE_DOCUMENT);
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
