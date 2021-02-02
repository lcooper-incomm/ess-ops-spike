import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {MaplesAccountNotification, MaplesEmailTemplate} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {ServeSendFormsWizard} from '../serve-send-forms-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {GenericOption} from '../../../../core/model/generic-option';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {SpinnerSize} from '../../../../core/spinner/spinner-size.enum';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';

@Component({
  selector: 'cca-serve-send-forms-preview-page',
  templateUrl: './serve-send-forms-preview-page.component.html',
  styleUrls: ['./serve-send-forms-preview-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServeSendFormsPreviewPageComponent extends WizardPage<ServeSendFormsWizard> implements OnInit {

  key: string                                           = 'preview-page';
  wizardForm: FormGroup                                 = new FormGroup({});
  templateOptions: GenericOption<MaplesEmailTemplate>[] = [];
  notificationPreview: MaplesAccountNotification;
  spinnerSize                                           = SpinnerSize.EXTRA_LARGE;

  @ViewChild(SpinnerComponent) loadingSpinner: SpinnerComponent;

  constructor(private customerAccountService: CustomerAccountService) {
    super();
  }

  ngOnInit() {
    this.title           = 'Send Forms';
    this.navigationTitle = 'Choose';
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;

    this.wizardForm = new FormGroup({
      actionCode: new FormControl(this.wizard.model.request.actionCode, [Validators.required])
    });
    this.wizardForm.get('actionCode').valueChanges.subscribe((data: any) => {
      this.getNotificationPreview();
    });
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onLoad(): Observable<any> {
    this.wizard.navigationHistory.clear();

    if (this.templateOptions.length === 0) {
      return this.customerAccountService.getEmailTemplates(this.wizard.model.accountId, this.wizard.model.platform)
        .pipe(tap((emailTemplates: MaplesEmailTemplate[]) => {
          for (let emailTemplate of emailTemplates) {
            this.templateOptions.push({
              value: emailTemplate,
              displayValue: emailTemplate.title
            });
          }
        }));
    } else {
      return of(null);
    }
  }

  onNext(): Observable<string> {
    if (!this.wizard.model.request.tokens || this.wizard.model.request.tokens.length === 0) {
      return of('confirmation-page');
    } else {
      return of('form-page');
    }
  }

  private buildTokenValuesForTemplate(): void {
    if (this.wizard.model.request && this.wizard.model.request.tokens) {
      for (let token of this.wizard.model.request.tokens) {
        if (token.type.toLowerCase() === 'string') {
          token.value = '{{' + token.name + '}}';
        } else if (token.type.toLowerCase() === 'currency') {
          token.value = '0.00';
        } else if (token.type.toLowerCase().indexOf('date') !== -1) {
          token.value = '01/01/2001';
        }
      }
    }
  }

  private getNotificationPreview(): void {
    this.loadingSpinner.start();

    let emailTemplate: MaplesEmailTemplate = this.wizardForm.get('actionCode').value;
    this.wizard.model.request              = _.cloneDeep(emailTemplate);
    this.buildTokenValuesForTemplate();

    this.customerAccountService.getNotificationPreview(this.wizard.model.accountId, this.wizard.model.request, this.wizard.model.platform)
      .subscribe((notificationPreview: MaplesAccountNotification) => {
        this.notificationPreview = notificationPreview;
        this.loadingSpinner.stop();
      });
  }
}
