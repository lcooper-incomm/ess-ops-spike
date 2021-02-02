import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { MaplesAccount, MaplesAccountNotification } from "@cscore/maples-client-model";
import { AccountNotificationDetailsComponent } from "./account-notification-details/account-notification-details.component";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { Selection } from "../../../../core/session/model/selection";

export class AccountNotificationWizard extends AbstractWizard<AccountNotificationWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'account-notification-details';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new AccountNotificationWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', AccountNotificationDetailsComponent );
  }
}

export class AccountNotificationWizardModel {
  platform: PlatformType;
  accountId: string;
  data: MaplesAccountNotification;
  selection: Selection< MaplesAccount >;
}
