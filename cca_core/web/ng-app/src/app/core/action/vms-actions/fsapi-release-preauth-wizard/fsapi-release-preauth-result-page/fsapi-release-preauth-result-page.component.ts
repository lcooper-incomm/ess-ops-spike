import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { FsapiReleasePreauthWizard } from '../fsapi-release-preauth-wizard';

@Component ( {
  selector: 'cca-fsapi-release-preauth-result-page',
  templateUrl: './fsapi-release-preauth-result-page.component.html',
  styleUrls: [ './fsapi-release-preauth-result-page.component.scss' ]
} )
export class FsapiReleasePreauthResultPageComponent extends WizardResultPage<FsapiReleasePreauthWizard> {

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
