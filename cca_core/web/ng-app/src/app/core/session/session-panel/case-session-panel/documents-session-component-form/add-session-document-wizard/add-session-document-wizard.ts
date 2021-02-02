import { AbstractWizard } from "../../../../../wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../../wizard/wizard-page";
import { AddSessionDocumentFormPageComponent } from "./add-session-document-form-page/add-session-document-form-page.component";
import { Session } from "../../../../model/session";

export class AddSessionDocumentWizard extends AbstractWizard<AddSessionDocumentWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-session-document';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new AddSessionDocumentWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', AddSessionDocumentFormPageComponent );
  }

}

export class AddSessionDocumentWizardModel {
  session: Session;
}
