import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CcaMaterialModule} from '../../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../../core/key-value/key-value.module';
import {CcaButtonsModule} from '../../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../../core/form/forms.module';
import {CcaSpinnerModule} from '../../../../core/spinner/cca-spinner.module';
import {CcaStatusModule} from '../../../../core/status/status.module';
import {CcaPanelModule} from '../../../../core/panel/panel.module';
import {AddEditTeamsFormPageComponent} from './add-edit-teams-form-page/add-edit-teams-form-page.component';
import {AddEditTeamsUserPageComponent} from './add-edit-teams-user-page/add-edit-teams-user-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CcaMaterialModule,
    CcaPanelModule,
    CcaKeyValueModule,
    CcaButtonsModule,
    CcaFormsModule,
    CcaSpinnerModule,
    CcaStatusModule,
    FontAwesomeModule
  ],
  declarations: [
    AddEditTeamsFormPageComponent,
    AddEditTeamsUserPageComponent
  ],
  entryComponents: [
    AddEditTeamsFormPageComponent,
    AddEditTeamsUserPageComponent
  ],
  providers: []
})
export class AddEditTeamsWizardModule {
}
