import { Node } from "./node";
import { CsCorePhoneNumber, CsCoreTimestamp } from "@cscore/core-client-model";
import { CsCoreContact } from "../model/cs-core-contact";
import { ProductClassification } from "./product-classification";

export class Merchant extends Node {

  businessUnitId: string;
  country: string;
  createdDate: CsCoreTimestamp;
  description: string;
  emailAddress: string;
  federalEmployerNumber: string;
  parentId: string;
  serialNumberLength: number;
  terminalPrefix: string;

  contacts: CsCoreContact[]                       = [];
  phoneNumbers: CsCorePhoneNumber[]               = [];
  productClassifications: ProductClassification[] = [];

  constructor ( data: any ) {
    super ( data );
    this.contacts               = [];
    this.phoneNumbers           = [];
    this.productClassifications = [];

    if ( data.createdDate ) {
      this.createdDate = new CsCoreTimestamp ( data.createdDate );
    }
    if ( data.contacts ) {
      data.contacts.forEach ( contact => this.contacts.push ( new CsCoreContact ( contact ) ) );
    }
    if ( data.phoneNumbers ) {
      data.phoneNumbers.forEach ( phoneNumber => this.phoneNumbers.push ( new CsCorePhoneNumber ( phoneNumber ) ) );
    }
    if ( data.productClassifications ) {
      data.productClassifications.forEach ( classification => this.productClassifications.push ( new ProductClassification ( classification ) ) );
    }
  }

}
