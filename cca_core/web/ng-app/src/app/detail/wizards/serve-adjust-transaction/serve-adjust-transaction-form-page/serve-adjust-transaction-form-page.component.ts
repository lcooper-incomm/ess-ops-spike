import { Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServeAdjustTransactionWizard } from '../serve-adjust-transaction-wizard';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceholderDictionary } from '../../../../core/wizard/placeholders/placeholder-dictionary';
import { Observable, of } from 'rxjs';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { CsCoreCurrencyUtil } from '@cscore/gringotts';

@Component({
  templateUrl: './serve-adjust-transaction-form-page.component.html',
  styleUrls: ['./serve-adjust-transaction-form-page.component.scss'],
})
export class ServeAdjustTransactionFormPageComponent extends WizardPage<ServeAdjustTransactionWizard> {
  wizardForm: FormGroup = new FormGroup({});
  key: string = 'form-page';

  title: string = 'Adjust Transaction';
  navigationTitle: string = 'Form';
  width = WizardWidth.SMALL;

  isNextable: boolean = true;
  isCloseable: boolean = true;
  closeButtonText: string = 'Cancel';
  
  steps: string[] = [
    'Enter the amount of the adjustment.',
    'Add your comments and submit.',
  ];

  constructor(private formBuilder: CcaFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<string> {
    this.wizard.model.amount = CsCoreCurrencyUtil.buildWithDescriptor(this.getValueFromForm<number>('amount'), this.wizard.model.transaction.amounts.authorizedAmount.descriptor);
    this.wizard.model.comment = this.getValueFromForm<string>('comment');
    return of('confirmation-page');
  }

  private initForm(): void {
    const authorizedAmount = Math.abs(this.wizard.model.transaction.amounts.authorizedAmount.value);
    this.wizardForm = new FormGroup({
      amount: new FormControl(authorizedAmount, [Validators.min(0.01), Validators.max(authorizedAmount)]),
      comment: this.formBuilder.comment(null, true),
    });
  }
}