import { ToastType } from "./toast-type.enum";
import { Observable, of, Subject } from "rxjs";
import { delay } from "rxjs/operators";

export class Toast {

  id: string;
  correlationId: string;
  duration: number;
  message: string;
  type: ToastType;

  submessages: string[] = [];

  timer: Observable<void>;

  /**
   * Create and return an observable with a delay set to the toast duration.  This should be done once for a toast
   * and if a duration has been set.
   */
  createTimer (): Observable<void> {
    this.timer = of ( undefined ).pipe( delay ( this.duration ) );
    return this.timer;
  }
}
