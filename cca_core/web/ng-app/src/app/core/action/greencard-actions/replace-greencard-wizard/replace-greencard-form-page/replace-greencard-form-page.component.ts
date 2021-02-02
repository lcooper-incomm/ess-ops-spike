import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permission } from 'src/app/core/auth/permission';
import { SecurityService } from 'src/app/core/security/security.service';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ReplaceGreencardWizard } from '../replace-greencard-wizard';
import { CcaValidators } from '../../../../validators/cca-validators';
import { Observable, of } from 'rxjs';
import { CsCoreAddress } from "@cscore/core-client-model";
import { CardHolder } from '../../greencard-action-service/greencard-action-request-models';

@Component ( {
  selector: 'cca-replace-greencard-form-page',
  templateUrl: './replace-greencard-form-page.component.html',
  styleUrls: [ './replace-greencard-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ReplaceGreencardFormPageComponent extends WizardPage<ReplaceGreencardWizard> {
  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  isNextable: boolean     = true;
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';

  canUseNewCardNumber: boolean;

  constructor ( securityService: SecurityService, private formBuilder: FormBuilder ) {
    super ();
    this.canUseNewCardNumber = securityService.hasPermission ( Permission.GC_REPLACE_CARD_USE_NEW_CARD_NUMBER );
    this.initForm ();
  }

  onNext (): Observable<string> {
    this.wizard.model.cardHolder = this.getCardHolder ();
    this.wizard.model.replacePan = this.getReplacePan ();
    return of ( 'confirmation-page' );
  }

  private getAddress (): CsCoreAddress {
    return this.getValueFromForm<CsCoreAddress> ( 'address' );
  }

  private getCardHolder (): CardHolder {
    const firstName = this.getValueFromForm<string> ( 'firstName' );
    const lastName  = this.getValueFromForm<string> ( 'lastName' );
    const phone     = this.getValueFromForm<string> ( 'phoneNumber' );
    const birthYear = this.getValueFromForm<string> ( 'birthYear' );
    const address   = this.getAddress ();

    return new CardHolder ( {
      address,
      birthYear,
      firstName,
      lastName,
      phone,
    } );
  }

  private getReplacePan (): boolean {
    return this.getValueFromForm<boolean> ( 'replacePan' );
  }

  initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'replacePan': [ false ],
      'firstName': [ null, Validators.required ],
      'lastName': [ null, Validators.required ],
      'phoneNumber': [ null, [ Validators.required, CcaValidators.lengthEquals ( 10 ) ] ],
      'birthYear': [ null, [ Validators.required, CcaValidators.lengthEquals ( 4 ) ] ],
      'address': this.formBuilder.group ( {
        'line1': [ null, Validators.required ],
        'line2': [ null ],
        'postalCode': [ null, Validators.required ],
        'city': [ null, Validators.required ],
        'state': [ null, Validators.required ],
        'country': [ null ],
      } ),
    } );
  }
}
