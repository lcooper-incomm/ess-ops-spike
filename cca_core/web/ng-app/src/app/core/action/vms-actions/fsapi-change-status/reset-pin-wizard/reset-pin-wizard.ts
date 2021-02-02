import { AbstractWizard } from "../../../../wizard/abstract-wizard";
import { WizardPage } from "../../../../wizard/wizard-page";
import { Type } from "@angular/core";
import { ResetPinCsrInstructionPageComponent } from "./reset-pin-csr-instruction-page/reset-pin-csr-instruction-page.component";
import { User } from "../../../../user/user";
import { Selection } from "../../../../session/model/selection";

export class ResetPinWizard extends AbstractWizard<ResetPinWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'reset-pin';
  startingPageKey: string = 'csr-instruction-page';

  constructor () {
    super ();
    this.model     = new ResetPinWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    super.buildPlaceholders ( user, selection );
    let numberToUse = this.model.cardNumber ? this.model.cardNumber : this.model.maskedPan;
    this.placeholderDictionary.addPlaceholder ( 'CARD_NUMBER', numberToUse );
    this.placeholderDictionary.addPlaceholder ( 'CALL_LOG_ID', this.model.sessionId );
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'csr-instruction-page', ResetPinCsrInstructionPageComponent );
  }

}

export class ResetPinWizardModel {
  cardNumber: string;
  customerId: string;
  maskedPan: string;
  sessionId: string;
}
