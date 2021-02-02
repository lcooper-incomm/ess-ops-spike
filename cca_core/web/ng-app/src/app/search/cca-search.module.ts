import {NgModule} from '@angular/core';
import {CcaCoreModule} from "../core/cca-core.module";
import {SearchComponent} from './search.component';
import {SearchParametersComponent} from './search-parameters/search-parameters.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CcaMaterialModule} from "../core/material/cca-material.module";
import {SearchParameterGroupComponent} from "./search-parameters/search-parameter-group/search-parameter-group.component";
import {DynamicSearchFieldContainerComponent} from "./search-parameters/search-parameter-group/dynamic-search-field-container/dynamic-search-field-container.component";
import {SearchParameterFormBuilder} from "./search-parameters/search-parameter-form-builder.service";
import {SearchFormValidator} from "./search-parameters/search-form-validator.service";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {SearchResultSummaryComponent} from "./search-results/search-result-summary/search-result-summary.component";
import {SessionSearchResultsTableComponent} from "./search-results/session-search-results-table/session-search-results-table.component";
import {DdpSearchResultsTableComponent} from "./search-results/ddp-search-results-table/ddp-search-results-table.component";
import {EcommOrderSearchResultsTableComponent} from "./search-results/ecomm-order-search-results-table/ecomm-order-search-results-table.component";
import {FastcardFastpinSearchResultsTableComponent} from "./search-results/fastcard-fastpin-search-results-table/fastcard-fastpin-search-results-table.component";
import {FinancialGiftSearchResultsTableComponent} from "./search-results/financial-gift-search-results-table/financial-gift-search-results-table.component";
import {JiraSearchResultsTableComponent} from "./search-results/jira-search-results-table/jira-search-results-table.component";
import {LocationSearchResultsTableComponent} from "./search-results/location-search-results-table/location-search-results-table.component";
import {VanillaDirectSearchResultsTableComponent} from "./search-results/vanilla-direct-search-results-table/vanilla-direct-search-results-table.component";
import {VmsGiftSearchResultsTableComponent} from "./search-results/vms-gift-search-results-table/vms-gift-search-results-table.component";
import {VmsGprSearchResultsTableComponent} from "./search-results/vms-gpr-search-results-table/vms-gpr-search-results-table.component";
import {VrnSwipeReloadSearchResultsTableComponent} from "./search-results/vrn-swipe-reload-search-results-table/vrn-swipe-reload-search-results-table.component";
import {VerifyCustomerFormPageComponent} from "./search-results/abstract-search-results-table/verify-customer/verify-customer-form-page/verify-customer-form-page.component";
import {BolOrderSearchResultsTableComponent} from "./search-results/bol-order-search-results-table/bol-order-search-results-table.component";
import {CclGiftSearchResultsTableComponent} from "./search-results/ccl-gift-search-results-table/ccl-gift-search-results-table.component";
import {ServeAccountSearchResultsTableComponent} from './search-results/serve-account-search-results-table/serve-account-search-results-table.component';
import {KycResultsTableComponent} from './search-results/kyc-results-table/kyc-results-table.component';
import {KycSearchResultsTableComponent} from './search-results/kyc-search-results-table/kyc-search-results-table.component';
import {AuthenticateCustomerFormPageComponent} from "./search-results/abstract-search-results-table/authenticate-customer/authenticate-customer-form-page/authenticate-customer-form-page.component";
import {AuthenticateCustomerCommentPageComponent} from "./search-results/abstract-search-results-table/authenticate-customer/authenticate-customer-comment-page/authenticate-customer-comment-page.component";
import {AlderOrderSearchResultsTableComponent} from "./search-results/alder-order-search-results-table/alder-order-search-results-table.component";
import {LotterySearchResultsTableComponent} from './search-results/lottery-search-results-table/lottery-search-results-table.component';
import {EncorSearchResultsTableComponent} from './search-results/encor-search-results-table/encor-search-results-table.component';

const componentDeclarations: any[] = [
  AuthenticateCustomerFormPageComponent,
  AuthenticateCustomerCommentPageComponent,
  BolOrderSearchResultsTableComponent,
  CclGiftSearchResultsTableComponent,
  DdpSearchResultsTableComponent,
  DynamicSearchFieldContainerComponent,
  EcommOrderSearchResultsTableComponent,
  FastcardFastpinSearchResultsTableComponent,
  FinancialGiftSearchResultsTableComponent,
  JiraSearchResultsTableComponent,
  KycResultsTableComponent,
  KycSearchResultsTableComponent,
  LocationSearchResultsTableComponent,
  LotterySearchResultsTableComponent,
  SearchComponent,
  SearchParameterGroupComponent,
  SearchParametersComponent,
  SearchResultsComponent,
  SearchResultSummaryComponent,
  ServeAccountSearchResultsTableComponent,
  SessionSearchResultsTableComponent,
  VanillaDirectSearchResultsTableComponent,
  VerifyCustomerFormPageComponent,
  VmsGiftSearchResultsTableComponent,
  VmsGprSearchResultsTableComponent,
  VrnSwipeReloadSearchResultsTableComponent,
  AlderOrderSearchResultsTableComponent,
  EncorSearchResultsTableComponent
];

const entryComponentDeclarations: any[] = [
  VerifyCustomerFormPageComponent,
  AuthenticateCustomerFormPageComponent,
  AuthenticateCustomerCommentPageComponent
];

@NgModule ( {
  entryComponents: entryComponentDeclarations,
  exports: componentDeclarations,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CcaCoreModule,
    CcaMaterialModule
  ],
  declarations: componentDeclarations,
  providers: [
    SearchFormValidator,
    SearchParameterFormBuilder
  ]
} )
export class CcaSearchModule {
}
