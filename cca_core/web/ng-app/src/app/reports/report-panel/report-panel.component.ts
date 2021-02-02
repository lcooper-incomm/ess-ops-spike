import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardPanelComponent } from "../../core/panel/card-panel/card-panel.component";

@Component ( {
  selector: 'cca-report-panel',
  templateUrl: './report-panel.component.html',
  styleUrls: [ './report-panel.component.scss' ]
} )
export class ReportPanelComponent extends CardPanelComponent implements OnInit {
  @Output () report = new EventEmitter ( true );

  constructor () {
    super ();
  }

  ngOnInit () {
  }

  openReportInNewTab () {
    this.report.emit ();
  }
}
