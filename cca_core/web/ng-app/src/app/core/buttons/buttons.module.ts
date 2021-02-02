import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CcaSpinnerModule} from '../spinner/cca-spinner.module';
import {MatButtonModule} from '@angular/material';
import {ConfirmableButtonComponent} from './confirmable-button/confirmable-button.component';
import {IconButtonComponent} from './icon-button/icon-button.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule ( {
  declarations: [
    ConfirmableButtonComponent,
    IconButtonComponent,
  ],
  exports: [
    ConfirmableButtonComponent,
    IconButtonComponent
  ],
  imports: [
    CcaSpinnerModule,
    CommonModule,
    MatButtonModule,
    FontAwesomeModule
  ]
} )
export class CcaButtonsModule {
}
