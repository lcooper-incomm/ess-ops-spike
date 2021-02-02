import { Component } from '@angular/core';
import {MaplesTransactionBlockMerchantWizard} from "../maples-transaction-block-merchant-wizard";
import {WizardResultPage} from "../../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";
import {PlaceholderDictionary} from "../../../../../core/wizard/placeholders/placeholder-dictionary";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'cca-maples-transaction-block-merchant-result-page',
  templateUrl: './maples-transaction-block-merchant-result-page.component.html',
  styleUrls: ['./maples-transaction-block-merchant-result-page.component.scss']
})
export class MaplesTransactionBlockMerchantResultPageComponent extends WizardResultPage<MaplesTransactionBlockMerchantWizard>{

  constructor() {
    super();
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }

}
