import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickSwallowerDirective } from './click-swallower.directive';

@NgModule ( {
  declarations: [
    ClickSwallowerDirective,
  ],
  exports: [
    ClickSwallowerDirective,
  ],
  imports: [
    CommonModule
  ]
} )
export class CcaClickSwallowerModule {
}
