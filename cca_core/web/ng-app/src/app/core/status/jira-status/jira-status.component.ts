import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { IssueStatus } from "../../issue/issue-status";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-jira-status',
  templateUrl: './jira-status.component.html',
  styleUrls: [ './jira-status.component.scss' ]
} )
export class JiraStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: IssueStatus;

  constructor () {
    super ();
  }

  ngOnInit () {
    this.init ();
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    this.init ();
  }

  private init (): void {
    this.setFinalDisplayValue ( this.status.name );
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    switch ( this.status.name ) {
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip (): void {
    this.tooltip = this.status.description;
  }

}
