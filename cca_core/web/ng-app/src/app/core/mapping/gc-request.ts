import {TransactionType} from '../transaction/transaction-type.enum';

export class GCRequest {
  id: number;
  x95Code: string;
  requestCode: string;
  requestValue: string;
  transactionType: TransactionType;

  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
