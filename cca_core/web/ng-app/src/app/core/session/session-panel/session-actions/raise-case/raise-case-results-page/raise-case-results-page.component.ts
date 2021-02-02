import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { RaiseCasePageType, RaiseCaseWizard } from "../raise-case-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { WizardWidth } from "../../../../../wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-raise-case-results-page',
  templateUrl: './raise-case-results-page.component.html',
  styleUrls: [ './raise-case-results-page.component.scss' ]
} )
export class RaiseCaseResultsPageComponent extends WizardPage<RaiseCaseWizard> implements OnInit {

  key: string           = RaiseCasePageType.RESULTS;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable = true;
    this.width       = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.isFailed        = !this.wizard.model.newCase;
    this.isBackable      = !this.wizard.model.newCase;
    this.closeButtonText = this.wizard.model.newCase ? 'Close' : 'Cancel';
    return of ( null );
  }
}
