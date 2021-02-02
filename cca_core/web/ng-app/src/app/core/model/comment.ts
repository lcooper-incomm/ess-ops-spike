import { CsCoreTimestamp } from "@cscore/core-client-model";
import { User } from "../user/user";

export class Comment {

  id: number;
  cardNumber: string;
  content: string;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  isGreencardSystemNote: boolean = false;
  isPrivate: boolean             = false;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  system: string                 = 'CCA';

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.modifiedBy ) {
        this.modifiedBy = new User ( data.modifiedBy );
      }
      if ( data.modifiedDate ) {
        this.modifiedDate = new CsCoreTimestamp ( data.modifiedDate );
      }
    }
  }

}