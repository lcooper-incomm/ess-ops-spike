import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CcaMaterialModule} from "./material/cca-material.module";
import {UserService} from './user/user.service';
import {CcaClickSwallowerModule} from './click-swallower/click-swallower.module';
import {MainNavigationComponent} from "./main-navigation/main-navigation.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {PermissionService} from "./permission/permission.service";
import {TogglzService} from "./config/togglz.service";
import {PropertyService} from "./config/property.service";
import {BalanceAdjustmentService} from './balance-adjustment/balance-adjustment.service';
import {HttpSessionWatcherComponent} from "./support/http-session-watcher/http-session-watcher.component";
import {SessionTimeoutDialogComponent} from './support/http-session-watcher/session-timeout-dialog/session-timeout-dialog.component';
import {TransitionComponent} from "./transition/transition.component";
import {PartnerService} from "./partner/partner.service";
import {TransitionService} from "./transition/transition.service";
import {FooterComponent} from "./footer/footer.component";
import {DockComponent} from "./dock/dock/dock.component";
import {DockButtonComponent} from "./dock/dock/dock-button/dock-button.component";
import {SessionDefinitionService} from "./session/session-definition.service";
import {SessionService} from "./session/session.service";
import {SessionPanelComponent} from "./session/session-panel/session-panel.component";
import {CallTimerComponent} from "./timer/call-timer/call-timer.component";
import {RunningTimerComponent} from "./timer/running-timer/running-timer.component";
import {AutoSaveFeedbackComponent} from "./session/session-panel/auto-save-feedback/auto-save-feedback.component";
import {SessionPanelHeaderComponent} from "./session/session-panel/session-panel-header/session-panel-header.component";
import {SessionEventListenerComponent} from "./session/session-event-listener/session-event-listener.component";
import {HelpTabComponent} from "./dock/dock/help-tab/help-tab.component";
import {QueueTabComponent} from "./dock/dock/queue-tab/queue-tab.component";
import {ServicesTabComponent} from "./dock/dock/services-tab/services-tab.component";
import {LinksTabComponent} from "./dock/dock/links-tab/links-tab.component";
import {DirectoryTabComponent} from "./dock/dock/directory-tab/directory-tab.component";
import {SessionWorkspaceComponent} from "./dock/dock/session-workspace/session-workspace.component";
import {RoboHelpTabComponent} from "./dock/dock/robo-help-tab/robo-help-tab.component";
import {SessionWorkspaceCardComponent} from "./dock/dock/session-workspace/session-workspace-card/session-workspace-card.component";
import {WorkspaceCardSelectionCountComponent} from "./dock/dock/session-workspace/session-workspace-card/workspace-card-selection-count/workspace-card-selection-count.component";
import {CaseSessionPanelComponent} from "./session/session-panel/case-session-panel/case-session-panel.component";
import {DefaultSessionPanelComponent} from "./session/session-panel/default-session-panel/default-session-panel.component";
import {SessionActionsComponent} from "./session/session-panel/session-actions/session-actions.component";
import {SelectionNavigationComponent} from "./session/session-panel/selection-navigation/selection-navigation.component";
import {SessionFeedbackService} from "./session/session-feedback.service";
import {GeneralSessionComponentFormComponent} from "./session/session-panel/general-session-component-form/general-session-component-form.component";
import {SessionFormBuilder} from "./session/session-panel/session-form-builder.service";
import {TeamService} from './team/team.service';
import {QueueService} from "./queue/queue.service";
import {WrapUpCodeCategoryService} from "./wrap-up-code-category/wrap-up-code-category.service";
import {WrapUpCodeService} from "./wrap-up-code/wrap-up-code.service";
import {CallSessionComponentFormComponent} from "./session/session-panel/call-session-component-form/call-session-component-form.component";
import {CallComponentService} from "./session/session-panel/call-session-component-form/call-component.service";
import {CommentService} from "./comment/comment.service";
import {SecurityService} from './security/security.service';
import {CaseTabBadgeComponent} from "./session/session-panel/case-session-panel/case-tab-badge/case-tab-badge.component";
import {CustomerSessionComponentFormComponent} from "./session/session-panel/case-session-panel/customer-session-component-form/customer-session-component-form.component";
import {CustomerComponentService} from "./session/session-panel/case-session-panel/customer-session-component-form/customer-component.service";
import {PostalCodeService} from "./form/address-form/postal-code.service";
import {StateProvinceService} from "./form/state-province-field/state-province.service";
import {MerchantSessionComponentFormComponent} from "./session/session-panel/case-session-panel/merchant-session-component-form/merchant-session-component-form.component";
import {MerchantComponentService} from "./session/session-panel/case-session-panel/merchant-session-component-form/merchant-component.service";
import {DatepickerFieldComponent} from "./form/datepicker-field/datepicker-field.component";
import {RefundRequestSessionComponentFormComponent} from "./session/session-panel/case-session-panel/refund-request-session-component-form/refund-request-session-component-form.component";
import {RefundRequestComponentService} from "./session/session-panel/case-session-panel/refund-request-session-component-form/refund-request-component.service";
import {LawEnforcementComponentService} from "./session/session-panel/case-session-panel/law-enforcement-session-component-form/law-enforcement-component.service";
import {LawEnforcementSessionComponentFormComponent} from "./session/session-panel/case-session-panel/law-enforcement-session-component-form/law-enforcement-session-component-form.component";
import {DocumentsSessionComponentFormComponent} from "./session/session-panel/case-session-panel/documents-session-component-form/documents-session-component-form.component";
import {DocumentsComponentService} from "./session/session-panel/case-session-panel/documents-session-component-form/documents-component.service";
import {CardsSessionComponentFormComponent} from "./session/session-panel/case-session-panel/cards-session-component-form/cards-session-component-form.component";
import {ReceiptSessionComponentFormComponent} from "./session/session-panel/case-session-panel/receipt-session-component-form/receipt-session-component-form.component";
import {ReceiptComponentService} from "./session/session-panel/case-session-panel/receipt-session-component-form/receipt-component.service";
import {SearchTypeService} from "./search/search-type/search-type.service";
import {CcaLoggingModule} from "../logging/cca-logging.module";
import {PartnerFieldComponent} from "./form/partner-field/partner-field.component";
import {SessionClassSearchFieldComponent} from "./form/session-class-search-field/session-class-search-field.component";
import {TransactionIdFieldComponent} from "./form/transaction-id-field/transaction-id-field.component";
import {SerialNumberFieldComponent} from "./form/serial-number-field/serial-number-field.component";
import {LastFourFieldComponent} from "./form/last-four-field/last-four-field.component";
import {VanFieldComponent} from "./form/van-field/van-field.component";
import {CanFieldComponent} from "./form/can-field/can-field.component";
import {PreAuthKeyFieldComponent} from "./form/pre-auth-key-field/pre-auth-key-field.component";
import {AccountNumberFieldComponent} from "./form/account-number-field/account-number-field.component";
import {ProxyNumberFieldComponent} from "./form/proxy-number-field/proxy-number-field.component";
import {CardIdFieldComponent} from "./form/card-id-field/card-id-field.component";
import {IdentificationFieldComponent} from "./form/identification-field/identification-field.component";
import {CcaFormBuilder} from './form/cca-form-builder.service';
import {CcaFormValidationService} from "./form/cca-form-validation.service";
import {SessionValidator} from "./session/session-validator.service";
import {WorkSessionButtonComponent} from "./session/work-session-button/work-session-button.component";
import {CardService} from "./card/card.service";
import {JiraStatusComponent} from "./status/jira-status/jira-status.component";
import {MobileWalletTokenStatusComponent} from "./status/mobile-wallet-token-status/mobile-wallet-token-status.component";
import {EcommOrderStatusComponent} from "./status/ecomm-order-status/ecomm-order-status.component";
import {CustomerService} from "./customer/customer.service";
import {Workflow} from "./workflow/workflow.service";
import {LoadSessionWorkflow} from "./workflow/load-session-workflow.service";
import {LoadSelectionsWorkflow} from "./workflow/load-selections-workflow.service";
import {SelectionService} from "./session/selection/selection.service";
import {AccountService} from "./account/account.service";
import {LocationService} from "./node/location/location.service";
import {OrderService} from "./order/order.service";
import {SearchService} from "./search/search.service";
import {SessionSearchService} from "./search/session-search.service";
import {AccountSearchService} from "./search/account-search.service";
import {CardSearchService} from "./search/card-search.service";
import {CustomerSearchService} from "./search/customer-search.service";
import {LocationSearchService} from "./search/location-search.service";
import {IssueSearchService} from "./search/issue-search.service";
import {AddSelectionToSessionWorkflow} from "./workflow/add-selection-to-session-workflow.service";
import {ForwardingSearchWorkflow} from "./workflow/forwarding-search-workflow.service";
import {AbstractSearchResultsTableComponent} from "../search/search-results/abstract-search-results-table/abstract-search-results-table.component";
import {AuditService} from "./audit/audit.service";
import {SelectionButtonComponent} from "./session/session-panel/selection-navigation/selection-button/selection-button.component";
import {AbstractStatusComponent} from "./status/abstract-status/abstract-status.component";
import {CustomerFeePlanService} from "./customer/customer-fee-plan.service";
import {HierarchyService} from "./node/hierarchy/hierarchy.service";
import {WizardDialogComponent} from "./wizard/wizard-dialog/wizard-dialog.component";
import {WizardRunner} from "./wizard/wizard-runner/wizard-runner.service";
import {WizardProgressComponent} from "./wizard/wizard-dialog/wizard-progress/wizard-progress.component";
import {WizardProgressPagesPipe} from './wizard/wizard-dialog/wizard-progress/wizard-progress-pages.pipe';
import {CreateSessionFormPageComponent} from './session/create-session-wizard/create-session-form-page/create-session-form-page.component';
import {AddSessionDocumentFormPageComponent} from './session/session-panel/case-session-panel/documents-session-component-form/add-session-document-wizard/add-session-document-form-page/add-session-document-form-page.component';
import {EditSessionDocumentFormPageComponent} from './session/session-panel/case-session-panel/documents-session-component-form/edit-session-document-wizard/edit-session-document-form-page/edit-session-document-form-page.component';
import {AddReceiptCardFormPageComponent} from "./session/session-panel/case-session-panel/receipt-session-component-form/add-receipt-card-wizard/add-receipt-card-form-page/add-receipt-card-form-page.component";
import {EditReceiptCardFormPageComponent} from "./session/session-panel/case-session-panel/receipt-session-component-form/edit-receipt-card-wizard/edit-receipt-card-form-page/edit-receipt-card-form-page.component";
import {ChangeSessionTypeSuccessPageComponent} from "./session/session-panel/session-actions/change-session-type/change-session-type-success-page/change-session-type-success-page.component";
import {ChangeSessionTypeFormPageComponent} from './session/session-panel/session-actions/change-session-type/change-session-type-form-page/change-session-type-form-page.component';
import {ChangeSessionTypeConfirmPageComponent} from './session/session-panel/session-actions/change-session-type/change-session-type-confirm-page/change-session-type-confirm-page.component';
import {ChangeSessionTypeFailurePageComponent} from "./session/session-panel/session-actions/change-session-type/change-session-type-failure-page/change-session-type-failure-page.component";
import {ViewCommentsFormPageComponent} from "./session/session-panel/session-comments/view-comments/view-comments-form-page/view-comments-form-page.component";
import {CustomerAlertsService} from "./customer/customer-alerts.service";
import {CustomerAccountLimitService} from "./customer/customer-account-limit.service";
import {PlatformStatusValueService} from "./platform/platform-status-value.service";
import {SafePipe} from "./utils/safe.pipe";
import {AutoScrollSessionHeaderContainerComponent} from "./session/auto-scroll-session-header-container/auto-scroll-session-header-container.component";
import {DateService} from "./date/date.service";
import {LocalStorage} from "./local-storage/local-storage.service";
import {BolPartnerFieldComponent} from "./form/bol-partner-field/bol-partner-field.component";
import {CcaPipesModule} from './pipes/cca-pipes.module';
import {CcaSpinnerModule} from './spinner/cca-spinner.module';
import {IdentificationTypeService} from "./customer/identification-type.service";
import {OccupationService} from "./customer/occupation.service";
import {ProductActionReasonCodeService} from "./action/product-action-reason-code.service";
import {FileUploadModule} from "ng2-file-upload";
import {FileService} from "./file/file.service";
import {FsapiC2cTransferService} from "./c2c-transfer/fsapi-c2c-transfer.service";
import {TokenProvisioningStatusComponent} from './status/token-provisioning-status/token-provisioning-status.component';
import {CcaViewSessionModule} from './session/view-session-wizard/view-session.module';
import {CcaKeyValueModule} from './key-value/key-value.module';
import {CcaAddressModule} from './address/address.module';
import {CcaUserChipModule} from './user/user-chip/user-chip.module';
import {CcaStatusModule} from './status/status.module';
import {CcaSessionSummaryModule} from './session/session-panel/session-summary/session-summary.module';
import {CcaSessionCommentsModule} from './session/session-panel/session-comments/session-comments.module';
import {CcaFormsModule} from './form/forms.module';
import {CcaSessionComponentsModule} from './session/session-components/session-components.module';
import {BolOrderStateComponent} from "./status/bol-order-state/bol-order-state.component";
import {BolOrderStatusComponent} from "./status/bol-order-status/bol-order-status.component";
import {OrderItemsTableComponent} from "../detail/details-panel/order-items-tab/order-items-table/order-items-table.component";
import {CcaFormattersModule} from './formatters/formatters.module';
import {CcaMergeSelectionModule} from './session/session-panel/selection-navigation/selection-button/merge-selection-wizard/merge-selection.module';
import {CanaryService} from "./canary/canary.service";
import {CcaUnmaskablePanModule} from './card/unmaskable-pan/unmaskable-pan.module';
import {CcaButtonsModule} from './buttons/buttons.module';
import {StackedProgressBarComponent} from "./stacked-progress-bar/stacked-progress-bar.component";
import {CountDownToggleTimerComponent} from "./timer/count-down-toggle-timer/count-down-toggle-timer.component";
import {MappingService} from "./mapping/mapping.service";
import {DisputeSessionComponentFormComponent} from "./session/session-panel/case-session-panel/dispute-session-component-form/dispute-session-component-form.component";
import {PersonalInfoFormPageComponent} from "./session/session-panel/session-actions/personal-info-wizard/personal-info-form-page/personal-info-form-page.component";
import {PersonalInfoConfirmationPageComponent} from "./session/session-panel/session-actions/personal-info-wizard/personal-info-confirmation-page/personal-info-confirmation-page.component";
import {PersonalInfoResultsPageComponent} from "./session/session-panel/session-actions/personal-info-wizard/personal-info-results-page/personal-info-results-page.component";
import {CcaSelectionsTabModule} from './dock/dock/selections-tab/selections-tab.module';
import {BankService} from "./complaint/bank.service";
import {ComplaintFormComponent} from "./session/session-panel/session-actions/log-complaint/form-page/complaint-form/complaint-form.component";
import {CcaPanelModule} from './panel/panel.module';
import {CcaSessionHistoryModule} from './dock/dock/session-history/session-history.module';
import {ValidatedStatusComponent} from "./status/validated-status/validated-status.component";
import {ComplaintSessionComponentFormComponent} from './session/session-panel/case-session-panel/complaint-session-component-form/complaint-session-component-form.component';
import {PrivacyRequestSessionComponentFormComponent} from "./session/session-panel/case-session-panel/privacy-request-session-component-form/privacy-request-session-component-form.component";
import {FileViewerPageComponent} from "./file-viewer/file-viewer-page/file-viewer-page.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {EncorSessionComponentFormComponent} from './session/session-panel/case-session-panel/encor-session-component-form/encor-session-component-form.component';
import {RouterModule} from '@angular/router';
import {DictionaryService} from './dictionary/dictionary.service';
import {WebSocketService} from './web-socket/web-socket.service';
import {AreYouSureWizardModule} from './wizard-common/are-you-sure-wizard/are-you-sure-wizard.module';

