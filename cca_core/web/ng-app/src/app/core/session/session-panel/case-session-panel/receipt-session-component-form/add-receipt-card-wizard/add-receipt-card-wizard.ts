import { Session } from "../../../../model/session";
import { AbstractWizard } from "../../../../../wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../../wizard/wizard-page";
import { AddReceiptCardFormPageComponent } from "./add-receipt-card-form-page/add-receipt-card-form-page.component";

export class AddReceiptCardWizard extends AbstractWizard<AddReceiptCardWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-receipt-card';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new AddReceiptCardWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', AddReceiptCardFormPageComponent );
  }
}

export class AddReceiptCardWizardModel {
  session: Session;
}
