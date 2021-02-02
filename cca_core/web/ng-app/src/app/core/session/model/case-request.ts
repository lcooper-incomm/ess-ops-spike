import { SessionTypeType } from "../session-type-type.enum";
import { FlatCustomerComponent } from "./customer-component";
import { FlatMerchantComponent } from "./merchant-component";
import { FlatReceiptComponent } from "./receipt-component";
import { FlatDisputeComponent } from "./dispute-component";
import { FlatComplaintComponent } from "./complaint-component";
import { WrapUpCode } from "./wrap-up-code";
import {EncorComponent} from './encor-component';

export class CaseRequest {

  comment: string;
  complaintComponent: FlatComplaintComponent;
  customerComponent: FlatCustomerComponent;
  disputeComponent: FlatDisputeComponent;
  encorComponent: EncorComponent;
  merchantComponent: FlatMerchantComponent;
  queueId: number;
  receiptComponent: FlatReceiptComponent;
  sessionType: SessionTypeType;
  sourceSessionId: number;
  wrapUpCategoryId: number;
  wrapUpCodeId: number;
  wrapUpCode: WrapUpCode;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.sessionType ) {
        this.sessionType = SessionTypeType[ <string>data.sessionType ];
      }
      if ( data.complaintComponent ) {
        this.complaintComponent = new FlatComplaintComponent ( data.complaintComponent );
      }
      if ( data.customerComponent ) {
        this.customerComponent = new FlatCustomerComponent ( data.customerComponent );
      }
      if ( data.disputeComponent ) {
        this.disputeComponent = new FlatDisputeComponent ( data.disputeComponent );
      }
      if ( data.encorComponent ) {
        this.encorComponent = new EncorComponent ( data.encorComponent );
      }
      if ( data.merchantComponent ) {
        this.merchantComponent = new FlatMerchantComponent ( data.merchantComponent );
      }
      if ( data.receiptComponent ) {
        this.receiptComponent = new FlatReceiptComponent ( data.receiptComponent );
      }
    }
  }
}
