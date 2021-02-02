import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {MaplesAccountNotification} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {ServeSendFormsWizard} from '../serve-send-forms-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {SpinnerSize} from '../../../../core/spinner/spinner-size.enum';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {AuditService} from '../../../../core/audit/audit.service';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';

@Component({
  selector: 'cca-serve-send-forms-confirmation-page',
  templateUrl: './serve-send-forms-confirmation-page.component.html',
  styleUrls: ['./serve-send-forms-confirmation-page.component.scss']
})
export class ServeSendFormsConfirmationPageComponent extends WizardPage<ServeSendFormsWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});
  notificationPreview: MaplesAccountNotification;
  spinnerSize           = SpinnerSize.EXTRA_LARGE;

  @ViewChild(SpinnerComponent) loadingSpinner: SpinnerComponent;

  constructor(private customerAccountService: CustomerAccountService,
              private auditService: AuditService) {
    super();
  }

  ngOnInit() {
    this.title           = 'Send Forms';
    this.navigationTitle = 'Confirm';
    this.footer          = 'Are you sure you want to perform this action?';
    this.isNextable      = true;
    this.isBackable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Yes';
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onBack(): Observable<string> {
    if (!this.wizard.model.request.tokens || this.wizard.model.request.tokens.length === 0) {
      return of('preview-page');
    } else {
      return of('form-page');
    }
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.sendNotification,
      [
        this.updateAudit
      ]
    );
  }

  onLoad(): Observable<any> {
    this.getNotificationPreview();

    return of(null);
  }

  private sendNotification(): Observable<any> {
    return this.customerAccountService.sendNotification(
      this.wizard.model.accountId,
      this.wizard.model.request,
      this.wizard.model.platform);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(AuditActivityType.SEND_FORM);
  }

  private getNotificationPreview(): void {
    this.loadingSpinner.start();

    this.customerAccountService.getNotificationPreview(this.wizard.model.accountId, this.wizard.model.request, this.wizard.model.platform)
      .subscribe((notificationPreview: MaplesAccountNotification) => {
        this.notificationPreview = notificationPreview;
        this.loadingSpinner.stop();
      });
  }
}
