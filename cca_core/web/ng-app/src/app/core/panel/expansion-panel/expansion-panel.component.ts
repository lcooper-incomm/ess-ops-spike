import {Component, Input, OnInit} from '@angular/core';
import {ActionToolbarButtonStatus} from "../../action-toolbar/action-toolbar-button-status";

@Component({
  selector: 'cca-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @Input()
  actions: ActionToolbarButtonStatus[] = [];

  @Input()
  buildingActions: boolean = false;

  @Input()
  collapsedHeight: string = "40px";

  @Input()
  expanded: boolean = true;

  @Input()
  expandedHeight: string = "100%";

  @Input()
  hasActionRow: boolean = true;

  @Input()
  title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
