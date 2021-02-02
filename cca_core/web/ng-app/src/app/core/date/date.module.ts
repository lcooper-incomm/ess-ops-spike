import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePresetsComponent } from './date-range-presets/date-range-presets.component';
import { MatButtonModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DateRangePresetsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  exports: [DateRangePresetsComponent]
})
export class CcaDateModule {
}
