import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../../core/wizard/wizard-page";
import { ChangeFsapiStatusPageType, ChangeFsapiStatusWizard } from "../change-fsapi-status-wizard";

import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";

@Component ( {
  selector: 'cca-change-fsapi-status-confirmation',
  templateUrl: './change-fsapi-status-results-page.component.html',
  styleUrls: [ './change-fsapi-status-results-page.component.scss' ]
} )
export class ChangeFsapiStatusResultsPageComponent extends WizardPage<ChangeFsapiStatusWizard> implements OnInit {

  key: string           = ChangeFsapiStatusPageType.RESULTS_PAGE;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable = true;
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.isFailed        = this.wizard.model.isFailed;
    this.isBackable      = this.wizard.model.isFailed;
    this.closeButtonText = this.wizard.model.isFailed ? 'Cancel' : 'Close';
    return of ( null );
  }
}
