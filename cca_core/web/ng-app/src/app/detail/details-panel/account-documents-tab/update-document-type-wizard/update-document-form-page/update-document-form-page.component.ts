import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MaplesAccountCode} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {GenericOption} from '../../../../../core/model/generic-option';
import {UpdateDocumentWizard} from '../update-document-wizard';
import {CustomerAccountService} from '../../../../../core/customer-account/customer-account.service';

@Component({
  selector: 'cca-update-document-form-page',
  templateUrl: './update-document-form-page.component.html'
})
export class UpdateDocumentFormPageComponent extends WizardPage<UpdateDocumentWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  categoryOptions: GenericOption<any>[] = [];

  constructor(private customerAccountService: CustomerAccountService) {
    super();
  }

  ngOnInit() {
    this.initForms();

    this.title           = 'Update Document';
    this.closeButtonText = 'Cancel';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.width           = WizardWidth.LARGE;
  }

  onLoad(): Observable<any> {
    return this.customerAccountService.findAccountDocumentCategories(this.wizard.model.platform)
      .pipe(
        tap((codes: MaplesAccountCode[]) => {
          for (let code of codes) {
            this.categoryOptions.push({
              value: code.description,
              displayValue: code.description
            });
          }
        })
      );
  }

  onNext(): Observable<string> {
    this.updateRequest();
    return of('confirmation-page');
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  private initForms(): void {
    this.wizardForm = new FormGroup({
      fileDescription: new FormControl(this.wizard.model.document.fileDescription, [Validators.required]),
      category: new FormControl(this.wizard.model.document.fileType ? this.wizard.model.document.fileType.name : null, [Validators.required]),
      categoryDescription: new FormControl(this.wizard.model.document.fileType ? this.wizard.model.document.fileType.description : null, [Validators.maxLength(18)]),
      isRestricted: new FormControl(!!this.wizard.model.document.restrictedCode, [Validators.required]),
      comment: new FormControl(this.wizard.model.comment, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });

    this.wizardForm.get('category').valueChanges.subscribe((value: string) => {
      this.wizard.model.request.category = value;
      if (value === 'Other') {
        this.wizardForm.get('categoryDescription').setValidators([Validators.required, Validators.maxLength(18)]);
      } else {
        this.wizardForm.get('categoryDescription').setValidators([Validators.maxLength(18)]);
      }
    });
  }

  private updateRequest(): void {
    let formValue: any                        = this.wizardForm.getRawValue();
    this.wizard.model.comment                 = formValue.comment;
    this.wizard.model.request.fileDescription = formValue.fileDescription;
    this.wizard.model.request.isRestricted    = formValue.isRestricted;
    this.wizard.model.request.category        = formValue.category;
    this.wizard.model.request.description     = formValue.categoryDescription;
  }
}
