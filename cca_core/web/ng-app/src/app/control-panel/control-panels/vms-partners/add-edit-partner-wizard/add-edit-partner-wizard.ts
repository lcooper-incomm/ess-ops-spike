import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {AddEditPartnerFormPageComponent} from './add-edit-partner-form-page/add-edit-partner-form-page.component';
import {Partner} from '../../../../core/session/selection/partner';

export class AddEditPartnerWizard extends AbstractWizard<AddEditPartnerWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-edit-partner';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddEditPartnerWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditPartnerFormPageComponent);
  }
}

export class AddEditPartnerWizardModel {
  partner: Partner;
  editMode: boolean = true;
}
