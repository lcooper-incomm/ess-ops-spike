import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {Report} from '../../../../reports/report';
import {AddEditReportsFormPageComponent} from './add-edit-reports-form-page/add-edit-reports-form-page.component';

/**
 * Use a single wizard to create or update a report.  If creating, a new Report is created when loading
 * the wizard.
 */
export class AddEditReportsWizard extends AbstractWizard<AddEditReportsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-edit-reports';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model     = new AddEditReportsWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditReportsFormPageComponent);
  }
}

export class AddEditReportsWizardModel {
  report: Report;
  editMode: boolean = true;
}
