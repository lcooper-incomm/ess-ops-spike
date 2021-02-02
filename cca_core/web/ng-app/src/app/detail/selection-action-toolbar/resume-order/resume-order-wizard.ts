import { Selection } from "../../../core/session/model/selection";
import {MaplesOrder, MaplesResumeOrderRequest} from "@cscore/maples-client-model";
import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { ResumeOrderConfirmationPageComponent } from "./resume-order-confirmation-page/resume-order-confirmation-page.component";
import { ResumeOrderResultsPageComponent } from "./resume-order-results-page/resume-order-results-page.component";
import { ResumeOrderFormPageComponent } from "./resume-order-form-page/resume-order-form-page.component";
import { Observable, of } from "rxjs";
import { PlatformType } from "../../../core/platform/platform-type.enum";

export enum ResumeOrderWizardPageType {
  CONFIRMATION_PAGE = 'confirmation-page',
  FORM_PAGE         = 'form-page',
  RESULTS_PAGE      = 'result-page'
}

export class ResumeOrderWizard extends AbstractWizard<ResumeOrderWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'resume-order';
  startingPageKey: string = ResumeOrderWizardPageType.CONFIRMATION_PAGE;

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new ResumeOrderWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      isFailed: this.model.isFailed,
      platform: this.model.selection.platform
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( ResumeOrderWizardPageType.FORM_PAGE, ResumeOrderFormPageComponent );
    pageMap.set ( ResumeOrderWizardPageType.CONFIRMATION_PAGE, ResumeOrderConfirmationPageComponent );
    pageMap.set ( ResumeOrderWizardPageType.RESULTS_PAGE, ResumeOrderResultsPageComponent );
  }

  preProcess (): Observable<any> {
    if ( this.model.selection.platform === PlatformType.BOL ) {
      this.startingPageKey = ResumeOrderWizardPageType.FORM_PAGE;
    } else {
      this.pages.get ( ResumeOrderWizardPageType.FORM_PAGE ).instance.isIgnored = true;
    }
    return of ( null );
  }
}

export class ResumeOrderWizardModel {
  isFailed: boolean = false;
  request: MaplesResumeOrderRequest;
  selection: Selection<MaplesOrder>;
}
