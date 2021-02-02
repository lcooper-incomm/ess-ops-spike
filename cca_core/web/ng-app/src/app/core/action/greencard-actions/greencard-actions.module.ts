import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateGreencardGiftCardFormPageComponent } from './activate-greencard-gift-card-wizard/activate-greencard-gift-card-form-page/activate-greencard-gift-card-form-page.component';
import { ActivateGreencardGiftCardSuccessPageComponent } from './activate-greencard-gift-card-wizard/activate-greencard-gift-card-success-page/activate-greencard-gift-card-success-page.component';
import { ActivateGreencardGiftCardConfirmPageComponent } from './activate-greencard-gift-card-wizard/activate-greencard-gift-card-confirm-page/activate-greencard-gift-card-confirm-page.component';
import { ActivateGreencardGiftCardFailPageComponent } from './activate-greencard-gift-card-wizard/activate-greencard-gift-card-fail-page/activate-greencard-gift-card-fail-page.component';
import { ActivateGreencardB2bCardFormPageComponent } from './activate-greencard-b2b-card-wizard/activate-greencard-b2b-card-form-page/activate-greencard-b2b-card-form-page.component';
import { ActivateGreencardB2bCardConfirmPageComponent } from './activate-greencard-b2b-card-wizard/activate-greencard-b2b-card-confirm-page/activate-greencard-b2b-card-confirm-page.component';
import { ActivateGreencardB2bCardFailPageComponent } from './activate-greencard-b2b-card-wizard/activate-greencard-b2b-card-fail-page/activate-greencard-b2b-card-fail-page.component';
import { ActivateGreencardB2bCardSuccessPageComponent } from './activate-greencard-b2b-card-wizard/activate-greencard-b2b-card-success-page/activate-greencard-b2b-card-success-page.component';
import { AdjustGreencardBalanceConfirmationPageComponent } from './adjust-greencard-balance-wizard/adjust-greencard-balance-confirmation-page/adjust-greencard-balance-confirmation-page.component';
import { AdjustGreencardBalanceFailurePageComponent } from './adjust-greencard-balance-wizard/adjust-greencard-balance-failure-page/adjust-greencard-balance-failure-page.component';
import { AdjustGreencardBalanceFormPageComponent } from './adjust-greencard-balance-wizard/adjust-greencard-balance-form-page/adjust-greencard-balance-form-page.component';
import { AdjustGreencardBalanceSuccessPageComponent } from './adjust-greencard-balance-wizard/adjust-greencard-balance-success-page/adjust-greencard-balance-success-page.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CcaCoreModule } from '../../cca-core.module';
import {GreencardReleaseMerchandiseResultPageComponent} from './greencard-release-merchandise-wizard/greencard-release-merchandise-result-page/greencard-release-merchandise-result-page.component';
import {GreencardReleaseMerchandiseConfirmationPageComponent} from './greencard-release-merchandise-wizard/greencard-release-merchandise-confirmation-page/greencard-release-merchandise-confirmation-page.component';
import {GreencardReleasePreauthConfirmationPageComponent} from './greencard-release-preauth-wizard/greencard-release-preauth-confirmation-page/greencard-release-preauth-confirmation-page.component';
import {GreencardReleasePreauthResultPageComponent} from './greencard-release-preauth-wizard/greencard-release-preauth-result-page/greencard-release-preauth-result-page.component';
import {GreencardReleaseMerchandiseFormPageComponent} from './greencard-release-merchandise-wizard/greencard-release-merchandise-form-page/greencard-release-merchandise-form-page.component';
import { ReplaceGreencardFormPageComponent } from './replace-greencard-wizard/replace-greencard-form-page/replace-greencard-form-page.component';
import { ReplaceGreencardConfirmationPageComponent } from './replace-greencard-wizard/replace-greencard-confirmation-page/replace-greencard-confirmation-page.component';
import { ReplaceGreencardResultPageComponent } from './replace-greencard-wizard/replace-greencard-result-page/replace-greencard-result-page.component';
import { TransferGreencardConfirmationPageComponent } from './transfer-greencard-wizard/transfer-greencard-confirmation-page/transfer-greencard-confirmation-page.component';
import { TransferGreencardFormPageComponent } from './transfer-greencard-wizard/transfer-greencard-form-page/transfer-greencard-form-page.component';
import { TransferGreencardResultPageComponent } from './transfer-greencard-wizard/transfer-greencard-result-page/transfer-greencard-result-page.component';
import {ViewGreencardDisputeModule} from "./view-greencard-dispute/view-greencard-dispute.module";

const components = [
  ActivateGreencardB2bCardConfirmPageComponent,
  ActivateGreencardB2bCardFailPageComponent,
  ActivateGreencardB2bCardFormPageComponent,
  ActivateGreencardB2bCardSuccessPageComponent,
  ActivateGreencardGiftCardConfirmPageComponent,
  ActivateGreencardGiftCardFailPageComponent,
  ActivateGreencardGiftCardFormPageComponent,
  ActivateGreencardGiftCardSuccessPageComponent,
  AdjustGreencardBalanceConfirmationPageComponent,
  AdjustGreencardBalanceFailurePageComponent,
  AdjustGreencardBalanceFormPageComponent,
  AdjustGreencardBalanceSuccessPageComponent,
  GreencardReleaseMerchandiseFormPageComponent,
  GreencardReleaseMerchandiseConfirmationPageComponent,
  GreencardReleaseMerchandiseResultPageComponent,
  GreencardReleasePreauthConfirmationPageComponent,
  GreencardReleasePreauthResultPageComponent,
  ReplaceGreencardConfirmationPageComponent,
  ReplaceGreencardFormPageComponent,
  ReplaceGreencardResultPageComponent,
  TransferGreencardConfirmationPageComponent,
  TransferGreencardFormPageComponent,
  TransferGreencardResultPageComponent,
];

@NgModule ( {
  declarations: components,
  exports: components,
  entryComponents: components,
  imports: [
    CcaCoreModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ViewGreencardDisputeModule
  ]
} )
export class GreencardActionsModule {
}
