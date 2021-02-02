import { Component, OnInit } from '@angular/core';
import { CloseCardsOnOrderWizard } from "../close-cards-on-order-wizard";
import { FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-close-cards-on-order-confirmation',
  templateUrl: './close-cards-on-order-confirmation.component.html',
  styleUrls: [ './close-cards-on-order-confirmation.component.scss' ]
} )
export class CloseCardsOnOrderConfirmationComponent extends WizardResultPage <CloseCardsOnOrderWizard> implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = 'Close'
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
