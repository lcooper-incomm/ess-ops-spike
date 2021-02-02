import { Component, OnInit, ViewChild } from '@angular/core';
import { CcaBaseComponent } from "../../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { Selection } from "../../../../core/session/model/selection";
import { Observable, of } from "rxjs";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { ProductDescriptionService } from "../../../../core/product-description/product-description.service";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { catchError, filter, finalize, map, tap } from "rxjs/operators";
import { ProductDescription } from "../../../../core/product-description/product-description";
import { SetCustomerIsCanadianAction } from "../../../../core/session/action/session-actions";
import * as _ from "lodash";
import { AccountHolderActionService } from '../account-holder-action.service';
import { ActionToolbarButtonStatus } from 'src/app/core/action-toolbar/action-toolbar-button-status';

@Component ( {
  selector: 'cca-identification-information',
  templateUrl: './identification-information.component.html',
  styleUrls: [ './identification-information.component.scss' ]
} )
export class IdentificationInformationComponent extends CcaBaseComponent implements OnInit {
  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = false;
  selection: Selection<any>;

  @ViewChild ( 'identificationSpinner' )
  spinner: SpinnerComponent;

  private isOriginDetermined: boolean = false;

  constructor ( private actionService: AccountHolderActionService,
                private productDescriptionService: ProductDescriptionService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  private determineOrigin (): Observable<any> {
    //If we haven't already determined this is Canadian, run the check
    if ( this.selection.platform === PlatformType.VMS && this.selection.getCustomer () && !this.selection.getCustomer ().isCanadian && this.selection.getCustomer ().productCode ) {
      this.spinner.start ();

      return this.productDescriptionService.findAllByPlatform ( PlatformType.VMS )
        .pipe (
          finalize ( () => {
            this.spinner.stop ();
          } ),
          catchError ( (( err, caught ) => {
            console.log ( err );
            return of ( null );
          }) ),
          map ( ( descriptions: ProductDescription[] ) => {
            let productDescription: ProductDescription = _.find ( descriptions, ( productDescription: ProductDescription ) => productDescription.code === this.selection.getCustomer ().productCode );
            let isCanadian                             = productDescription
              && productDescription.issuer
              && productDescription.issuer.country === 'CA';
            this.store.dispatch ( new SetCustomerIsCanadianAction ( isCanadian ) );
            this.isOriginDetermined = true;
          } ) );
    } else {
      return of ( null );
    }
  }

  private subscribeToSessionState (): void {
    this.buildingActions = true;
    this.addSubscription (
      this.store
        .select ( AppStateType.SESSION_STATE )
        .pipe (
          filter ( state => !!state && !!state.selection && !!state.selection.getCustomer () ),
          tap ( ( state: SessionState ) => {
            this.selection       = state.selection;
            this.actions         = [ this.actionService.checkEditAccountHolderIdentification ( state.session, this.selection ) ];
            this.buildingActions = false;

            if ( !this.isOriginDetermined ) {
              this.determineOrigin ().subscribe ();
            }
          } )
        )
        .subscribe ()
    );
  }
}
