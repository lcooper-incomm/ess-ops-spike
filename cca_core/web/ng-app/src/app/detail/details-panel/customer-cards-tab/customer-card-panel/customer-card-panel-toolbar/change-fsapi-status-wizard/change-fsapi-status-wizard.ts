import { AbstractWizard } from "../../../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../../../core/wizard/wizard-page";
import { ChangeFsapiStatusFormPageComponent } from "./form-page/change-fsapi-status-form-page.component";
import { Card } from "../../../../../../core/card/card";
import { ChangeFsapiStatusPinAlertComponent } from "./pin-alert-page/change-fsapi-status-pin-alert.component";
import { ChangeFsapiStatusResultsPageComponent } from "./results-page/change-fsapi-status-results-page.component";
import { ChangeFsapiStatusConfirmationPageComponent } from "./confirmation-page/change-fsapi-status-confirmation-page.component";
import { PlatformType } from "../../../../../../core/platform/platform-type.enum";
import { Partner } from "../../../../../../core/session/selection/partner";
import { User } from "../../../../../../core/user/user";
import { Selection } from "../../../../../../core/session/model/selection";
import { FsapiStatusType } from "src/app/core/status/fsapi-status/fsapi-status-type.enum";
import { GenericOption } from "src/app/core/model/generic-option";

export enum ChangeFsapiStatusPageType {
  FORM_PAGE      = 'form-page',
  PIN_ALERT_PAGE = 'pin-alert-page',
  CONFIRM_PAGE   = 'confirm-page',
  RESULTS_PAGE   = 'results-page'
}

export class ChangeFsapiStatusWizard extends AbstractWizard<ChangeFsapiStatusWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'change-fsapi-status';
  startingPageKey: string = ChangeFsapiStatusPageType.FORM_PAGE;

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new ChangeFsapiStatusWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    super.buildPlaceholders ( user, selection );
    let numberToUse = this.model.cardNumber ? this.model.cardNumber : this.model.maskedPan;
    this.placeholderDictionary.addPlaceholder ( 'CARD_NUMBER', numberToUse );
    this.placeholderDictionary.addPlaceholder ( 'CALL_LOG_ID', this.model.sessionId );
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( ChangeFsapiStatusPageType.FORM_PAGE, ChangeFsapiStatusFormPageComponent );
    pageMap.set ( ChangeFsapiStatusPageType.PIN_ALERT_PAGE, ChangeFsapiStatusPinAlertComponent );
    pageMap.set ( ChangeFsapiStatusPageType.CONFIRM_PAGE, ChangeFsapiStatusConfirmationPageComponent );
    pageMap.set ( ChangeFsapiStatusPageType.RESULTS_PAGE, ChangeFsapiStatusResultsPageComponent );
  }
}

export class ChangeFsapiStatusWizardModel {
  allowedStatuses: GenericOption<FsapiStatusType>[] = [];
  card: Card;
  cardNumber: string;
  comment: string;
  customerId: string;
  currentStatus: string;
  isFailed: boolean                                 = false;
  isPinSet: boolean;
  maskedPan: string;
  newStatus: string;
  panLastFour: string;
  partner: Partner;
  platform: PlatformType;
  sessionId: string;
  value: string;
}
