import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomerComponent } from '../../model/customer-component';

@Component ( {
  selector: 'cca-customer-session-component',
  templateUrl: './customer-session-component.component.html',
  styleUrls: [ './customer-session-component.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class CustomerSessionComponentComponent {
  @Input () component: CustomerComponent;
}
