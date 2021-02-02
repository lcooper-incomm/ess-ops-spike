import { Node } from "./node";

export class Biller extends Node {

  aggregatorCompany: string;
  integrationType: string;
  moneyTransferTerm: string;

  constructor ( data: any ) {
    super ( data );
  }
}
