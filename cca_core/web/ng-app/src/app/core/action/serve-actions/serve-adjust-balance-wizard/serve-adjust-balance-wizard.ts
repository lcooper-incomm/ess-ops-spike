import {Type} from '@angular/core';
import {AbstractWizard} from "../../../wizard/abstract-wizard";
import {WizardPage} from "../../../wizard/wizard-page";
import {TransactionType} from "../../../transaction/transaction-type.enum";
import {Selection} from "../../../session/model/selection";
import {Customer} from "../../../customer/customer";
import {ServeAdjustBalanceFormPageComponent} from "./serve-adjust-balance-form-page/serve-adjust-balance-form-page.component";
import {ServeAdjustBalanceConfirmationPageComponent} from "./serve-adjust-balance-confirmation-page/serve-adjust-balance-confirmation-page.component";
import {ServeAdjustBalanceResultPageComponent} from "./serve-adjust-balance-result-page/serve-adjust-balance-result-page.component";
import {MaplesAccountCode} from "@cscore/maples-client-model";
import {IdentifierType} from "../../../session/model/identifier-type.enum";
import {AuditActivityType} from "../../../audit/audit-activity-type.enum";

export class ServeAdjustBalanceWizard extends AbstractWizard<ServeAdjustBalanceWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'serve-adjust-balance';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new ServeAdjustBalanceWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success === 0,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ServeAdjustBalanceFormPageComponent );
    pageMap.set ( 'confirmation-page', ServeAdjustBalanceConfirmationPageComponent );
    pageMap.set ( 'result-page', ServeAdjustBalanceResultPageComponent );
  }
}

export class ServeAdjustBalanceWizardModel {
  auditActivityType: AuditActivityType;
  adjustmentType: TransactionType;
  amount: string;
  comment: string;
  reason: MaplesAccountCode;
  selection: Selection<Customer>;
  identifierType: IdentifierType;
  identifier: string;
  success: number = 0;
}
