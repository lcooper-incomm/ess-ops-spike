import { AppState } from 'src/app/app-state';
import { DEFAULT_AUTHENTICATION_STATE } from 'src/app/auth/authentication-reducer';
import { DEFAULT_CASE_WORKSPACE_STATE } from 'src/app/case-workspace/case-workspace-reducer';
import { DEFAULT_CODEX_STATE } from 'src/app/codex/codex-reducer';
import { DEFAULT_DETAIL_STATE } from 'src/app/detail/detail-reducer';
import { DEFAULT_DOCK_STATE } from 'src/app/core/dock/dock-reducer';
import { DEFAULT_REPORT_STATE } from 'src/app/reports/report-reducer';
import { DEFAULT_SERVICE_STATE } from 'src/app/core/service/service-reducer';
import { DEFAULT_SESSION_STATE } from 'src/app/core/session/session-reducer';
import { DEFAULT_SUPPORT_STATE } from 'src/app/core/support/support-reducer';
import { DEFAULT_TOAST_STATE } from 'src/app/toast/toast-reducer';
import { DEFAULT_CONTROL_PANEL_STATE } from '../../core/control-panel/control-panel-reducer';
import { DEFAULT_DOCK_SELECTIONS_TAB_STATE } from '../../core/dock/dock/selections-tab/dock-selections-tab-reducer';
import { DEFAULT_SEARCH_STATE } from '../../core/search/search-reducer';

export function mockAppState (): AppState {
  return {
    authenticationState: DEFAULT_AUTHENTICATION_STATE,
    caseWorkspaceState: DEFAULT_CASE_WORKSPACE_STATE,
    codexState: DEFAULT_CODEX_STATE,
    controlPanelState: DEFAULT_CONTROL_PANEL_STATE,
    detailState: DEFAULT_DETAIL_STATE,
    dockSelectionsTabState: DEFAULT_DOCK_SELECTIONS_TAB_STATE,
    dockState: DEFAULT_DOCK_STATE,
    reportState: DEFAULT_REPORT_STATE,
    searchState: DEFAULT_SEARCH_STATE,
    sessionState: DEFAULT_SESSION_STATE,
    serviceState: DEFAULT_SERVICE_STATE,
    supportState: DEFAULT_SUPPORT_STATE,
    toastState: DEFAULT_TOAST_STATE,
  };
}
