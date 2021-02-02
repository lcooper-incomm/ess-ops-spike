import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActionToolbarButtonStatus } from '../action-toolbar-button-status';

@Component ( {
  selector: 'cca-action-toolbar-button',
  templateUrl: './action-toolbar-button.component.html',
  styleUrls: [ './action-toolbar-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class ActionToolbarButtonComponent {

  @Input ()
  action: ActionToolbarButtonStatus;

  constructor () {
  }
}
