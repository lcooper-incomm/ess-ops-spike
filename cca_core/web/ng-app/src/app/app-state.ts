import { AuthenticationState } from "./auth/authentication-state";
import { SupportState } from "./core/support/support-state";
import { ToastState } from "./toast/toast-state";
import { DockState } from "./core/dock/dock-state";
import { SessionState } from "./core/session/session-state";
import { SearchState } from "./core/search/search-state";
import { CodexState } from "./codex/codex-state";
import { DockSelectionsTabState } from "./core/dock/dock/selections-tab/dock-selections-tab-state";
import { DetailState } from "./detail/detail-state";
import { ReportState } from "./reports/report-state";
import { ControlPanelState } from "./core/control-panel/control-panel-state";
import { CaseWorkspaceState } from "./case-workspace/case-workspace-state";
import { ServiceState } from "./services/service-state";

export interface AppState {

  authenticationState: AuthenticationState;
  caseWorkspaceState: CaseWorkspaceState;
  codexState: CodexState;
  controlPanelState: ControlPanelState;
  detailState: DetailState;
  dockSelectionsTabState: DockSelectionsTabState;
  dockState: DockState;
  reportState: ReportState;
  searchState: SearchState;
  sessionState: SessionState;
  serviceState: ServiceState;
  supportState: SupportState;
  toastState: ToastState;

}
