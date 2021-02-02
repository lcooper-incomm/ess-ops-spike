import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CsCoreTableModule} from '@cscore/components';
import {CcaCoreModule} from '../core/cca-core.module';
import {ControlPanelComponent} from './control-panel.component';
import {ModalPanelGroupComponent} from '../core/modal-panel-group/modal-panel-group.component';
import {GroupsComponent} from './control-panels/groups/groups.component';
import {PermissionCategoriesComponent} from './control-panels/permission-categories/permission-categories.component';
import {PermissionsComponent} from './control-panels/permissions/permissions.component';
import {RolesComponent} from './control-panels/roles/roles.component';
import {TeamsComponent} from './control-panels/teams/teams.component';
import {UsersComponent} from './control-panels/users/users.component';
import {FeaturesComponent} from './control-panels/features/features.component';
import {OpCodeMappingComponent} from './control-panels/op-code-mapping/op-code-mapping.component';
import {QueuesComponent} from './control-panels/queues/queues.component';
import {WrapUpCategoriesComponent} from './control-panels/wrap-up-categories/wrap-up-categories.component';
import {WrapUpCodesComponent} from './control-panels/wrap-up-codes/wrap-up-codes.component';
import {BalanceAdjustmentLimitsComponent} from './control-panels/balance-adjustment-limits/balance-adjustment-limits.component';
import {ShortPayComponent} from './control-panels/short-pay/short-pay.component';
import {ReportsComponent} from './control-panels/reports/reports.component';
import {VmsPartnersComponent} from './control-panels/vms-partners/vms-partners.component';
import {VmsProductTypesComponent} from './control-panels/vms-product-types/vms-product-types.component';
import {LiveTroubleshootingComponent} from './control-panels/live-troubleshooting/live-troubleshooting.component';
import {GreencardRequestMappingComponent} from './control-panels/greencard-request-mapping/greencard-request-mapping.component';
import {GreencardResponseMappingComponent} from './control-panels/greencard-response-mapping/greencard-response-mapping.component';
import {UserCardComponent} from './control-panels/groups/user-card/user-card.component';
import {RolesCardComponent} from './control-panels/groups/roles-card/roles-card.component';
import {ModalPanelComponent} from '../core/modal-panel/modal-panel.component';
import {AuthPermissionsComponent} from './auth-permissions/auth-permissions.component';
import {CreateUserFormPageComponent} from './control-panels/users/create-user-wizard/create-user-form-page/create-user-form-page.component';
import {CreateGroupFormPageComponent} from './control-panels/groups/create-group-wizard/create-group-form-page/create-group-form-page.component';
import {EditGroupPageComponent} from './control-panels/groups/edit-group-wizard/edit-group-page/edit-group-page.component';
import {EditGroupOwnersPageComponent} from './control-panels/groups/edit-group-wizard/edit-group-owners-page/edit-group-owners-page.component';
import {EditGroupRolesPageComponent} from './control-panels/groups/edit-group-wizard/edit-group-roles-page/edit-group-roles-page.component';
import {EditGroupPermissionsPageComponent} from './control-panels/groups/edit-group-wizard/edit-group-permissions-page/edit-group-permissions-page.component';
import {CreateRoleFormPageComponent} from './control-panels/roles/create-role-wizard/create-role-form-page/create-role-form-page.component';
import {EditRolePageComponent} from './control-panels/roles/edit-role-wizard/edit-role-page/edit-role-page.component';
import {EditRoleMembersPageComponent} from './control-panels/roles/edit-role-wizard/edit-role-members-page/edit-role-members-page.component';
import {EditRolePermissionsPageComponent} from './control-panels/roles/edit-role-wizard/edit-role-permissions-page/edit-role-permissions-page.component';
import {EditRoleAdministratorsPageComponent} from './control-panels/roles/edit-role-wizard/edit-role-administrators-page/edit-role-administrators-page.component';
import {MemberCardComponent} from './control-panels/roles/member-card/member-card.component';
import {AdminCardComponent} from './control-panels/roles/admin-card/admin-card.component';
import {EditPermissionPageComponent} from './control-panels/permissions/edit-permission-wizard/edit-permission-page/edit-permission-page.component';
import {EditPermissionGroupsPageComponent} from './control-panels/permissions/edit-permission-wizard/edit-permission-groups-page/edit-permission-groups-page.component';
import {EditPermissionRolesPageComponent} from './control-panels/permissions/edit-permission-wizard/edit-permission-roles-page/edit-permission-roles-page.component';
import {PermissionGroupCardComponent} from './control-panels/permissions/permission-group-card/permission-group-card.component';
import {EditUserPageComponent} from './control-panels/users/edit-user-wizard/edit-user-page/edit-user-page.component';
import {EditUserRolePageComponent} from './control-panels/users/edit-user-wizard/edit-user-role-page/edit-user-role-page.component';
import {EditUserOwnerPageComponent} from './control-panels/users/edit-user-wizard/edit-user-owner-page/edit-user-owner-page.component';
import {GroupCardComponent} from './control-panels/users/group-card/group-card.component';
import {UserRoleCardComponent} from './control-panels/users/user-role-card/user-role-card.component';
import {PermissionRoleCardComponent} from './control-panels/permissions/permission-role-card/permission-role-card.component';
import {EditPropertiesFormPageComponent} from './control-panels/application-properties/edit-properties-wizard/edit-properties-form-page/edit-properties-form-page.component';
import {EditPropertiesConfirmationPageComponent} from './control-panels/application-properties/edit-properties-wizard/edit-properties-confirmation-page/edit-properties-confirmation-page.component';
import {EditPropertiesResultsPageComponent} from './control-panels/application-properties/edit-properties-wizard/edit-properties-results-page/edit-properties-results-page.component';
import {CorePropertiesComponent} from './control-panels/application-properties/core-properties/core-properties.component';
import {controlPanelRoutes} from './routing/control-panel-routes';
import {CcaCaseWorkspaceModule} from '../case-workspace/cca-case-workspace.module';
import {AddEditGCRequestWizardModule} from './control-panels/greencard-request-mapping/add-edit-gc-request-wizard/add-edit-gc-request-wizard.module';
import {AddEditGCResponseWizardModule} from './control-panels/greencard-response-mapping/add-edit-gc-response-wizard/add-edit-gc-response-wizard.module';
import {AddEditQueueWizardModule} from './control-panels/queues/add-edit-queue-wizard/add-edit-queue-wizard.module';
import {AddEditCategoryWizardModule} from './control-panels/wrap-up-categories/add-edit-category-wizard/add-edit-category-wizard.module';
import {AddEditCodeWizardModule} from './control-panels/wrap-up-codes/add-edit-code-wizard/add-edit-code-wizard.module';
import {AddEditReportsWizardModule} from './control-panels/reports/add-edit-reports-wizard/add-edit-reports-wizard.module';
import {AddEditTeamsWizardModule} from './control-panels/teams/add-edit-teams-wizard/add-edit-teams-wizard.module';
import {CcaClickSwallowerModule} from '../core/click-swallower/click-swallower.module';
import {AddEditOpCodeWizardModule} from './control-panels/op-code-mapping/add-edit-opcode-wizard/add-edit-opcode-wizard.module';
import {AddShortPayWizardModule} from './control-panels/short-pay/add-short-pay-wizard/add-short-pay-wizard.module';
import {EditShortPayWizardModule} from './control-panels/short-pay/edit-short-pay-wizard/edit-short-pay-wizard.module';
import {AddEditPermissionCategoryWizardModule} from './control-panels/permission-categories/add-edit-permission-category-wizard/add-edit-permission-category-wizard.module';
import {AddEditPartnerWizardModule} from './control-panels/vms-partners/add-edit-partner-wizard/add-edit-partner-wizard.module';

