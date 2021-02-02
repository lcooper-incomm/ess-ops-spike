import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { CustomerAlert } from "../../../../core/customer/customer-alert";
import { Selection } from "../../../../core/session/model/selection";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { UpdateCustomerAlertFormPageComponent } from "./update-customer-alert-form-page/update-customer-alert-form-page.component";
import { User } from "../../../../core/user/user";

export class UpdateCustomerAlertWizard extends AbstractWizard<UpdateCustomerAlertWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'update-customer-alert';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new UpdateCustomerAlertWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key,
      alertName: this.model.alert.name,
      alertType: this.model.alert.type,
      alertValue: this.model.alert.value ? this.model.alert.value.value : null
    };
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    super.buildPlaceholders ( user, selection );
    this.placeholderDictionary.addPlaceholder ( 'ALERT_NAME', this.model.alert.name )
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', UpdateCustomerAlertFormPageComponent );
  }
}

export class UpdateCustomerAlertWizardModel {
  alert: CustomerAlert;
  selection: Selection<any>;
}
