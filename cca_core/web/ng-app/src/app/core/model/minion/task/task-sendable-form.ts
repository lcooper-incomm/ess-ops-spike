import { Task } from "./task";
import { MinionCardHolder } from "../minion-card-holder";
import { DeliveryMethodCode } from "./delivery-method";

export abstract class TaskSendableForm extends Task {

  cardholder: MinionCardHolder;
  customerId: string;
  deliveryMethod: DeliveryMethodCode;
  email: string;
  fax: string;
  formType: MinionFormType;
  partner: string;
  platform: string;

  protected constructor ( data: any = null ) {
    super ( data );
    if ( data ) {
      Object.assign ( this, data );

      if ( data.cardholder ) {
        this.cardholder = new MinionCardHolder ( data.cardholder );
      }
      if ( data.deliveryMethod ) {
        this.deliveryMethod = DeliveryMethodCode[ <string>data.deliveryMethod ];
      }
      if ( data.formType ) {
        this.formType = MinionFormType[ <string>data.formType ];
      }
    }
  }

}

export enum MinionFormType {
  ACCOUNT_STATEMENT            = 'ACCOUNT_STATEMENT',
  AFFIDAVIT_BASIC              = 'AFFIDAVIT_BASIC',
  DIRECT_DEPOSIT_GPR           = 'DIRECT_DEPOSIT_GPR',
  DIRECT_DEPOSIT_MOMENTUM_VISA = 'DIRECT_DEPOSIT_MOMENTUM_VISA',
  DIRECT_DEPOSIT_MOMENTUM_MC   = 'DIRECT_DEPOSIT_MOMENTUM_MC',
  DIRECT_DEPOSIT_TITANIUM_MC   = 'DIRECT_DEPOSIT_TITANIUM_MC',
  GIFT_CARD_DISPUTE            = 'GIFT_CARD_DISPUTE',
  GPR_CARD_DISPUTE             = 'GPR_CARD_DISPUTE',
  GPR_CANADA_CARD_DISPUTE_EN   = 'GPR_CANADA_CARD_DISPUTE_EN',
  GREENCARD_DISPUTE            = 'GREENCARD_DISPUTE',
  GREENCARD_DISPUTE_ES_CO      = 'GREENCARD_DISPUTE_ES_CO'
}
