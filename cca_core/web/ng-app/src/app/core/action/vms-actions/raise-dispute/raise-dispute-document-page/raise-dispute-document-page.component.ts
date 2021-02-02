import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RaiseDisputePageType, RaiseDisputeWizard } from '../raise-dispute-wizard';
import { FormGroup } from '@angular/forms';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CsCoreAddress } from "@cscore/core-client-model";
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { Customer } from 'src/app/core/customer/customer';
import { Observable, of } from 'rxjs';
import { DeliveryMethod } from 'src/app/core/model/minion/task/delivery-method';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-raise-dispute-document-page',
  templateUrl: './raise-dispute-document-page.component.html',
  styleUrls: [ './raise-dispute-document-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class RaiseDisputeDocumentPageComponent extends WizardFormPage<RaiseDisputeWizard> {
  key: string = RaiseDisputePageType.DOCUMENT;

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
    this.isBackable = true;
    this.width = WizardWidth.LARGE;
  }

  onNext (): Observable<string> {

    this.wizard.model.deliveryMethod = this.getValueFromForm<DeliveryMethod>('deliveryMethod');
    this.wizard.model.fax = this.getValueFromForm<string>('fax');
    if ( this.wizard.model.selection.getCustomer ().isVmsGiftCard || this.wizard.model.isGreenCard ) {
      this.wizard.model.email = this.getValueFromForm<string>('email');
    }

    return of ( RaiseDisputePageType.CONFIRMATION );
  }

  get address (): CsCoreAddress | null {
    return this.wizard.model.isGreenCard || this.customer.isVmsGiftCard ? this.wizard.model.address : this.customer.getPreferredAddress ();
  }

  get email (): string {
    return this.customer.emailAddress;
  }

  get customer (): Customer {
    return this.wizard.model.selection.getCustomer ();
  }

  protected initForm (): FormGroup {
    return this.formBuilder.deliveryMethod ( null, null, null, true );
  }
}
