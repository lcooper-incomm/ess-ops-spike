import { NgModule } from '@angular/core';
import { CcaCoreModule } from "../core/cca-core.module";
import { ServicesComponent } from './services/services.component';
import { JobQueueComponent } from './services/job-queue/job-queue.component';
import { OrderNewCardFormPageComponent } from './services/order-new-card/order-new-card-wizard/order-new-card-form-page/order-new-card-form-page.component';
import { OrderNewCardConfirmationPageComponent } from './services/order-new-card/order-new-card-wizard/order-new-card-confirmation-page/order-new-card-confirmation-page.component';
import { OrderNewCardResultsPageComponent } from './services/order-new-card/order-new-card-wizard/order-new-card-results-page/order-new-card-results-page.component';
import { CcaCustomerAccountFormsModule } from "../detail/selection-action-toolbar/customer-account-forms/customer-account-forms.module";
import { OrderNewCardChallengePageComponent } from "./services/order-new-card/order-new-card-wizard/order-new-card-challenge-page/order-new-card-challenge-page.component";
import { OrderNewCardBuilderService } from "./services/order-new-card/order-new-card-builder-service";

const componentDeclarations: any[] = [
  ServicesComponent,
  JobQueueComponent,
  OrderNewCardFormPageComponent,
  OrderNewCardConfirmationPageComponent,
  OrderNewCardResultsPageComponent,
  OrderNewCardChallengePageComponent
];

const entryComponentDeclarations: any[] = [
  OrderNewCardFormPageComponent,
  OrderNewCardConfirmationPageComponent,
  OrderNewCardResultsPageComponent,
  OrderNewCardChallengePageComponent
];

@NgModule ( {
  entryComponents: entryComponentDeclarations,
  exports: componentDeclarations,
  imports: [
    CcaCoreModule,
    CcaCustomerAccountFormsModule
  ],
  declarations: componentDeclarations,
  providers: [
    OrderNewCardBuilderService
  ]
} )
export class CcaServiceModule {
}
