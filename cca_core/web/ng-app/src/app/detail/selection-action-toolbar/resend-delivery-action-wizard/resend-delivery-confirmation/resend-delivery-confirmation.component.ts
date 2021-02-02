import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ResendDeliveryActionWizard } from "../resend-delivery-action-wizard";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-resend-delivery-confirmation',
  templateUrl: './resend-delivery-confirmation.component.html',
  styleUrls: [ './resend-delivery-confirmation.component.scss' ]
} )
export class ResendDeliveryConfirmationComponent extends WizardPage<ResendDeliveryActionWizard> implements OnInit {
  key: string           = 'confirmation-page';
  PlatformType          = PlatformType;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = 'Close';
  }

  ngOnInit () {
  }

}
