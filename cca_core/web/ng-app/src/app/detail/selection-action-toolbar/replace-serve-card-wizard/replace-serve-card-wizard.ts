import {Type} from '@angular/core';
import {MaplesAccountShippingOption, MaplesCardReplacementRequest, MaplesPlatform} from '@cscore/maples-client-model';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {ReplaceServeCardFormPageComponent} from './replace-serve-card-form-page/replace-serve-card-form-page.component';
import {ReplaceServeCardConfirmationPageComponent} from './replace-serve-card-confirmation-page/replace-serve-card-confirmation-page.component';
import {ReplaceServeCardResultsPageComponent} from './replace-serve-card-results-page/replace-serve-card-results-page.component';
import {IdentifierType} from '../../../core/session/model/identifier-type.enum';
import {CsCoreAddress} from '@cscore/core-client-model';
import {GenericOption} from '../../../core/model/generic-option';
import {PlatformType} from "../../../core/platform/platform-type.enum";


export class ReplaceServeCardWizard extends AbstractWizard<ReplaceServeCardWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'serve-card-replace';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.doRefresh = true;
    this.model     = new ReplaceServeCardWizardModel();

  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ReplaceServeCardFormPageComponent);
    pageMap.set('confirmation-page', ReplaceServeCardConfirmationPageComponent);
    pageMap.set('result-page', ReplaceServeCardResultsPageComponent);
  }
}

export class ReplaceServeCardWizardModel {
  success: number;
  cardId: string;
  pan: string;
  platform: MaplesPlatform;
  primaryAddress: CsCoreAddress;
  request: MaplesCardReplacementRequest                = new MaplesCardReplacementRequest();
  identifierType: IdentifierType;
  identifier: string;
  platformType: PlatformType;
  maplesShippingOptions: MaplesAccountShippingOption[] = [];
  shippingOptions: GenericOption<any>[]                = [];
}
