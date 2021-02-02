import {Component, Input, SimpleChanges} from '@angular/core';
import {MaplesNode, MaplesTransaction} from '@cscore/maples-client-model';
import {Selection} from '../../../../../../core/session/model/selection';
import {CsCoreAddress} from "@cscore/core-client-model";

@Component({
  selector: 'cca-transaction-serve-detail',
  templateUrl: './transaction-serve-detail.component.html',
  styleUrls: ['./transaction-serve-detail.component.scss']
})
export class TransactionServeDetailComponent {

  @Input()
  selection: Selection<any>;
  @Input()
  transaction: MaplesTransaction;
  merchant: MaplesNode;
  merchantAddress: CsCoreAddress;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction']) {
      this.merchantAddress = undefined;
      this.merchant = this.transaction.nodes.find((node) => node.type.toLowerCase() === 'merchant');
      if (this.transaction && this.transaction.nodes && this.merchant
          && this.merchant.addresses && this.merchant.addresses.length > 0) {
        for (let address of this.merchant.addresses) {
          if (address.isPrimary) {
            this.merchantAddress = address;
            break;
          }
        }

        if (!this.merchantAddress) {
          this.merchantAddress = this.merchant.addresses[0];
        }
      }
    }
  }
}
