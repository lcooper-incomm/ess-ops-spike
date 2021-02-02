import {NgModule} from '@angular/core';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CsCorePopoverModule, CsCoreTableModule} from '@cscore/components';
import {CcaCoreModule} from "../core/cca-core.module";
import {DetailComponent} from './detail.component';
import {HorizontalDetailSummaryComponent} from './summary/horizontal-summary/horizontal-detail-summary.component';
import {VerticalDetailSummaryComponent} from './summary/vertical-summary/vertical-detail-summary.component';
import {CcaMaterialModule} from "../core/material/cca-material.module";
import {AbstractDetailSummaryComponent} from "./summary/abstract-detail-summary/abstract-detail-summary.component";
import {SelectionAlertsPanelComponent} from "./selection-alerts-panel/selection-alerts-panel.component";
import {SummaryModeToggleComponent} from "./summary/summary-mode-toggle/summary-mode-toggle.component";
import {TransactionHistoryTabComponent} from "./details-panel/transaction-history-tab/transaction-history-tab.component";
import {OrderItemsTabComponent} from "./details-panel/order-items-tab/order-items-tab.component";
import {CustomerBalanceSectionComponent} from "./summary/sections/customer-balance-section/customer-balance-section.component";
import {CustomerCustomerSectionComponent} from "./summary/sections/customer-customer-section/customer-customer-section.component";
import {CustomerFeeSectionComponent} from "./summary/sections/customer-fee-section/customer-fee-section.component";
import {CustomerRedemptionDelaySectionComponent} from "./summary/sections/customer-redemption-delay-section/customer-redemption-delay-section.component";
import {CustomerCardsSectionComponent} from "./summary/sections/customer-cards-section/customer-cards-section.component";
import {CardPurchaseLocationSectionComponent} from "./summary/sections/card-purchase-location-section/card-purchase-location-section.component";
import {CustomerCardComponent} from "./summary/sections/customer-cards-section/customer-card/customer-card.component";
import {SelectionAlertComponent} from "./selection-alerts-panel/selection-alert/selection-alert.component";
import {AccountStatusSectionComponent} from "./summary/sections/account-status-section/account-status-section.component";
import {AccountDescriptionSectionComponent} from "./summary/sections/account-description-section/account-description-section.component";
import {AccountBillerSectionComponent} from "./summary/sections/account-biller-section/account-biller-section.component";
import {AccountFeeSectionComponent} from "./summary/sections/account-fee-section/account-fee-section.component";
import {LocationStatusSectionComponent} from "./summary/sections/location-status-section/location-status-section.component";
import {LocationHierarchySectionComponent} from "./summary/sections/location-hierarchy-section/location-hierarchy-section.component";
import {LocationAddressSectionComponent} from "./summary/sections/location-address-section/location-address-section.component";
import {LocationTerminalsSectionComponent} from "./summary/sections/location-terminals-section/location-terminals-section.component";
import {LocationMiscSectionComponent} from "./summary/sections/location-misc-section/location-misc-section.component";
import {OrderStatusSectionComponent} from "./summary/sections/order-status-section/order-status-section.component";
import {OrderDetailsSectionComponent} from "./summary/sections/order-details-section/order-details-section.component";
import {OrderPurchaserSectionComponent} from "./summary/sections/order-purchaser-section/order-purchaser-section.component";
import {OrderAmountsSectionComponent} from "./summary/sections/order-amounts-section/order-amounts-section.component";
import {OrderPurchaseSectionComponent} from "./summary/sections/order-purchase-section/order-purchase-section.component";
import {OrderRiskSectionComponent} from "./summary/sections/order-risk-section/order-risk-section.component";
import {CardStatusSectionComponent} from "./summary/sections/card-status-section/card-status-section.component";
import {CardDescriptionSectionComponent} from "./summary/sections/card-description-section/card-description-section.component";
import {CardGreencardPanSectionComponent} from "./summary/sections/card-greencard-pan-section/card-greencard-pan-section.component";
import {CardIncommPurchaseSectionComponent} from "./summary/sections/card-incomm-purchase-section/card-incomm-purchase-section.component";
import {CardGreencardBalanceSectionComponent} from "./summary/sections/card-greencard-balance-section/card-greencard-balance-section.component";
import {CardGreencardPurchaseSectionComponent} from "./summary/sections/card-greencard-purchase-section/card-greencard-purchase-section.component";
import {CardIdentifiersSectionComponent} from "./summary/sections/card-identifiers-section/card-identifiers-section.component";
import {CardSrlSectionComponent} from "./summary/sections/card-srl-section/card-srl-section.component";
import {CardMultipackSectionComponent} from "./summary/sections/card-multipack-section/card-multipack-section.component";
import {CardRedemptionSectionComponent} from "./summary/sections/card-redemption-section/card-redemption-section.component";
import {CardRedemptionDelaySectionComponent} from "./summary/sections/card-redemption-delay-section/card-redemption-delay-section.component";
import {CardProductOwnerSectionComponent} from "./summary/sections/card-product-owner-section/card-product-owner-section.component";
import {AccountHistoryTabComponent} from "./details-panel/account-history-tab/account-history-tab.component";
import {MobileWalletTabComponent} from "./details-panel/mobile-wallet-tab/mobile-wallet-tab.component";
import {OrderNotificationsTabComponent} from "./details-panel/order-notifications-tab/order-notifications-tab.component";
import {OrderProcessingHistoryTabComponent} from "./details-panel/order-processing-history-tab/order-processing-history-tab.component";
import {OrderRelatedJobsTabComponent} from "./details-panel/order-related-jobs-tab/order-related-jobs-tab.component";
import {OrderDeliveriesTabComponent} from "./details-panel/order-deliveries-tab/order-deliveries-tab.component";
import {LocationTerminalsTabComponent} from "./details-panel/location-terminals-tab/location-terminals-tab.component";
import {LocationContactsTabComponent} from "./details-panel/location-contacts-tab/location-contacts-tab.component";
import {ContactComponent} from "./details-panel/location-contacts-tab/contact/contact.component";
import {OrderShipmentsSectionComponent} from "./summary/sections/order-shipments-section/order-shipments-section.component";
import {StatusPriorityPipe} from "./summary/sections/card-status-section/status-priority.pipe";
import {MultipackWrapperComponent} from "./summary/sections/card-multipack-section/multipack-wrapper/multipack-wrapper.component";
import {MultipackChildComponent} from "./summary/sections/card-multipack-section/multipack-wrapper/multipack-child/multipack-child.component";
import {DetailsPanelComponent} from "./details-panel/details-panel.component";
import {AccountHolderTabComponent} from './details-panel/account-holder-tab/account-holder-tab.component';
import {CustomerCardsTabComponent} from './details-panel/customer-cards-tab/customer-cards-tab.component';
import {CustomerFeesTabComponent} from './details-panel/customer-fees-tab/customer-fees-tab.component';
import {CustomerLimitsTabComponent} from './details-panel/customer-limits-tab/customer-limits-tab.component';
import {CommentsTabComponent} from './details-panel/comments-tab/comments-tab.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CcaLoggingModule} from "../logging/cca-logging.module";
import {IdentificationInformationComponent} from "./details-panel/account-holder-tab/identification-information/identification-information.component";
import {AccountHolderSummaryComponent} from "./details-panel/account-holder-tab/account-holder-summary/account-holder-summary.component";
import {CustomerAlertsTabComponent} from "./details-panel/customer-alerts-tab/customer-alerts-tab.component";
import {CustomerDocumentsTabComponent} from "./details-panel/customer-documents-tab/customer-documents-tab.component";
import {UpdateCustomerAlertFormPageComponent} from "./details-panel/customer-alerts-tab/update-customer-alert-wizard/update-customer-alert-form-page/update-customer-alert-form-page.component";
import {CustomerCardPanelComponent} from "./details-panel/customer-cards-tab/customer-card-panel/customer-card-panel.component";
import {CustomerCardPanelToolbarComponent} from "./details-panel/customer-cards-tab/customer-card-panel/customer-card-panel-toolbar/customer-card-panel-toolbar.component";
import {RemoveSelectionFormPageComponent} from "../core/session/session-panel/selection-navigation/selection-button/remove-selection-wizard/remove-selection-form-page/remove-selection-form-page.component";
import {CustomerRedemptionDelayFormPageComponent} from "./summary/sections/customer-redemption-delay-section/customer-redemption-delay-wizard/customer-redemption-delay-form-page/customer-redemption-delay-form-page.component";
import {RelatedSessionsPageComponent} from './selection-alerts-panel/related-sessions/related-sessions-page/related-sessions-page.component';
import {SelectionActionToolbarComponent} from "./selection-action-toolbar/selection-action-toolbar.component";
import {AccountActionService} from "./selection-action-toolbar/account-action.service";
import {CardActionService} from "./selection-action-toolbar/card-action.service";
import {CustomerActionService} from "./selection-action-toolbar/customer-action.service";
import {LocationActionService} from "./selection-action-toolbar/location-action.service";
import {OrderActionService} from "./selection-action-toolbar/order-action.service";
import {ClearItemFilterComponent} from "./details-panel/order-items-tab/clear-item-filter/clear-item-filter.component"
import {TransactionHistoryToolbarComponent} from "./details-panel/transaction-history-tab/transaction-history-toolbar/transaction-history-toolbar.component";
import {TransactionDateRangeService} from "./details-panel/transaction-history-tab/transaction-date-range.service";
import {TransactionHistoryTableComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-history-table.component";
import {NotificationDetailsComponent} from "./details-panel/order-notifications-tab/notification-wizard/notification-details/notification-details.component";
import {ChallengePasswordComponent} from "./selection-action-toolbar/challenge-password-wizard/challenge-password/challenge-password.component";
import {FastcardActivationModule} from './fastcard-activation/fastcard-activation.module';
import {TransactionHistoryLocationDetailComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-detail/location-detail/transaction-history-location-detail.component";
import {TransactionHistoryAccountDetailComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-detail/account-detail/transaction-history-account-detail.component";
import {TransactionHistoryCustomerDetailComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-detail/customer-detail/transaction-history-customer-detail.component";
import {TransactionHistoryProductDetailComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-detail/product-detail/transaction-history-product-detail.component";
import {ResetPinCsrInstructionPageComponent} from "../core/action/vms-actions/fsapi-change-status/reset-pin-wizard/reset-pin-csr-instruction-page/reset-pin-csr-instruction-page.component";
import {ExportService} from "./details-panel/transaction-history-tab/export.service";
import {OrderRiskDetailsDetailPageComponent} from "./summary/sections/order-risk-section/order-risk--details-wizard/order-risk-details-detail-page/order-risk-details-detail-page.component";
import {MobileWalletDevicesComponent} from './details-panel/mobile-wallet-tab/mobile-wallet-devices/mobile-wallet-devices.component';
import {ActionToolbarModule} from '../core/action-toolbar/action-toolbar.module';
import {MobileWalletDeviceActionToolbarComponent} from './details-panel/mobile-wallet-tab/mobile-wallet-device-action-toolbar/mobile-wallet-device-action-toolbar.component';
import {OrderPaymentDetailsPageComponent} from './summary/sections/order-purchase-section/order-payment-details/order-payment-details-page/order-payment-details-page.component';
import {ChangeGreencardStatusComponent} from "./selection-action-toolbar/change-greencard-status-wizard/change-greencard-status/change-greencard-status.component";
import {ActivateFsapiCardValidatePageComponent} from "../core/action/vms-actions/fsapi-change-status/activate-fsapi-card-wizard/activate-fsapi-card-validate-page/activate-fsapi-card-validate-page.component";
import {ActivateFsapiCardConfirmPageComponent} from "../core/action/vms-actions/fsapi-change-status/activate-fsapi-card-wizard/activate-fsapi-card-confirm-page/activate-fsapi-card-confirm-page.component";
import {ActivateFsapiCardResultsPageComponent} from "../core/action/vms-actions/fsapi-change-status/activate-fsapi-card-wizard/activate-fsapi-card-results-page/activate-fsapi-card-results-page.component";
import {ContactInformationComponent} from "./details-panel/account-holder-tab/contact-information/contact-information.component";
import {TransactionActionToolbarComponent} from './details-panel/transaction-history-tab/transaction-history-table/transaction-action-toolbar/transaction-action-toolbar.component';
import {ChangeFsapiStatusFormPageComponent} from "./details-panel/customer-cards-tab/customer-card-panel/customer-card-panel-toolbar/change-fsapi-status-wizard/form-page/change-fsapi-status-form-page.component";
import {ChangeFsapiStatusPinAlertComponent} from "./details-panel/customer-cards-tab/customer-card-panel/customer-card-panel-toolbar/change-fsapi-status-wizard/pin-alert-page/change-fsapi-status-pin-alert.component";
import {ChangeFsapiStatusResultsPageComponent} from "./details-panel/customer-cards-tab/customer-card-panel/customer-card-panel-toolbar/change-fsapi-status-wizard/results-page/change-fsapi-status-results-page.component";
import {ChangeFsapiStatusConfirmationPageComponent} from "./details-panel/customer-cards-tab/customer-card-panel/customer-card-panel-toolbar/change-fsapi-status-wizard/confirmation-page/change-fsapi-status-confirmation-page.component";
import {GreencardActionsModule} from '../core/action/greencard-actions/greencard-actions.module';
import {ChangeGreencardStatusReviewComponent} from "./selection-action-toolbar/change-greencard-status-wizard/change-greencard-status-review/change-greencard-status-review.component";
import {ChangeGreencardStatusConfirmationComponent} from "./selection-action-toolbar/change-greencard-status-wizard/change-greencard-status-confirmation/change-greencard-status-confirmation.component";
import {ReplaceFsapiCardComponent} from "./selection-action-toolbar/replace-fsapi-card-wizard/replace-fsapi-card/replace-fsapi-card.component";
import {ReplaceFsapiCardReviewComponent} from "./selection-action-toolbar/replace-fsapi-card-wizard/replace-fsapi-card-review/replace-fsapi-card-review.component";
import {ReplaceFsapiCardConfirmationComponent} from "./selection-action-toolbar/replace-fsapi-card-wizard/replace-fsapi-card-confirmation/replace-fsapi-card-confirmation.component";
import {VmsActionsModule} from '../core/action/vms-actions/vms-actions.module';
import {TransactionHistoryDetailComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-detail/transaction-history-detail.component";
import {IncommTransactionDetailComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-detail/product-detail/incomm-detail/incomm-transaction-detail.component";
import {GreencardTransactionDetailComponent} from "./details-panel/transaction-history-tab/transaction-history-table/transaction-detail/product-detail/greencard-detail/greencard-transaction-detail.component";
import {VmsSendFormConfirmPageComponent} from "../core/action/vms-actions/vms-send-form-wizard/vms-send-form-confirm-page/vms-send-form-confirm-page.component";
import {VmsSendFormResultsPageComponent} from "../core/action/vms-actions/vms-send-form-wizard/vms-send-form-results-page/vms-send-form-results-page.component";
import {VmsSendFormSelectionPageComponent} from "../core/action/vms-actions/vms-send-form-wizard/vms-send-form-selection-page/vms-send-form-selection-page.component";
import {CancelOrderActionConfirmationComponent} from "./selection-action-toolbar/cancel-order-action-wizard/cancel-order-action-confirmation/cancel-order-action-confirmation.component";
import {CancelOrderActionReviewComponent} from "./selection-action-toolbar/cancel-order-action-wizard/cancel-order-action-review/cancel-order-action-review.component";
import {ChangeFeePlanVmsComponent} from "./details-panel/customer-fees-tab/change-fee-plan-vms-wizard/change-fee-plan-vms/change-fee-plan-vms.component";
import {ChangeFeePlanVmsConfirmationComponent} from "./details-panel/customer-fees-tab/change-fee-plan-vms-wizard/change-fee-plan-vms-confirmation/change-fee-plan-vms-confirmation.component";
import {ChangeFeePlanVmsReviewComponent} from "./details-panel/customer-fees-tab/change-fee-plan-vms-wizard/change-fee-plan-vms-review/change-fee-plan-vms-review.component";
import {CloseCardsOnOrderComponent} from "./selection-action-toolbar/close-cards-on-order-wizard/close-cards-on-order/close-cards-on-order.component";
import {CloseCardsOnOrderConfirmationComponent} from "./selection-action-toolbar/close-cards-on-order-wizard/close-cards-on-order-confirmation/close-cards-on-order-confirmation.component";
import {CloseCardsOnOrderReviewComponent} from "./selection-action-toolbar/close-cards-on-order-wizard/close-cards-on-order-review/close-cards-on-order-review.component";
import {OrderItemDisplayComponent} from "./selection-action-toolbar/close-cards-on-order-wizard/order-item-display/order-item-display.component";
import {RefundOrderActionComponent} from "./selection-action-toolbar/refund-order-action-wizard/refund-order-action/refund-order-action.component";
import {RefundOrderActionConfirmationComponent} from "./selection-action-toolbar/refund-order-action-wizard/refund-order-action-confirmation/refund-order-action-confirmation.component";
import {RefundOrderActionReviewComponent} from "./selection-action-toolbar/refund-order-action-wizard/refund-order-action-review/refund-order-action-review.component";
import {OrderDeliveryDetailComponent} from "./details-panel/order-deliveries-tab/order-delivery-detail/order-delivery-detail.component";
import {HoldOrderConfirmationPageComponent} from "./selection-action-toolbar/hold-order/hold-order-confirmation-page/hold-order-confirmation-page.component";
import {HoldOrderResultsPageComponent} from "./selection-action-toolbar/hold-order/hold-order-results-page/hold-order-results-page.component";
import {ResumeOrderConfirmationPageComponent} from "./selection-action-toolbar/resume-order/resume-order-confirmation-page/resume-order-confirmation-page.component";
import {ResumeOrderResultsPageComponent} from "./selection-action-toolbar/resume-order/resume-order-results-page/resume-order-results-page.component";
import {CcaDeliveryMethodModule} from '../core/action/delivery-method/delivery-method.module';
import {HoldOrderFormPageComponent} from "./selection-action-toolbar/hold-order/hold-order-form-page/hold-order-form-page.component";
import {UpgradeCardComponent} from "./selection-action-toolbar/upgrade-card-wizard/upgrade-card/upgrade-card.component";
import {UpgradeCardConfirmationComponent} from "./selection-action-toolbar/upgrade-card-wizard/upgrade-card-confirmation/upgrade-card-confirmation.component";
import {UpgradeCardReviewComponent} from "./selection-action-toolbar/upgrade-card-wizard/upgrade-card-review/upgrade-card-review.component";
import {CancelOrderFormPageComponent} from "./selection-action-toolbar/cancel-order-action-wizard/cancel-order-form-page/cancel-order-form-page.component";
import {ResumeOrderFormPageComponent} from "./selection-action-toolbar/resume-order/resume-order-form-page/resume-order-form-page.component";
import {JobDetailsFormPageComponent} from "./details-panel/job-details-wizard/job-details-form-page/job-details-form-page.component";
import {FullTransactionHistoryDetailsComponent} from "./details-panel/transaction-history-tab/full-transaction-history-details-wizard/full-transaction-history-details/full-transaction-history-details.component";
import {ViewCommentDetailComponent} from "./details-panel/comments-tab/view-comment-details-wizard/view-comment-detail/view-comment-detail.component";
import {JobsTaskTableComponent} from "./details-panel/job-details-wizard/jobs-task-table/jobs-task-table.component";
import {JobsStatusHistoryTableComponent} from "./details-panel/job-details-wizard/jobs-status-history-table/jobs-status-history-table.component";
import {FileDownloadComponent} from "./details-panel/job-details-wizard/file-download/file-download.component";
import {CustomerAccountAccountSectionComponent} from './summary/sections/customer-account-account-section/customer-account-account-section.component';
import {CustomerAccountBalanceSectionComponent} from './summary/sections/customer-account-balance-section/customer-account-balance-section.component';
import {RelatedAccountsComponent} from "./details-panel/account-holder-tab/related-accounts/related-accounts.component";
import {CcaDetailsPanelModule} from './details-panel/cca-details-panel.module';
import {BulkChangeCardStatusComponent} from "./selection-action-toolbar/bulk-change-card-status-wizard/bulk-change-card-status/bulk-change-card-status.component";
import {BulkChangeCardStatusReviewComponent} from "./selection-action-toolbar/bulk-change-card-status-wizard/bulk-change-card-status-review/bulk-change-card-status-review.component";
import {BulkChangeCardStatusConfirmationComponent} from "./selection-action-toolbar/bulk-change-card-status-wizard/bulk-change-card-status-confirmation/bulk-change-card-status-confirmation.component";
import {ResendDeliveryConfirmationComponent} from "./selection-action-toolbar/resend-delivery-action-wizard/resend-delivery-confirmation/resend-delivery-confirmation.component";
import {ResendDeliveryReviewComponent} from "./selection-action-toolbar/resend-delivery-action-wizard/resend-delivery-review/resend-delivery-review.component";
import {CcaSummaryModule} from './summary/cca-summary.module';
import {AccountPersonalInfoComponent} from "./details-panel/account-holder-tab/account-personal-info/account-personal-info.component";
import {AccountContactInformationComponent} from "./details-panel/account-holder-tab/account-contact-information/account-contact-information.component";
import {CustomerCardServeDetailComponent} from "./details-panel/customer-cards-tab/customer-card-serve-detail/customer-card-serve-detail.component";
import {AccountAlertsTabComponent} from "./details-panel/account-alerts-tab/account-alerts-tab.component";
import {UpdateAccountAlertFormPageComponent} from "./details-panel/account-alerts-tab/update-account-alert-wizard/update-account-alert-form-page/update-account-alert-form-page.component";
import {CustomerCardFsapiDetailComponent} from "./details-panel/customer-cards-tab/customer-card-fsapi-detail/customer-card-fsapi-detail.component";
import {ChangeAccountStatusFormPageComponent} from "../core/action/account-actions/change-account-status-wizard/change-account-status-form-page/change-account-status-form-page.component";
import {ChangeAccountStatusConfirmationPageComponent} from "../core/action/account-actions/change-account-status-wizard/change-account-status-confirmation-page/change-account-status-confirmation-page.component";
import {ChangeAccountStatusResultPageComponent} from "../core/action/account-actions/change-account-status-wizard/change-account-status-result-page/change-account-status-result-page.component";
import {ChangeCardStatusFormPageComponent} from "../core/action/card-actions/change-card-status-wizard/change-card-status-form-page/change-card-status-form-page.component";
import {ChangeCardStatusConfirmationPageComponent} from "../core/action/card-actions/change-card-status-wizard/change-card-status-confirmation-page/change-card-status-confirmation-page.component";
import {ChangeCardStatusResultPageComponent} from "../core/action/card-actions/change-card-status-wizard/change-card-status-result-page/change-card-status-result-page.component";
import {CustomerAccountActionService} from "./selection-action-toolbar/customer-account-action.service";
import {MaplesTransactionHistoryTabComponent} from "./details-panel/maples-transaction-history-tab/maples-transaction-history-tab.component";
import {MaplesTransactionHistoryTableComponent} from "./details-panel/maples-transaction-history-tab/maples-transaction-history-table/maples-transaction-history-table.component";
import {MaplesTransactionHistoryToolbarComponent} from "./details-panel/maples-transaction-history-tab/maples-transaction-history-toolbar/maples-transaction-history-toolbar.component";
import {TransactionServeDetailComponent} from "./details-panel/maples-transaction-history-tab/maples-transaction-history-table/maples-transaction-detail/serve-detail/transaction-serve-detail.component";
import {MaplesTransactionHistoryDetailComponent} from "./details-panel/maples-transaction-history-tab/maples-transaction-history-table/maples-transaction-detail/maples-transaction-history-detail.component";
import {MaplesTransactionDetailsComponent} from "./details-panel/maples-transaction-history-tab/maples-transaction-details-wizard/maples-transaction-details/maples-transaction-details.component";
import {MaplesTransactionActionToolbarComponent} from "./details-panel/maples-transaction-history-tab/maples-transaction-history-table/maples-transaction-action-toolbar/maples-transaction-action-toolbar.component";
import {AccountFeesTabComponent} from "./details-panel/account-fees-tab/account-fees-tab.component";
import {ReplaceServeCardConfirmationPageComponent} from "./selection-action-toolbar/replace-serve-card-wizard/replace-serve-card-confirmation-page/replace-serve-card-confirmation-page.component";
import {ReplaceServeCardResultsPageComponent} from "./selection-action-toolbar/replace-serve-card-wizard/replace-serve-card-results-page/replace-serve-card-results-page.component";
import {ReplaceServeCardFormPageComponent} from "./selection-action-toolbar/replace-serve-card-wizard/replace-serve-card-form-page/replace-serve-card-form-page.component";
import {ServeIdentificationInformationComponent} from "./details-panel/account-holder-tab/serve-identification-information/serve-identification-information.component";
import {AccountFundingTabComponent} from "./details-panel/account-funding-tab/account-funding-tab.component";
import {ServeSendFormsWizardModule} from './wizards/serve-send-forms-wizard/serve-send-forms-wizard.module';
import {CustomerCardServeToolbarComponent} from './details-panel/customer-cards-tab/customer-card-serve-detail/customer-card-serve-toolbar/customer-card-serve-toolbar.component';
import {ServeCloseAccountWizardModule} from './wizards/serve-close-account-wizard/serve-close-account-wizard.module';
import {MaplesScheduledTransactionsComponent} from "./details-panel/maples-transaction-history-tab/maples-scheduled-transactions/maples-scheduled-transactions.component";
import {OrderPaymentDetailsSectionComponent} from './summary/sections/order-payment-details-section/order-payment-details-section.component';
import {OrderAlderSummaryComponent} from './summary/sections/order-alder-summary/order-alder-summary.component';
import {AlderResendEmailWizardModule} from './selection-action-toolbar/alder-resend-email-wizard/alder-resend-email-wizard.module';
import {AccountToAccountTransferFormPageComponent} from "./selection-action-toolbar/account-to-account-transfer/account-to-account-transfer-form-page/account-to-account-transfer-form-page.component";
import {AccountToAccountTransferReviewPageComponent} from "./selection-action-toolbar/account-to-account-transfer/account-to-account-transfer-review-page/account-to-account-transfer-review-page.component";
import {AccountToAccountTransferConfirmationPageComponent} from "./selection-action-toolbar/account-to-account-transfer/account-to-account-transfer-confirmation-page/account-to-account-transfer-confirmation-page.component";
import {AccountToAccountAddAccountPageComponent} from "./selection-action-toolbar/account-to-account-transfer/account-to-account-add-account-page/account-to-account-add-account-page.component";
import {ExcludeAccountPipe} from './selection-action-toolbar/account-to-account-transfer/exclude-account.pipe';
import {MaplesScheduledTransactionDetailComponent} from './details-panel/maples-transaction-history-tab/maples-scheduled-transactions/maples-scheduled-transaction-details/maples-scheduled-transaction-detail.component';
import {ServeCancelTransactionWizardModule} from './wizards/serve-cancel-transaction-wizard/serve-cancel-transaction-wizard.module';
import {ServeArchiveDocumentWizardModule} from './wizards/serve-archive-document/serve-archive-document-wizard.module';
import {RelatedCasesTabComponent} from './details-panel/related-cases-tab/related-cases-tab.component';
import {RefundAccountWizardModule} from './selection-action-toolbar/refund-account-action-wizard/refund-account-action-wizard.module';
import {CustomerOrdersTabComponent} from './details-panel/customer-orders-tab/customer-orders-tab.component';
import {CustomerOrdersDetailComponent} from './details-panel/customer-orders-tab/customer-orders-detail.component';
import {AccountStatusCodesTabComponent} from './details-panel/account-status-codes-tab/account-status-codes-tab.component';
import {AccountStatusCodesTableComponent} from './details-panel/account-status-codes-tab/account-status-codes-table.component';
import {CcaDateModule} from '../core/date/date.module';
import {ServeAdjustTransactionModule} from './wizards/serve-adjust-transaction/serve-adjust-transaction.module';


const componentDeclarations: any[] = [
  AbstractDetailSummaryComponent,
  AccountAlertsTabComponent,
  AccountBillerSectionComponent,
  AccountContactInformationComponent,
  AccountDescriptionSectionComponent,
  AccountFeeSectionComponent,
  AccountFeesTabComponent,
  AccountFundingTabComponent,
  AccountHistoryTabComponent,
  AccountHolderSummaryComponent,
  AccountHolderTabComponent,
  AccountPersonalInfoComponent,
  AccountStatusCodesTabComponent,
  AccountStatusCodesTableComponent,
  AccountStatusSectionComponent,
  AccountToAccountAddAccountPageComponent,
  AccountToAccountTransferConfirmationPageComponent,
  AccountToAccountTransferFormPageComponent,
  AccountToAccountTransferReviewPageComponent,
  ActivateFsapiCardConfirmPageComponent,
  ActivateFsapiCardResultsPageComponent,
  ActivateFsapiCardValidatePageComponent,
  BulkChangeCardStatusComponent,
  BulkChangeCardStatusReviewComponent,
  BulkChangeCardStatusConfirmationComponent,
  CancelOrderActionConfirmationComponent,
  CancelOrderActionReviewComponent,
  CancelOrderFormPageComponent,
  CardDescriptionSectionComponent,
  CardGreencardBalanceSectionComponent,
  CardGreencardPanSectionComponent,
  CardGreencardPurchaseSectionComponent,
  CardIdentifiersSectionComponent,
  CardIncommPurchaseSectionComponent,
  CardMultipackSectionComponent,
  CardProductOwnerSectionComponent,
  CardPurchaseLocationSectionComponent,
  CardRedemptionDelaySectionComponent,
  CardRedemptionSectionComponent,
  CardSrlSectionComponent,
  CardStatusSectionComponent,
  ChallengePasswordComponent,
  ChangeFeePlanVmsComponent,
  ChangeFeePlanVmsConfirmationComponent,
  ChangeFeePlanVmsReviewComponent,
  ChangeFsapiStatusResultsPageComponent,
  ChangeFsapiStatusFormPageComponent,
  ChangeFsapiStatusPinAlertComponent,
  ChangeFsapiStatusConfirmationPageComponent,
  ChangeGreencardStatusComponent,
  ChangeGreencardStatusConfirmationComponent,
  ChangeGreencardStatusReviewComponent,
  ChangeAccountStatusFormPageComponent,
  ChangeAccountStatusConfirmationPageComponent,
  ChangeAccountStatusResultPageComponent,
  ChangeCardStatusFormPageComponent,
  ChangeCardStatusConfirmationPageComponent,
  ChangeCardStatusResultPageComponent,
  CloseCardsOnOrderComponent,
  CloseCardsOnOrderConfirmationComponent,
  CloseCardsOnOrderReviewComponent,
  ClearItemFilterComponent,
  CommentsTabComponent,
  ContactComponent,
  ContactInformationComponent,
  CustomerAccountAccountSectionComponent,
  CustomerAccountBalanceSectionComponent,
  CustomerAlertsTabComponent,
  CustomerBalanceSectionComponent,
  CustomerCardComponent,
  CustomerCardFsapiDetailComponent,
  CustomerCardServeDetailComponent,
  CustomerCardPanelComponent,
  CustomerCardPanelToolbarComponent,
  CustomerCardServeToolbarComponent,
  CustomerCardsSectionComponent,
  CustomerCardsTabComponent,
  CustomerCustomerSectionComponent,
  CustomerDocumentsTabComponent,
  CustomerFeeSectionComponent,
  CustomerFeesTabComponent,
  CustomerLimitsTabComponent,
  CustomerOrdersDetailComponent,
  CustomerOrdersTabComponent,
  CustomerRedemptionDelayFormPageComponent,
  CustomerRedemptionDelaySectionComponent,
  DetailComponent,
  DetailsPanelComponent,
  ExcludeAccountPipe,
  FileDownloadComponent,
  FullTransactionHistoryDetailsComponent,
  GreencardTransactionDetailComponent,
  HoldOrderConfirmationPageComponent,
  HoldOrderFormPageComponent,
  HoldOrderResultsPageComponent,
  HorizontalDetailSummaryComponent,
  IdentificationInformationComponent,
  IncommTransactionDetailComponent,
  JobDetailsFormPageComponent,
  JobsStatusHistoryTableComponent,
  JobsTaskTableComponent,
  LocationAddressSectionComponent,
  LocationContactsTabComponent,
  LocationHierarchySectionComponent,
  LocationMiscSectionComponent,
  LocationStatusSectionComponent,
  LocationTerminalsSectionComponent,
  LocationTerminalsTabComponent,
  MaplesScheduledTransactionsComponent,
  MaplesScheduledTransactionDetailComponent,
  MaplesTransactionActionToolbarComponent,
  MaplesTransactionDetailsComponent,
  MaplesTransactionHistoryDetailComponent,
  MaplesTransactionHistoryTabComponent,
  MaplesTransactionHistoryTableComponent,
  MaplesTransactionHistoryToolbarComponent,
  MobileWalletDeviceActionToolbarComponent,
  MobileWalletDevicesComponent,
  MobileWalletTabComponent,
  MultipackChildComponent,
  MultipackWrapperComponent,
  NotificationDetailsComponent,
  OrderAlderSummaryComponent,
  OrderAmountsSectionComponent,
  OrderDeliveryDetailComponent,
  OrderDetailsSectionComponent,
  OrderItemDisplayComponent,
  OrderItemsTabComponent,
  OrderNotificationsTabComponent,
  OrderPaymentDetailsPageComponent,
  OrderPaymentDetailsSectionComponent,
  OrderProcessingHistoryTabComponent,
  OrderPurchaseSectionComponent,
  OrderPurchaserSectionComponent,
  OrderRelatedJobsTabComponent,
  OrderRiskDetailsDetailPageComponent,
  OrderRiskSectionComponent,
  OrderShipmentsSectionComponent,
  OrderDeliveriesTabComponent,
  OrderStatusSectionComponent,
  RelatedCasesTabComponent,
  RelatedSessionsPageComponent,
  RemoveSelectionFormPageComponent,
  RefundOrderActionComponent,
  RefundOrderActionConfirmationComponent,
  RefundOrderActionReviewComponent,
  ReplaceFsapiCardComponent,
  ReplaceFsapiCardConfirmationComponent,
  ReplaceFsapiCardReviewComponent,
  ReplaceServeCardConfirmationPageComponent,
  ReplaceServeCardFormPageComponent,
  ReplaceServeCardResultsPageComponent,
  RelatedAccountsComponent,
  ResendDeliveryConfirmationComponent,
  ResendDeliveryReviewComponent,
  ResetPinCsrInstructionPageComponent,
  ResumeOrderConfirmationPageComponent,
  ResumeOrderFormPageComponent,
  ResumeOrderResultsPageComponent,
  SelectionActionToolbarComponent,
  SelectionAlertComponent,
  SelectionAlertsPanelComponent,
  ServeIdentificationInformationComponent,
  StatusPriorityPipe,
  SummaryModeToggleComponent,
  TransactionHistoryDetailComponent,
  TransactionHistoryAccountDetailComponent,
  TransactionHistoryCustomerDetailComponent,
  TransactionHistoryLocationDetailComponent,
  TransactionHistoryProductDetailComponent,
  TransactionHistoryTabComponent,
  TransactionHistoryTableComponent,
  TransactionActionToolbarComponent,
  TransactionHistoryToolbarComponent,
  TransactionServeDetailComponent,
  UpdateCustomerAlertFormPageComponent,
  UpdateAccountAlertFormPageComponent,
  UpgradeCardComponent,
  UpgradeCardConfirmationComponent,
  UpgradeCardReviewComponent,
  ViewCommentDetailComponent,
  VerticalDetailSummaryComponent,
  VmsSendFormConfirmPageComponent,
  VmsSendFormResultsPageComponent,
  VmsSendFormSelectionPageComponent
];

const entryComponentDeclarations: any[] = [
  AccountToAccountAddAccountPageComponent,
  AccountToAccountTransferConfirmationPageComponent,
  AccountToAccountTransferReviewPageComponent,
  AccountToAccountTransferFormPageComponent,
  ActivateFsapiCardConfirmPageComponent,
  ActivateFsapiCardValidatePageComponent,
  ActivateFsapiCardResultsPageComponent,
  BulkChangeCardStatusComponent,
  BulkChangeCardStatusReviewComponent,
  BulkChangeCardStatusConfirmationComponent,
  ChangeFeePlanVmsComponent,
  ChangeFeePlanVmsConfirmationComponent,
  ChangeFeePlanVmsReviewComponent,
  CancelOrderActionConfirmationComponent,
  CancelOrderActionReviewComponent,
  CancelOrderFormPageComponent,
  ChangeFsapiStatusResultsPageComponent,
  ChangeFsapiStatusFormPageComponent,
  ChangeFsapiStatusPinAlertComponent,
  ChangeFsapiStatusConfirmationPageComponent,
  ChallengePasswordComponent,
  ChangeGreencardStatusComponent,
  ChangeGreencardStatusConfirmationComponent,
  ChangeGreencardStatusReviewComponent,
  CustomerRedemptionDelayFormPageComponent,
  ChangeFsapiStatusResultsPageComponent,
  ChangeFsapiStatusFormPageComponent,
  ChangeFsapiStatusPinAlertComponent,
  ChangeFsapiStatusConfirmationPageComponent,
  ChallengePasswordComponent,
  ChangeAccountStatusFormPageComponent,
  ChangeAccountStatusConfirmationPageComponent,
  ChangeAccountStatusResultPageComponent,
  ChangeCardStatusFormPageComponent,
  ChangeCardStatusConfirmationPageComponent,
  ChangeCardStatusResultPageComponent,
  CloseCardsOnOrderComponent,
  CloseCardsOnOrderConfirmationComponent,
  CloseCardsOnOrderReviewComponent,
  FullTransactionHistoryDetailsComponent,
  HoldOrderConfirmationPageComponent,
  HoldOrderFormPageComponent,
  HoldOrderResultsPageComponent,
  JobDetailsFormPageComponent,
  MaplesTransactionDetailsComponent,
  OrderRiskDetailsDetailPageComponent,
  NotificationDetailsComponent,
  OrderPaymentDetailsPageComponent,
  RefundOrderActionComponent,
  RefundOrderActionConfirmationComponent,
  RefundOrderActionReviewComponent,
  RelatedCasesTabComponent,
  RelatedSessionsPageComponent,
  RemoveSelectionFormPageComponent,
  ReplaceFsapiCardComponent,
  ReplaceFsapiCardConfirmationComponent,
  ReplaceFsapiCardReviewComponent,
  ReplaceServeCardConfirmationPageComponent,
  ReplaceServeCardFormPageComponent,
  ReplaceServeCardResultsPageComponent,
  ResendDeliveryConfirmationComponent,
  ResendDeliveryReviewComponent,
  ResetPinCsrInstructionPageComponent,
  ResumeOrderConfirmationPageComponent,
  ResumeOrderFormPageComponent,
  ResumeOrderResultsPageComponent,
  UpdateAccountAlertFormPageComponent,
  UpdateCustomerAlertFormPageComponent,
  UpgradeCardComponent,
  UpgradeCardConfirmationComponent,
  UpgradeCardReviewComponent,
  ViewCommentDetailComponent,
  VmsSendFormConfirmPageComponent,
  VmsSendFormResultsPageComponent,
  VmsSendFormSelectionPageComponent
];

@NgModule ( {
  entryComponents: entryComponentDeclarations,
  exports: componentDeclarations,
  imports: [
    ActionToolbarModule,
    CommonModule,
    FormsModule,
    GreencardActionsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PdfViewerModule,
    CcaCoreModule,
    CsCoreTableModule,
    CsCorePopoverModule,
    CcaDateModule,
    CcaDeliveryMethodModule,
    CcaDetailsPanelModule,
    CcaSummaryModule,
    CcaLoggingModule,
    CcaMaterialModule,
    FastcardActivationModule,
    VmsActionsModule,
    ServeCloseAccountWizardModule,
    ServeSendFormsWizardModule,
    AlderResendEmailWizardModule,
    ServeCancelTransactionWizardModule,
    ServeArchiveDocumentWizardModule,
    RefundAccountWizardModule,
    ServeAdjustTransactionModule,
  ],
  declarations: componentDeclarations,
  providers: [
    AccountActionService,
    CardActionService,
    CustomerAccountActionService,
    CustomerActionService,
    ExportService,
    LocationActionService,
    OrderActionService,
    TransactionDateRangeService
  ]
} )
export class CcaDetailModule {
}
