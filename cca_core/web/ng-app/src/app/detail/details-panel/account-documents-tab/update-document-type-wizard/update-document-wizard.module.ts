import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CcaMaterialModule} from '../../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../../core/key-value/key-value.module';
import {CcaAddressModule} from '../../../../core/address/address.module';
import {CcaButtonsModule} from '../../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../../core/form/forms.module';
import {UpdateDocumentConfirmationPageComponent} from './update-document-confirmation-page/update-document-confirmation-page.component';
import {UpdateDocumentFormPageComponent} from './update-document-form-page/update-document-form-page.component';
import {UpdateDocumentResultPageComponent} from './update-document-result-page/update-document-result-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CcaMaterialModule,
    CcaKeyValueModule,
    CcaAddressModule,
    CcaButtonsModule,
    CcaFormsModule
  ],
  declarations: [
    UpdateDocumentConfirmationPageComponent,
    UpdateDocumentFormPageComponent,
    UpdateDocumentResultPageComponent
  ],
  entryComponents: [
    UpdateDocumentConfirmationPageComponent,
    UpdateDocumentFormPageComponent,
    UpdateDocumentResultPageComponent
  ],
  providers: []
})
export class UpdateDocumentWizardModule {
}
