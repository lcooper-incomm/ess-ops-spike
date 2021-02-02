import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import {debounceTime} from 'rxjs/operators';
import {MaplesPartner} from '@cscore/maples-client-model';
import {AppState} from '../../../app-state';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {AppStateType} from '../../../app-state-type.enum';
import {SearchState} from '../../../core/search/search-state';
import {SearchType} from '../../../core/search/search-type/search-type';
import {SupportState} from '../../../core/support/support-state';
import {SessionClass} from '../../../core/session/model/session-class';
import {Partner} from '../../../core/session/selection/partner';
import {UserService} from '../../../core/user/user.service';
import {UpdateUserAction} from '../../../auth/actions/update-user-action';
import {SessionType} from '../../../core/session/model/session-type';
import {ToastFactory} from '../../../toast/toast-factory.service';
import {SecurityService} from '../../../core/security/security.service';
import {Permission} from '../../../core/auth/permission';
import {PlatformType} from '../../../core/platform/platform-type.enum';
import {GenericOption} from '../../../core/model/generic-option';

@Component ( {
  selector: 'cca-profile-preferences',
  templateUrl: './profile-preferences.component.html',
  styleUrls: [ './profile-preferences.component.scss' ]
} )
export class ProfilePreferencesComponent extends CcaBaseComponent implements OnInit {
  currentUser;

  hasVmsSearchPermission: boolean             = false;
  hasCclSearchPermission: boolean             = false;
  searchTypes: SearchType[]                   = [];
  sessionDefinitions: SessionType[]           = [];
  bolPartners: GenericOption<MaplesPartner>[] = [];
  cclPartners: Partner[]                      = [];
  landingPageOptions: GenericOption<string>[] = [];
  vmsPartners: Partner[]                      = [];

  preferenceForm: FormGroup;
  defaultBolPartnerCtrl: FormControl  = new FormControl ();
  defaultDataCtrl: FormControl        = new FormControl ();
  defaultLandingPageCtrl: FormControl = new FormControl ();
  defaultSearchCtrl: FormControl      = new FormControl ();
  defaultPartnerCtrl: FormControl     = new FormControl ();
  defaultCclPartnerCtrl: FormControl  = new FormControl ();
  defaultSessionCtrl: FormControl     = new FormControl ();
  defaultDockCtrl: FormControl        = new FormControl ();
  defaultSummaryCtrl: FormControl     = new FormControl ();

  /** Hard Coded Select Values **/
  defaultPlatformOptions = [
    {
      value: "INCOMM",
      displayValue: "INCOMM (CORE)"
    },
    {
      value: "SEJ",
      displayValue: "Seven Eleven Japan (SEJ)"
    }
  ];

  dockModeOptions = [
    {
      value: "PINNED",
      displayValue: 'Pinned'
    },
    {
      value: "UNPINNED",
      displayValue: 'Unpinned'
    }
  ];

  summaryModeOptions = [
    {
      value: "TOP",
      displayValue: 'Horizontal'
    },
    {
      value: "LEFT",
      displayValue: 'Vertical'
    }
  ];

  constructor ( private store: Store<AppState>,
                private userService: UserService,
                private securityService: SecurityService,
                private toast: ToastFactory ) {
    super ();
  }

  ngOnInit () {
    this.buildBolPartnerOptions ();
    this.buildLandingPageOptions ();
    this.subscribeToAuthenticationState ();
    this.subscribeToSearchDefinitions ();
    this.subscribeToPartnerDefinitions ();
    this.subscribeToSessionDefinitions ();
  }

