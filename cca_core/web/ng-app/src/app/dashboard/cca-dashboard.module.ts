import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CcaCoreModule } from "../core/cca-core.module";
import { C2cTransferRequestsWidgetComponent } from './dashboard/c2c-transfer-requests-widget/c2c-transfer-requests-widget.component';
import { QuickLookupWidgetComponent } from './dashboard/quick-lookup-widget/quick-lookup-widget.component';
import { ReviewC2cTransferRequestComponent } from './review-c2c-transfer-request-wizard/review-c2c-transfer-request/review-c2c-transfer-request.component';
import { ReviewC2cTransferRequestReviewComponent } from './review-c2c-transfer-request-wizard/review-c2c-transfer-request-review/review-c2c-transfer-request-review.component';
import { ReviewC2cTransferRequestConfirmationComponent } from './review-c2c-transfer-request-wizard/review-c2c-transfer-request-confirmation/review-c2c-transfer-request-confirmation.component';
import { QuickLookupQuoteComponent } from './quick-lookup-quote-wizard/quick-lookup-quote/quick-lookup-quote.component';
import { QuickSearchWidgetComponent } from './dashboard/quick-search-widget/quick-search-widget.component';

@NgModule ( {
  imports: [
    CcaCoreModule
  ],
  declarations: [
    C2cTransferRequestsWidgetComponent,
    DashboardComponent,
    QuickLookupWidgetComponent,
    ReviewC2cTransferRequestComponent,
    ReviewC2cTransferRequestConfirmationComponent,
    ReviewC2cTransferRequestReviewComponent,
    QuickLookupQuoteComponent,
    QuickSearchWidgetComponent

  ],
  entryComponents: [
    ReviewC2cTransferRequestComponent,
    ReviewC2cTransferRequestConfirmationComponent,
    ReviewC2cTransferRequestReviewComponent,
    QuickLookupQuoteComponent
  ]

} )
export class CcaDashboardModule {
}
