import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Transaction } from "../../../../../../core/transaction/transaction";
import { CcaBaseComponent } from "../../../../../../core/cca-base-component";
import { TransactionService } from "../../../transaction.service";
import { Selection } from "../../../../../../core/session/model/selection";
import { HttpParams } from "@angular/common/http";
import { CsCoreAddressType, CsCoreCodeType } from '@cscore/core-client-model';
import { RequestQueryParam } from "../../../../../../core/routing/request-query-param.enum";
import { IdentifierType } from "../../../../../../core/session/model/identifier-type.enum";
import * as _ from "lodash";
import { SpinnerComponent } from "../../../../../../core/spinner/spinner.component";
import { finalize } from "rxjs/operators";
import { PlatformType } from "../../../../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-transaction-history-customer-detail',
  templateUrl: './transaction-history-customer-detail.component.html',
  styleUrls: [ './transaction-history-customer-detail.component.scss' ]
} )
export class TransactionHistoryCustomerDetailComponent extends CcaBaseComponent implements OnInit {

  AddressType    = CsCoreAddressType;
  CsCoreCodeType = CsCoreCodeType;
  PlatformType   = PlatformType;

  @Input ()
  selection: Selection<any>;
  @Input ()
  transaction: Transaction;

  @ViewChild ( 'detailSpinner' )
  detailSpinner: SpinnerComponent;

  constructor ( private transactionService: TransactionService ) {
    super ();
  }

  ngOnInit () {
    this.getTransactionDetails ();
    this.transaction = _.cloneDeep ( this.transaction );
  }

  getMccCodeDisplayValue (): string {
    let displayValue: string = null;

    if ( this.transaction ) {
      let code = this.transaction.getCodeByType ( CsCoreCodeType.MCC );
      if ( code ) {
        displayValue = `${code.description} (${code.code})`;
      }
    }

    return displayValue;
  }

  getTransactionDetails () {
    this.detailSpinner.start ();
    let businessDate: string = this.transaction.businessDate.value.getTime ().toString ();
    let platform             = this.transaction.platform;
    let requestCode          = this.transaction.request.code;
    let responseCode         = this.transaction.response.code;
    let deliveryChannel      = this.transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).code;

    let params = new HttpParams ()
      .set ( 'businessDate', businessDate )
      .set ( RequestQueryParam.PLATFORM, platform )
      .set ( 'requestCode', requestCode )
      .set ( 'responseCode', responseCode )
      .set ( 'deliveryChannel', deliveryChannel )
      .set ( RequestQueryParam.PARTNER, this.selection.partner.type );

    this.transactionService.getTransactionDetails ( IdentifierType.CUSTOMERID, this.selection.getCustomer ().id, this.transaction.id, params )
      .pipe ( finalize ( () => this.detailSpinner.stop () ) )
      .subscribe ( ( transaction: Transaction ) => {
        this.transaction.settlement          = _.cloneDeep ( transaction.settlement );
        this.transaction.nodes.terminal      = _.cloneDeep ( transaction.nodes.terminal );
        this.transaction.originalTransaction = _.cloneDeep ( transaction.originalTransaction );
        this.transaction.codes               = _.cloneDeep ( transaction.codes );
        this.transaction.request             = _.cloneDeep ( transaction.request );

        if ( this.transaction.nodes.merchant && transaction.nodes.merchant ) {
          this.transaction.nodes.merchant.addresses = _.cloneDeep ( transaction.nodes.merchant.addresses );
        }
      } )
  }
}
