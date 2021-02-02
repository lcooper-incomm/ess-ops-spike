import { Component, Input, OnInit } from '@angular/core';
import { DisputeComponent } from "../../../model/dispute-component";

@Component ( {
  selector: 'cca-dispute-session-component-form',
  templateUrl: './dispute-session-component-form.component.html',
  styleUrls: [ './dispute-session-component-form.component.scss' ]
} )
export class DisputeSessionComponentFormComponent implements OnInit {

  @Input ()
  disputeComponent: DisputeComponent;

  constructor () {
  }

  ngOnInit () {
  }

}
