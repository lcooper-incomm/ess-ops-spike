import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from "../../../../../../core/transaction/transaction";
import { CcaBaseComponent } from "../../../../../../core/cca-base-component";
import { Selection } from "../../../../../../core/session/model/selection";
import { PlatformType } from "../../../../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-transaction-history-product-detail',
  templateUrl: './transaction-history-product-detail.component.html',
  styleUrls: [ './transaction-history-product-detail.component.scss' ]
} )
export class TransactionHistoryProductDetailComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  selection: Selection<any>;
  @Input ()
  transaction: Transaction;

  PlatformType = PlatformType;

  constructor () {
    super ();
  }

  ngOnInit (): void {
  }
}




