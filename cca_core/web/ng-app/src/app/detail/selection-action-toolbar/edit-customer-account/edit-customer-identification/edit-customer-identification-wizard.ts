import { Type } from '@angular/core';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { Customer } from 'src/app/core/customer/customer';
import { IdentificationType } from 'src/app/core/customer/identification-type';
import { Occupation } from 'src/app/core/customer/occupation';
import { ReasonCode } from 'src/app/core/action/product-action-reason-code';
import { Selection } from 'src/app/core/session/model/selection';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { EditCustomerAccountSnapshot } from '../edit-customer-account-snapshot';
import { EditCustomerIdentificationConfirmationPageComponent } from './edit-customer-identification-confirmation-page/edit-customer-identification-confirmation-page.component';
import { EditCustomerIdentificationFormPageComponent } from './edit-customer-identification-form-page/edit-customer-identification-form-page.component';
import { EditCustomerIdentificationResultPageComponent } from './edit-customer-identification-result-page/edit-customer-identification-result-page.component';

export enum EditCustomerIdentificationPageType {
  FORM         = 'form-page',
  CONFIRMATION = 'confirmation-page',
  RESULT       = 'result-page',
}

export class EditCustomerIdentificationWizard extends AbstractWizard<EditCustomerIdentificationWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'edit-customer-identification';
  startingPageKey: string = EditCustomerIdentificationPageType.FORM;

  constructor () {
    super ();
    this.model     = new EditCustomerIdentificationWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      isFailed: this.model.isFailed,
      isUSFormInvalid: this.model.isUSFormInvalid,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    this.takeSnapshots ();
    pageMap.set ( EditCustomerIdentificationPageType.FORM, EditCustomerIdentificationFormPageComponent );
    pageMap.set ( EditCustomerIdentificationPageType.CONFIRMATION, EditCustomerIdentificationConfirmationPageComponent );
    pageMap.set ( EditCustomerIdentificationPageType.RESULT, EditCustomerIdentificationResultPageComponent );
  }

  /**
   * We want snapshots of the account that we can diff later on to determine whether documents are required and which
   * requests we're making to APLS to update all the different pieces of the account.
   */
  private takeSnapshots (): void {
    this.model.originalSnapshot = this.takeSnapshot ();
    this.model.newSnapshot      = this.takeSnapshot ();
  }

  private takeSnapshot (): EditCustomerAccountSnapshot {
    const customer = this.model.selection.getCustomer ();
    return EditCustomerAccountSnapshot.build ( customer );
  }
}

export class EditCustomerIdentificationWizardModel {
  comment: string;
  identificationProvinceDisplayValue: string;
  identificationType: IdentificationType;
  isFailed: boolean = false;
  isUSFormInvalid: boolean;
  newSnapshot: EditCustomerAccountSnapshot;
  noTaxpayerIdReason: ReasonCode;
  occupation: Occupation;
  originalSnapshot: EditCustomerAccountSnapshot;
  reason: string;
  selection: Selection<Customer>;
  taxJurisdictionResidenceDisplayValue: string;
}
