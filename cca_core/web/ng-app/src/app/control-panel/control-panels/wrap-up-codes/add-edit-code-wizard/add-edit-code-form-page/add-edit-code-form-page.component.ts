import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditCodeWizard} from '../add-edit-code-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {WrapUpCodeService} from '../../../../../core/wrap-up-code/wrap-up-code.service';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {WrapUpCode} from '../../../../../core/session/model/wrap-up-code';
import {ToastFactory} from '../../../../../toast/toast-factory.service';

@Component({
  selector: 'cca-add-edit-code-form-page',
  templateUrl: './add-edit-code-form-page.component.html'
})
export class AddEditCodeFormPageComponent extends WizardPage<AddEditCodeWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  constructor(private codeService: WrapUpCodeService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title            = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Code';

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    Object.assign(this.wizard.model.code, this.wizardForm.getRawValue());

    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((code: WrapUpCode) => {
          if (code === null) {
            this.toast.error(`Code failed to ${mode}.`);
          } else {
            this.toast.success(`Code successfully ${mode}d.`);
            this.wizard.model.code = code;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on what mode the wizard is in.
   */
  private createOrUpdate(): Observable<WrapUpCode> {
    if (this.wizard.model.editMode) {
      return this.codeService.updateOne(this.wizard.model.code);
    } else {
      return this.codeService.create(this.wizard.model.code);
    }
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      isActive: new FormControl(this.wizard.model.code.isActive, [Validators.required]),
      isLocked: new FormControl(this.wizard.model.code.isLocked, [Validators.required]),
      i3Name: new FormControl(this.wizard.model.code.i3Name, [Validators.required, Validators.minLength(1)]),
      displayName: new FormControl(this.wizard.model.code.displayName, [Validators.required, Validators.minLength(1)]),
    });
  }
}
