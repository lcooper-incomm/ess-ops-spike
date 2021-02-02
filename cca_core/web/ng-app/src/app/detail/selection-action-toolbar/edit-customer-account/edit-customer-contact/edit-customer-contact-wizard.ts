import { Type } from "@angular/core";
import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import { Selection } from "src/app/core/session/model/selection";
import { EditCustomerAccountSnapshot } from "../edit-customer-account-snapshot";
import { Customer } from "src/app/core/customer/customer";
import { EditCustomerContactFormPageComponent } from "./edit-customer-contact-form-page/edit-customer-contact-form-page.component";
import { EditCustomerContactConfirmationPageComponent } from "./edit-customer-contact-confirmation-page/edit-customer-contact-confirmation-page.component";
import { EditCustomerContactResultPageComponent } from "./edit-customer-contact-result-page/edit-customer-contact-result-page.component";

export enum EditCustomerContactPageType {
  FORM         = 'form-page',
  CONFIRMATION = 'confirmation-page',
  RESULT       = 'result-page',
}

export class EditCustomerContactWizard extends AbstractWizard<EditCustomerContactWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'edit-customer-contact';
  startingPageKey: string = EditCustomerContactPageType.FORM;

  constructor () {
    super ();
    this.model     = new EditCustomerContactWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      platform: this.model.selection.platform,
      isFailed: this.model.isFailed,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    this.takeSnapshots ();
    pageMap.set ( EditCustomerContactPageType.FORM, EditCustomerContactFormPageComponent );
    pageMap.set ( EditCustomerContactPageType.CONFIRMATION, EditCustomerContactConfirmationPageComponent );
    pageMap.set ( EditCustomerContactPageType.RESULT, EditCustomerContactResultPageComponent );
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

export class EditCustomerContactWizardModel {
  comment: string;
  isFailed: boolean = false;
  newSnapshot: EditCustomerAccountSnapshot;
  originalSnapshot: EditCustomerAccountSnapshot;
  reason: string;
  selection: Selection<Customer>;
}
