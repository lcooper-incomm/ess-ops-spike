export class Page<T> {

  content: T[]             = [];
  first: boolean           = false;
  last: boolean            = false;
  number: number           = 0;
  numberOfElements: number = 0;
  size: number             = 0;
  totalElements: number    = 0;
  totalPages: number       = 0;

  constructor ( rawPage: any, content: T[] ) {
    Object.assign ( this, rawPage );
    this.content = content;
  }
}
