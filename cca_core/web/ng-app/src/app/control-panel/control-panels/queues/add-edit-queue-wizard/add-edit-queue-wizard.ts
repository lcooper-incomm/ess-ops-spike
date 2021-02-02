import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {AddEditQueueFormPageComponent} from './add-edit-queue-form-page/add-edit-queue-form-page.component';
import {SessionQueue} from '../../../../core/session/model/session-queue';
import {AddEditQueueTypesPageComponent} from './add-edit-queue-types-page/add-edit-queue-types-page.component';
import {AddEditQueueCategoriesPageComponent} from './add-edit-queue-categories-page/add-edit-queue-categories-page.component';

/**
 * Use a single wizard to create or update a queue.  If creating, a new SessionQueue is created when loading
 * the wizard.  This wizard is three pages, the first has the form for the queue information, the second has
 * the related session types and the third has the related categories.
 */
export class AddEditQueueWizard extends AbstractWizard<AddEditQueueWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'add-edit-queue';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model     = new AddEditQueueWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditQueueFormPageComponent);
    pageMap.set('types-page', AddEditQueueTypesPageComponent);
    pageMap.set('categories-page', AddEditQueueCategoriesPageComponent);
  }
}

export class AddEditQueueWizardModel {
  queue: SessionQueue;
  editMode: boolean = true;
  success: number;
}
