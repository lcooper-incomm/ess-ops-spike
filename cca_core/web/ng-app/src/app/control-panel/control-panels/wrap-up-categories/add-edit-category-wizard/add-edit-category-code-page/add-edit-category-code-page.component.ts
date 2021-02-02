import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditCategoryWizard} from '../add-edit-category-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {WrapUpCodeService} from '../../../../../core/wrap-up-code/wrap-up-code.service';
import {WrapUpCode} from '../../../../../core/session/model/wrap-up-code';
import {WrapUpCodeCategory} from '../../../../../core/session/model/wrap-up-code-category';
import {WrapUpCodeCategoryService} from '../../../../../core/wrap-up-code-category/wrap-up-code-category.service';
import {ToastFactory} from '../../../../../toast/toast-factory.service';

@Component({
  selector: 'cca-add-edit-category-code-page',
  templateUrl: './add-edit-category-code-page.component.html'
})
export class AddEditCategoryCodePageComponent extends WizardPage<AddEditCategoryWizard> implements OnInit {

  codeList: WrapUpCode[] = [];

  key: string             = 'code-page';
  wizardForm: FormGroup   = new FormGroup({});
  isBackable: boolean     = true;
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM_LARGE;

  constructor(private categoryService: WrapUpCodeCategoryService,
              private codeService: WrapUpCodeService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title           = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Category';
    this.navigationTitle = 'Codes';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Fetch the full category including the list of codes.
   */
  onLoad(): Observable<any> {
    if (this.codeList.length === 0) {
      return this.codeService.findAll()
        .pipe(
          tap((codeList: WrapUpCode[]) => {
            this.codeList = codeList.sort((a: WrapUpCode, b: WrapUpCode) => {
              return a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase());
            });
          })
        );
    } else {
      return of(null);
    }
  }

  onNext(): Observable<any> {
    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((category: WrapUpCodeCategory) => {
          if (category === null) {
            this.toast.error(`Category failed to ${mode}.`);
          } else {
            this.toast.success(`Category successfully ${mode}d.`);
            this.wizard.model.category = category;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on what mode the wizard is in.
   */
  private createOrUpdate(): Observable<WrapUpCodeCategory> {
    if (this.wizard.model.editMode) {
      return this.categoryService.updateOne(this.wizard.model.category);
    } else {
      return this.categoryService.create(this.wizard.model.category);
    }
  }

  /**
   * Get the list of codes that don't already exist on the category.
   */
  getCodeList(): WrapUpCode[] {
    return this.codeList
      .filter((code: WrapUpCode) => {
        return !this.wizard.model.category.wrapUpCodes.find(qc => qc.id === code.id);
      });
  }

  /**
   * Push the passed in code to the array.
   *
   * @param code
   */
  public addCode(code: WrapUpCode): void {
    this.wizard.model.category.wrapUpCodes.push(code);
  }

  /**
   * Delete the passed in code from the array.
   *
   * @param code
   */
  public deleteCode(code: WrapUpCode): void {
    this.wizard.model.category.wrapUpCodes = this.wizard.model.category.wrapUpCodes.filter((gc: WrapUpCode) => {
      return gc.id !== code.id;
    });
  }
}
