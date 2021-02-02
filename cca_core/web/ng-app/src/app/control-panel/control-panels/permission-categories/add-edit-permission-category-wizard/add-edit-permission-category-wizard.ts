import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {AddEditPermissionCategoryFormPageComponent} from './add-edit-permission-category-form-page/add-edit-permission-category-form-page.component';
import {PermissionCategory} from '../../../../core/auth/permission-category';

export class AddEditPermissionCategoryWizard extends AbstractWizard<AddEditPermissionCategoryWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-edit-permission-category';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddEditPermissionCategoryWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditPermissionCategoryFormPageComponent);
  }
}

export class AddEditPermissionCategoryWizardModel {
  permissionCategory: PermissionCategory;
  editMode: boolean = true;
}
