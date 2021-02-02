import { UpdateAccountActionType } from "./update-account-action-type.enum";
import { FlatFeePlan } from "../model/fee-plan";
import { Occupation } from "./occupation";
import { Tax } from "./tax";
import { FlatCustomerIdentification } from "./customer-identification";
import { CsCoreAddress, CsCorePhoneNumber } from "@cscore/core-client-model";

export class UpdateAccountRequest {

  accountDetail: UpdateAccountDetail;
  action: UpdateAccountActionType;
  comment: string;
  isExpedited: boolean = false;
  isFeeWaived: boolean = false;
  reason: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.accountDetail ) {
        this.accountDetail = new UpdateAccountDetail ( data.accountDetail );
      }
      if ( data.action ) {
        this.action = UpdateAccountActionType[ <string>data.action ];
      }
    }
  }
}

export enum UpdateAccountReasonType {
  DIVORCE             = '101',
  MARRIAGE            = '103',
  WRONG_DATE_OF_BIRTH = '102'
}

export class UpdateAccountDetail {

  accountHolder: AccountHolder;
  feePlan: FlatFeePlan;
  tokenStatusInfo: TokenStatusInfo;

  constructor ( data: any = null ) {
    if ( data ) {
      if ( data.accountHolder ) {
        this.accountHolder = new AccountHolder ( data.accountHolder );
      }
      if ( data.feePlan ) {
        this.feePlan = new FlatFeePlan ( data.feePlan );
      }
      if ( data.tokenStatusInfo ) {
        this.tokenStatusInfo = new TokenStatusInfo ( data.tokenStatusInfo );
      }
    }
  }
}

export class AccountHolder {

  dateOfBirth: string;
  email: string;
  firstName: string;
  identification: FlatCustomerIdentification;
  lastName: string;
  middleName?: string;
  mothersMaidenName: string;
  occupation?: Occupation;
  tax?: Tax;

  addresses: CsCoreAddress[]        = [];
  phoneNumbers: CsCorePhoneNumber[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.addresses    = [];
      this.phoneNumbers = [];

      if ( data.identification ) {
        this.identification = new FlatCustomerIdentification ( data.identification );
      }
      if ( data.occupation ) {
        this.occupation = new Occupation ( data.occupation );
      }
      if ( data.tax ) {
        this.tax = new Tax ( data.tax );
      }
      if ( data.addresses ) {
        this.addresses = data.addresses.map ( address => new CsCoreAddress ( address ) );
      }
      if ( data.phoneNumbers ) {
        this.phoneNumbers = data.phoneNumbers.map ( phoneNumber => new CsCorePhoneNumber ( phoneNumber ) );
      }
    }
  }
}

export class TokenStatusInfo {

  comment: string;
  status: string;
  token: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
