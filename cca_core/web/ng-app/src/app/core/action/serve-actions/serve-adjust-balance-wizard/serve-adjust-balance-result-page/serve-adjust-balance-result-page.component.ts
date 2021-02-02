import { Component, OnInit } from '@angular/core';
import {ServeAdjustBalanceWizard} from "../serve-adjust-balance-wizard";
import {WizardResultPage} from "../../../../wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component({
  selector: 'cca-serve-adjust-balance-result-page',
  templateUrl: './serve-adjust-balance-result-page.component.html',
  styleUrls: ['./serve-adjust-balance-result-page.component.scss']
})
export class ServeAdjustBalanceResultPageComponent extends WizardResultPage<ServeAdjustBalanceWizard>{

  constructor() {
    super();
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }

}
