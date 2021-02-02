import { MultiPackChild } from "./multi-pack-child";

export class MultiPack {

  serialNumber: string;

  children: MultiPackChild[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.children = [];

      if ( data.children ) {
        data.children.forEach ( child => this.children.push ( new MultiPackChild ( child ) ) );
      }
    }
  }
}
