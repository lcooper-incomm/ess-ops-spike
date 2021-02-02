import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { RoutingService } from "./routing.service";
import { RoutePath } from './route-path.enum';
import { LoginComponent } from '../../auth/login/login.component';
import { DashboardComponent } from '../../dashboard/dashboard/dashboard.component';
import { DetailComponent } from "../../detail/detail.component";
import { ReportsComponent } from "../../reports/reports.component";
import { ServicesComponent } from "../../services/services/services.component";
import { ProfileComponent } from "../../profile/profile/profile.component";
import { SearchComponent } from "../../search/search.component";
import { CaseWorkspaceComponent } from "../../case-workspace/case-workspace.component";
import { controlPanelRoutes } from '../../control-panel/routing/control-panel-routes';
import { ControlPanelGuard } from '../../control-panel/routing/control-panel.guard';

const routes: Routes = [
  {
    path: RoutePath.CASE_WORKSPACE,
    component: CaseWorkspaceComponent
  },
  {
    path: RoutePath.CONTROL_PANEL,
    canActivateChild: [ ControlPanelGuard ],
    loadChildren: '../../control-panel/cca-control-panel.module#CcaControlPanelModule'
  },
  {
    path: RoutePath.DASHBOARD,
    component: DashboardComponent
  },
  {
    path: RoutePath.DETAIL,
    component: DetailComponent
  },
  {
    path: RoutePath.LOGIN,
    component: LoginComponent
  },
  {
    path: RoutePath.PROFILE,
    component: ProfileComponent
  },
  {
    path: RoutePath.REPORTS,
    component: ReportsComponent
  },
  {
    path: RoutePath.SEARCH,
    component: SearchComponent
  },
  {
    path: RoutePath.SERVICES,
    component: ServicesComponent
  },
  {
    path: '**',
    redirectTo: RoutePath.DASHBOARD
  }
];

@NgModule ( {
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot ( routes )
  ],
  declarations: [],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    RoutingService
  ]
} )
export class CcaRoutingModule {
}
