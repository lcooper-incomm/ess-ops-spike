import { NgModule } from '@angular/core';
import { CcaCoreModule } from "../core/cca-core.module";
import { ReportsComponent } from './reports.component';
import { ReportPanelComponent } from "./report-panel/report-panel.component";

@NgModule ( {
  imports: [
    CcaCoreModule
  ],
  declarations: [ ReportsComponent, ReportPanelComponent ]
} )
export class CcaReportModule {
}
