import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCaseCardPageComponent } from './edit-case-card-page/edit-case-card-page.component';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { CcaStatusModule } from 'src/app/core/status/status.module';
import { CcaUnmaskablePanModule } from 'src/app/core/card/unmaskable-pan/unmaskable-pan.module';
import { CardWorkflowProgressComponent } from './card-workflow-progress/card-workflow-progress.component';
import {
  MatCardModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatButtonModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule ( {
  declarations: [
    EditCaseCardPageComponent,
    CardWorkflowProgressComponent,
  ],
  entryComponents: [ EditCaseCardPageComponent ],
  imports: [
    CcaFormsModule,
    CcaKeyValueModule,
    CcaStatusModule,
    CcaUnmaskablePanModule,
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ]
} )
export class CcaEditCaseCardModule {
}
