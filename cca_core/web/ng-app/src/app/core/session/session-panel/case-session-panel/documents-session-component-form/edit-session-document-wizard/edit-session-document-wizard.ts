import { AbstractWizard } from "../../../../../wizard/abstract-wizard";
import { Session } from "../../../../model/session";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../../wizard/wizard-page";
import { DocumentsComponentDocument } from "../../../../model/documents-component-document";
import { EditSessionDocumentFormPageComponent } from "./edit-session-document-form-page/edit-session-document-form-page.component";

export class EditSessionDocumentWizard extends AbstractWizard<EditSessionDocumentWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'edit-session-document';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new EditSessionDocumentWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', EditSessionDocumentFormPageComponent );
  }
}

export class EditSessionDocumentWizardModel {
  document: DocumentsComponentDocument;
  session: Session;
}
