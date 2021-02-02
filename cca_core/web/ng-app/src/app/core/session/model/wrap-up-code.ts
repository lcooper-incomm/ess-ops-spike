export class WrapUpCode {

  id: number;
  displayName: string;
  i3Name: string;
  isActive: boolean = false;
  isLocked: boolean = false;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
