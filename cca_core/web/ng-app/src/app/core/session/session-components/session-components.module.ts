import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponentsComponent } from './session-components/session-components.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerSessionComponentComponent } from './customer-session-component/customer-session-component.component';
import { CardsSessionComponentComponent } from './cards-session-component/cards-session-component.component';
import { DocumentsSessionComponentComponent } from './documents-session-component/documents-session-component.component';
import { LawEnforcementSessionComponentComponent } from './law-enforcement-session-component/law-enforcement-session-component.component';
import { MerchantSessionComponentComponent } from './merchant-session-component/merchant-session-component.component';
import { RefundRequestSessionComponentComponent } from './refund-request-session-component/refund-request-session-component.component';
import { ReceiptSessionComponentComponent } from './receipt-session-component/receipt-session-component.component';
import { CcaKeyValueModule } from '../../key-value/key-value.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CcaPipesModule } from '../../pipes/cca-pipes.module';
import { CaseCardComponent } from './case-card/case-card.component';
import { CcaStatusModule } from '../../status/status.module';
import { CcaSpinnerModule } from '../../spinner/cca-spinner.module';
import { CcaEditCaseCardModule } from './edit-case-card/edit-case-card.module';
import { DisputeSessionComponentComponent } from './dispute-session-component/dispute-session-component.component';
import { SimpleDisputedTransactionTableComponent } from '../../simple-disputed-transaction-table/simple-disputed-transaction-table.component';
import { ComplaintSessionComponentComponent } from './complaint-session-component/complaint-session-component.component';
import { ProbingQuestionsPageComponent } from './probing-questions-wizard/probing-questions-page/probing-questions-page.component';
import {EncorSessionComponentComponent} from './encor-session-component/encor-session-component.component';
import {PrivacyRequestSessionComponentComponent} from './privacy-request-session-component/privacy-request-session-component.component';
import {CcaAddressModule} from '../../address/address.module';

@NgModule ( {
  declarations: [
    CardsSessionComponentComponent,
    ComplaintSessionComponentComponent,
    CustomerSessionComponentComponent,
    DocumentsSessionComponentComponent,
    EncorSessionComponentComponent,
    LawEnforcementSessionComponentComponent,
    MerchantSessionComponentComponent,
    PrivacyRequestSessionComponentComponent,
    RefundRequestSessionComponentComponent,
    ReceiptSessionComponentComponent,
    SessionComponentsComponent,
    CaseCardComponent,
    DisputeSessionComponentComponent,
    SimpleDisputedTransactionTableComponent,
    ProbingQuestionsPageComponent
  ],
  exports: [
    CardsSessionComponentComponent,
    ComplaintSessionComponentComponent,
    CustomerSessionComponentComponent,
    DocumentsSessionComponentComponent,
    EncorSessionComponentComponent,
    MerchantSessionComponentComponent,
    PrivacyRequestSessionComponentComponent,
    SessionComponentsComponent,
    DisputeSessionComponentComponent,
    SimpleDisputedTransactionTableComponent,
    ProbingQuestionsPageComponent
  ],
  imports: [
    CcaKeyValueModule,
    CcaPipesModule,
    CcaSpinnerModule,
    CcaStatusModule,
    CcaEditCaseCardModule,
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    CcaAddressModule,
  ],
  entryComponents: [
    ProbingQuestionsPageComponent
  ]
} )
export class CcaSessionComponentsModule {
}
