import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditQueueWizard} from '../add-edit-queue-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {QueueService} from '../../../../../core/queue/queue.service';
import {SessionQueue} from '../../../../../core/session/model/session-queue';
import {ToastFactory} from '../../../../../toast/toast-factory.service';
import {ControlPanelPermissionService} from '../../../permissions/control-panel-permission.service';
import {WrapUpCodeCategory} from '../../../../../core/session/model/wrap-up-code-category';
import {WrapUpCodeCategoryService} from '../../../../../core/wrap-up-code-category/wrap-up-code-category.service';

@Component({
  selector: 'cca-add-edit-queue-categories-page',
  templateUrl: './add-edit-queue-categories-page.component.html'
})
export class AddEditQueueCategoriesPageComponent extends WizardPage<AddEditQueueWizard> implements OnInit {

  key: string             = 'categories-page';
  wizardForm: FormGroup   = new FormGroup({});
  isBackable: boolean     = true;
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.LARGE;

  categoryList: WrapUpCodeCategory[] = [];

  constructor(private queueService: QueueService,
              private permissionService: ControlPanelPermissionService,
              private categoryService: WrapUpCodeCategoryService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title            = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Queue';
    this.navigationTitle  = 'Categories';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Fetch the full queue which includes the session types.
   */
  onLoad(): Observable<any> {
    if (this.categoryList.length === 0) {
      return this.categoryService.findAll()
        .pipe(
          switchMap((categories: WrapUpCodeCategory[]) => {
            this.buildCategoryList(categories);
            return of(null);
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
    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((sessionQueue: SessionQueue) => {
          if (sessionQueue === null) {
            this.toast.error(`Queue failed to ${mode}.`);
          } else {
            this.toast.success(`Queue successfully ${mode}d.`);
            this.wizard.model.queue = sessionQueue;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on the wizard mode.
   */
  private createOrUpdate(): Observable<SessionQueue> {
    if (this.wizard.model.editMode) {
      return this.queueService.updateOne(this.wizard.model.queue);
    } else {
      return this.queueService.create(this.wizard.model.queue);
    }
  }

  /**
   * Set and sort the full list of wrap up categories.
   *
   * @param categories
   */
  private buildCategoryList(categories: WrapUpCodeCategory[]): void {
    this.categoryList = categories.sort((a: WrapUpCodeCategory, b: WrapUpCodeCategory) => {
      return a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase());
    });
  }

  /**
   * Return a list of categories which don't already exist in the queue.  Use the full list and filter it out.
   */
  public getCategoryList(): WrapUpCodeCategory[] {
    return this.categoryList
      .filter((category: WrapUpCodeCategory) => {
        return !this.wizard.model.queue.categories.find(qc => qc.id === category.id);
      });
  }

  /**
   * Push the passed in category to the array.
   *
   * @param category
   */
  public addCategory(category: WrapUpCodeCategory): void {
    this.wizard.model.queue.categories.push(category);
  }

  /**
   * Delete the passed in category from the array.
   *
   * @param category
   */
  public deleteCategory(category: WrapUpCodeCategory): void {
    this.wizard.model.queue.categories = this.wizard.model.queue.categories.filter((gc: WrapUpCodeCategory) => {
      return gc.id !== category.id;
    });
  }
}
