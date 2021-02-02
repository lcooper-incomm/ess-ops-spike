import { AbstractWizard } from "../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../core/wizard/wizard-page";
import { QuickLookupQuoteComponent } from "./quick-lookup-quote/quick-lookup-quote.component";
import { MaplesQuote } from "@cscore/maples-client-model";

export class QuickLookupQuoteWizard extends AbstractWizard<QuickLookupQuoteWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'quick-lookup-quote';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.displayStepper = false;
    this.model          = new QuickLookupQuoteWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', QuickLookupQuoteComponent );
  }
}

export class QuickLookupQuoteWizardModel {
  quote: MaplesQuote;
}
