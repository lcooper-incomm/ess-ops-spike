import { AbstractWizard } from "../../../wizard/abstract-wizard";
import { WizardPage } from "../../../wizard/wizard-page";
import { Type } from "@angular/core";
import { VmsSendFormSelectionPageComponent } from "./vms-send-form-selection-page/vms-send-form-selection-page.component";
import { VmsSendFormConfirmPageComponent } from "./vms-send-form-confirm-page/vms-send-form-confirm-page.component";
import { VmsSendFormResultsPageComponent } from "./vms-send-form-results-page/vms-send-form-results-page.component";
import { DeliveryMethod } from "src/app/core/model/minion/task/delivery-method";
import { Selection } from "../../../session/model/selection";
import { CsCoreAddress, CsCorePhoneNumber } from "@cscore/core-client-model";
import { GenericOption } from "../../../model/generic-option";
import { CsCoreCurrency } from "@cscore/gringotts";
import { Customer } from "src/app/core/customer/customer";

export class VmsSendFormWizard extends AbstractWizard<VmsSendFormWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'vms-send-form';
  startingPageKey: string = 'selection-page';

  constructor () {
    super ();
    this.model     = new VmsSendFormWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      actionFailed: this.model.actionFailed
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'selection-page', VmsSendFormSelectionPageComponent );
    pageMap.set ( 'confirm-page', VmsSendFormConfirmPageComponent );
    pageMap.set ( 'results-page', VmsSendFormResultsPageComponent );
  }

}

export class VmsSendFormWizardModel {
  actionFailed: boolean = false;
  confirmedAddress: CsCoreAddress;
  deliveryMethod: DeliveryMethod;
  email: string;
  endDate: string;
  faxNumber: CsCorePhoneNumber;
  missingFirstName: string = null;
  missingLastName: string = null;
  selectedFormType: FormTypeOption;
  selectedMonth: number;
  selectedYear: number;
  selection: Selection<Customer>;
  startDate: string;
  statementFee: CsCoreCurrency;
  waiveFee: boolean     = false;

  optionFormAccountStatement: GenericOption<FormTypeOption> = {
    value: FormTypeOption.ACCOUNT_STATEMENT,
    displayValue: 'Account Statement'
  };
  optionFormDirectDeposit: GenericOption<FormTypeOption>    = {
    value: FormTypeOption.DIRECT_DEPOSIT,
    displayValue: 'Direct Deposit'
  };
}

export enum FormTypeOption {
  ACCOUNT_STATEMENT = 'Account Statement',
  DIRECT_DEPOSIT    = 'Direct Deposit'
}
