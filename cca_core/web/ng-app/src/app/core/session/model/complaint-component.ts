import { Bank } from "../../complaint/bank";
import { ComplaintOption } from "../../complaint/bank";
import { User } from "../../user/user";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { FlatIdentifier, Identifier } from "./identifier";
import { Session } from "./session";
import {ComplaintPriority} from "./complaint-priority";

export class ComplaintComponent {
  id: number;
  accountNumber: string;
  bank: Bank;
  category: ComplaintOption;
  cause: ComplaintOption;
  compensation: string;
  complaint: string;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  department: ComplaintOption;
  discriminationType: ComplaintOption;
  enhancementsNeeded: string;
  firstName: string;
  identifier: Identifier;
  isRegulatory: boolean = false;
  isVerbal: boolean     = true;
  isWritten: boolean    = false;
  lastName: string;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  postalCode: string;
  priority: ComplaintPriority;
  productName: string;
  resolution: string;
  resolutionDate: CsCoreTimestamp;
  session: Session;
  source: ComplaintOption;
  summary: string;
  type: ComplaintOption;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.bank ) {
        this.bank = new Bank ( data.bank );
      }
      if ( data.category ) {
        this.category = new ComplaintOption ( data.category );
      }
      if ( data.cause ) {
        this.cause = new ComplaintOption ( data.cause );
      }
      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.department ) {
        this.department = new ComplaintOption ( data.department );
      }
      if ( data.discriminationType ) {
        this.discriminationType = new ComplaintOption ( data.discriminationType );
      }
      if ( data.identifier ) {
        this.identifier = new Identifier ( data.identifier );
      }
      if ( data.modifiedBy ) {
        this.modifiedBy = new User ( data.modifiedBy );
      }
      if ( data.modifiedDate ) {
        this.modifiedDate = new CsCoreTimestamp ( data.modifiedDate );
      }
      if ( data.source ) {
        this.source = new ComplaintOption ( data.source );
      }
      if ( data.type ) {
        this.type = new ComplaintOption ( data.type );
      }
      if ( data.resolutionDate ) {
        this.resolutionDate = new CsCoreTimestamp ( data.resolutionDate );
      }
    }
  }

  flatten (): FlatComplaintComponent {
    return new FlatComplaintComponent ( {
      id: this.id,
      accountNumber: this.accountNumber,
      bank: this.bank ? this.bank.flatten () : null,
      category: this.category,
      cause: this.cause,
      compensation: this.compensation,
      complaint: this.complaint,
      department: this.department,
      discriminationType: this.discriminationType,
      enhancementsNeeded: this.enhancementsNeeded,
      firstName: this.firstName,
      identifier: this.identifier ? this.identifier.flatten () : null,
      isRegulatory: this.isRegulatory,
      isVerbal: this.isVerbal,
      isWritten: this.isWritten,
      lastName: this.lastName,
      postalCode: this.postalCode,
      priority: ComplaintPriority,
      productName: this.productName,
      resolution: this.resolution,
      resolutionDate: this.resolutionDate,
      source: this.source,
      summary: this.summary,
      type: this.type,
    } );
  }
}

export class FlatComplaintComponent {
  id: number;
  accountNumber: string;
  bank: Bank;
  category: ComplaintOption;
  cause: ComplaintOption;
  compensation: string;
  complaint: string;
  department: ComplaintOption;
  discriminationType: ComplaintOption;
  enhancementsNeeded: string;
  firstName: string;
  identifier: FlatIdentifier;
  isRegulatory: boolean = false;
  isVerbal: boolean     = true;
  isWritten: boolean    = false;
  lastName: string;
  postalCode: string;
  priority: ComplaintPriority;
  productName: string;
  resolution: string;
  resolutionDate: CsCoreTimestamp;
  source: ComplaintOption;
  summary: string;
  type: ComplaintOption;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
