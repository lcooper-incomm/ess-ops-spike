import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AreYouSurePageComponent} from './are-you-sure-page/are-you-sure-page.component';
import {CcaMaterialModule} from '../../material/cca-material.module';
import {CcaPanelModule} from '../../panel/panel.module';
import {CcaKeyValueModule} from '../../key-value/key-value.module';
import {CcaButtonsModule} from '../../buttons/buttons.module';
import {CcaFormsModule} from '../../form/forms.module';
import {CcaSpinnerModule} from '../../spinner/cca-spinner.module';
import {CcaStatusModule} from '../../status/status.module';

@NgModule({
  imports: [
    CommonModule,
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
    AreYouSurePageComponent
  ],
  entryComponents: [
    AreYouSurePageComponent,
  ],
  providers: []
})
export class AreYouSureWizardModule {
}
