import { Component, OnInit } from '@angular/core';
import {
  RequestFsapiC2cTransferWizard,
  RequestFsapiC2cTransferWizardPageType
} from "../request-fsapi-c2c-transfer-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-request-fsapi-c2c-transfer-results-page',
  templateUrl: './request-fsapi-c2c-transfer-results-page.component.html',
  styleUrls: [ './request-fsapi-c2c-transfer-results-page.component.scss' ]
} )
export class RequestFsapiC2cTransferResultsPageComponent extends WizardResultPage<RequestFsapiC2cTransferWizard> implements OnInit {

  key: string           = RequestFsapiC2cTransferWizardPageType.RESULTS_PAGE;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable = true;
  }

  ngOnInit () {
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
