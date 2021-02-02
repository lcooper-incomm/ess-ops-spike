import { Routes } from "@angular/router";
import { BalanceAdjustmentLimitsComponent } from "../control-panels/balance-adjustment-limits/balance-adjustment-limits.component";
import { CorePropertiesComponent } from "../control-panels/application-properties/core-properties/core-properties.component";
import { FeaturesComponent } from "../control-panels/features/features.component";
import { GreencardRequestMappingComponent } from "../control-panels/greencard-request-mapping/greencard-request-mapping.component";
import { GreencardResponseMappingComponent } from "../control-panels/greencard-response-mapping/greencard-response-mapping.component";
import { GroupsComponent } from "../control-panels/groups/groups.component";
import { LiveTroubleshootingComponent } from "../control-panels/live-troubleshooting/live-troubleshooting.component";
import { OpCodeMappingComponent } from "../control-panels/op-code-mapping/op-code-mapping.component";
import { PermissionCategoriesComponent } from "../control-panels/permission-categories/permission-categories.component";
import { PermissionsComponent } from "../control-panels/permissions/permissions.component";
import { QueuesComponent } from "../control-panels/queues/queues.component";
import { ReportsComponent } from "../control-panels/reports/reports.component";
import { RolesComponent } from "../control-panels/roles/roles.component";
import { ShortPayComponent } from "../control-panels/short-pay/short-pay.component";
import { TeamsComponent } from "../control-panels/teams/teams.component";
import { UsersComponent } from "../control-panels/users/users.component";
import { VmsPartnersComponent } from "../control-panels/vms-partners/vms-partners.component";
import { VmsProductTypesComponent } from "../control-panels/vms-product-types/vms-product-types.component";
import { WrapUpCategoriesComponent } from "../control-panels/wrap-up-categories/wrap-up-categories.component";
import { WrapUpCodesComponent } from "../control-panels/wrap-up-codes/wrap-up-codes.component";
import { ControlPanelComponent } from '../control-panel.component';
import { ControlPanelGuard } from './control-panel.guard';

export enum ControlPanelRoutePath {
  APPLICATION_PROPERTIES     = 'application-properties',
  BALANCE_ADJUSTMENT_LIMITS  = 'balance-adjustment-limits',
  FEATURES                   = 'features',
  GREENCARD_REQUEST_MAPPING  = 'greencard-request-mapping',
  GREENCARD_RESPONSE_MAPPING = 'greencard-response-mapping',
  GROUPS                     = 'groups',
  LIVE_TROUBLESHOOTING       = 'live-troubleshooting',
  OP_CODE_MAPPING            = 'op-code-mapping',
  PERMISSION_CATEGORIES      = 'permission-categories',
  PERMISSIONS                = 'permissions',
  QUEUES                     = 'queues',
  REPORTS                    = 'reports',
  ROLES                      = 'roles',
  SHORT_PAY                  = 'short-pay',
  TEAMS                      = 'teams',
  USERS                      = 'users',
  VMS_PARTNERS               = 'vms-partners',
  VMS_PRODUCT_TYPES          = 'vms-product-types',
  WRAP_UP_CATEGORIES         = 'wrap-up-categories',
  WRAP_UP_CODES              = 'wrap-up-codes'
}

