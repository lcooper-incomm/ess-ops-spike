import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReceiptComponent } from '../../model/receipt-component';
import { padLeft, truncate } from '../../../utils/string-utils';
import { ReceiptComponentCard } from '../../model/receipt-component-card';

@Component ( {
  selector: 'cca-receipt-session-component',
  templateUrl: './receipt-session-component.component.html',
  styleUrls: [ './receipt-session-component.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ReceiptSessionComponentComponent {
  @Input () component: ReceiptComponent;

  tooltipText: string;

  getTooltipText ( card: ReceiptComponentCard ): void {
    const lines      = [
      `${padLeft ( 'Last Four', 12 )}${truncate ( card.van, 30 )}`,
      `${padLeft ( 'Serial Number', 12 )}${truncate ( card.serialNumber, 30 )}`,
      `${padLeft ( 'Package VAN', 12 )}${truncate ( card.packageVan, 30 )}`,
      `${padLeft ( 'Product Type', 12 )}${truncate ( card.productType, 30 )}`,
      `${padLeft ( 'Initial Load', 12 )}${truncate ( card.initialLoadAmount && card.initialLoadAmount.displayValue || '', 30 )}`,
    ];
    this.tooltipText = lines.join ( '\n' );
  }
}
