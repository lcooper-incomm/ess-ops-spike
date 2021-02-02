import { AbstractWizard } from "../../../../../core/wizard/abstract-wizard";
import { RedemptionDelay } from "../../../../../core/customer/redemption-delay";
import { CustomerRedemptionDelayFormPageComponent } from "./customer-redemption-delay-form-page/customer-redemption-delay-form-page.component";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../../core/wizard/wizard-page";

export class CustomerRedemptionDelayWizard extends AbstractWizard<CustomerRedemptionDelayWizardModel> {

  public static readonly FORM_PAGE: string = 'form-page';

  displayStepper: boolean = false;
  key: string             = 'customer-redemption-delay';
  startingPageKey: string = CustomerRedemptionDelayWizard.FORM_PAGE;

  constructor () {
    super ();
    this.model = new CustomerRedemptionDelayWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( CustomerRedemptionDelayWizard.FORM_PAGE, CustomerRedemptionDelayFormPageComponent );
  }

}

export class CustomerRedemptionDelayWizardModel {
  redemptionDelays: RedemptionDelay[] = [];
}
