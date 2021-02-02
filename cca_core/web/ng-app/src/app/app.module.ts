import { NgModule } from '@angular/core';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { CcaCoreModule } from './core/cca-core.module';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './auth/authentication-interceptor';
import { MatIconRegistry } from '@angular/material';
import { CcaAuthenticationModule } from "./auth/cca-authentication.module";
import { StoreModule } from '@ngrx/store';
import { authenticationReducer } from './auth/authentication-reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CcaDashboardModule } from "./dashboard/cca-dashboard.module";
import { CcaDetailModule } from "./detail/cca-detail.module";
import { CcaReportModule } from "./reports/cca-report.module";
import { CcaProfileModule } from "./profile/cca-profile.module";
import { CcaSearchModule } from "./search/cca-search.module";
import { CcaServiceModule } from "./services/cca-service.module";
import { supportReducer } from "./core/support/support-reducer";
import { ErrorToastInterceptor } from './core/toast/error-toast-interceptor';
import { toastReducer } from "./toast/toast-reducer";
import { CcaToastModule } from './toast/cca-toast.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CcaMaterialModule } from "./core/material/cca-material.module";
import { CcaRoutingModule } from "./core/routing/cca-routing.module";
import { SessionTimeoutInterceptor } from "./core/support/session-timeout-interceptor";
import { BlameInterceptor } from "./core/blame/blame-interceptor";
import { dockReducer } from "./core/dock/dock-reducer";
import { sessionReducer } from './core/session/session-reducer';
import { searchReducer } from "./core/search/search-reducer";
import { codexReducer } from "./codex/codex-reducer";
import { SessionAwareInterceptor } from "./core/support/session-aware-interceptor";
import { dockSelectionsTabReducer } from "./core/dock/dock/selections-tab/dock-selections-tab-reducer";
import { detailReducer } from "./detail/detail-reducer";
import { reportReducer } from "./reports/report-reducer";
import { controlPanelReducer } from "./core/control-panel/control-panel-reducer";
import { CcaUserMenuModule } from "./user-menu/user-menu.module";
import { CcaRaiseCaseModule } from "./core/session/session-panel/session-actions/raise-case/cca-raise-case.module";
import { CcaEditCustomerAccountModule } from "./detail/selection-action-toolbar/edit-customer-account/cca-edit-customer-account.module";
import { CcaCaseWorkspaceModule } from "./case-workspace/cca-case-workspace.module";
import { caseWorkspaceReducer } from "./case-workspace/case-workspace-reducer";
import { serviceReducer } from "./core/service/service-reducer";
import { CcaLogComplaintModule } from "./core/session/session-panel/session-actions/log-complaint/cca-log-complaint.module";
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './core/session/session.effects';

@NgModule ( {
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PdfViewerModule,
    StoreModule.forRoot ( {
      authenticationState: authenticationReducer,
      caseWorkspaceState: caseWorkspaceReducer,
      codexState: codexReducer,
      detailState: detailReducer,
      dockSelectionsTabState: dockSelectionsTabReducer,
      dockState: dockReducer,
      reportState: reportReducer,
      searchState: searchReducer,
      sessionState: sessionReducer,
      supportState: supportReducer,
      toastState: toastReducer,
      controlPanelState: controlPanelReducer,
      serviceState: serviceReducer,
    } ),
    EffectsModule.forRoot ( [ SessionEffects ] ),
    CcaMaterialModule,
    CcaRoutingModule,
    CcaCoreModule,
    CcaToastModule,
    CcaAuthenticationModule,
    CcaCaseWorkspaceModule,
    CcaDashboardModule,
    CcaDetailModule,
    CcaProfileModule,
    CcaReportModule,
    CcaSearchModule,
    CcaServiceModule,
    CcaUserMenuModule,
    CcaRaiseCaseModule,
    CcaEditCustomerAccountModule,
    CcaLogComplaintModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionAwareInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BlameInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorToastInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionTimeoutInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {

  constructor ( private matIconRegistry: MatIconRegistry ) {
    matIconRegistry.registerFontClassAlias ( 'fontawesome', 'fa' );
    matIconRegistry.setDefaultFontSetClass ( 'fa' );
  }
}
