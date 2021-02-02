import { AbstractWizard } from "../../../../../wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../../wizard/wizard-page";
import { RemoveSelectionFormPageComponent } from "./remove-selection-form-page/remove-selection-form-page.component";
import { Selection } from "../../../../model/selection";
import { Session } from "../../../../model/session";

export class RemoveSelectionWizard extends AbstractWizard<RemoveSelectionWizardModel> {

  displayStepper: boolean             = false;
  key: string                         = 'remove-selection';
  startingPageKey: string             = 'form-page';

  constructor () {
    super ();
    this.model = new RemoveSelectionWizardModel();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set( 'form-page', RemoveSelectionFormPageComponent );
  }

}

export class RemoveSelectionWizardModel {
  isActiveSelection: boolean;
  selection: Selection<any>;
  session: Session;
}
