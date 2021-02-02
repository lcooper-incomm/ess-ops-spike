import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../../model/session';

@Component ( {
  selector: 'cca-session-summary',
  templateUrl: './session-sumary.component.html',
  styleUrls: [ './session-sumary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SessionSumaryComponent {
  @Input () session: Session;
  @Input () sessionIdClickable: boolean         = false;
  @Output () clickSessionId: EventEmitter<void> = new EventEmitter ();
}
