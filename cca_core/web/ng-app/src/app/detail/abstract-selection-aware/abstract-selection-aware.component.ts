import { CcaBaseComponent } from "../../core/cca-base-component";
import { Selection, SelectionDataType } from "../../core/session/model/selection";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { AppStateType } from "../../app-state-type.enum";
import { SessionState } from "../../core/session/session-state";
import { PlatformType } from "../../core/platform/platform-type.enum";
import { CsCoreAddressType } from "@cscore/core-client-model";
import {ChangeDetectorRef, ViewRef} from "@angular/core";

export abstract class AbstractSelectionAwareComponent<T extends SelectionDataType> extends CcaBaseComponent {

  AddressType  = CsCoreAddressType;
  PlatformType = PlatformType;
  selection: Selection<T>;

  constructor ( protected store: Store<AppState>,
                protected changeDetectorRef?: ChangeDetectorRef) {
    super ();
  }

  init () {
    this._subscribeToSessionState ();
  }

  private _subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection as Selection<T>;
            if (this.changeDetectorRef && !(this.changeDetectorRef as ViewRef).destroyed) {
              this.changeDetectorRef.detectChanges();
            }
          }
        } )
    );
  }

}
