import { Component } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { HoldOrderWizard, HoldOrderWizardPageType } from "../hold-order-wizard";
import { FormGroup } from "@angular/forms";
import { CcaFormBuilder } from "../../../../core/form/cca-form-builder.service";
import { Observable, of } from "rxjs";

@Component ( {
  selector: 'cca-hold-order-form-page',
  templateUrl: './hold-order-form-page.component.html',
  styleUrls: [ './hold-order-form-page.component.scss' ]
} )
export class HoldOrderFormPageComponent extends WizardPage<HoldOrderWizard> {

  key: string           = HoldOrderWizardPageType.FORM_PAGE;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  onLoad (): Observable<any> {
    this.initForm ();
    return of ( null );
  }

  onNext (): Observable<string> {
    this.wizard.model.comment = this.wizardForm.getRawValue ().comment;
    return of ( HoldOrderWizardPageType.CONFIRMATION_PAGE );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      comment: this.formBuilder.comment ( this.wizard.model.comment, true )
    } );
  }

}
