import { Component, OnInit } from '@angular/core';
import { Selection } from "../../../../core/session/model/selection";
import { FormGroup } from "@angular/forms";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { BulkChangeCardStatusWizard } from "../bulk-change-card-status-wizard";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";
import { Observable } from "rxjs";

@Component ( {
  selector: 'cca-bulk-change-card-status-confirmation',
  templateUrl: './bulk-change-card-status-confirmation.component.html',
  styleUrls: [ './bulk-change-card-status-confirmation.component.scss' ]
} )
export class BulkChangeCardStatusConfirmationComponent extends WizardPage<BulkChangeCardStatusWizard> implements OnInit {
  key: string           = 'confirmation-page';
  selection: Selection<any>;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable = true;
    this.isBackable  = false;
    this.width       = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.isBackable = !this.isSuccess ();
    return super.onLoad ();
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
