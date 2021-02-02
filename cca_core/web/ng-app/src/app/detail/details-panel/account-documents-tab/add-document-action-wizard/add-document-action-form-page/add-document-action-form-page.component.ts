import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddDocumentActionWizard} from '../add-document-action-wizard';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {GenericOption} from '../../../../../core/model/generic-option';

@Component({
  selector: 'cca-add-document-action-form-page',
  templateUrl: './add-document-action-form-page.component.html',
  styleUrls: ['./add-document-action-form-page.component.scss']
})
export class AddDocumentActionFormPageComponent extends WizardPage<AddDocumentActionWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  outcomeOptions: GenericOption<any>[] = [
    {
      value: 'Approved',
      displayValue: 'Approved'
    },
    {
      value: 'Declined',
      displayValue: 'Declined'
    },
    {
      value: 'Other',
      displayValue: 'Other'
    }
  ];
  resultOptions: GenericOption<any>[]  = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.initForms();
    this.buildResultOptions();

    this.title           = 'Document Change Status';
    this.closeButtonText = 'Cancel';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.width           = WizardWidth.MEDIUM;

    this.wizardForm.valueChanges.subscribe(() => {
      this.buildResultOptions();
      this.updateRequest();
    });
  }

  onNext(): Observable<string> {
    return of('confirmation-page');
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  private initForms(): void {
    this.wizardForm = new FormGroup({
      outcome: new FormControl(this.wizard.model.request.outcome, [Validators.required]),
      result: new FormControl(this.wizard.model.request.type, [Validators.required]),
      comment: new FormControl(this.wizard.model.request.notes, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });

    this.wizardForm.get('outcome').valueChanges.subscribe(() => {
      this.setDefaultResult();
    });
  }

  /**
   * When outcome changes, reset the result for a default value.
   */
  private setDefaultResult(): void {
    let formValue: any = this.wizardForm.getRawValue();

    if (formValue.outcome === 'Approved') {
      this.wizard.model.request.type = 'Document Approved';
    } else if (formValue.outcome === 'Declined') {
      this.wizard.model.request.type = 'Document Declined - Illegible';
    } else if (formValue.outcome === 'Other') {
      this.wizard.model.request.type = 'Noted';
    }

    this.wizardForm.get('result').setValue(this.wizard.model.request.type);
  }

  private updateRequest(): void {
    let formValue: any                = this.wizardForm.getRawValue();
    this.wizard.model.request.notes   = formValue.comment;
    this.wizard.model.request.type    = formValue.result;
    this.wizard.model.request.outcome = formValue.outcome;
  }

  private buildResultOptions(): void {
    if (this.wizard.model.request.outcome === 'Approved') {
      this.resultOptions = [
        {
          value: 'Document Approved',
          displayValue: 'Document Approved'
        }
      ];
    } else if (this.wizard.model.request.outcome === 'Declined') {
      this.resultOptions = [
        {
          value: 'Document Declined - Illegible',
          displayValue: 'Document Declined - Illegible'
        },
        {
          value: 'Document Declined-Inappropriate',
          displayValue: 'Document Declined - Inappropriate'
        },
        {
          value: 'Document Declined - Unacceptable',
          displayValue: 'Document Declined - Unacceptable'
        }
      ];
    } else if (this.wizard.model.request.outcome === 'Other') {
      this.resultOptions = [
        {
          value: 'Noted',
          displayValue: 'Noted'
        }
      ];
    }
  }
}
