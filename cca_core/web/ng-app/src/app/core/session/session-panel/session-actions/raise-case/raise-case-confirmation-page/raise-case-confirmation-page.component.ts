import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { RaiseCasePageType, RaiseCaseWizard } from "../raise-case-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { CaseService } from "../../../../case.service";
import { CaseRequest } from "../../../../model/case-request";
import { catchError, map } from "rxjs/operators";
import { Session } from "../../../../model/session";
import { CcaFormBuilder } from "../../../../../form/cca-form-builder.service";
import { WizardWidth } from "../../../../../wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-raise-case-confirmation-page',
  templateUrl: './raise-case-confirmation-page.component.html',
  styleUrls: [ './raise-case-confirmation-page.component.scss' ]
} )
export class RaiseCaseConfirmationPageComponent extends WizardPage<RaiseCaseWizard> implements OnInit {

  key: string           = RaiseCasePageType.CONFIRMATION;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private caseService: CaseService,
                private formBuilder: CcaFormBuilder ) {
    super ();
    this.isBackable      = true;
    this.backButtonText  = 'No';
    this.isNextable      = true;
    this.nextButtonText  = 'Yes';
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    let request = new CaseRequest ( {
      comment: this.wizardForm.get ( 'comment' ).value,
      customerComponent: this.wizard.model.customerComponent ? this.wizard.model.customerComponent.flatten () : null,
      encorComponent: this.wizard.model.encorComponent ? this.wizard.model.encorComponent : null,
      merchantComponent: this.wizard.model.merchantComponent ? this.wizard.model.merchantComponent.flatten () : null,
      queueId: this.wizard.model.queue.id,
      receiptComponent: this.wizard.model.receiptComponent ? this.wizard.model.receiptComponent.flatten () : null,
      sessionType: this.wizard.model.sessionType.getType (),
      sourceSessionId: this.wizard.model.session.id
    } );

    return this.caseService.raiseOne ( request )
      .pipe (
        map ( ( newCase: Session ) => {
          this.wizard.model.newCase = newCase;
          return RaiseCasePageType.RESULTS;
        } ),
        catchError ( ( error: any, caught: Observable<any> ) => {
          return of ( RaiseCasePageType.RESULTS );
        } ) );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      comment: this.formBuilder.comment ( null, true )
    } );
  }
}
