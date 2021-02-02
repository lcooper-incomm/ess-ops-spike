import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CsCoreAddress } from "@cscore/core-client-model";
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { EditCustomerContactPageType, EditCustomerContactWizard } from '../edit-customer-contact-wizard';
import { Observable, of } from 'rxjs';

@Component ( {
  selector: 'cca-edit-customer-contact-form-page',
  templateUrl: './edit-customer-contact-form-page.component.html',
  styleUrls: [ './edit-customer-contact-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class EditCustomerContactFormPageComponent extends WizardFormPage<EditCustomerContactWizard> {
  key: string = EditCustomerContactPageType.FORM;

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
  }

  onNext (): Observable<string> {
    const formValue = this.wizardForm.getRawValue ();

    if ( this.wizard.model.selection.getCustomer ().isActiveUnregistered ) {
      this.wizard.model.newSnapshot.physicalAddressPostalCode = formValue.postalCode;
    } else {
      this.wizard.model.newSnapshot.emailAddress = formValue.emailAddress;
      this.wizard.model.newSnapshot.mobilePhone  = formValue.mobilePhone;
      this.wizard.model.newSnapshot.homePhone    = formValue.homePhone;

      this.wizard.model.newSnapshot.physicalAddressLine1      = formValue.physicalAddress.line1;
      this.wizard.model.newSnapshot.physicalAddressLine2      = formValue.physicalAddress.line2;
      this.wizard.model.newSnapshot.physicalAddressCity       = formValue.physicalAddress.city;
      this.wizard.model.newSnapshot.physicalAddressState      = formValue.physicalAddress.state;
      this.wizard.model.newSnapshot.physicalAddressPostalCode = formValue.physicalAddress.postalCode;
      this.wizard.model.newSnapshot.physicalAddressCountry    = formValue.physicalAddress.country;

      this.wizard.model.newSnapshot.mailingAddressLine1      = formValue.mailingAddress.line1;
      this.wizard.model.newSnapshot.mailingAddressLine2      = formValue.mailingAddress.line2;
      this.wizard.model.newSnapshot.mailingAddressCity       = formValue.mailingAddress.city;
      this.wizard.model.newSnapshot.mailingAddressState      = formValue.mailingAddress.state;
      this.wizard.model.newSnapshot.mailingAddressPostalCode = formValue.mailingAddress.postalCode;
      this.wizard.model.newSnapshot.mailingAddressCountry    = formValue.mailingAddress.country;
    }

    return of ( EditCustomerContactPageType.CONFIRMATION );
  }

  protected initForm (): FormGroup {
    const snapshot = this.wizard.model.newSnapshot;

    const mailingAddress  = this.wizard.model.newSnapshot.getMailingAddress ();
    const physicalAddress = this.wizard.model.newSnapshot.getPhysicalAddress ();

    if ( this.wizard.model.selection.getCustomer ().isActiveUnregistered ) {
      return new FormGroup ( {
        postalCode: this.formBuilder.postalCode ( physicalAddress.postalCode, true )
      } );
    } else {
      return new FormGroup ( {
        emailAddress: this.formBuilder.emailAddress ( snapshot.emailAddress, this.wizard.model.selection.platform === PlatformType.VMS ),
        mobilePhone: this.formBuilder.phoneNumber ( snapshot.mobilePhone ),
        homePhone: this.formBuilder.phoneNumber ( snapshot.homePhone ),
        isMailingSameAsPhysical: new FormControl ( CsCoreAddress.isEqualValue ( mailingAddress, physicalAddress ) ),
        mailingAddress: this.formBuilder.address ( mailingAddress, true ),
        physicalAddress: this.formBuilder.address ( physicalAddress, true )
      } );
    }
  }
}
