export enum DeliveryMethodCode {
  EMAIL = 'EMAIL',
  FAX   = 'FAX',
  MAIL  = 'MAIL'
}

export interface DeliveryMethod {
  code: DeliveryMethodCode;
  displayValue: string;
}