  private buildBolPartnerOptions () {
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_AMEX_BOL ) ) {
      this.bolPartners.push ( {
        displayValue: 'Amex',
        value: MaplesPartner.AXBOL
      } );
    }
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_MASTERCARD_BOL ) ) {
      this.bolPartners.push ( {
        displayValue: 'Mastercard',
        value: MaplesPartner.MBOL
      } );
    }
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_VANILLA_BOL ) ) {
      this.bolPartners.push ( {
        displayValue: 'Vanilla',
        value: MaplesPartner.VANILLA
      } );
    }
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_WALMART_BOL ) ) {
      this.bolPartners.push ( {
        displayValue: 'Walmart',
        value: MaplesPartner.WALMART
      } );
    }
  }

  private buildLandingPageOptions (): void {
    this.landingPageOptions = [];
    this.landingPageOptions.push ( new GenericOption<string> ( { value: 'DASHBOARD', displayValue: 'Dashboard' } ) );

    if ( this.securityService.hasPermission ( Permission.VIEW_CASE_WORKSPACE ) ) {
      this.landingPageOptions.push ( new GenericOption<string> ( { value: 'WORKSPACE', displayValue: 'Cases' } ) );
    }
  }

  private subscribeToAuthenticationState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.AUTHENTICATION_STATE ).subscribe ( {
        next: authenticationState => {
          if ( authenticationState ) {
            this.currentUser = authenticationState.user;
            this.initForm ();
          }
        }
      } )
    );
  }

  private initForm (): void {
    this.preferenceForm = new FormGroup ( {
      defaultBolPartnerCtrl: this.defaultBolPartnerCtrl,
      defaultDataCtrl: this.defaultDataCtrl,
      defaultSearchCtrl: this.defaultSearchCtrl,
      defaultPartnerCtrl: this.defaultPartnerCtrl,
      defaultCclPartnerCtrl: this.defaultCclPartnerCtrl,
      defaultLandingPageCtrl: this.defaultLandingPageCtrl,
      defaultSessionCtrl: this.defaultSessionCtrl,
      defaultDockCtrl: this.defaultDockCtrl,
      defaultSummaryCtrl: this.defaultSummaryCtrl
    } );
    this.defaultBolPartnerCtrl.setValue ( this.currentUser.prefDefaultBolPartner );
    this.defaultDataCtrl.setValue ( this.currentUser.prefDefaultDataSource );
    this.defaultLandingPageCtrl.setValue ( this.currentUser.prefDefaultLandingPage );
    if ( this.currentUser.prefDefaultPartner ) {
      this.defaultPartnerCtrl.setValue ( this.currentUser.prefDefaultPartner.id );
    }
    if ( this.currentUser.prefDefaultCclPartner ) {
      this.defaultCclPartnerCtrl.setValue ( this.currentUser.prefDefaultCclPartner.id );
    }
    this.defaultSearchCtrl.setValue ( this.currentUser.prefDefaultSearchTypeId );
    this.defaultSessionCtrl.setValue ( this.currentUser.prefDefaultSessionType );
    this.defaultDockCtrl.setValue ( this.currentUser.prefDockMode );
    this.defaultSummaryCtrl.setValue ( this.currentUser.prefSummaryMode );
    this.subscribePreferenceFormChanges ();
    this.hasCclSearchPermission = this.securityService.hasPermission ( Permission.SEARCH_CCL );
    this.hasVmsSearchPermission = this.securityService.hasAnyPermission ( [ Permission.SEARCH_BY_GPR, Permission.SEARCH_BY_VMS_GIFT ] );
  }

  private subscribePreferenceFormChanges (): void {
    this.addSubscription (
      this.preferenceForm.valueChanges
        .pipe ( debounceTime ( 50 ) )
        .subscribe ( {
          next: value => {
            this.updateUser ( value );
          }
        } )
    );
  }

  manageBillable () {
    this.currentUser.prefShowBillableOnly = !this.currentUser.prefShowBillableOnly;
    this.updateUser ( this.preferenceForm.value );
  }

  updateUser ( formData: any ) {
    let requestUser = _.cloneDeep ( this.currentUser );

    requestUser.prefDefaultLandingPage  = formData.defaultLandingPageCtrl;
    requestUser.prefDefaultBolPartner   = formData.defaultBolPartnerCtrl;
    requestUser.prefDefaultDataSource   = formData.defaultDataCtrl;
    requestUser.prefDockMode            = formData.defaultDockCtrl;
    requestUser.prefDefaultSearchTypeId = formData.defaultSearchCtrl;
    requestUser.prefDefaultSessionType  = formData.defaultSessionCtrl;
    requestUser.prefSummaryMode         = formData.defaultSummaryCtrl;

    if ( formData.defaultCclPartnerCtrl ) {
      requestUser.prefDefaultCclPartner = new Partner ( {
        id: formData.defaultCclPartnerCtrl
      } );
    }

    if ( formData.defaultPartnerCtrl ) {
      requestUser.prefDefaultPartner = new Partner ( {
        id: formData.defaultPartnerCtrl
      } );
    }

    this.userService.updateOne ( requestUser )
      .subscribe ( ( value ) => {
        this.store.dispatch ( new UpdateUserAction ( value ) );
        this.toast.success ( 'Preferences updated successfully' );
      } )
  };

  /** Dynamic Select Values **/
  private subscribeToSearchDefinitions (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          this.searchTypes = searchState.searchTypes;
        }
      } )
    );
  }

  private subscribeToPartnerDefinitions (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SUPPORT_STATE ).subscribe ( {
        next: ( supportState: SupportState ) => {
          this.cclPartners = _.filter ( supportState.partners, ( partner: Partner ) => {
            return partner.platform === PlatformType.CCL;
          } );
          this.vmsPartners = _.filter ( supportState.partners, ( partner: Partner ) => {
            return partner.platform === PlatformType.VMS;
          } );
        }
      } )
    );
  }

  private subscribeToSessionDefinitions (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SUPPORT_STATE ).subscribe ( {
        next: ( supportState: SupportState ) => {
          this.sessionDefinitions = [];
          supportState.sessionDefinitions.forEach ( ( sessionClass: SessionClass ) => {
            this.sessionDefinitions.push.apply ( this.sessionDefinitions, sessionClass.sessionTypes );
          } );
        }
      } )
    );
  };
}
