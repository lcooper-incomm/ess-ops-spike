import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatTooltipModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { CcaSpinnerModule } from 'src/app/core/spinner/cca-spinner.module';
import { CcaUserChipModule } from 'src/app/core/user/user-chip/user-chip.module';
import { SessionHistoryItemComponent } from './session-history-item/session-history-item.component';
import { SessionHistoryTabComponent } from './session-history-tab/session-history-tab.component';

@NgModule ( {
  declarations: [
    SessionHistoryTabComponent,
    SessionHistoryItemComponent,
  ],
  imports: [
    CommonModule,
    CcaKeyValueModule,
    CcaSpinnerModule,
    CcaUserChipModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [ SessionHistoryTabComponent ]
} )
export class CcaSessionHistoryModule {
}
