import { NgModule } from '@angular/core';
import { CcaCoreModule } from "../core/cca-core.module";
import { ProfileComponent } from './profile/profile.component';
import { ProfileUserComponent } from './profile/profile-user/profile-user.component';
import { ProfilePreferencesComponent } from './profile/profile-preferences/profile-preferences.component';
import { ProfileGroupComponent } from './profile/profile-group/profile-group.component';
import { ProfileRolesComponent } from './profile/profile-roles/profile-roles.component';
import { ProfilePermissionsComponent } from './profile/profile-permissions/profile-permissions.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule ( {
  imports: [
    CcaCoreModule
  ],
  declarations: [ ProfileComponent, ProfileUserComponent, ProfilePreferencesComponent, ProfileGroupComponent, ProfileRolesComponent, ProfilePermissionsComponent, TruncatePipe ]
} )
export class CcaProfileModule {
}
