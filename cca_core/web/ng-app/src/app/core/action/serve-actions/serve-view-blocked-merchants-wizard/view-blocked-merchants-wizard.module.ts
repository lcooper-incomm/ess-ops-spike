import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CsCoreTableModule} from '@cscore/components';
import {CcaMaterialModule} from '../../../material/cca-material.module';
import {CcaPanelModule} from '../../../panel/panel.module';
import {CcaKeyValueModule} from '../../../key-value/key-value.module';
import {CcaButtonsModule} from '../../../buttons/buttons.module';
import {CcaFormsModule} from '../../../form/forms.module';
import {CcaSpinnerModule} from '../../../spinner/cca-spinner.module';
import {CcaStatusModule} from '../../../status/status.module';
import {ViewBlockedMerchantsComponent} from './view-blocked-merchants/view-blocked-merchants.component';
import {ViewUnblockedMerchantsResultPageComponent} from './view-blocked-merchants-result-page/view-blocked-merchants-result-page.component';
import {ViewBlockedMerchantsConfirmationPageComponent} from './view-blocked-merchants-confirmation-page/view-blocked-merchants-confirmation-page.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CcaClickSwallowerModule} from '../../../click-swallower/click-swallower.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FontAwesomeModule,
    CsCoreTableModule,
    CcaMaterialModule,
    CcaPanelModule,
    CcaKeyValueModule,
    CcaButtonsModule,
    CcaFormsModule,
    CcaSpinnerModule,
    CcaStatusModule,
    CcaClickSwallowerModule
  ],
  declarations: [
    ViewBlockedMerchantsComponent,
    ViewBlockedMerchantsConfirmationPageComponent,
    ViewUnblockedMerchantsResultPageComponent
  ],
  entryComponents: [
    ViewBlockedMerchantsComponent,
    ViewBlockedMerchantsConfirmationPageComponent,
    ViewUnblockedMerchantsResultPageComponent
  ],
  providers: []
})
export class ViewBlockedMerchantsWizardModule {
}
