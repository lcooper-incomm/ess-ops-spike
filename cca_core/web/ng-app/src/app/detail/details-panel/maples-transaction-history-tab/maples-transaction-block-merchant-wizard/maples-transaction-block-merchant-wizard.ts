import {Type} from "@angular/core";
import {
  MaplesAccount, MaplesNode,
  MaplesNodes,
  MaplesTransaction
} from "@cscore/maples-client-model";
import {AbstractWizard} from "../../../../core/wizard/abstract-wizard";
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {MaplesTransactionBlockMerchantFormPageComponent} from "./maples-transaction-block-merchant-form-page/maples-transaction-block-merchant-form-page.component";
import {MaplesTransactionBlockMerchantConfirmationPageComponent} from "./maples-transaction-block-merchant-confirmation-page/maples-transaction-block-merchant-confirmation-page.component";
import {MaplesTransactionBlockMerchantResultPageComponent} from "./maples-transaction-block-merchant-result-page/maples-transaction-block-merchant-result-page.component";
import {Selection, SelectionDataType} from "../../../../core/session/model/selection";
import {AuditActivityType} from "../../../../core/audit/audit-activity-type.enum";
import {TransactionType} from "../../../../core/transaction/transaction-type.enum";
import {IdentifierType} from "../../../../core/session/model/identifier-type.enum";

export class MaplesTransactionBlockMerchantWizard extends AbstractWizard<MaplesTransactionBLockMerchantWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'serve-blocked-merchants';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new MaplesTransactionBLockMerchantWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success === 0
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', MaplesTransactionBlockMerchantFormPageComponent  );
    pageMap.set('confirmation-page', MaplesTransactionBlockMerchantConfirmationPageComponent );
    pageMap.set('result-page', MaplesTransactionBlockMerchantResultPageComponent);
  }
}

export class MaplesTransactionBLockMerchantWizardModel {
  auditActivityType: AuditActivityType;
  adjustmentType: TransactionType;
  transaction: MaplesTransaction;
  selection: Selection<SelectionDataType>;
  merchant: MaplesNode;
  comment: string;
  identifierType: IdentifierType;
  identifier: string;
  success: number = 0;
}
