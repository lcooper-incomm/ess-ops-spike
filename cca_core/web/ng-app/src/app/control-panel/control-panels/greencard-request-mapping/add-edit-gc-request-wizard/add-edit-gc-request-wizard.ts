import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {GCRequest} from '../../../../core/mapping/gc-request';
import {AddEditGCRequestFormPageComponent} from './add-edit-gc-request-form-page/add-edit-gc-request-form-page.component';

export class AddEditGCRequestWizard extends AbstractWizard<AddEditGCRequestWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-edit-gc-request';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddEditGCRequestWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditGCRequestFormPageComponent);
  }
}

export class AddEditGCRequestWizardModel {
  request: GCRequest;
  editMode: boolean = true;
}
