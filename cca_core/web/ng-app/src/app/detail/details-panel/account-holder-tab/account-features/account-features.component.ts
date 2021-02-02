import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {MaplesAccountFeatures, MaplesResultMessageResponse} from "@cscore/maples-client-model";
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {AppState} from "../../../../app-state";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {ActionToolbarButtonStatus} from "../../../../core/action-toolbar/action-toolbar-button-status";
import {CustomerAccountService} from "../../../../core/customer-account/customer-account.service";
import {Selection} from "../../../../core/session/model/selection";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {ToastFactory} from "../../../../toast/toast-factory.service";
import {CustomerAccountActionService} from "../../../selection-action-toolbar/customer-account-action.service";
import {SpinnerComponent} from "../../../../core/spinner/spinner.component";
import {finalize} from "rxjs/operators";
import {SecurityService} from "../../../../core/security/security.service";
import {Permission} from "../../../../core/auth/permission";

@Component ( {
  selector: 'cca-account-features',
  templateUrl: './account-features.component.html',
  styleUrls: [ './account-features.component.scss' ]
} )
export class AccountFeaturesComponent extends CcaBaseComponent implements OnInit {

  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = true;
  readOnly: boolean = true;
  features: MaplesAccountFeatures;
  selection: Selection<any>;
  @ViewChild('toggleSpinner')
  toggleSpinner: SpinnerComponent;

  constructor ( private store: Store<AppState>,
                private customerAccountService: CustomerAccountService,
                private actionService: CustomerAccountActionService,
                private securityService: SecurityService,
                private toast: ToastFactory) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  get disableToggle(): boolean {
    return this.securityService.hasPermission(Permission.SERVE_EDIT_ACCOUNT) ? false : true;
  }

  toggleFeature($event: MatSlideToggleChange) {
    this.toggleSpinner.start();
    let feature = $event.source.name;
    let pda = feature == "pda" ? $event.checked: this.features.isPdaEnabled;
    let remoteDeposit = feature == "remoteDeposit" ? $event.checked: this.features.isRemoteDepositEnabled;
    let directDeposit = feature == "directDeposit" ? $event.checked: this.features.isDirectDepositEnabled;

    this.features.isRemoteDepositEnabled = remoteDeposit;
    this.features.isDirectDepositEnabled = directDeposit;
    this.features.isPdaEnabled = pda;
    this.selection.getCustomerAccount().features = this.features;

    this.customerAccountService.toggleFeature(this.selection.getCustomerAccount().id, this.selection, {isRemoteDeposit: remoteDeposit, isDirectDeposit: directDeposit, isPDA: pda})
      .pipe ( finalize ( () => this.toggleSpinner.stop () ) )
      .subscribe( (response: MaplesResultMessageResponse) => {
          this.toast.success('Successfully updated feature!');
        });
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            this.features = state.selection.getCustomerAccount() && state.selection.getCustomerAccount().features;
          }
        } )
    );
  }
}

export enum ActionStatus {
  SUCCESS = 'SUCCESS',
  FAILED    = 'FAILED',
}
