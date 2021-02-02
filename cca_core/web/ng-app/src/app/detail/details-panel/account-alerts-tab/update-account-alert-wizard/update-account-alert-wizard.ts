import {AbstractWizard} from "../../../../core/wizard/abstract-wizard";
import {Selection} from "../../../../core/session/model/selection";
import {Type} from "@angular/core";
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {User} from "../../../../core/user/user";
import {UpdateAccountAlertFormPageComponent} from "./update-account-alert-form-page/update-account-alert-form-page.component";
import {MaplesAlert} from "@cscore/maples-client-model";

export class UpdateAccountAlertWizard extends AbstractWizard<UpdateAccountAlertWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'update-customer-alert';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model     = new UpdateAccountAlertWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(): any {
    return {
      'wizard-key': this.key,
      alertName: this.model.alert.type,
      alertType: this.model.alert.type,
      alertValue: this.model.alert.threshold ? this.model.alert.threshold.value : null
    };
  }

  buildPlaceholders(user: User, selection: Selection<any>): void {
    super.buildPlaceholders(user, selection);
    this.placeholderDictionary.addPlaceholder('ALERT_NAME', this.model.alert.type)
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', UpdateAccountAlertFormPageComponent);
  }
}

export class UpdateAccountAlertWizardModel {
  alert: MaplesAlert;
  selection: Selection<any>;
}
