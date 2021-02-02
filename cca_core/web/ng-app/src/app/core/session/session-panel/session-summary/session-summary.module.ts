import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionSumaryComponent } from './session-sumary/session-sumary.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CcaUserChipModule } from '../../../user/user-chip/user-chip.module';
import { CcaStatusModule } from '../../../status/status.module';

@NgModule ( {
  declarations: [ SessionSumaryComponent ],
  imports: [
    CcaKeyValueModule,
    CcaStatusModule,
    CcaUserChipModule,
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  exports: [ SessionSumaryComponent ]
} )
export class CcaSessionSummaryModule {
}
