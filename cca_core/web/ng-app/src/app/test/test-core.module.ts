import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { CcaPipesModule } from 'src/app/core/pipes/cca-pipes.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CcaSpinnerModule } from '../core/spinner/cca-spinner.module';
import { CcaMaterialModule } from '../core/material/cca-material.module';
import { CcaUserChipModule } from '../core/user/user-chip/user-chip.module';
import { DatePipe } from '@angular/common';
import { CcaPanelModule } from '../core/panel/panel.module';
import { CcaStatusModule } from '../core/status/status.module';
import { CsCoreTableModule } from '@cscore/components';

@NgModule ( {
  declarations: [],
  exports: [
    CcaFormsModule,
    CcaKeyValueModule,
    CcaMaterialModule,
    CcaPanelModule,
    CcaPipesModule,
    CcaSpinnerModule,
    CcaStatusModule,
    CcaUserChipModule,
    CsCoreTableModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  imports: [
    CcaFormsModule,
    CcaKeyValueModule,
    CcaMaterialModule,
    CcaPanelModule,
    CcaPipesModule,
    CcaSpinnerModule,
    CcaStatusModule,
    CcaUserChipModule,
    CsCoreTableModule,
    FontAwesomeModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    RouterTestingModule.withRoutes ( [] ),
    StoreModule.forRoot ( {} ),
  ],
  providers: [
    DatePipe,
  ],
} )
export class TestCoreModule {
}
