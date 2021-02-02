import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AddDocumentActionConfirmationPageComponent} from './add-document-action-confirmation-page/add-document-action-confirmation-page.component';
import {AddDocumentActionFormPageComponent} from './add-document-action-form-page/add-document-action-form-page.component';
import {AddDocumentActionResultPageComponent} from './add-document-action-result-page/add-document-action-result-page.component';
import {CcaKeyValueModule} from "../../../../core/key-value/key-value.module";
import {CcaAddressModule} from "../../../../core/address/address.module";
import {CcaButtonsModule} from "../../../../core/buttons/buttons.module";
import {CcaFormsModule} from "../../../../core/form/forms.module";
import {CcaMaterialModule} from "../../../../core/material/cca-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CcaMaterialModule,
    CcaKeyValueModule,
    CcaAddressModule,
    CcaButtonsModule,
    CcaFormsModule
  ],
  declarations: [
    AddDocumentActionConfirmationPageComponent,
    AddDocumentActionFormPageComponent,
    AddDocumentActionResultPageComponent
  ],
  entryComponents: [
    AddDocumentActionConfirmationPageComponent,
    AddDocumentActionFormPageComponent,
    AddDocumentActionResultPageComponent
  ],
  providers: []
})
export class AddDocumentActionWizardModule {
}
