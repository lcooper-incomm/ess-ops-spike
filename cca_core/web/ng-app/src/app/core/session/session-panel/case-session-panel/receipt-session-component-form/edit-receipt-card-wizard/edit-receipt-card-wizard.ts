import { Type } from "@angular/core";
import { WizardPage } from "../../../../../wizard/wizard-page";
import { AbstractWizard } from "../../../../../wizard/abstract-wizard";
import { ReceiptComponentCard } from "../../../../model/receipt-component-card";
import { Session } from "../../../../model/session";
import { EditReceiptCardFormPageComponent } from "./edit-receipt-card-form-page/edit-receipt-card-form-page.component";

export class EditReceiptCardWizard extends AbstractWizard<EditReceiptCardWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'edit-receipt-card';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new EditReceiptCardWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', EditReceiptCardFormPageComponent );
  }
}

export class EditReceiptCardWizardModel {
  card: ReceiptComponentCard;
  session: Session;
}
