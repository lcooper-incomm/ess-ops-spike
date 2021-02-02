import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ChangeSessionTypeWizard } from "../change-session-type-wizard";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-change-session-type-failure-page',
  templateUrl: './change-session-type-failure-page.component.html',
  styleUrls: [ './change-session-type-failure-page.component.scss' ]
} )
export class ChangeSessionTypeFailurePageComponent extends WizardPage<ChangeSessionTypeWizard> implements OnInit {

  key: string           = 'failure-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isBackable  = true;
    this.isCloseable = true;
  }

  ngOnInit () {
  }
}
