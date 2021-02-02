import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CsCoreCurrency } from "@cscore/gringotts";

@Component ( {
  selector: 'cca-amount-card',
  templateUrl: './amount-card.component.html',
  styleUrls: [ './amount-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AmountCardComponent {
  @Input () amount: CsCoreCurrency;
  @Input () label: string;
}
