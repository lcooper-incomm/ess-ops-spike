import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CcaCoreModule } from "../../../../cca-core.module";
import { CcaLoggingModule } from "../../../../../logging/cca-logging.module";
import { CcaMaterialModule } from "../../../../material/cca-material.module";
import { RaiseCaseCaseInformationPageComponent } from "./raise-case-case-information-page/raise-case-case-information-page.component";
import { RaiseCaseCustomerInformationPageComponent } from "./raise-case-customer-information-page/raise-case-customer-information-page.component";
import { RaiseCaseMerchantInformationPageComponent } from "./raise-case-merchant-information-page/raise-case-merchant-information-page.component";
import { RaiseCaseReceiptInformationPageComponent } from "./raise-case-receipt-information-page/raise-case-receipt-information-page.component";
import { RaiseCaseConfirmationPageComponent } from "./raise-case-confirmation-page/raise-case-confirmation-page.component";
import { RaiseCaseResultsPageComponent } from "./raise-case-results-page/raise-case-results-page.component";
import { MerchantVerifiedStampComponent } from "./raise-case-merchant-information-page/merchant-verified-stamp/merchant-verified-stamp.component";
import {RaiseCaseEncorInformationPageComponent} from './raise-case-encor-information-page/encor-information-page.component';

const componentDeclarations = [
  MerchantVerifiedStampComponent,
  RaiseCaseCaseInformationPageComponent,
  RaiseCaseConfirmationPageComponent,
  RaiseCaseCustomerInformationPageComponent,
  RaiseCaseEncorInformationPageComponent,
  RaiseCaseMerchantInformationPageComponent,
  RaiseCaseReceiptInformationPageComponent,
  RaiseCaseResultsPageComponent
];

const entryComponentDeclarations = [
  RaiseCaseCaseInformationPageComponent,
  RaiseCaseConfirmationPageComponent,
  RaiseCaseCustomerInformationPageComponent,
  RaiseCaseEncorInformationPageComponent,
  RaiseCaseMerchantInformationPageComponent,
  RaiseCaseReceiptInformationPageComponent,
  RaiseCaseResultsPageComponent
];

@NgModule ( {
  declarations: componentDeclarations,
  entryComponents: entryComponentDeclarations,
  exports: componentDeclarations,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CcaCoreModule,
    CcaLoggingModule,
    CcaMaterialModule
  ]
} )
export class CcaRaiseCaseModule {
}
