import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {Team} from '../../../../core/auth/team';
import {AddEditTeamsFormPageComponent} from './add-edit-teams-form-page/add-edit-teams-form-page.component';
import {AddEditTeamsUserPageComponent} from './add-edit-teams-user-page/add-edit-teams-user-page.component';

/**
 * Use a single wizard to create or update a team.  If creating, a new Team is created when loading
 * the wizard.  This wizard is two pages, the first has the form for the team information, the second has
 * the related users on the team.
 */
export class AddEditTeamsWizard extends AbstractWizard<AddEditTeamsWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'add-edit-teams';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model     = new AddEditTeamsWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddEditTeamsFormPageComponent);
    pageMap.set('user-page', AddEditTeamsUserPageComponent);
  }
}

export class AddEditTeamsWizardModel {
  team: Team;
  editMode: boolean = true;
}
