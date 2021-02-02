import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Customer } from "src/app/core/customer/customer";
import { UpdateDeviceStatusConfirmationPageComponent } from './update-device-status-confirmation-page/update-device-status-confirmation-page.component';
import { UpdateDeviceStatusResultPageComponent } from "./update-device-status-result-page/update-device-status-result-page.component";
import { TokenDetail } from "src/app/core/card/token-detail";
import { ChangeDeviceStatus } from "../models/vms-request-models";

export class UpdateDeviceStatusWizard extends AbstractWizard<UpdateDeviceStatusWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'update-device-status';
  startingPageKey: string = 'confirmation-page';

  constructor () {
    super ();
    this.model     = new UpdateDeviceStatusWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'status': this.model.status,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'confirmation-page', UpdateDeviceStatusConfirmationPageComponent );
    pageMap.set ( 'result-page', UpdateDeviceStatusResultPageComponent );
  }
}

export class UpdateDeviceStatusWizardModel {
  comment: string;
  customer: Customer;
  status: ChangeDeviceStatus;
  success: boolean = true;
  token: TokenDetail;
}
