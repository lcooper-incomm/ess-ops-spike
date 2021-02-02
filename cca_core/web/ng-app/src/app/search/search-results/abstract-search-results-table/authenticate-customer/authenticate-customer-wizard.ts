import {AbstractWizard} from "../../../../core/wizard/abstract-wizard";
import {Type} from "@angular/core";
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {AuthenticateCustomerFormPageComponent} from "./authenticate-customer-form-page/authenticate-customer-form-page.component";
import {MaplesAccount} from "@cscore/maples-client-model";
import {AuditActivityType} from "../../../../core/audit/audit-activity-type.enum";
import {AuthenticateCustomerCommentPageComponent} from "./authenticate-customer-comment-page/authenticate-customer-comment-page.component";
import {VerifiedField} from "./verified-fields";

export class AuthenticateCustomerWizard extends AbstractWizard<AuthenticateCustomerWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'authenticate-customer';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new AuthenticateCustomerWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', AuthenticateCustomerFormPageComponent );
    pageMap.set('comment-page', AuthenticateCustomerCommentPageComponent);
  }
}

class AuthenticateCustomerWizardModel {
  account: MaplesAccount;
  isVerified: boolean  = false;
  verification: VerifiedField;
  isCancelled: boolean = true;
  isComment: boolean   = false;
  lockCard: boolean    = false;

  getAuditActivityType (): AuditActivityType {
    if (!this.isCancelled) {
      return this.isVerified ? AuditActivityType.VERIFY_ACCOUNT : AuditActivityType.NOT_VERIFY_ACCOUNT;
    } else if (this.isCancelled && !this.isVerified && !this.isComment && !this.lockCard) {
      return AuditActivityType.CANCEL_VERIFICATION
    } else if (this.isComment) {
      return AuditActivityType.NOT_VERIFY_ACCOUNT
    } else if (this.lockCard) {
      return AuditActivityType.LOCK_CARD
    }
  }

}

