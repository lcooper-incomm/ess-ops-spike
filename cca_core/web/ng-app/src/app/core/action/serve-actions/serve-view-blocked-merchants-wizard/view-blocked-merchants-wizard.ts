import {Type} from '@angular/core';
import {AbstractWizard} from '../../../wizard/abstract-wizard';
import {WizardPage} from '../../../wizard/wizard-page';
import {ViewBlockedMerchantsComponent} from './view-blocked-merchants/view-blocked-merchants.component';
import {Selection, SelectionDataType} from '../../../session/model/selection';
import {ViewBlockedMerchantsConfirmationPageComponent} from './view-blocked-merchants-confirmation-page/view-blocked-merchants-confirmation-page.component';
import {ViewUnblockedMerchantsResultPageComponent} from './view-blocked-merchants-result-page/view-blocked-merchants-result-page.component';
import {MaplesRule} from '@cscore/maples-client-model';

export class ViewBlockedMerchantsWizard extends AbstractWizard<ViewBlockedMerchantsWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'view-blocked-merchants';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model     = new ViewBlockedMerchantsWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ViewBlockedMerchantsComponent);
    pageMap.set('confirmation-page', ViewBlockedMerchantsConfirmationPageComponent);
    pageMap.set('result-page', ViewUnblockedMerchantsResultPageComponent);
  }
}

export class ViewBlockedMerchantsWizardModel {
  selection: Selection<SelectionDataType>;
  success: boolean;
  unblockMerchants: MaplesRule[] = [];
  failedMerchants: MaplesRule[] = [];
}
