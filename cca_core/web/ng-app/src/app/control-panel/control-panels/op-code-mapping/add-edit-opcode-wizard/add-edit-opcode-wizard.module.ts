import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CcaMaterialModule} from '../../../../core/material/cca-material.module';
import {CcaPanelModule} from '../../../../core/panel/panel.module';
import {CcaKeyValueModule} from '../../../../core/key-value/key-value.module';
import {CcaButtonsModule} from '../../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../../core/form/forms.module';
import {CcaSpinnerModule} from '../../../../core/spinner/cca-spinner.module';
import {CcaStatusModule} from '../../../../core/status/status.module';
import {AddEditOpCodeFormPageComponent} from './add-edit-opcode-form-page/add-edit-opcode-form-page.component';

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
    AddEditOpCodeFormPageComponent
  ],
  entryComponents: [
    AddEditOpCodeFormPageComponent
  ],
  providers: []
})
export class AddEditOpCodeWizardModule {
}
