import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditCategoryWizard} from '../add-edit-category-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {WrapUpCodeCategoryService} from '../../../../../core/wrap-up-code-category/wrap-up-code-category.service';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {WrapUpCodeCategory} from '../../../../../core/session/model/wrap-up-code-category';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'cca-add-edit-category-form-page',
  templateUrl: './add-edit-category-form-page.component.html'
})
export class AddEditCategoryFormPageComponent extends WizardPage<AddEditCategoryWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  constructor(private categoryService: WrapUpCodeCategoryService) {
    super();
  }

  ngOnInit(): void {
    this.title           = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Category';
    this.navigationTitle = 'Info';

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Fetch the full queue which includes the session types.
   */
  onLoad(): Observable<any> {
    if (this.wizard.model.editMode) {
      return this.categoryService.findOne(this.wizard.model.category.id)
        .pipe(
          tap((category: WrapUpCodeCategory) => {
            this.wizard.model.category = category;
          })
        );
    } else {
      return of(null);
    }
  }

  /**
   * Update the model from the form and call the update.
   */
  onNext(): Observable<any> {
    Object.assign(this.wizard.model.category, this.wizardForm.getRawValue());
    return of('code-page');
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      isActive: new FormControl(this.wizard.model.category.isActive, [Validators.required]),
      i3Name: new FormControl(this.wizard.model.category.i3Name, [Validators.required, Validators.minLength(1)]),
      displayName: new FormControl(this.wizard.model.category.displayName, [Validators.required, Validators.minLength(1)]),
    });
  }
}
