import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RefundRequestComponent } from '../../model/refund-request-component';

@Component ( {
  selector: 'cca-refund-request-session-component',
  templateUrl: './refund-request-session-component.component.html',
  styleUrls: [ './refund-request-session-component.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class RefundRequestSessionComponentComponent {
  @Input () component: RefundRequestComponent;
}
