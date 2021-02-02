import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AddEditQueueFormPageComponent} from './add-edit-queue-form-page/add-edit-queue-form-page.component';
import {CcaMaterialModule} from '../../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../../core/key-value/key-value.module';
import {CcaButtonsModule} from '../../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../../core/form/forms.module';
import {CcaSpinnerModule} from '../../../../core/spinner/cca-spinner.module';
import {CcaStatusModule} from '../../../../core/status/status.module';
import {CcaPanelModule} from '../../../../core/panel/panel.module';
import {AddEditQueueTypesPageComponent} from './add-edit-queue-types-page/add-edit-queue-types-page.component';
import {AddEditQueueCategoriesPageComponent} from './add-edit-queue-categories-page/add-edit-queue-categories-page.component';

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
    AddEditQueueCategoriesPageComponent,
    AddEditQueueFormPageComponent,
    AddEditQueueTypesPageComponent
  ],
  entryComponents: [
    AddEditQueueCategoriesPageComponent,
    AddEditQueueFormPageComponent,
    AddEditQueueTypesPageComponent
  ],
  providers: []
})
export class AddEditQueueWizardModule {
}
