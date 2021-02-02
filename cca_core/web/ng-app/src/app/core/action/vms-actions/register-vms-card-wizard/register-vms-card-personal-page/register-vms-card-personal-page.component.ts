import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { RegisterVmsCardWizard, RegisterVmsCardPage } from '../register-vms-card-wizard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { DateService } from 'src/app/core/date/date.service';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-register-vms-card-personal-page',
  templateUrl: './register-vms-card-personal-page.component.html',
  styleUrls: [ './register-vms-card-personal-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class RegisterVmsCardPersonalPageComponent extends WizardFormPage<RegisterVmsCardWizard> {
  key: string           = RegisterVmsCardPage.PERSONAL;

  constructor ( private dateService: DateService, private formBuilder: CcaFormBuilder ) {
    super ();
    this.isBackable = true;
    this.width      = WizardWidth.MEDIUM;
  }

  onNext (): Observable<string> {
    this.wizard.model.personal = {
      firstName: this.getValueFromForm<string> ( 'firstName' ),
      lastName: this.getValueFromForm<string> ( 'lastName' ),
      dateOfBirth: this.getValueFromForm<string> ( 'dateOfBirth' ),
      mothersMaidenName: this.getValueFromForm<string> ( 'mothersMaidenName' ),
    };
    return of ( RegisterVmsCardPage.CONTACT );
  }

  protected initForm (): FormGroup {
    const data = this.wizard.model.initialData;

    return new FormGroup ( {
      dateOfBirth: this.formBuilder.date ( data && data.dateOfBirth && this.dateService.convertYYYYMMDDToMMDDYYYY ( data.dateOfBirth ), true ),
      firstName: new FormControl ( data && data.firstName, [ Validators.required ] ),
      lastName: new FormControl ( data && data.lastName, [ Validators.required ] ),
      mothersMaidenName: new FormControl ( data && data.mothersMaidenName, [ Validators.required ] )
    } );
  }
}
