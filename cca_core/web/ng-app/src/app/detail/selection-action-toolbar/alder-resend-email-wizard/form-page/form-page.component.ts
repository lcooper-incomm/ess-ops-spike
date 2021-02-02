import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AlderResendEmailWizard} from '../alder-resend-email-wizard';
import {CcaFormBuilder} from '../../../../core/form/cca-form-builder.service';
import {GenericOption} from '../../../../core/model/generic-option';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {DomSanitizer} from '@angular/platform-browser';
import {CcaValidators} from '../../../../core/validators/cca-validators';

@Component({
  selector: 'cca-alder-resend-email-form',
  templateUrl: './form-page.html'
})
export class AlderResendEmailFormComponent extends WizardPage<AlderResendEmailWizard> implements OnInit {

  options: GenericOption<any>[] = [
    {
      value: 'ORIGINAL',
      displayValue: 'Email to original recipient'
    },
    {
      value: 'NEW',
      displayValue: 'Email to new recipient'
    },
    {
      value: 'RECONSTRUCT',
      displayValue: 'Reconstruct order email'
    }
  ];

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({
    mode: new FormControl(this.options[0].value),
    name: new FormControl(null),
    emailAddress: new FormControl(null),
    comment: this.formBuilder.comment(null, true)
  });
  title: string           = 'Resend Email';
  navigationTitle: string = 'Form';
  isNextable: boolean     = true;
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';

  constructor(private formBuilder: CcaFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.wizardForm.get('mode').valueChanges.subscribe((value: string) => {
        if (value === 'NEW') {
          this.wizardForm.get('name').setValidators([Validators.required]);
          this.wizardForm.get('emailAddress').setValidators([Validators.required, CcaValidators.email()]);
          this.wizard.model.showEmail = true;
        } else {
          this.wizardForm.get('name').setValidators([]);
          this.wizardForm.get('name').updateValueAndValidity();
          this.wizardForm.get('emailAddress').setValidators([]);
          this.wizardForm.get('emailAddress').updateValueAndValidity();
          this.wizard.model.showEmail = false;
        }
      })
    );
  }

  onNext(): Observable<any> {
    let values: any        = this.wizardForm.getRawValue();
    this.wizard.model.mode = this.options.find((o: GenericOption<any>) => o.value === values['mode']).displayValue;

    if (values['mode'] === 'ORIGINAL') {
      this.wizard.model.request.pathType = 'EMAIL_REFERENCE_ID';
    } else if (values['mode'] === 'NEW') {
      this.wizard.model.request.pathType     = 'EMAIL_REFERENCE_ID';
      this.wizard.model.request.displayName  = values['name'];
      this.wizard.model.request.emailAddress = values['emailAddress'];
    } else {
      this.wizard.model.request.pathType = 'CORRELATION_ID';
    }
    this.wizard.model.comment = values['comment'];

    return of('confirmation-page');
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }
}
