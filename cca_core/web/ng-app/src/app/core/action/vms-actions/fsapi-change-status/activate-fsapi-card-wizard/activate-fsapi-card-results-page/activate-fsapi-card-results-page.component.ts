import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ActivateFsapiCardWizard } from "../activate-fsapi-card-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from 'rxjs';

@Component ( {
  selector: 'cca-activate-fsapi-card-results-page',
  templateUrl: './activate-fsapi-card-results-page.component.html',
  styleUrls: [ './activate-fsapi-card-results-page.component.scss' ]
} )
export class ActivateFsapiCardResultsPageComponent extends WizardPage<ActivateFsapiCardWizard> implements OnInit {

  closeButtonText: string = 'Close';
  isBackable: boolean     = false;
  isCloseable: boolean    = true;
  isNextable: boolean     = false;
  key: string             = 'results-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor () {
    super ();
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.isFailed        = this.wizard.model.actionFailed;
    this.isBackable      = this.wizard.model.actionFailed;
    this.closeButtonText = this.wizard.model.actionFailed ? 'Cancel' : 'Close';
    return of ( null );
  }
}
