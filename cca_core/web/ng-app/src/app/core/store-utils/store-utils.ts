import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import * as _ from "lodash";

export function snapshot<T> ( store: Store<T>, selector: string ) {
  let _state: any;
  store.select ( selector )
    .pipe ( take ( 1 ) )
    .subscribe ( value => _state = _.cloneDeep ( value ) );
  return _state;
}
