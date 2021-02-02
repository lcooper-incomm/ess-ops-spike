import {MaplesAccountShippingOption} from '@cscore/maples-client-model';
import {CsCoreCurrency, CsCoreCurrencyCode, CsCoreCurrencyUtil} from '@cscore/gringotts';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {ReplaceServeCardWizard} from './replace-serve-card-wizard';

export class ReplaceServeCardPageComponent extends WizardPage<ReplaceServeCardWizard> {

  wizardForm;
  key: string;

  hasShippingFee(shippingMethod: string): boolean {
    if (!shippingMethod) {
      return false;
    }
    const shipping: MaplesAccountShippingOption = this.wizard.model.maplesShippingOptions
      .find((value: MaplesAccountShippingOption) => value.code === shippingMethod);

    if (shipping) {
      const amount: CsCoreCurrency = CsCoreCurrencyUtil.buildWithCode(+shipping.amount, CsCoreCurrencyCode.USD);
      return !amount.isZero() && amount.isPositive();
    } else {
      return false;
    }
  }
}
