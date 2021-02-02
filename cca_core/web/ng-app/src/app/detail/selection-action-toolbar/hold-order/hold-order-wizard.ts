import { Selection } from "../../../core/session/model/selection";
import { MaplesHoldOrderRequest, MaplesOrder } from "@cscore/maples-client-model";
import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { HoldOrderConfirmationPageComponent } from "./hold-order-confirmation-page/hold-order-confirmation-page.component";
import { HoldOrderResultsPageComponent } from "./hold-order-results-page/hold-order-results-page.component";
import { Observable, of } from "rxjs";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { HoldOrderFormPageComponent } from "./hold-order-form-page/hold-order-form-page.component";

export enum HoldOrderWizardPageType {
  CONFIRMATION_PAGE = 'confirmation-page',
  FORM_PAGE         = 'form-page',
  RESULTS_PAGE      = 'result-page'
}

export class HoldOrderWizard extends AbstractWizard<HoldOrderWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'hold-order';
  startingPageKey: string = HoldOrderWizardPageType.CONFIRMATION_PAGE;

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new HoldOrderWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      isFailed: this.model.isFailed,
      platform: this.model.selection.platform
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( HoldOrderWizardPageType.FORM_PAGE, HoldOrderFormPageComponent );
    pageMap.set ( HoldOrderWizardPageType.CONFIRMATION_PAGE, HoldOrderConfirmationPageComponent );
    pageMap.set ( HoldOrderWizardPageType.RESULTS_PAGE, HoldOrderResultsPageComponent );
  }

  preProcess (): Observable<any> {
    if ( this.model.selection.platform === PlatformType.BOL ) {
      this.startingPageKey = HoldOrderWizardPageType.FORM_PAGE;
    } else {
      this.pages.get ( HoldOrderWizardPageType.FORM_PAGE ).instance.isIgnored = true;
    }
    return of ( null );
  }
}

export class HoldOrderWizardModel {
  comment: string;
  isFailed: boolean = false;
  request: MaplesHoldOrderRequest;
  selection: Selection<MaplesOrder>;
}
