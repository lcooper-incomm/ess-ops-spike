import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateFastcardFormPageComponent } from './activate-fastcard/activate-fastcard-form-page/activate-fastcard-form-page.component';
import { ActivateFastcardConfirmationPageComponent } from './activate-fastcard/activate-fastcard-confirmation-page/activate-fastcard-confirmation-page.component';
import { DeactivateFastcardConfirmationPageComponent } from './deactivate-fastcard/deactivate-fastcard-confirmation-page/deactivate-fastcard-confirmation-page.component';
import { DeactivateFastcardFormPageComponent } from './deactivate-fastcard/deactivate-fastcard-form-page/deactivate-fastcard-form-page.component';
import { FastcardSuccessPageComponent } from './fastcard-success-page/fastcard-success-page.component';
import { ApsService } from './aps/aps.service';
import { DeactivationService } from './deactivate-fastcard/deactivation.service';
import { CcaCoreModule } from 'src/app/core/cca-core.module';
import { DeactivationLocationsComponent } from './deactivate-fastcard/deactivation-locations/deactivation-locations.component';
import { FastcardFailurePageComponent } from './fastcard-failure-page/fastcard-failure-page.component';
import { DeactivateFastcardResultPageComponent } from './deactivate-fastcard/deactivate-fastcard-result-page/deactivate-fastcard-result-page.component';

@NgModule ( {
  imports: [
    CommonModule,
    CcaCoreModule,
  ],
  declarations: [
    ActivateFastcardConfirmationPageComponent,
    ActivateFastcardFormPageComponent,
    DeactivateFastcardConfirmationPageComponent,
    DeactivateFastcardFormPageComponent,
    DeactivationLocationsComponent,
    FastcardFailurePageComponent,
    FastcardSuccessPageComponent,
    DeactivateFastcardResultPageComponent,
  ],
  entryComponents: [
    ActivateFastcardConfirmationPageComponent,
    ActivateFastcardFormPageComponent,
    DeactivateFastcardConfirmationPageComponent,
    DeactivateFastcardFormPageComponent,
    DeactivateFastcardResultPageComponent,
    FastcardFailurePageComponent,
    FastcardSuccessPageComponent,
  ],
  providers: [
    ApsService,
    DeactivationService,
  ],
} )
export class FastcardActivationModule {
}
