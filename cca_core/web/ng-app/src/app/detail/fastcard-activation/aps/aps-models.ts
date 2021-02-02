import { IdentifierType } from "src/app/core/session/model/identifier-type.enum";

export enum BillableOption {
  BILLABLE     = 'billable',
  NON_BILLABLE = 'non-billable',
}

export enum CreditingOption {
  ACTIVATING_LOCATION = 'ACTIVATING_LOCATION',
  INCOMM              = 'INCOMM',
}

export interface ApsLocation {
  locationName: string;
  merchantName: string;
  terminalNumber: string;
  merchantId?: string;
  merchantLegacyId?: string;
}

export interface SimpleIdentifier {
  identifierType: IdentifierType;
  identifier: string;
}
