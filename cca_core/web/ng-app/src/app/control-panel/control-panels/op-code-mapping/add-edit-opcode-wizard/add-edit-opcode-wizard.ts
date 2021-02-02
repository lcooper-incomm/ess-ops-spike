import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {OpCodeDescriptor} from '../../../../core/transaction/op-code';
import {AddEditOpCodeFormPageComponent} from './add-edit-opcode-form-page/add-edit-opcode-form-page.component';

/**
 * Single page wizard to update the OpCode.
 */
export class AddEditOpCodeWizard extends AbstractWizard<AddEditOpCodeWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-edit-opcode';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddEditOpCodeWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditOpCodeFormPageComponent);
  }
}

export class AddEditOpCodeWizardModel {
  opcode: OpCodeDescriptor;
  editMode: boolean = true;
}
