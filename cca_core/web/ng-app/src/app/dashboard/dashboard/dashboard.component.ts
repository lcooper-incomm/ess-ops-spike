import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../core/cca-base-component";

@Component ( {
  selector: 'cca-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
} )
export class DashboardComponent extends CcaBaseComponent implements OnInit {

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
