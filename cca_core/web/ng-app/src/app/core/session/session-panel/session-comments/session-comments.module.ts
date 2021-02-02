import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionCommentsComponent } from './session-comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';
import { CcaSpinnerModule } from 'src/app/core/spinner/cca-spinner.module';
import { CcaPipesModule } from 'src/app/core/pipes/cca-pipes.module';
import { SessionCommentComponent } from './session-comment/session-comment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule ( {
  declarations: [
    SessionCommentComponent,
    SessionCommentsComponent,
  ],
  exports: [
    SessionCommentComponent,
    SessionCommentsComponent,
  ],
  imports: [
    CcaFormsModule,
    CcaPipesModule,
    CcaSpinnerModule,
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
} )
export class CcaSessionCommentsModule {
}
