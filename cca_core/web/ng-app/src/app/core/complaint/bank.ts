import { User } from "../user/user";
import { CsCoreTimestamp } from "@cscore/core-client-model";

export enum BankType {
  AMERICAN_EXPRESS = 'AMERICAN_EXPRESS',
  BANCORP          = 'BANCORP',
  MASTERCARD       = 'MASTERCARD',
  METABANK         = 'METABANK',
}

export class Bank {
  id: number;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  deletedBy: User;
  deletedDate: CsCoreTimestamp;
  displayValue: string;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  systemValue: BankType;

  complaintCategories: ComplaintOption[]          = [];
  complaintCauses: ComplaintOption[]              = [];
  complaintDepartments: ComplaintOption[]         = [];
  complaintDiscriminationTypes: ComplaintOption[] = [];
  complaintSources: ComplaintOption[]             = [];
  complaintTypes: ComplaintOption[]               = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.complaintCategories          = [];
      this.complaintCauses              = [];
      this.complaintDepartments         = [];
      this.complaintDiscriminationTypes = [];
      this.complaintSources             = [];
      this.complaintTypes               = [];

      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.deletedBy ) {
        this.deletedBy = new User ( data.deletedBy );
      }
      if ( data.deletedDate ) {
        this.deletedDate = new CsCoreTimestamp ( data.deletedDate );
      }
      if ( data.modifiedBy ) {
        this.modifiedBy = new User ( data.modifiedBy );
      }
      if ( data.modifiedDate ) {
        this.modifiedDate = new CsCoreTimestamp ( data.modifiedDate );
      }
      if ( data.systemValue ) {
        this.systemValue = BankType[ <string>data.systemValue ];
      }
      if ( data.complaintCategories ) {
        data.complaintCategories.forEach ( ( value: any ) => this.complaintCategories.push ( new ComplaintOption ( value ) ) );
      }
      if ( data.complaintCauses ) {
        data.complaintCauses.forEach ( ( value: any ) => this.complaintCauses.push ( new ComplaintOption ( value ) ) );
      }
      if ( data.complaintDepartments ) {
        data.complaintDepartments.forEach ( ( value: any ) => this.complaintDepartments.push ( new ComplaintOption ( value ) ) );
      }
      if ( data.complaintDiscriminationTypes ) {
        data.complaintDiscriminationTypes.forEach ( ( value: any ) => this.complaintDiscriminationTypes.push ( new ComplaintOption ( value ) ) );
      }
      if ( data.complaintSources ) {
        data.complaintSources.forEach ( ( value: any ) => this.complaintSources.push ( new ComplaintOption ( value ) ) );
      }
      if ( data.complaintTypes ) {
        data.complaintTypes.forEach ( ( value: any ) => this.complaintTypes.push ( new ComplaintOption ( value ) ) );
      }
    }
  }

  flatten (): FlatBank {
    return new FlatBank ( {
      id: this.id,
      displayValue: this.displayValue,
      systemValue: this.systemValue
    } );
  }
}

export class FlatBank {
  id: number;
  displayValue: string;
  systemValue: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

}

export class ComplaintOption {
  id: number;
  name: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
