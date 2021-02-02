import { User } from "../../../user/user";

export class DisputeProbingQuestion {

  id: number;
  createdBy: User;
  question: string;
  answer: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
    }
  }
}
