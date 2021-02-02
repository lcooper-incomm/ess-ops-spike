import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { RegisterVmsCardPage, RegisterVmsCardWizard } from '../register-vms-card-wizard';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-register-vms-card-contact-page',
  templateUrl: './register-vms-card-contact-page.component.html',
  styleUrls: [ './register-vms-card-contact-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class RegisterVmsCardContactPageComponent extends WizardFormPage<RegisterVmsCardWizard> {
  key: string           = RegisterVmsCardPage.CONTACT;

  constructor ( private formBuilderService: CcaFormBuilder ) {
    super ();
    this.isBackable = true;
    this.width      = WizardWidth.MEDIUM;
  }

  onNext (): Observable<string> {
    this.wizard.model.contact = {
      email: this.getValueFromForm<string> ( 'emailAddress' ),
      mobilePhone: this.getPhoneNumber ( 'mobilePhone', CsCorePhoneNumberType.MOBILE ),
      homePhone: this.getPhoneNumber ( 'homePhone', CsCorePhoneNumberType.LANDLINE ),
      mailingAddress: this.getAddress ( 'mailingAddress', CsCoreAddressType.MAILING ),
      physicalAddress: this.getAddress ( 'physicalAddress', CsCoreAddressType.PHYSICAL ),
    };
    return of ( RegisterVmsCardPage.IDENTIFICATION );
  }

  private getPhoneNumber ( controlName: string, type: CsCorePhoneNumberType ): CsCorePhoneNumber | null {
    const value = this.getValueFromForm<string> ( controlName );
    return value && new CsCorePhoneNumber ( {
      number: this.getValueFromForm<string> ( controlName ),
      type,
    } );
  }

  private getAddress ( controlName: string, type: CsCoreAddressType ): CsCoreAddress | null {
    const address = this.getValueFromForm<CsCoreAddress> ( controlName );
    return address && new CsCoreAddress ( {
      ...address,
      type,
    } );
  }

  protected initForm (): FormGroup {
    const data            = this.wizard.model.initialData;
    const mobilePhone     = data && data.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE );
    const homePhone       = data && data.getPhoneNumberByType ( CsCorePhoneNumberType.LANDLINE );
    const mailingAddress  = data && data.getAddressByType ( CsCoreAddressType.MAILING );
    const physicalAddress = data && data.getAddressByType ( CsCoreAddressType.PHYSICAL );

    return new FormGroup ( {
      emailAddress: this.formBuilderService.emailAddress ( data && data.emailAddress, this.wizard.model.platform === PlatformType.VMS ),
      mobilePhone: this.formBuilderService.phoneNumber ( mobilePhone && mobilePhone.number, true ),
      homePhone: this.formBuilderService.phoneNumber ( homePhone && homePhone.number ),
      isMailingSameAsPhysical: new FormControl ( CsCoreAddress.isEqualValue ( mailingAddress, physicalAddress ) ),
      mailingAddress: this.formBuilderService.address ( mailingAddress, true ),
      physicalAddress: this.formBuilderService.address ( physicalAddress, true )
    } );
  }
}
