import { AbstractWizard } from "../../../../../core/wizard/abstract-wizard";
import { OrderRiskDetailsDetailPageComponent } from "./order-risk-details-detail-page/order-risk-details-detail-page.component";
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { Type } from "@angular/core";
import { MaplesOrderPaymentRisk } from "@cscore/maples-client-model";

export class OrderRiskDetailsWizard extends AbstractWizard<OrderRiskDetailsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'order-risk-detail';
  startingPageKey: string = 'detail-page';

  constructor () {
    super ();
    this.model = new OrderRiskDetailsWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'detail-page', OrderRiskDetailsDetailPageComponent );
  }

}

export class OrderRiskDetailsWizardModel {
  risk: MaplesOrderPaymentRisk;
}
