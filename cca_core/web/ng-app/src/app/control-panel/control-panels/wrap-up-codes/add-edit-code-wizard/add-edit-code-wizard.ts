import {Type} from '@angular/core';
import {WrapUpCode} from '../../../../core/session/model/wrap-up-code';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {AddEditCodeFormPageComponent} from './add-edit-code-form-page/add-edit-code-form-page.component';

export class AddEditCodeWizard extends AbstractWizard<AddEditCodeWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-edit-code';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddEditCodeWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditCodeFormPageComponent);
  }
}

export class AddEditCodeWizardModel {
  code: WrapUpCode;
  editMode: boolean = true;
}
