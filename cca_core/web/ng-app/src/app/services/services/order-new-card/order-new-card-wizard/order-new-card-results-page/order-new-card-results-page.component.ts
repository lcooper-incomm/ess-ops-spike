import { Component } from '@angular/core';
import { OrderNewCardWizard } from "../order-new-card-wizard";
import { FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { RegisterVmsCardPage } from "../../../../../core/action/vms-actions/register-vms-card-wizard/register-vms-card-wizard";
import { WizardResultPage } from "../../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-order-new-card-results-page',
  templateUrl: './order-new-card-results-page.component.html',
  styleUrls: [ './order-new-card-results-page.component.scss' ]
} )
export class OrderNewCardResultsPageComponent extends WizardResultPage<OrderNewCardWizard> {
  key: string           = 'result-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.width = WizardWidth.MEDIUM;
  }

  onLoad (): Observable<any> {
    return super.onLoad ()
      .pipe (
        tap ( () => {
          if ( !this.isSuccess () && this.wizard.model.challengeInfo ) {
            // Hide the challenge page and remove it from navigation history
            this.wizard.pages.get ( RegisterVmsCardPage.CHALLENGE ).instance.isIgnored = true;
            this.wizard.removeFromNavigationHistory ( RegisterVmsCardPage.CHALLENGE );
            this.wizard.model.challengeInfo = null;
          }
        } )
      );
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
