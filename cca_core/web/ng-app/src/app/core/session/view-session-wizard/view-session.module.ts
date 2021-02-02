import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSessionPageComponent } from './view-session-page/view-session-page.component';
import { CcaSessionSummaryModule } from '../session-panel/session-summary/session-summary.module';
import { CcaSessionCommentsModule } from '../session-panel/session-comments/session-comments.module';
import { CcaSessionComponentsModule } from '../session-components/session-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';

@NgModule ( {
  declarations: [ ViewSessionPageComponent ],
  entryComponents: [ ViewSessionPageComponent ],
  imports: [
    CcaSessionCommentsModule,
    CcaSessionComponentsModule,
    CcaSessionSummaryModule,
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
  ]
} )
export class CcaViewSessionModule {
}
