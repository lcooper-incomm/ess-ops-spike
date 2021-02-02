import { IdentifierType } from 'src/app/core/session/model/identifier-type.enum';

export type RequestActionType = 'act' | 'deact' | 'return';

export abstract class ApsRequest {
  requestAction: RequestActionType;
  comment: string;
  identifier: string;
  identifierType: IdentifierType;
  locationName: string;
  merchantName: string;
  note: string;
  overrideMerchant: boolean;
  terminalNumber: string;

  constructor ( data: any ) {
    Object.assign ( this, data );
  }
}

export class ActivateFastcardRequest extends ApsRequest {
  amount: string;

  constructor ( data: any ) {
    super(data);
    this.amount = data.amount;
    this.note   = data.note;

    if (!data.requestAction) {
      this.requestAction = 'act';
    }
  }
}

export class DeactivateFastcardRequest extends ApsRequest {

  constructor ( data: any ) {
    super ( data );

    if (!data.requestAction) {
      this.requestAction = 'deact';
    }
  }
}