library.add ( fab, far, fas );
const componentDeclarations: any[] = [
  AbstractSearchResultsTableComponent,
  AbstractStatusComponent,
  AccountNumberFieldComponent,
  AddReceiptCardFormPageComponent,
  AddSessionDocumentFormPageComponent,
  AutoSaveFeedbackComponent,
  AutoScrollSessionHeaderContainerComponent,
  BolOrderStateComponent,
  BolOrderStatusComponent,
  BolPartnerFieldComponent,
  CallSessionComponentFormComponent,
  CallTimerComponent,
  CanFieldComponent,
  CardIdFieldComponent,
  CardsSessionComponentFormComponent,
  CaseSessionPanelComponent,
  CaseTabBadgeComponent,
  ChangeSessionTypeFormPageComponent,
  ChangeSessionTypeConfirmPageComponent,
  ChangeSessionTypeSuccessPageComponent,
  ChangeSessionTypeFailurePageComponent,
  CountDownToggleTimerComponent,
  ComplaintFormComponent,
  ComplaintSessionComponentFormComponent,
  CreateSessionFormPageComponent,
  CustomerSessionComponentFormComponent,
  DatepickerFieldComponent,
  DefaultSessionPanelComponent,
  DirectoryTabComponent,
  DisputeSessionComponentFormComponent,
  DockComponent,
  DockButtonComponent,
  DocumentsSessionComponentFormComponent,
  EcommOrderStatusComponent,
  EditReceiptCardFormPageComponent,
  EditSessionDocumentFormPageComponent,
  EncorSessionComponentFormComponent,
  FileViewerPageComponent,
  FooterComponent,
  GeneralSessionComponentFormComponent,
  HelpTabComponent,
  HttpSessionWatcherComponent,
  IdentificationFieldComponent,
  JiraStatusComponent,
  LastFourFieldComponent,
  LawEnforcementSessionComponentFormComponent,
  LinksTabComponent,
  MainNavigationComponent,
  MerchantSessionComponentFormComponent,
  MobileWalletTokenStatusComponent,
  TokenProvisioningStatusComponent,
  OrderItemsTableComponent,
  PartnerFieldComponent,
  PersonalInfoFormPageComponent,
  PersonalInfoConfirmationPageComponent,
  PersonalInfoResultsPageComponent,
  PreAuthKeyFieldComponent,
  PrivacyRequestSessionComponentFormComponent,
  ProxyNumberFieldComponent,
  QueueTabComponent,
  ReceiptSessionComponentFormComponent,
  RefundRequestSessionComponentFormComponent,
  RoboHelpTabComponent,
  RunningTimerComponent,
  SafePipe,
  SelectionButtonComponent,
  SelectionNavigationComponent,
  SerialNumberFieldComponent,
  ServicesTabComponent,
  SessionActionsComponent,
  SessionClassSearchFieldComponent,
  SessionEventListenerComponent,
  SessionPanelComponent,
  SessionPanelHeaderComponent,
  SessionTimeoutDialogComponent,
  SessionWorkspaceCardComponent,
  SessionWorkspaceComponent,
  StackedProgressBarComponent,
  TransactionIdFieldComponent,
  TransitionComponent,
  VanFieldComponent,
  ValidatedStatusComponent,
  ViewCommentsFormPageComponent,
  WizardDialogComponent,
  WizardProgressPagesPipe,
  WizardProgressComponent,
  WorkSessionButtonComponent,
  WorkspaceCardSelectionCountComponent
];