@NgModule({
  imports: [
    RouterModule.forChild(controlPanelRoutes),
    CsCoreTableModule,
    CcaCoreModule,
    CcaCaseWorkspaceModule,
    CcaClickSwallowerModule,
    AddEditQueueWizardModule,
    AddEditCategoryWizardModule,
    AddEditCodeWizardModule,
    AddEditPermissionCategoryWizardModule,
    AddEditCodeWizardModule,
    AddEditPartnerWizardModule,
    AddEditReportsWizardModule,
    AddEditGCRequestWizardModule,
    AddEditGCResponseWizardModule,
    AddEditTeamsWizardModule,
    AddEditOpCodeWizardModule,
    AddShortPayWizardModule,
    EditShortPayWizardModule
  ],
  declarations: [
    UserCardComponent,
    RolesCardComponent,
    ModalPanelComponent,
    ModalPanelGroupComponent,
    AuthPermissionsComponent,
    CreateUserFormPageComponent,
    ControlPanelComponent,
    GroupsComponent,
    PermissionCategoriesComponent,
    PermissionsComponent,
    RolesComponent,
    TeamsComponent,
    UsersComponent,
    FeaturesComponent,
    OpCodeMappingComponent,
    QueuesComponent,
    WrapUpCategoriesComponent,
    WrapUpCodesComponent,
    BalanceAdjustmentLimitsComponent,
    ShortPayComponent,
    ReportsComponent,
    VmsPartnersComponent,
    VmsProductTypesComponent,
    LiveTroubleshootingComponent,
    GreencardRequestMappingComponent,
    GreencardResponseMappingComponent,
    UserCardComponent,
    RolesCardComponent,
    ModalPanelComponent,
    ModalPanelGroupComponent,
    AuthPermissionsComponent,
    CreateGroupFormPageComponent,
    EditGroupPageComponent,
    EditGroupOwnersPageComponent,
    EditGroupRolesPageComponent,
    EditGroupPermissionsPageComponent,
    CreateRoleFormPageComponent,
    EditRolePageComponent,
    EditRoleMembersPageComponent,
    EditRolePermissionsPageComponent,
    EditRoleAdministratorsPageComponent,
    MemberCardComponent,
    AdminCardComponent,
    EditPermissionPageComponent,
    EditPermissionGroupsPageComponent,
    EditPermissionRolesPageComponent,
    PermissionGroupCardComponent,
    AdminCardComponent,
    EditUserPageComponent,
    EditUserRolePageComponent,
    EditUserOwnerPageComponent,
    GroupCardComponent,
    UserRoleCardComponent,
    PermissionRoleCardComponent,
    EditPropertiesFormPageComponent,
    EditPropertiesConfirmationPageComponent,
    EditPropertiesResultsPageComponent,
    CorePropertiesComponent
  ],
  entryComponents: [
    CreateGroupFormPageComponent,
    EditGroupPageComponent,
    EditGroupOwnersPageComponent,
    EditGroupRolesPageComponent,
    EditGroupPermissionsPageComponent,
    EditPropertiesFormPageComponent,
    EditPropertiesConfirmationPageComponent,
    EditPropertiesResultsPageComponent,
    CreateUserFormPageComponent,
    CreateRoleFormPageComponent,
    EditRolePageComponent,
    EditRoleMembersPageComponent,
    EditRolePermissionsPageComponent,
    EditRoleAdministratorsPageComponent,
    EditPermissionPageComponent,
    EditPermissionGroupsPageComponent,
    EditPermissionRolesPageComponent,
    EditRoleAdministratorsPageComponent,
    EditUserPageComponent,
    EditUserOwnerPageComponent,
    EditUserRolePageComponent
  ]
})
export class CcaControlPanelModule {
}
