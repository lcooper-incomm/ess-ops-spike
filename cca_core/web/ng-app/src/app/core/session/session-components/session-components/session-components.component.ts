import { Component, Input } from '@angular/core';
import { Session } from '../../model/session';

@Component ( {
  selector: 'cca-session-components',
  templateUrl: './session-components.component.html',
  styleUrls: [ './session-components.component.scss' ]
} )
export class SessionComponentsComponent {
  @Input () session: Session;
  @Input () stackedView: boolean = false;
}
