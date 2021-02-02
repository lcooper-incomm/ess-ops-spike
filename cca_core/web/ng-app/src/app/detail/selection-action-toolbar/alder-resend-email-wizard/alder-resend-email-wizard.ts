import {Type} from '@angular/core';
import {MaplesOrder, MaplesResendEmailRequest} from '@cscore/maples-client-model';
import {Selection} from '../../../core/session/model/selection';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {AlderResendEmailConfirmationComponent} from './confirmation-page/confirmation-page.component';
import {AlderResendEmailFormComponent} from './form-page/form-page.component';
import {AlderResendEmailResultComponent} from './result-page/result-page.component';
import {GenericOption} from '../../../core/model/generic-option';
import {Identifier} from '../../../core/session/model/identifier';
import {IdentifierType} from '../../../core/session/model/identifier-type.enum';

export class AlderResendEmailWizard extends AbstractWizard<AlderResendEmailWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'alder-resend-email';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.doRefresh = true;
    this.model     = new AlderResendEmailWizardModel();

  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AlderResendEmailFormComponent);
    pageMap.set('confirmation-page', AlderResendEmailConfirmationComponent);
    pageMap.set('result-page', AlderResendEmailResultComponent);
  }
}

export class AlderResendEmailWizardModel {
  selection: Selection<MaplesOrder>;
  request: MaplesResendEmailRequest = new MaplesResendEmailRequest();
  mode: string;
  comment: string;
  showEmail: boolean = false;
  identifierType: IdentifierType;
  identifier: string;
  success: number = 0;
}
