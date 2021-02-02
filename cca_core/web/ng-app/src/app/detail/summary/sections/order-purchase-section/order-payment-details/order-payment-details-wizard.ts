import {AbstractWizard} from 'src/app/core/wizard/abstract-wizard';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {Type} from '@angular/core';
import {OrderPaymentDetailsPageComponent} from './order-payment-details-page/order-payment-details-page.component';
import {MaplesOrder, MaplesOrderPayment} from '@cscore/maples-client-model';
import {Selection} from '../../../../../core/session/model/selection';

export class OrderPaymentDetailsWizard extends AbstractWizard<OrderPaymentDetailsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'order-payment-details';
  startingPageKey: string = 'details-page';

  constructor() {
    super();
    this.model = new OrderPaymentDetailsWizardModel();
  }

  buildCodexRequest(): any {
    return {
      'wizard-key': this.key,
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('details-page', OrderPaymentDetailsPageComponent);
  }
}

export class OrderPaymentDetailsWizardModel {
  order: MaplesOrder;
  payment: MaplesOrderPayment;
  selection: Selection<MaplesOrder>;
}
