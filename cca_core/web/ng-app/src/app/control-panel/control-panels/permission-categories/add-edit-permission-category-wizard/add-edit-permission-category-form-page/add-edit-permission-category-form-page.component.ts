import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditPermissionCategoryWizard} from '../add-edit-permission-category-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {ToastFactory} from '../../../../../toast/toast-factory.service';
import {PermissionCategoryService} from '../../permission-category.service';
import {PermissionCategory} from '../../../../../core/auth/permission-category';

@Component({
  selector: 'cca-add-edit-permission-category-form-page',
  templateUrl: './add-edit-permission-category-form-page.component.html',
  providers: [
    PermissionCategoryService
  ]
})
export class AddEditPermissionCategoryFormPageComponent extends WizardPage<AddEditPermissionCategoryWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  deleteButtonText        = 'Delete Permission Category';
  width: WizardWidth      = WizardWidth.MEDIUM;

  constructor(private permissionCategoryService: PermissionCategoryService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Permission Category';
    this.isDeletable = this.wizard.model.editMode;

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    Object.assign(this.wizard.model.permissionCategory, this.wizardForm.getRawValue());

    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((permissionCategory: PermissionCategory) => {
          if (permissionCategory === null) {
            this.toast.error(`Permission Category failed to ${mode}.`);
          } else {
            this.toast.success(`Permission Category successfully ${mode}d.`);
            this.wizard.model.permissionCategory = permissionCategory;
          }
          return of(null);
        })
      );
  }

  onDelete(): Observable<PermissionCategory> {
    return this.permissionCategoryService.delete(this.wizard.model.permissionCategory.id);
  }

  /**
   * Call updateOne or create depending on what mode the wizard is in.
   */
  private createOrUpdate(): Observable<PermissionCategory> {
    if (this.wizard.model.editMode) {
      return this.permissionCategoryService.updateOne(this.wizard.model.permissionCategory);
    } else {
      return this.permissionCategoryService.create(this.wizard.model.permissionCategory);
    }
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      systemName: new FormControl(this.wizard.model.permissionCategory.systemName, [Validators.required]),
      displayName: new FormControl(this.wizard.model.permissionCategory.displayName, [Validators.required]),
      description: new FormControl(this.wizard.model.permissionCategory.description, []),
      locked: new FormControl(this.wizard.model.permissionCategory.locked, [Validators.required]),
    });
  }
}
