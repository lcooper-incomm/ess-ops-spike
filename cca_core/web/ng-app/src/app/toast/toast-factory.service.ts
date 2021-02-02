import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { ToastDuration } from "./toast-duration.enum";
import { ToastType } from "./toast-type.enum";
import { Toast } from "./toast";
import { UUID } from '../core/uuid/uuid';
import { NewToastAction } from "./action/new-toast-action";

@Injectable ( {
  providedIn: 'root'
} )
export class ToastFactory {

  constructor ( private store: Store<AppState> ) {
  }

  error ( message: string, submessages: string[] = null, duration: ToastDuration = ToastDuration.DEFAULT, correlationId: string = null ): Toast {
    return this.build ( ToastType.ERROR, message, submessages, duration, correlationId );
  }

  info ( message: string, submessages: string[] = null, duration: ToastDuration = ToastDuration.DEFAULT, correlationId: string = null ): Toast {
    return this.build ( ToastType.INFO, message, submessages, duration, correlationId );
  }

  success ( message: string, submessages: string[] = null, duration: ToastDuration = ToastDuration.DEFAULT, correlationId: string = null ): Toast {
    return this.build ( ToastType.SUCCESS, message, submessages, duration, correlationId );
  }

  toast ( toast: Toast ): Toast {
    toast.id = UUID.generate ();
    this.store.dispatch ( new NewToastAction ( toast ) );
    return toast;
  }

  warn ( message: string, submessages: string[] = null, duration: ToastDuration = ToastDuration.DEFAULT, correlationId: string = null ): Toast {
    return this.build ( ToastType.WARN, message, submessages, duration, correlationId );
  }

  private build ( type: ToastType, message: string, submessages: string[] = null, duration: ToastDuration = ToastDuration.DEFAULT, correlationId: string = null ): Toast {
    let toast           = new Toast ();
    toast.type          = type;
    toast.message       = message;
    toast.submessages   = submessages;
    toast.correlationId = correlationId;

    if ( duration !== ToastDuration.INFINITE ) {
      toast.duration = duration;
    }

    return this.toast ( toast );
  }
}
