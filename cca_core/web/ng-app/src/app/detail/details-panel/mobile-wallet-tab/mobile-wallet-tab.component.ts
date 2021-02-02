import { Component } from '@angular/core';
import { TokenProvisioningStatusType } from 'src/app/core/customer/token-provisioning-status-type.enum';
import { SecurityService } from 'src/app/core/security/security.service';
import { Permission } from 'src/app/core/auth/permission';
import { Customer } from 'src/app/core/customer/customer';
import { MatCheckboxChange } from '@angular/material';
import * as _ from 'lodash';
import { TokenDetail } from 'src/app/core/card/token-detail';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { AppStateType } from 'src/app/app-state-type.enum';
import { SessionState } from 'src/app/core/session/session-state';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { finalize } from 'rxjs/operators';
import { EnableTokenProvisioningWizard } from 'src/app/core/action/vms-actions/enable-token-provisioning-wizard/enable-token-provisioning-wizard';
import { Selection } from 'src/app/core/session/model/selection';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { ToastFactory } from 'src/app/toast/toast-factory.service';

@Component ( {
  selector: 'cca-mobile-wallet-tab',
  templateUrl: './mobile-wallet-tab.component.html',
  styleUrls: [ './mobile-wallet-tab.component.scss' ],
} )
export class MobileWalletTabComponent extends CcaBaseComponent {

  selection: Selection<Customer>;

  canDisableOneTimeFraudOverride: boolean;
  canDisablePermanentFraudOverride: boolean;
  canEnableOneTimeFraudOverride: boolean;
  canEnablePermanentFraudOverride: boolean;
  canEnableTokenProvisioning: boolean;

  togglingOneTimeFraudOverride: boolean = false;

  constructor (
    private customerService: CustomerService,
    securityService: SecurityService,
    private store: Store<AppState>,
    private toaster: ToastFactory,
    private wizardRunner: WizardRunner,
  ) {
    super ();
    this.subscribeToSessionState ();

    // TODO: the permanent permissions will be used in the future
    this.canDisableOneTimeFraudOverride   = securityService.hasPermission ( Permission.VMS_DISABLE_ONE_TIME_FRAUD_OVERRIDE );
    this.canDisablePermanentFraudOverride = securityService.hasPermission ( Permission.VMS_DISABLE_PERMANENT_FRAUD_OVERRIDE );
    this.canEnableOneTimeFraudOverride    = securityService.hasPermission ( Permission.VMS_ENABLE_ONE_TIME_FRAUD_OVERRIDE );
    this.canEnablePermanentFraudOverride  = securityService.hasPermission ( Permission.VMS_ENABLE_PERMANENT_FRAUD_OVERRIDE );
    this.canEnableTokenProvisioning       = securityService.hasPermission ( Permission.VMS_ENABLE_PROVISION_MOBILE_WALLET );
  }

  get customer (): Customer {
    return this.selection.getCustomer ();
  }

  get oneTimeFraudOverride (): boolean {
    return this.customer.flags.isTokenProvisioningOneTimeFraudOverrideEnabled;
  }

  set oneTimeFraudOverride ( value: boolean ) {
    this.customer.flags.isTokenProvisioningOneTimeFraudOverrideEnabled = value;
  }

  get isOneTimeFraudOverrideEnabled (): boolean {
    return (this.oneTimeFraudOverride && this.canDisableOneTimeFraudOverride) || (!this.oneTimeFraudOverride && this.canEnableOneTimeFraudOverride);
  }

  get isOneTimeFraudOverrideVisible (): boolean {
    return this.tokenProvisioningStatus === TokenProvisioningStatusType.SUPPORTED;
  }

  get isLocked (): boolean {
    return this.tokenProvisioningStatus === TokenProvisioningStatusType.LOCKED;
  }

  get tokenProvisioningStatus (): TokenProvisioningStatusType | undefined {
    return this.customer && this.customer.tokenProvisioningStatus;
  }

  openEnableProvisioningDialog () {
    if ( this.isLocked ) {
      const wizard                                = new EnableTokenProvisioningWizard ();
      wizard.model.selection                      = this.selection;
      wizard.model.isOverrideApplied              = this.oneTimeFraudOverride;
      wizard.model.wasOverrideAppliedAtDialogOpen = this.oneTimeFraudOverride;
      this.wizardRunner.run ( wizard );
    }
  }

  setOneTimeFraudOverride ( change: MatCheckboxChange ) {
    this.oneTimeFraudOverride = change.checked;
    this.toggleOneTimeFraudOverride ();
  }

  get tokens (): TokenDetail[] {
    return this.customer ? _.flatten ( this.customer.cards.map ( card => card.tokens ) ) : [];
  }

  toggleOneTimeFraudOverride () {
    this.togglingOneTimeFraudOverride = true;
    this.addSubscription (
      this.customerService
        .toggleOneTimeFraudOverride ( this.customer.id )
        .pipe ( finalize ( () => this.togglingOneTimeFraudOverride = false ) )
        .subscribe ({
          error: () => {
            const toggleAction = this.oneTimeFraudOverride ? 'enable' : 'disable';
            this.toaster.error(`Could not ${toggleAction} one-time fraud bypass`);
            this.oneTimeFraudOverride = !this.oneTimeFraudOverride;
          }
        })
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection as Selection<Customer>;
          }
        } )
    );
  }
}
