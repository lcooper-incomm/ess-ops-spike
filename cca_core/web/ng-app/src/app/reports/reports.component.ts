import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReportService} from "./report.service";
import {Store} from "@ngrx/store";
import {AppState} from "../app-state";
import {CcaBaseComponent} from "../core/cca-base-component";
import {LoadReportsAction} from "./action/load-reports-action";
import {Report} from "./report";

@Component ( {
  selector: 'cca-report',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.scss' ]
} )

export class ReportsComponent extends CcaBaseComponent implements OnInit {
  reportId: string;
  reports: Report[] = [];

  @ViewChild ( 'report' ) public viewElement: ElementRef;

  constructor (private renderer: Renderer2,
               private reportService: ReportService,
               private route: ActivatedRoute,
               private store: Store<AppState>) {
    super ();
  }

  ngOnInit () {
    this.loadReportTypes ();
  }

  private loadReportTypes (): void {
    this.reportService.findAllForCurrentUser ()
      .subscribe ( ( reports: Report[] ) => {
        this.store.dispatch ( new LoadReportsAction ( reports ) );
      } );
  }

}
