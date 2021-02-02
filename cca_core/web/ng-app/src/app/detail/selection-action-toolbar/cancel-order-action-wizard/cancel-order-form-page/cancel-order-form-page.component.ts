import { Component } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { CancelOrderActionWizard } from "../cancel-order-action-wizard";
import { FormGroup } from "@angular/forms";
import { CcaFormBuilder } from "../../../../core/form/cca-form-builder.service";
import { Observable, of } from "rxjs";
import { MaplesCancelOrderRequest } from "@cscore/maples-client-model";

@Component ( {
  selector: 'cca-cancel-order-form-page',
  templateUrl: './cancel-order-form-page.component.html',
  styleUrls: [ './cancel-order-form-page.component.scss' ]
} )
export class CancelOrderFormPageComponent extends WizardPage<CancelOrderActionWizard> {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    this.wizard.model.request = this.buildRequest ();
    return of ( 'review-page' );
  }

  private buildRequest (): MaplesCancelOrderRequest {
    let request     = new MaplesCancelOrderRequest ();
    request.comment = this.wizardForm.getRawValue ().comment;
    return request;
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      comment: this.formBuilder.comment ( null, true )
    } );
  }

}
