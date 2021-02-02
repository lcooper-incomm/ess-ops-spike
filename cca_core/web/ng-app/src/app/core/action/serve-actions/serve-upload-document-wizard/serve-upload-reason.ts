export interface ServeUploadReason {
  description: string;
  reasonCode: string;
  fileType: ServeUploadReasonFileType;
}

export enum ServeUploadReasonFileType {
  STATE_DRIVERS_LICENSE = 'STATE_DRIVERS_LICENSE',
  STATE_ID_CARD         = 'STATE_ID_CARD',
  SSN_CARD              = 'SSN_CARD',
  BANK_STATEMENT        = 'BANK_STATEMENT',
  CREDIT_CARD_STMT      = 'CREDIT_CARD_STMT',
  DEBIT_CREDIT_CARD     = 'DEBIT_CREDIT_CARD',
  US_PASSPORT           = 'US_PASSPORT',
  NON_US_PASSPORT       = 'NON_US_PASSPORT',
  PASSPORT_CARDS        = 'PASSPORT_CARDS',
  OTHER_GOVT_ID_CARDS   = 'OTHER_GOVT_ID_CARDS',
  PERSONAL_IMAGE        = 'PERSONAL_IMAGE',
  UNACCEPTABLE_DARK     = 'UNACCEPTABLE_DARK',
  UNACCEPTABLE_LIGHT    = 'UNACCEPTABLE_LIGHT',
  UNACCEPTABLE_OTHR     = 'UNACCEPTABLE_OTHR',
  UNKNOWN               = 'UNKNOWN',
  DOC_TYPE_OTHER        = 'DOC_TYPE_OTHER'

}
