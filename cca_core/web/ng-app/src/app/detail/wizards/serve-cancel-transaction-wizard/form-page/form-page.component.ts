import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {ServeCancelTransactionWizard} from '../serve-cancel-transaction-wizard';

@Component({
  selector: 'cca-serve-cancel-transaction-form-page',
  templateUrl: './form-page.component.html'
})
export class ServeCancelTransactionFormPageComponent extends WizardPage<ServeCancelTransactionWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});
  actionCode: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.title           = 'Cancel Transaction';
    this.navigationTitle = 'Form';
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    this.wizard.model.comment = this.wizardForm.get('comment').value;
    return of('confirmation-page');
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      comment: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });
  }
}
