import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CcaBaseComponent } from "../../../cca-base-component";
import { CallComponentService } from "./call-component.service";
import { Session } from "../../model/session";
import { Store } from "@ngrx/store";
import { AppStateType } from "../../../../app-state-type.enum";
import { AppState } from '../../../../app-state';
import { CallComponent } from "../../model/call-component";
import { UpdateCallComponentAction } from "../../action/session-actions";
import { debounceTime } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component ( {
  selector: 'cca-call-session-component-form',
  templateUrl: './call-session-component-form.component.html',
  styleUrls: [ './call-session-component-form.component.scss' ]
} )
export class CallSessionComponentFormComponent extends CcaBaseComponent implements OnInit, OnChanges {

  @Input ()
  form: FormGroup;

  session: Session;

  private formSubscription: Subscription;
  private sessionSubscription: Subscription;

  constructor ( private callComponentService: CallComponentService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
    this.subscribeToFormChanges ();
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    this.subscribeToSessionState ();
    this.subscribeToFormChanges ();
  }

  private save ( formValue: any ): void {
    let request: CallComponent = new CallComponent ( formValue );
    request.id                 = this.session.callComponent.id;
    this.callComponentService.updateOne ( request )
      .subscribe ( {
        next: callComponent => {
          this.store.dispatch ( new UpdateCallComponentAction ( callComponent ) );
        }
      } );
  }

  private subscribeToFormChanges (): void {
    if ( this.formSubscription ) {
      this.formSubscription.unsubscribe ();
      this.formSubscription = null;
    }

    this.formSubscription = this.form.valueChanges
      .pipe ( debounceTime ( 300 ) )
      .subscribe ( {
        next: value => {
          this.save ( value );
        }
      } );

    this.addSubscription ( this.formSubscription );
  }

  private subscribeToSessionState (): void {
    if ( this.sessionSubscription ) {
      this.sessionSubscription.unsubscribe ();
      this.sessionSubscription = null;
    }

    this.sessionSubscription = this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
      next: sessionState => {
        if ( sessionState ) {
          this.session = sessionState.session;
        }
      }
    } );

    this.addSubscription ( this.sessionSubscription );
  }

}
