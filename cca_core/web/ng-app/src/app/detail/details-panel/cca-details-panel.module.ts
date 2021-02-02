import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountNotificationsTabComponent} from './account-notifications-tab/account-notifications-tab.component';
import {MatExpansionModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CcaFormsModule} from 'src/app/core/form/forms.module';
import {CcaSpinnerModule} from 'src/app/core/spinner/cca-spinner.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AccountDocumentsTabComponent} from './account-documents-tab/account-documents-tab.component';
import {CsCoreTableModule} from '@cscore/components';
import {CcaKeyValueModule} from 'src/app/core/key-value/key-value.module';
import {CcaStatusModule} from 'src/app/core/status/status.module';
import {AccountDocumentDetailComponent} from './account-documents-tab/account-document-detail/account-document-detail.component';
import {AccountLimitsTabComponent} from "./account-limits-tab/account-limits-tab.component";
import {AccountNotificationDetailsComponent} from "./account-notifications-tab/account-notification-wizard/account-notification-details/account-notification-details.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CcaMaterialModule} from "../../core/material/cca-material.module";
import {ServeActionsModule} from "../../core/action/serve-actions/serve-actions.module";
import {CcaCoreModule} from "../../core/cca-core.module";
import {AccountFeaturesComponent} from "./account-holder-tab/account-features/account-features.component";
import {CcaPanelModule} from "../../core/panel/panel.module";
import {RelatedAccountsTabComponent} from './related-accounts-tab/related-accounts-tab.component';
import {RelatedAccountsTableComponent} from './related-accounts-tab/related-accounts-table/related-accounts-table.component';
import {ReserveAccountsTableComponent} from './related-accounts-tab/reserve-accounts-table/reserve-accounts-table.component';
import {ActionToolbarModule} from "../../core/action-toolbar/action-toolbar.module";
import {AddDocumentActionWizardModule} from "./account-documents-tab/add-document-action-wizard/add-document-action-wizard.module";
import {ServeSendFormsWizardModule} from '../wizards/serve-doc-action-history-wizard/serve-doc-action-history-wizard.module';
import {MaplesTransactionBlockMerchantConfirmationPageComponent} from './maples-transaction-history-tab/maples-transaction-block-merchant-wizard/maples-transaction-block-merchant-confirmation-page/maples-transaction-block-merchant-confirmation-page.component';
import {MaplesTransactionBlockMerchantResultPageComponent} from './maples-transaction-history-tab/maples-transaction-block-merchant-wizard/maples-transaction-block-merchant-result-page/maples-transaction-block-merchant-result-page.component';
import {MaplesTransactionBlockMerchantFormPageComponent} from "./maples-transaction-history-tab/maples-transaction-block-merchant-wizard/maples-transaction-block-merchant-form-page/maples-transaction-block-merchant-form-page.component";
import { OrderConfigurationsTabComponent } from './order-configurations-tab/order-configurations-tab.component';
import {UpdateDocumentWizardModule} from './account-documents-tab/update-document-type-wizard/update-document-wizard.module';
import {FundingActivityDetailComponent} from './account-funding-tab/funding-activity-detail.component';

@NgModule ( {
  declarations: [
    AccountDocumentDetailComponent,
    AccountDocumentsTabComponent,
    AccountLimitsTabComponent,
    AccountNotificationsTabComponent,
    AccountDocumentDetailComponent,
    AccountNotificationDetailsComponent,
    AccountNotificationDetailsComponent,
    AccountFeaturesComponent,
    FundingActivityDetailComponent,
    RelatedAccountsTabComponent,
    RelatedAccountsTableComponent,
    ReserveAccountsTableComponent,
    MaplesTransactionBlockMerchantFormPageComponent,
    MaplesTransactionBlockMerchantConfirmationPageComponent,
    MaplesTransactionBlockMerchantResultPageComponent,
    OrderConfigurationsTabComponent
  ],
  exports: [
    AccountDocumentsTabComponent,
    AccountLimitsTabComponent,
    AccountNotificationsTabComponent,
    AccountFeaturesComponent,
    RelatedAccountsTabComponent,
    OrderConfigurationsTabComponent,
    FundingActivityDetailComponent
  ],
  imports: [
    ActionToolbarModule,
    CcaFormsModule,
    CcaKeyValueModule,
    CcaSpinnerModule,
    CcaStatusModule,
    CommonModule,
    CsCoreTableModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CcaMaterialModule,
    ServeActionsModule,
    CcaPanelModule,
    ServeActionsModule,
    CcaCoreModule,
    AddDocumentActionWizardModule,
    UpdateDocumentWizardModule,
    ServeSendFormsWizardModule
  ],
  entryComponents: [
    AccountNotificationDetailsComponent,
    MaplesTransactionBlockMerchantFormPageComponent,
    MaplesTransactionBlockMerchantConfirmationPageComponent,
    MaplesTransactionBlockMerchantResultPageComponent
  ]
} )
export class CcaDetailsPanelModule {
}
