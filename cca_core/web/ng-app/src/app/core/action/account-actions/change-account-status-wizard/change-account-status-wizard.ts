import {Type} from "@angular/core";
import {MaplesAccountChangeStatusRequest, MaplesAccountCode, MaplesPlatform} from "@cscore/maples-client-model";
import {AbstractWizard} from "../../../wizard/abstract-wizard";
import {WizardPage} from "../../../wizard/wizard-page";
import {ChangeAccountStatusFormPageComponent} from "./change-account-status-form-page/change-account-status-form-page.component";
import {ChangeAccountStatusConfirmationPageComponent} from "./change-account-status-confirmation-page/change-account-status-confirmation-page.component";
import {ChangeAccountStatusResultPageComponent} from "./change-account-status-result-page/change-account-status-result-page.component";

export class ChangeAccountStatusWizard extends AbstractWizard<ChangeAccountStatusWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'change-account-status';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new ChangeAccountStatusWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success === 0
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ChangeAccountStatusFormPageComponent );
    pageMap.set ( 'confirmation-page', ChangeAccountStatusConfirmationPageComponent );
    pageMap.set ( 'result-page', ChangeAccountStatusResultPageComponent );
  }
}

export class ChangeAccountStatusWizardModel {
  accountId: string;
  currentStatus: string;
  currentStatusCode: MaplesAccountCode;
  currentReason: string;
  accountChangeStatusRequest: MaplesAccountChangeStatusRequest = <MaplesAccountChangeStatusRequest>{
    accountStatus: undefined,
    statusReason: undefined
  };
  platform: MaplesPlatform;
  comment: string;
  success: number = 0;
}
