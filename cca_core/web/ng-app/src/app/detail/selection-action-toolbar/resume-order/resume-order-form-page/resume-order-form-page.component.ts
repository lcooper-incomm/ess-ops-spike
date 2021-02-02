import { Component } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ResumeOrderWizard, ResumeOrderWizardPageType } from "../resume-order-wizard";
import { FormGroup } from "@angular/forms";
import { CcaFormBuilder } from "../../../../core/form/cca-form-builder.service";
import { MaplesResumeOrderRequest } from "@cscore/maples-client-model";
import { Observable, of } from "rxjs";

@Component ( {
  selector: 'cca-resume-order-form-page',
  templateUrl: './resume-order-form-page.component.html',
  styleUrls: [ './resume-order-form-page.component.scss' ]
} )
export class ResumeOrderFormPageComponent extends WizardPage<ResumeOrderWizard> {

  key: string           = ResumeOrderWizardPageType.FORM_PAGE;
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
    return of ( ResumeOrderWizardPageType.CONFIRMATION_PAGE );
  }

  private buildRequest (): MaplesResumeOrderRequest {
    let request     = new MaplesResumeOrderRequest ();
    request.comment = this.wizardForm.getRawValue ().comment;
    return request;
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      comment: this.formBuilder.comment ( null, true )
    } );
  }

}
