import {Type} from "@angular/core";
import {
  MaplesNode,
  MaplesTransaction, MaplesTransactionAlerts,
  MaplesTransactionAmounts,
  MaplesTransactionDevice,
  MaplesTransactionFeeInfo, MaplesTransactionRequest, MaplesTransactionResponse, MaplesTransactionSettlement
} from "@cscore/maples-client-model";
import {AbstractWizard} from "../../../../core/wizard/abstract-wizard";
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {MaplesTransactionDetailsComponent} from "./maples-transaction-details/maples-transaction-details.component";

export class MaplesTransactionDetailsWizard extends AbstractWizard<MaplesTransactionDetailsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'maples-transaction-details';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new MaplesTransactionDetailsWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', MaplesTransactionDetailsComponent);
  }
}

export class MaplesTransactionDetailsWizardModel {
  transaction: MaplesTransaction;
  preauthTransaction: MaplesTransaction;
  amounts: MaplesTransactionAmounts;
  device: MaplesTransactionDevice;
  feeInfo: MaplesTransactionFeeInfo;
  request: MaplesTransactionRequest;
  response: MaplesTransactionResponse;
  settlement: MaplesTransactionSettlement;
  alerts: MaplesTransactionAlerts;
  nodes: MaplesNode[];
  merchant:MaplesNode;
}
