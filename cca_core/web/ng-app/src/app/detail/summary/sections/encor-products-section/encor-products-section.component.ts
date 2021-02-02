import {Component, HostBinding, Input} from '@angular/core';
import {MaplesCustomer} from '@cscore/maples-client-model';
import {Selection} from '../../../../core/session/model/selection';

@Component({
  selector: 'cca-encor-products-section',
  templateUrl: './encor-products-section.component.html'
})
export class EncorProductsSectionComponent {

  @HostBinding('class') classes: string = 'summary-section-container';

  @Input()
  selection: Selection<MaplesCustomer>;

  getProducts(): string {
    if (this.selection && this.selection.getMaplesCustomer().products) {
      let products: string;
      for (let product of this.selection.getMaplesCustomer().products) {
        products = (products) ? products + ', ' + product.value : product.value;
      }
      return products;
    } else {
      return null;
    }
  }

  getTiers(): string {
    if (this.selection && this.selection.getMaplesCustomer().tiers) {
      let tiers: string;
      for (let tier of this.selection.getMaplesCustomer().tiers) {
        tiers = (tiers) ? tiers + ', ' + tier.value : tier.value;
      }
      return tiers;
    } else {
      return null;
    }
  }
}
