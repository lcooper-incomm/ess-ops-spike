import {Component, OnInit} from '@angular/core';
import {CcaBaseComponent} from "../../core/cca-base-component";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {Selection, SelectionDataType} from "../../core/session/model/selection";
import {AppStateType} from "../../app-state-type.enum";
import {SessionState} from "../../core/session/session-state";
import {SelectionType} from "../../core/session/model/selection-type.enum";
import {Observable, of} from "rxjs";
import {debounceTime, finalize} from "rxjs/operators";
import {Session} from "../../core/session/model/session";
import {ActionToolbarButtonStatus} from "src/app/core/action-toolbar/action-toolbar-button-status";
import {CardActionService} from "./card-action.service";
import {AccountActionService} from "./account-action.service";
import {CustomerActionService} from "./customer-action.service";
import {LocationActionService} from "./location-action.service";
import {OrderActionService} from "./order-action.service";
import * as _ from "lodash";
import {Customer} from 'src/app/core/customer/customer';
import {Location} from 'src/app/core/node/location/location';
import {CustomerAccountActionService} from "./customer-account-action.service";
import {MaplesCustomer} from '@cscore/maples-client-model';
import {MaplesCustomerActionService} from './maples-customer-action.service';

@Component ( {
  selector: 'cca-selection-action-toolbar',
  templateUrl: './selection-action-toolbar.component.html',
  styleUrls: [ './selection-action-toolbar.component.scss' ]
} )
export class SelectionActionToolbarComponent extends CcaBaseComponent implements OnInit {

  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = false;
  selection: Selection<SelectionDataType>;
  SelectionType                        = SelectionType;
  session: Session;

  constructor ( private accountActionService: AccountActionService,
                private cardActionService: CardActionService,
                private customerAccountActionService: CustomerAccountActionService,
                private customerActionService: CustomerActionService,
                private locationActionService: LocationActionService,
                private maplesCustomerActionService: MaplesCustomerActionService,
                private orderActionService: OrderActionService,
                protected store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  private doCheck (): void {
    this.buildingActions = true;

    let observable: Observable<ActionToolbarButtonStatus[]>;

    switch ( this.selection.type ) {
      case SelectionType.CUSTOMER_ACCOUNT:
        observable = this.customerAccountActionService.doAllChecksForSelection ( this.session, this.selection );
        break;
      case SelectionType.ACCOUNT:
        observable = this.accountActionService.doAllChecksForSelection ( this.session, this.selection );
        break;
      case SelectionType.CARD:
        observable = this.cardActionService.doAllChecksForSelection ( this.session, this.selection );
        break;
      case SelectionType.CUSTOMER:
        observable = this.customerActionService.doAllChecksForSelection ( this.session, this.selection as Selection<Customer> );
        break;
      case SelectionType.LOCATION:
        observable = this.locationActionService.doAllChecksForSelection ( this.session, this.selection as Selection<Location> );
        break;
      case SelectionType.MAPLES_CUSTOMER:
        observable = this.maplesCustomerActionService.doAllChecksForSelection ( this.session, this.selection as Selection<MaplesCustomer> );
        break;
      case SelectionType.ORDER:
        observable = this.orderActionService.doAllChecksForSelection ( this.session, this.selection );
        break;
      default:
        observable = of ( [] );
        break;
    }

    observable
      .pipe (
        finalize ( () => this.buildingActions = false )
      )
      .subscribe ( ( actions: ActionToolbarButtonStatus[] ) => {
        this.actions = _.filter ( actions, ( action: ActionToolbarButtonStatus ) => {
          return action.isVisible;
        } );
      }, (error) => {
        console.error(error);
      } );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .pipe ( debounceTime ( 300 ) )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            this.session   = state.session;

            if ( this.session && this.selection && this.selection.data ) {
              this.doCheck ();
            } else {
              this.actions = [];
            }
          }
        } )
    );
  }
}
