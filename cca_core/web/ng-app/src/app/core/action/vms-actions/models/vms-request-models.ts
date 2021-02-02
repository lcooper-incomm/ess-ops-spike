import { CsCoreTimestamp } from "@cscore/core-client-model";
import { FsapiStatusType } from 'src/app/core/status/fsapi-status/fsapi-status-type.enum';
import { AccountHolder } from 'src/app/core/customer/update-account-request';
import { CsCoreCurrency } from "@cscore/gringotts";
import {ActionReasonCodeMapping} from "../../../mapping/action-reason-code-mapping";

export interface FsapiAdjustBalanceRequest {
  amount: string;
  crdrFlag: string;
  reason: string;
  comment: string;
  accountType: string;
}

export interface VmsReverseFeeRequest {
  comment: string;
  reason: string;
  transaction: VmsReverseFeeTransaction;
}

export interface VmsReverseFeeTransaction {
  transactionId: string;
  deliveryChannelCode: string;
  requestCode: string;
  responseCode: string;
  date: number;
}

export class ModifiedUpdateCardStatusRequest {
  comment: string;    // gets set to a default system message in the Java service
  currentStatus: string;
  effectiveDate: CsCoreTimestamp;
  isVmsGiftCard: boolean;
  panLastFour: string;
  postalCode: string;     // optional field
  value: FsapiStatusType;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.effectiveDate ) {
        this.effectiveDate = new CsCoreTimestamp ( data.effectiveDate );
      }
    }
  }
}

export interface UpdateTransactionRequest {
  comment: string;
  transaction: TransactionInfo;
}

export interface TransactionInfo {
  transactionId: string;
  deliveryChannelCode: string;
  requestCode: string;
  responseCode: string;
  isFraudulent: boolean;
  date: number;
}

export interface VmsReleasePreauthRequest {
  comment: string;
  deliveryChannel: string;
  reason: string;
  requestCode: string;
  responseCode: string;
  transactionDate: number;
  transactionId: string;
}

export interface UpdateDeviceStatusRequest {
  token: string;
  status: ChangeDeviceStatus;
  comment: string;
}

export enum ChangeDeviceStatus {
  DELETE_TOKEN  = 'DELETE TOKEN',
  RESUME_TOKEN  = 'RESUME TOKEN',
  SUSPEND_TOKEN = 'SUSPEND TOKEN',
}

export interface RegisterVmsCardRequest {
  starterCardNumber: string;
  productCode: string;
  productType: string;
  accountHolder: AccountHolder;
  challengeInfo?: ChallengeInfo;
}

export interface ChallengeInfo {
  idoLogyId: string;
  questions: ChallengeQuestion[];
}

export interface ChallengeQuestion {
  id: string;
  type: string;
  question: string;
  answers: ChallengeAnswer[];
}

export interface ChallengeAnswer {
  id: string;
  answer: string;
}

export interface RaiseDisputeRequest {
  deliveryMethod: string;
  comment: string;
  reasonCode: ActionReasonCodeMapping;
  transactions: DisputeDetailTransaction[];
}

export interface DisputeDetailTransaction {
  transactionId: string;
  sourceRefNum: string;
  deliveryChannelCode: string;
  requestCode: string;
  responseCode: string;
  businessDate: number;
  amount?: string;
  merchantName?: string;
  cardNumber?: string;
}

export class DisputeTransaction {

  id: number;
  amount: CsCoreCurrency;
  businessDate: CsCoreTimestamp;
  cardNumber: string;
  deliveryChannelCode: string;
  merchantName: string;
  request: string;
  requestCode: string;
  response: string;
  responseCode: string;
  transactionId: string;
  sourceRefNum: string;
  disputeId: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.amount ) {
        this.amount = new CsCoreCurrency ( data.amount );
      }
      if ( data.businessDate ) {
        this.businessDate = new CsCoreTimestamp ( data.businessDate );
      }
    }
  }
}

export class FlatDisputeTransaction {

  id: number;
  amount: string;
  businessDate: number;
  cardNumber: string;
  deliveryChannelCode: string;
  merchantName: string;
  request: string;
  requestCode: string;
  response: string;
  responseCode: string;
  transactionId: string;
  sourceRefNum: string;
  disputeId: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
