import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChipComponent } from './user-chip.component';
import { CcaSpinnerModule } from '../../spinner/cca-spinner.module';
import { MatTooltipModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule ( {
  declarations: [ UserChipComponent ],
  exports: [ UserChipComponent ],
  imports: [
    CcaSpinnerModule,
    CommonModule,
    FontAwesomeModule,
    MatTooltipModule,
  ]
} )
export class CcaUserChipModule {
}
