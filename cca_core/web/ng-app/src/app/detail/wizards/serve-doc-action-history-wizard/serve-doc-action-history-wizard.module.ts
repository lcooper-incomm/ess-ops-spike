import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CsCoreTableModule} from '@cscore/components';
import {CcaMaterialModule} from '../../../core/material/cca-material.module';
import {ServeDocActionHistoryFormPageComponent} from './serve-doc-action-history-form-page/serve-doc-action-history-form-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CcaMaterialModule,
    CsCoreTableModule
  ],
  declarations: [
    ServeDocActionHistoryFormPageComponent
  ],
  entryComponents: [
    ServeDocActionHistoryFormPageComponent
  ],
  providers: []
})
export class ServeSendFormsWizardModule {
}