export const controlPanelRoutes: Routes = [
  {
    path: '',
    component: ControlPanelComponent,
    children: [
      {
        path: '',
        redirectTo: ControlPanelRoutePath.GROUPS
      },
      {
        path: ControlPanelRoutePath.GROUPS,
        component: GroupsComponent,
      },
      {
        path: ControlPanelRoutePath.PERMISSION_CATEGORIES,
        component: PermissionCategoriesComponent,
      },
      {
        path: ControlPanelRoutePath.PERMISSIONS,
        component: PermissionsComponent,
      },
      {
        path: ControlPanelRoutePath.ROLES,
        component: RolesComponent,
      },
      {
        path: ControlPanelRoutePath.TEAMS,
        component: TeamsComponent,
      },
      {
        path: ControlPanelRoutePath.USERS,
        component: UsersComponent,
      },
      {
        path: ControlPanelRoutePath.APPLICATION_PROPERTIES,
        component: CorePropertiesComponent,
      },
      {
        path: ControlPanelRoutePath.FEATURES,
        component: FeaturesComponent,
      },
      {
        path: ControlPanelRoutePath.GREENCARD_REQUEST_MAPPING,
        component: GreencardRequestMappingComponent,
      },
      {
        path: ControlPanelRoutePath.GREENCARD_RESPONSE_MAPPING,
        component: GreencardResponseMappingComponent,
      },
      {
        path: ControlPanelRoutePath.OP_CODE_MAPPING,
        component: OpCodeMappingComponent,
      },
      {
        path: ControlPanelRoutePath.QUEUES,
        component: QueuesComponent,
      },
      {
        path: ControlPanelRoutePath.WRAP_UP_CATEGORIES,
        component: WrapUpCategoriesComponent,
      },
      {
        path: ControlPanelRoutePath.WRAP_UP_CODES,
        component: WrapUpCodesComponent,
      },
      {
        path: ControlPanelRoutePath.BALANCE_ADJUSTMENT_LIMITS,
        component: BalanceAdjustmentLimitsComponent,
      },
      {
        path: ControlPanelRoutePath.SHORT_PAY,
        component: ShortPayComponent,
      },
      {
        path: ControlPanelRoutePath.REPORTS,
        component: ReportsComponent,
      },
      {
        path: ControlPanelRoutePath.VMS_PARTNERS,
        component: VmsPartnersComponent,
      },
      {
        path: ControlPanelRoutePath.VMS_PRODUCT_TYPES,
        component: VmsProductTypesComponent,
      },
      {
        path: ControlPanelRoutePath.LIVE_TROUBLESHOOTING,
        component: LiveTroubleshootingComponent,
      }
    ]
  }
];

export interface DynamicRoute {
  label: string;
  path: string;
}

export interface DynamicRouteGroup {
  label: string;
  routes: DynamicRoute[];
}

export const controlPanelRouteGroups: DynamicRouteGroup[] = [
  {
    label: 'Authorization',
    routes: [
      {
        path: ControlPanelRoutePath.GROUPS,
        label: 'Groups',
      },
      {
        path: ControlPanelRoutePath.PERMISSION_CATEGORIES,
        label: 'Permission Categories',
      },
      {
        path: ControlPanelRoutePath.PERMISSIONS,
        label: 'Permissions',
      },
      {
        path: ControlPanelRoutePath.ROLES,
        label: 'Roles',
      },
      {
        path: ControlPanelRoutePath.TEAMS,
        label: 'Teams',
      },
      {
        path: ControlPanelRoutePath.USERS,
        label: 'Users',
      },
    ],
  },
  {
    label: 'CCA Configuration',
    routes: [
      {
        path: ControlPanelRoutePath.APPLICATION_PROPERTIES,
        label: 'Application Properties',
      },
      {
        path: ControlPanelRoutePath.FEATURES,
        label: 'Features',
      },
    ]
  },
  {
    label: 'Data Mapping',
    routes: [
      {
        path: ControlPanelRoutePath.GREENCARD_REQUEST_MAPPING,
        label: 'Greencard Request Mapping',
      },
      {
        path: ControlPanelRoutePath.GREENCARD_RESPONSE_MAPPING,
        label: 'Greencard Response Mapping',
      },
      {
        path: ControlPanelRoutePath.OP_CODE_MAPPING,
        label: 'Op Code Mapping',
      },
    ]
  },
  {
    label: 'I3/IVR Configuration',
    routes: [
      {
        path: ControlPanelRoutePath.QUEUES,
        label: 'Queues',
      },
      {
        path: ControlPanelRoutePath.WRAP_UP_CATEGORIES,
        label: 'Wrap-Up Categories',
      },
      {
        path: ControlPanelRoutePath.WRAP_UP_CODES,
        label: 'Wrap-Up Codes',
      },
    ]
  },
  {
    label: 'Other Configuration',
    routes: [
      {
        path: ControlPanelRoutePath.BALANCE_ADJUSTMENT_LIMITS,
        label: 'Balance Adjustment Limits',
      },
      {
        path: ControlPanelRoutePath.SHORT_PAY,
        label: 'Credit Location Short Pay List',
      },
      {
        path: ControlPanelRoutePath.REPORTS,
        label: 'Reports',
      },
      {
        path: ControlPanelRoutePath.VMS_PARTNERS,
        label: 'VMS Partners',
      },
      {
        path: ControlPanelRoutePath.VMS_PRODUCT_TYPES,
        label: 'VMS Product Types',
      },
    ],
  },
  {
    label: 'Troubleshooting',
    routes: [
      {
        path: ControlPanelRoutePath.LIVE_TROUBLESHOOTING,
        label: 'Live Troubleshooting',
      },
    ]
  }
];