const entryComponentDeclarations: any[] = [
  AddReceiptCardFormPageComponent,
  AddSessionDocumentFormPageComponent,
  ChangeSessionTypeFormPageComponent,
  ChangeSessionTypeConfirmPageComponent,
  ChangeSessionTypeSuccessPageComponent,
  ChangeSessionTypeFailurePageComponent,
  CreateSessionFormPageComponent,
  EditReceiptCardFormPageComponent,
  EditSessionDocumentFormPageComponent,
  FileViewerPageComponent,
  PersonalInfoFormPageComponent,
  PersonalInfoConfirmationPageComponent,
  PersonalInfoResultsPageComponent,
  SessionTimeoutDialogComponent,
  ViewCommentsFormPageComponent,
  WizardDialogComponent
];

const moduleDeclarations: any[] = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  FileUploadModule,
  FontAwesomeModule,
  PdfViewerModule,
  CcaAddressModule,
  CcaButtonsModule,
  CcaClickSwallowerModule,
  CcaFormattersModule,
  CcaFormsModule,
  CcaKeyValueModule,
  CcaLoggingModule,
  CcaMaterialModule,
  CcaMergeSelectionModule,
  CcaPanelModule,
  CcaPipesModule,
  CcaSelectionsTabModule,
  CcaSessionCommentsModule,
  CcaSessionComponentsModule,
  CcaSessionHistoryModule,
  CcaSessionSummaryModule,
  CcaSpinnerModule,
  CcaStatusModule,
  CcaViewSessionModule,
  CcaUserChipModule,
  AreYouSureWizardModule
];

