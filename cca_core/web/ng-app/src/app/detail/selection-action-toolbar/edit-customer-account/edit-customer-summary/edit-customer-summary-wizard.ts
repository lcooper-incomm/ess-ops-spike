import { Type } from "@angular/core";
import { Observable, of } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { DateService } from "src/app/core/date/date.service";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import { Selection } from "src/app/core/session/model/selection";
import { EditCustomerSummaryFormPageComponent } from './edit-customer-summary-form-page/edit-customer-summary-form-page.component';
import { EditCustomerSummaryConfirmationPageComponent } from "./edit-customer-summary-confirmation-page/edit-customer-summary-confirmation-page.component";
import { EditCustomerAccountSnapshot } from "../edit-customer-account-snapshot";
import { Session } from "src/app/core/session/model/session";
import { Customer } from "src/app/core/customer/customer";
import { EditCustomerSummaryDocumentsPageComponent } from "./edit-customer-summary-documents-page/edit-customer-summary-documents-page.component";
import { EditCustomerSummaryResultPageComponent } from "./edit-customer-summary-result-page/edit-customer-summary-result-page.component";
import { PlatformType } from "src/app/core/platform/platform-type.enum";

export enum EditCustomerSummaryPageType {
  FORM         = 'form-page',
  CONFIRMATION = 'confirmation-page',
  DOCUMENTS    = 'documents-page',
  RESULT       = 'result-page',
}

export class EditCustomerSummaryWizard extends AbstractWizard<EditCustomerSummaryWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'edit-customer-summary';
  startingPageKey: string = EditCustomerSummaryPageType.FORM;

  constructor ( private dateService: DateService ) {
    super ();
    this.model     = new EditCustomerSummaryWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      platform: this.model.selection.platform,
      isFailed: this.model.isFailed,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    this.takeSnapshots ();
    pageMap.set ( EditCustomerSummaryPageType.FORM, EditCustomerSummaryFormPageComponent );
    pageMap.set ( EditCustomerSummaryPageType.DOCUMENTS, EditCustomerSummaryDocumentsPageComponent );
    pageMap.set ( EditCustomerSummaryPageType.CONFIRMATION, EditCustomerSummaryConfirmationPageComponent );
    pageMap.set ( EditCustomerSummaryPageType.RESULT, EditCustomerSummaryResultPageComponent );
  }

  /**
   * A document is required when the name or date of birth was changed.
   */
  get isDocumentRequired (): boolean {
    return this.isNameChanged || this.isDateOfBirthChanged;
  }

  preProcess (): Observable<any> {
    this.pages.get ( EditCustomerSummaryPageType.DOCUMENTS ).instance.isIgnored = true;
    return of ( null );
  }

  private get isDateOfBirthChanged (): boolean {
    const originalSnapshot = this.model.originalSnapshot;
    const newSnapshot      = this.model.newSnapshot;
    return originalSnapshot.dateOfBirth !== newSnapshot.dateOfBirth;
  }

  private get isNameChanged (): boolean {
    const originalSnapshot = this.model.originalSnapshot;
    const newSnapshot      = this.model.newSnapshot;
    return originalSnapshot.firstName !== newSnapshot.firstName || originalSnapshot.lastName !== newSnapshot.lastName;
  }

  /**
   * We want snapshots of the account that we can diff later on to determine whether documents are required and which
   * requests we're making to APLS to update all the different pieces of the account.
   */
  private takeSnapshots (): void {
    this.model.originalSnapshot = this.takeSnapshot ();
    this.model.newSnapshot      = this.takeSnapshot ();
  }

  private takeSnapshot (): EditCustomerAccountSnapshot {
    const customer = this.model.selection.getCustomer ();
    const snapshot = EditCustomerAccountSnapshot.build ( customer );
    //Overwrite dateOfBirth to correct format we'll be using in the wizard
    if ( snapshot.dateOfBirth ) {
      snapshot.dateOfBirth = this.dateService.convertYYYYMMDDToMMDDYYYY ( snapshot.dateOfBirth );
    }
    return snapshot;
  }
}

export class EditCustomerSummaryWizardModel {
  comment: string;
  fileUploader: FileUploader;
  isFailed: boolean = false;
  newSnapshot: EditCustomerAccountSnapshot;
  originalSnapshot: EditCustomerAccountSnapshot;
  reason: string;
  selection: Selection<Customer>;
  session: Session;
}
