import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Observable, of } from 'rxjs';
import { TransferGreencardWizard } from '../transfer-greencard-wizard';
import { CcaValidators } from 'src/app/core/validators/cca-validators';

@Component ( {
  selector: 'cca-transfer-greencard-form-page',
  templateUrl: './transfer-greencard-form-page.component.html',
  styleUrls: [ './transfer-greencard-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TransferGreencardFormPageComponent extends WizardPage<TransferGreencardWizard> {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private formBuilder: FormBuilder ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initForm ();
  }

  get oldSerialNumber (): string {
    const card = this.wizard.model.selection.getCard ();
    return card && card.identifiers.serialNumber;
  }

  onNext (): Observable<string> {
    this.wizard.model.newSerialNumber = this.getValueFromForm<string> ( 'newSerialNumber' );
    this.wizard.model.comment         = this.getValueFromForm<string> ( 'comment' );
    return of ( 'confirmation-page' );
  }

  initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'newSerialNumber': [ null, [ Validators.required, CcaValidators.notEquals ( this.oldSerialNumber, 'Must be different from selected card' ) ] ],
      'comment': [ null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ],
    } );
  }
}
