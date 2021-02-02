import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule ( {
  declarations: [ SpinnerComponent ],
  exports: [ SpinnerComponent ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ]
} )
export class CcaSpinnerModule {
}
