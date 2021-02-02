import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EditCustomerSummaryWizard, EditCustomerSummaryPageType } from '../edit-customer-summary-wizard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';

@Component ( {
  selector: 'cca-edit-customer-summary-form-page',
  templateUrl: './edit-customer-summary-form-page.component.html',
  styleUrls: [ './edit-customer-summary-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class EditCustomerSummaryFormPageComponent extends WizardFormPage<EditCustomerSummaryWizard> {
  key: string = EditCustomerSummaryPageType.FORM;

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
  }

  onNext (): Observable<string> {
    const formValue = this.wizardForm.getRawValue ();

    this.wizard.model.newSnapshot.dateOfBirth       = formValue.dateOfBirth;
    this.wizard.model.newSnapshot.firstName         = formValue.firstName;
    this.wizard.model.newSnapshot.lastName          = formValue.lastName;
    this.wizard.model.newSnapshot.mothersMaidenName = formValue.mothersMaidenName;

    if ( this.wizard.isDocumentRequired ) {
      this.wizard.pages.get ( EditCustomerSummaryPageType.DOCUMENTS ).instance.isIgnored = false;
      return of ( EditCustomerSummaryPageType.DOCUMENTS );
    } else {
      return of ( EditCustomerSummaryPageType.CONFIRMATION );
    }
  }

  protected initForm (): FormGroup {
    return new FormGroup ( {
      dateOfBirth: this.formBuilder.date ( this.wizard.model.newSnapshot.dateOfBirth, true ),
      firstName: new FormControl ( this.wizard.model.newSnapshot.firstName, Validators.required ),
      lastName: new FormControl ( this.wizard.model.newSnapshot.lastName, Validators.required ),
      mothersMaidenName: new FormControl ( this.wizard.model.newSnapshot.mothersMaidenName ),
    } );
  }
}
