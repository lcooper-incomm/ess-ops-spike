import { CsCoreAddress, CsCorePhoneNumber } from "@cscore/core-client-model";
import { ChallengeInfo } from "../../../core/action/vms-actions/models/vms-request-models";

export class OrderCardRequestModels {
}

export class OrderCardRequest {
  productCode: string;
  productType: string;
  accountHolder: AccountHolder;
  challengeInfo: ChallengeInfo;
}

export class AccountHolder {
  addresses: CsCoreAddress[];
  dateOfBirth: string;
  dob: string;
  email: string;
  firstName: string;
  identification: CardIdentificationData;
  lastName: string;
  mothersMaidenName;
  phoneNumbers: CsCorePhoneNumber[];

  constructor () {

  }
}

export class CardIdentificationData {
  number: string;
  type: string;
  issuedBy: string;
  issuanceDate: string;
  expirationDate: string;
}
