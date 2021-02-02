import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActionToolbarButtonStatus } from '../action-toolbar-button-status';
import { SpinnerSize } from '../../spinner/spinner-size.enum';

@Component ( {
  selector: 'cca-action-toolbar',
  templateUrl: './action-toolbar.component.html',
  styleUrls: [ './action-toolbar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ActionToolbarComponent {
  SpinnerSize = SpinnerSize;
  
  @Input () actions: ActionToolbarButtonStatus;
  @Input () buildingActions: boolean = false;
}
