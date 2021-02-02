import {Type} from '@angular/core';
import {WrapUpCodeCategory} from '../../../../core/session/model/wrap-up-code-category';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {AddEditCategoryFormPageComponent} from './add-edit-category-form-page/add-edit-category-form-page.component';
import {AddEditCategoryCodePageComponent} from './add-edit-category-code-page/add-edit-category-code-page.component';

export class AddEditCategoryWizard extends AbstractWizard<AddEditCategoryWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'add-edit-category';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddEditCategoryWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditCategoryFormPageComponent);
    pageMap.set('code-page', AddEditCategoryCodePageComponent);
  }
}

export class AddEditCategoryWizardModel {
  category: WrapUpCodeCategory;
  editMode: boolean = true;
  success: number;
}
