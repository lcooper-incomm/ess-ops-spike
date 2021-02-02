import { AbstractWizard } from "../../../../wizard/abstract-wizard";
import { Session } from "../../../model/session";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../wizard/wizard-page";
import { Bank } from "../../../../complaint/bank";
import { LogComplaintFormPageComponent } from "./form-page/log-complaint-form-page.component";
import { LogComplaintConfirmationPageComponent } from "./confirmation-page/log-complaint-confirmation-page.component";
import { LogComplaintResultsPageComponent } from "./results-page/log-complaint-results-page.component";
import { Selection } from "../../../model/selection";
import { FlatComplaintComponent } from "../../../model/complaint-component";
import { SessionQueue } from "../../../model/session-queue";
import { WrapUpCodeCategory } from "../../../model/wrap-up-code-category";
import { WrapUpCode } from "../../../model/wrap-up-code";

export enum LogComplaintPageType {
  FORM         = 'form-page',
  CONFIRMATION = 'confirmation-page',
  RESULTS      = 'results-page'
}

export class LogComplaintWizard extends AbstractWizard<LogComplaintWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'log-complaint';
  startingPageKey: string = LogComplaintPageType.FORM;

  constructor () {
    super ();
    this.model     = new LogComplaintWizardModel ();
    this.doRefresh = false;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      bank: this.model.bank ? this.model.bank.systemValue : null,
      isFailed: this.model.isFailed,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( LogComplaintPageType.FORM, LogComplaintFormPageComponent );
    pageMap.set ( LogComplaintPageType.CONFIRMATION, LogComplaintConfirmationPageComponent );
    pageMap.set ( LogComplaintPageType.RESULTS, LogComplaintResultsPageComponent );
  }
}

export class LogComplaintWizardModel {
  bank: Bank;
  banks: Bank[]                              = [];
  category: WrapUpCodeCategory;
  code: WrapUpCode;
  complaintComponent: FlatComplaintComponent = new FlatComplaintComponent ();
  isFailed: boolean                          = false;
  queue: SessionQueue;
  queues: SessionQueue[]                     = [];
  raisedCase: Session;
  session: Session;
  selection: Selection<any>;
}
