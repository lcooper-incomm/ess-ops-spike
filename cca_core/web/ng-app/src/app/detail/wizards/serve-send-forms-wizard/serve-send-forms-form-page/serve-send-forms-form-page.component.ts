import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {ServeSendFormsWizard} from '../serve-send-forms-wizard';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {CcaValidators} from '../../../../core/validators/cca-validators';

@Component({
  selector: 'cca-serve-send-forms-form-page',
  templateUrl: './serve-send-forms-form-page.component.html',
  styleUrls: ['./serve-send-forms-form-page.component.scss']
})
export class ServeSendFormsFormPageComponent extends WizardPage<ServeSendFormsWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});
  actionCode: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.title           = 'Send Forms';
    this.navigationTitle = 'Form';
    this.isBackable      = true;
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onBack(): Observable<any> {
    return of('preview-page');
  }

  onNext(): Observable<any> {
    this.formToModel();

    return of('confirmation-page');
  }

  onLoad(): Observable<any> {
    this.buildForm();

    return of(undefined);
  }

  private formToModel(): void {
    let i: number = 0;
    for (let token of this.wizard.model.request.tokens) {
      token.value = this.wizardForm.get('token' + i++).value;
    }
  }

  private buildForm(): void {
    if (this.actionCode && this.actionCode === this.wizard.model.request.actionCode) {
      return;
    } else {
      this.actionCode = this.wizard.model.request.actionCode;
    }

    this.wizardForm = new FormGroup({});
    let i: number   = 0;
    for (let token of this.wizard.model.request.tokens) {
      if (token.type.toLowerCase().indexOf('date') !== -1) {
        this.wizardForm.addControl('token' + i++, new FormControl(undefined, [Validators.required, CcaValidators.date()]));
      } else {
        this.wizardForm.addControl('token' + i++, new FormControl(undefined, [Validators.required]));
      }
    }
  }

}
