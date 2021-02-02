import {AbstractWizard} from "../../../../core/wizard/abstract-wizard";
import {Card} from "../../../../core/card/card";
import {Customer} from "../../../../core/customer/customer";
import {MaplesAccount, MaplesCustomer, MaplesOrder} from "@cscore/maples-client-model";
import {Type} from "@angular/core";
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {VerifyCustomerFormPageComponent} from "./verify-customer-form-page/verify-customer-form-page.component";
import {AuditActivityType} from "../../../../core/audit/audit-activity-type.enum";

export class VerifyCustomerWizard extends AbstractWizard<VerifyCustomerWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'verify-customer';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new VerifyCustomerWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', VerifyCustomerFormPageComponent );
  }
}

export class VerifyCustomerWizardModel {
  account: MaplesAccount;
  card: Card;
  customer: Customer;
  maplesCustomer: MaplesCustomer;
  isVerified: boolean = false;
  order: MaplesOrder;

  getAuditActivityType (): AuditActivityType {
    if ( !!this.customer ) {
      return this.isVerified ? AuditActivityType.VERIFY_CUSTOMER : AuditActivityType.NOT_VERIFY_CUSTOMER;
    } else if ( !!this.maplesCustomer ) {
      return this.isVerified ? AuditActivityType.VERIFY_MAPLES_CUSTOMER : AuditActivityType.NOT_VERIFY_MAPLES_CUSTOMER;
    } else if ( !!this.order ) {
      return this.isVerified ? AuditActivityType.VERIFY_ORDER : AuditActivityType.NOT_VERIFY_ORDER;
    } else {
      throw new Error ( 'Illegal State while finding AuditActivityType for Verify Customer wizard' );
    }
  }
}
