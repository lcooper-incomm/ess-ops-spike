import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {ServeArchiveDocumentWizard} from '../serve-archive-document-wizard';

@Component({
  selector: 'cca-serve-archive-document-form-page',
  templateUrl: './form-page.component.html'
})
export class ServeArchiveDocumentFormPageComponent extends WizardPage<ServeArchiveDocumentWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.title           = 'Archive Document';
    this.navigationTitle = 'Info';
    this.isBackable      = false;
    this.isNextable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Next';
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;

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
