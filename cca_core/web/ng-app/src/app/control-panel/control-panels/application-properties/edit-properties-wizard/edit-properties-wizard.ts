import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { Property } from "../../../../core/model/property";
import { EditPropertiesFormPageComponent } from "./edit-properties-form-page/edit-properties-form-page.component";
import { EditPropertiesConfirmationPageComponent } from "./edit-properties-confirmation-page/edit-properties-confirmation-page.component";
import { EditPropertiesResultsPageComponent } from "./edit-properties-results-page/edit-properties-results-page.component";

export class EditPropertiesWizard extends AbstractWizard<EditPropertiesWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'edit-properties';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new EditPropertiesWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', EditPropertiesFormPageComponent );
    pageMap.set ( 'confirmation-page', EditPropertiesConfirmationPageComponent );
    pageMap.set ( 'result-page', EditPropertiesResultsPageComponent );
  }
}

export class EditPropertiesWizardModel {
  initValue: string;
  isFailed: boolean       = false;
  pageTitle: string;
  property: Property;
  request: Property;
  isCsCoreLogger: boolean = false;
}
