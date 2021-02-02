import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { UpdateDeviceStatusWizard } from '../update-device-status-wizard';

@Component ( {
  selector: 'cca-update-device-status-result-page',
  templateUrl: './update-device-status-result-page.component.html',
  styleUrls: [ './update-device-status-result-page.component.scss' ]
} )
export class UpdateDeviceStatusResultPageComponent extends WizardResultPage<UpdateDeviceStatusWizard> {

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
