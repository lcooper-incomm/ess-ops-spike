import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ChangeGreencardStatusWizard } from "../change-greencard-status-wizard";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-change-greencard-status-confirmation',
  templateUrl: './change-greencard-status-confirmation.component.html',
  styleUrls: [ './change-greencard-status-confirmation.component.scss' ]
} )
export class ChangeGreencardStatusConfirmationComponent extends WizardPage<ChangeGreencardStatusWizard> implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = 'Close';
  }

  ngOnInit () {
  }

}
