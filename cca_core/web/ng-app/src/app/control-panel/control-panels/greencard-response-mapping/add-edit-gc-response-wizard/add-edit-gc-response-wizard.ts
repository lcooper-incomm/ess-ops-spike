import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {GCResponse} from '../../../../core/mapping/gc-response';
import {AddEditGCResponseFormPageComponent} from './add-edit-gc-response-form-page/add-edit-gc-response-form-page.component';

export class AddEditGCResponseWizard extends AbstractWizard<AddEditGCResponseWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-edit-gc-response';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddEditGCResponseWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditGCResponseFormPageComponent);
  }
}

export class AddEditGCResponseWizardModel {
  response: GCResponse;
  editMode: boolean = true;
}
