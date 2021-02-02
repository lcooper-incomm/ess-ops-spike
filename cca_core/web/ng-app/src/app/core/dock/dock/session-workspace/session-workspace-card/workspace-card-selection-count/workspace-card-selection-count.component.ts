import {Component, Input, OnInit} from '@angular/core';
import {SelectionType} from "../../../../../session/model/selection-type.enum";
import {Session} from '../../../../../session/model/session';
import {Selection} from "../../../../../session/model/selection";

@Component ( {
  selector: 'cca-selection-count',
  templateUrl: './workspace-card-selection-count.component.html',
  styleUrls: [ './workspace-card-selection-count.component.scss' ]
} )
export class WorkspaceCardSelectionCountComponent implements OnInit {

  count: number = 0;
  icon: string;
  @Input ()
  session: Session;
  tooltipText: string;
  @Input ()
  type: SelectionType;

  constructor () {
  }

  ngOnInit () {
    this.count = this.session.getSelectionCountOfType ( this.type );
    this.icon  = Selection.getIconName ( this.type );

    switch ( this.type ) {
      case SelectionType.ACCOUNT:
        this.tooltipText = this.count + ' Account Selections';
        break;
      case SelectionType.CUSTOMER:
        this.tooltipText = this.count + ' Customer Selections';
        break;
      case SelectionType.CUSTOMER_ACCOUNT:
        this.tooltipText = this.count + ' Customer Account Selections';
        break;
      case SelectionType.LOCATION:
        this.tooltipText = this.count + ' Location Selections';
        break;
      case SelectionType.ORDER:
        this.tooltipText = this.count + ' Order Selections';
        break;
      case SelectionType.CARD:
        this.tooltipText = this.count + ' Card Selections';
        break;
      default:
        this.tooltipText = this.count + ' Other Selections';
        break;
    }
  }

}
