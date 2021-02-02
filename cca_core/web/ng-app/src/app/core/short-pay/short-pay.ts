export class ShortPay {
  id: number;
  merchantId: string;
  merchantName: string;
  locationId: string;
  locationName: string;
  terminalNumber: string;
  terminalId: string;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
