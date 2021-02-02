import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CcaClickSwallowerModule } from '../../click-swallower/click-swallower.module';
import { CcaSpinnerModule } from '../../spinner/cca-spinner.module';
import { UnmaskablePanComponent } from './unmaskable-pan.component';

@NgModule ( {
  declarations: [
    UnmaskablePanComponent,
  ],
  exports: [
    UnmaskablePanComponent,
  ],
  imports: [
    CcaClickSwallowerModule,
    CcaSpinnerModule,
    CommonModule,
    FontAwesomeModule,
    FlexLayoutModule,
  ]
} )
export class CcaUnmaskablePanModule {
}
