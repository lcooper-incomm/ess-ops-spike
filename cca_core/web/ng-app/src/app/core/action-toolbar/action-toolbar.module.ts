import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionToolbarButtonComponent } from './action-toolbar-button/action-toolbar-button.component';
import { ActionToolbarComponent } from './action-toolbar/action-toolbar.component';
import { MatButtonModule, MatTooltipModule } from '@angular/material';
import { CcaPipesModule } from '../pipes/cca-pipes.module';
import { CcaSpinnerModule } from '../spinner/cca-spinner.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule ( {
  declarations: [ ActionToolbarButtonComponent, ActionToolbarComponent ],
  imports: [
    CcaPipesModule,
    CcaSpinnerModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [ ActionToolbarButtonComponent, ActionToolbarComponent ]
} )
export class ActionToolbarModule {
}
