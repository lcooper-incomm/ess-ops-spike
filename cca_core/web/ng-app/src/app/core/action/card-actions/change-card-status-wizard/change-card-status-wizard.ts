import {Type} from '@angular/core';
import {MaplesCardChangeStatusRequest, MaplesPlatform} from '@cscore/maples-client-model';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {ChangeCardStatusFormPageComponent} from './change-card-status-form-page/change-card-status-form-page.component';
import {ChangeCardStatusConfirmationPageComponent} from './change-card-status-confirmation-page/change-card-status-confirmation-page.component';
import {ChangeCardStatusResultPageComponent} from './change-card-status-result-page/change-card-status-result-page.component';
import {AuditActivityType} from '../../../audit/audit-activity-type.enum';
import {IdentifierType} from '../../../session/model/identifier-type.enum';

export class ChangeCardStatusWizard extends AbstractWizard<ChangeCardStatusWizardModel> {

  key: string             = 'change-card-status';
  startingPageKey: string = 'form-page';
  displayStepper: boolean = true;

  constructor() {
    super();
    this.doRefresh = true;
    this.model = new ChangeCardStatusWizardModel();
  }

  buildCodexRequest(): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ChangeCardStatusFormPageComponent);
    pageMap.set('confirmation-page', ChangeCardStatusConfirmationPageComponent);
    pageMap.set('result-page', ChangeCardStatusResultPageComponent);
  }

  updatePageTitles(page: WizardPage<any>): void {
    if (this.model.cardChangeStatusRequest.cardStatus === 'Activate') {
      page.title = 'Activate Card';
    } else {
      page.title = 'Change Card Status';
    }
  }
}

export class ChangeCardStatusWizardModel {
  statusFixed: boolean;
  currentStatus: string;
  auditActivityType: AuditActivityType;
  accountId: string;
  accountStatus: string;
  cardChangeStatusRequest: MaplesCardChangeStatusRequest = new MaplesCardChangeStatusRequest({
    cardStatus: 'LOCKED',
    statusReason: undefined,
    cardId: undefined,
    cvvCode: undefined
  });
  platform: MaplesPlatform;
  comment: string;
  identifierType: IdentifierType;
  identifier: string;
  success: number = 0;
}
