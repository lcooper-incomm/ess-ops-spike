import { Component, Input, OnInit } from '@angular/core';

@Component ( {
  selector: 'cca-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: [ './card-panel.component.scss' ]
} )
export class CardPanelComponent implements OnInit {

  @Input ()
  color: string            = 'primary';
  @Input ()
  disableCollapse: boolean = false;
  @Input ()
  header: string;
  @Input ()
  icon: string;
  isCollapsed: boolean     = false;
  @Input ()
  isCollapsible: boolean   = true;
  tooltip: string;

  constructor () {
  }

  ngOnInit () {
    this.setTooltip ();
  }

  toggleCollapsed (): void {
    if ( this.isCollapsible && !this.disableCollapse ) {
      this.isCollapsed = !this.isCollapsed;
      this.setTooltip ();
    }
  }

  private setTooltip (): void {
    if ( this.isCollapsible && !this.disableCollapse ) {
      this.tooltip = this.isCollapsed ? 'Click to Expand' : 'Click to Collapse';
    } else {
      this.tooltip = null;
    }
  }
}