const exportDeclarations: any[] = [
  AbstractSearchResultsTableComponent,
  AbstractStatusComponent,
  AccountNumberFieldComponent,
  AddReceiptCardFormPageComponent,
  AddSessionDocumentFormPageComponent,
  AutoSaveFeedbackComponent,
  AutoScrollSessionHeaderContainerComponent,
  BolOrderStateComponent,
  BolOrderStatusComponent,
  BolPartnerFieldComponent,
  CallSessionComponentFormComponent,
  CallTimerComponent,
  CanFieldComponent,
  CardIdFieldComponent,
  CardsSessionComponentFormComponent,
  CaseSessionPanelComponent,
  CaseTabBadgeComponent,
  ChangeSessionTypeFormPageComponent,
  ChangeSessionTypeConfirmPageComponent,
  ChangeSessionTypeSuccessPageComponent,
  ChangeSessionTypeFailurePageComponent,
  CountDownToggleTimerComponent,
  ComplaintFormComponent,
  ComplaintSessionComponentFormComponent,
  CreateSessionFormPageComponent,
  CustomerSessionComponentFormComponent,
  DatepickerFieldComponent,
  DefaultSessionPanelComponent,
  DirectoryTabComponent,
  DisputeSessionComponentFormComponent,
  DockComponent,
  DockButtonComponent,
  DocumentsSessionComponentFormComponent,
  EcommOrderStatusComponent,
  EditReceiptCardFormPageComponent,
  EditSessionDocumentFormPageComponent,
  FooterComponent,
  GeneralSessionComponentFormComponent,
  HelpTabComponent,
  HttpSessionWatcherComponent,
  IdentificationFieldComponent,
  JiraStatusComponent,
  LastFourFieldComponent,
  LawEnforcementSessionComponentFormComponent,
  LinksTabComponent,
  MainNavigationComponent,
  MerchantSessionComponentFormComponent,
  MobileWalletTokenStatusComponent,
  TokenProvisioningStatusComponent,
  OrderItemsTableComponent,
  PersonalInfoFormPageComponent,
  PersonalInfoConfirmationPageComponent,
  PersonalInfoResultsPageComponent,
  PartnerFieldComponent,
  PreAuthKeyFieldComponent,
  ProxyNumberFieldComponent,
  QueueTabComponent,
  ReceiptSessionComponentFormComponent,
  RefundRequestSessionComponentFormComponent,
  RoboHelpTabComponent,
  RunningTimerComponent,
  SafePipe,
  SelectionButtonComponent,
  SelectionNavigationComponent,
  SerialNumberFieldComponent,
  ServicesTabComponent,
  SessionActionsComponent,
  SessionClassSearchFieldComponent,
  SessionEventListenerComponent,
  SessionPanelComponent,
  SessionPanelHeaderComponent,
  SessionTimeoutDialogComponent,
  SessionWorkspaceCardComponent,
  SessionWorkspaceComponent,
  StackedProgressBarComponent,
  TransactionIdFieldComponent,
  TransitionComponent,
  VanFieldComponent,
  ValidatedStatusComponent,
  ViewCommentsFormPageComponent,
  WizardDialogComponent,
  WizardProgressPagesPipe,
  WizardProgressComponent,
  WorkSessionButtonComponent,
  WorkspaceCardSelectionCountComponent,
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  CcaAddressModule,
  CcaButtonsModule,
  CcaClickSwallowerModule,
  CcaFormattersModule,
  CcaFormsModule,
  CcaKeyValueModule,
  CcaLoggingModule,
  CcaMaterialModule,
  CcaPanelModule,
  CcaPipesModule,
  CcaSelectionsTabModule,
  CcaSessionCommentsModule,
  CcaSessionHistoryModule,
  CcaSessionSummaryModule,
  CcaSpinnerModule,
  CcaStatusModule,
  CcaUnmaskablePanModule,
  CcaUserChipModule,
];

