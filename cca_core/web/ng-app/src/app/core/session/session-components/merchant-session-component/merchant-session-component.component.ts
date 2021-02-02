import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MerchantComponent } from '../../model/merchant-component';

@Component ( {
  selector: 'cca-merchant-session-component',
  templateUrl: './merchant-session-component.component.html',
  styleUrls: [ './merchant-session-component.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class MerchantSessionComponentComponent {
  @Input () component: MerchantComponent;
}
