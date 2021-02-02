import { Component, OnInit } from '@angular/core';
import { VmsSendFormWizard } from "../vms-send-form-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";
import { WizardWidth } from "../../../../wizard/wizard-width.enum";

@Component({
  selector: 'cca-vms-send-form-results-page',
  templateUrl: './vms-send-form-results-page.component.html',
  styleUrls: ['./vms-send-form-results-page.component.scss']
})
export class VmsSendFormResultsPageComponent extends WizardResultPage<VmsSendFormWizard> implements OnInit {

  backButtonText: string    = 'Back';
  closeButtonText: string   = 'Close';
  isBackable: boolean       = true;
  isCloseable: boolean      = true;
  isNextable: boolean       = false;
  key: string               = 'results-page';
  wizardForm: FormGroup     = new FormGroup( {} );

  constructor() {
    super();
    this.width = WizardWidth.MEDIUM;
  }

  isSuccess (): boolean {
    return !this.wizard.model.actionFailed;
  }

  ngOnInit() {
  }

}
