import { Component, OnInit } from '@angular/core';
import { AbstractDetailSummaryComponent } from "../abstract-detail-summary/abstract-detail-summary.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { SelectionType } from "../../../core/session/model/selection-type.enum";
import { PlatformType } from "../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-horizontal-detail-summary',
  templateUrl: './horizontal-detail-summary.component.html',
  styleUrls: [ './horizontal-detail-summary.component.scss' ]
} )
export class HorizontalDetailSummaryComponent extends AbstractDetailSummaryComponent implements OnInit {

  PlatformType  = PlatformType;
  SelectionType = SelectionType;

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