@NgModule ( {
  exports: exportDeclarations,
  imports: moduleDeclarations,
  declarations: componentDeclarations,
  entryComponents: entryComponentDeclarations,
  providers: [
    AccountSearchService,
    AccountService,
    AddSelectionToSessionWorkflow,
    AuditService,
    BalanceAdjustmentService,
    BankService,
    CallComponentService,
    CanaryService,
    CardSearchService,
    CardService,
    CommentService,
    CustomerAccountLimitService,
    CustomerAlertsService,
    CustomerComponentService,
    CustomerFeePlanService,
    CustomerSearchService,
    CustomerService,
    DateService,
    DictionaryService,
    DocumentsComponentService,
    CcaFormBuilder,
    CcaFormValidationService,
    FileService,
    ForwardingSearchWorkflow,
    FsapiC2cTransferService,
    IssueSearchService,
    HierarchyService,
    IdentificationTypeService,
    LawEnforcementComponentService,
    LoadSelectionsWorkflow,
    LoadSessionWorkflow,
    LocalStorage,
    LocationSearchService,
    LocationService,
    MappingService,
    MerchantComponentService,
    OccupationService,
    OrderService,
    PermissionService,
    PartnerService,
    PlatformStatusValueService,
    PostalCodeService,
    ProductActionReasonCodeService,
    PropertyService,
    QueueService,
    ReceiptComponentService,
    RefundRequestComponentService,
    SearchService,
    SearchTypeService,
    SecurityService,
    SelectionService,
    SessionDefinitionService,
    SessionFeedbackService,
    SessionFormBuilder,
    SessionSearchService,
    SessionService,
    SessionValidator,
    StateProvinceService,
    TeamService,
    TogglzService,
    TransitionService,
    UserService,
    WebSocketService,
    WizardRunner,
    Workflow,
    WrapUpCodeCategoryService,
    WrapUpCodeService
  ]
} )
export class CcaCoreModule {
}
