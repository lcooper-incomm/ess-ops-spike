import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {SessionClass} from "../../core/session/model/session-class";
import {AppStateType} from "../../app-state-type.enum";
import {CcaBaseComponent} from "../../core/cca-base-component";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {SearchState} from "../../core/search/search-state";
import {UrlQueryParam} from "../../core/routing/url-query-param.enum";
import {SecurityService} from "../../core/security/security.service";
import {RoutingService} from "../../core/routing/routing.service";
import {User} from "../../core/user/user";
import {ClearCurrentSearchTypeAction} from "../../core/search/action/clear-current-search-type-action";
import {SearchTypeContainer} from "../../core/search/search-type-container";
import {SearchParameterFormBuilder} from "./search-parameter-form-builder.service";
import {SearchFormValidator} from "./search-form-validator.service";
import {debounceTime, map, withLatestFrom} from 'rxjs/operators';
import * as _ from "lodash";
import {SearchParameterValueType} from "../../core/search/search-type/search-parameter-value-type.enum";
import {Permission} from "../../core/auth/permission";
import {Workflow} from "../../core/workflow/workflow.service";
import {Observable, Subscription} from 'rxjs';
import {SearchTypeType} from "../../core/search/search-type/search-type-type.enum";
import {Partner} from "../../core/session/selection/partner";
import {MaplesPartner} from "@cscore/maples-client-model";
import {SearchTypeParameterGroup} from "../../core/search/search-type/search-type-parameter-group";
import {SearchTypeParameterGroupParameter} from "../../core/search/search-type/search-type-parameter-group-parameter";
import {AlderSearchType} from "../../core/order/alder-search-type.enum";

@Component ( {
  selector: 'cca-search-parameters',
  templateUrl: './search-parameters.component.html',
  styleUrls: [ './search-parameters.component.scss' ]
} )
export class SearchParametersComponent extends CcaBaseComponent implements OnInit {

  highlightedParameters: string[]     = [];
  isValidationInProgress: boolean     = false;
  searchForm: FormGroup               = new FormGroup ( {} );
  searching: boolean                  = false;
  selectedSearchTypeContainer: SearchTypeContainer;
  sessionClassOptions: SessionClass[] = [];

  private isCleared: boolean = false;
  private lastFormState: any;
  private customerPartnerControlSubscription: Subscription;
  private orderPartnerControlSubscription: Subscription;
  private searchTypeControlSubscription: Subscription;
  private searchFormSubscription: Subscription;

  constructor ( private routingService: RoutingService,
                private searchFormBuilder: SearchParameterFormBuilder,
                private searchFormValidator: SearchFormValidator,
                private securityService: SecurityService,
                private store: Store<AppState>,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSearchState ();
  }

  get partnerOptions (): Observable<Partner[]> {
    return this.store.select ( AppStateType.SEARCH_STATE )
      .pipe (
        map ( searchState => searchState && searchState.selectedSearchType ? searchState.selectedSearchType.searchType.partners : [] ),
        withLatestFrom ( this.securityService.getCurrentUserAsync () ),
        map ( ( [ partners, user ] ) => {
          return partners.filter ( partner => {
            return !partner.permission || this.securityService.hasPermission ( partner.permission.systemName, user );
          } );
        } ),
      );
  }

  clear (): void {
    this.isCleared = true;
    this.store.dispatch ( new ClearCurrentSearchTypeAction () );
  }

  hasAtLeastOneParameter (): boolean {
    let parameterCount = 0;

    const excludedParameters = [
      SearchParameterValueType.BOL_PARTNER,
      SearchParameterValueType.IDENTIFICATION_TYPE,
      SearchParameterValueType.PARTNER,
      SearchParameterValueType.RECENT_ACTIVITY,
      SearchParameterValueType.ALDER_SEARCH_TYPE,
      SearchParameterValueType.SESSION_CLASS,
      SearchParameterValueType.SHOW_ADVANCED
    ];

    if ( this.selectedSearchTypeContainer ) {
      this.selectedSearchTypeContainer.parameters.forEach ( ( value: any, key: string ) => {
        if ( !_.includes ( excludedParameters, key ) && !!value ) {
          parameterCount++;
        }
      } );
    }

    return parameterCount > 0;
  }

  search (): void {
    this.workflow.forwardingSearch ( this.selectedSearchTypeContainer, true ).subscribe ();
  }

  private buildFormGroup (): void {
    this.searchForm = this.searchFormBuilder.build ( this.selectedSearchTypeContainer );
    this.subscribeToCustomerPartnerChanges ();
    this.subscribeToOrderPartnerChanges ();
    this.subscribeToSearchTypeChanges();
    this.setDefaultSearchType();
    this.setDefaultPartner ();
    this.setDefaultBolPartner ();
    this.setDefaultSessionClass ();
    this.subscribeToSearchFormChanges ();
  }

  //TODO collapse this into the setDefaultPartner below and get rid of BOL_PARTNER field in favor of PARTNER
  private setDefaultBolPartner (): void {
    let user: User = this.securityService.getCurrentUser ();
    if ( this.searchForm
      && this.searchForm.get ( SearchParameterValueType.BOL_PARTNER )
      && !this.selectedSearchTypeContainer.parameters.get ( SearchParameterValueType.BOL_PARTNER )
      && user.prefDefaultBolPartner
    ) {
      this.searchForm.get ( SearchParameterValueType.BOL_PARTNER ).setValue ( user.prefDefaultBolPartner );
    }
  }

  private setDefaultSearchType (): void {
    if ( this.searchForm
      && this.searchForm.get ( SearchParameterValueType.ALDER_SEARCH_TYPE )
      && !this.selectedSearchTypeContainer.parameters.get ( SearchParameterValueType.ALDER_SEARCH_TYPE )
    ) {
      this.searchForm.get ( SearchParameterValueType.ALDER_SEARCH_TYPE ).setValue ( AlderSearchType.ORDER );
    }

    if ( this.searchForm
      && this.searchForm.get ( SearchParameterValueType.ALDER_SEARCH_TYPE )
    ) {
      if ( this.searchForm.get( SearchParameterValueType.ALDER_SEARCH_TYPE ).value == AlderSearchType.ORDER ){
        this.searchForm.get ( SearchParameterValueType.ALDER_SEARCH_TYPE ).setValue ( AlderSearchType.ORDER );
    } else if ( this.searchForm.get( SearchParameterValueType.ALDER_SEARCH_TYPE ).value == AlderSearchType.CARD )
      this.searchForm.get ( SearchParameterValueType.ALDER_SEARCH_TYPE ).setValue ( AlderSearchType.CARD );
    }
  }

  private setDefaultPartner (): void {
    let user: User = this.securityService.getCurrentUser ();
    if ( this.searchForm
      && this.searchForm.get ( SearchParameterValueType.PARTNER )
      && !this.selectedSearchTypeContainer.parameters.get ( SearchParameterValueType.PARTNER ) ) {
      if ( _.includes ( [ SearchTypeType.VMS_GIFT, SearchTypeType.VMS_GPR, SearchTypeType.KYC_FAILURE ], this.selectedSearchTypeContainer.searchType.type ) && user.prefDefaultPartner ) {
        this.searchForm.get ( SearchParameterValueType.PARTNER ).setValue ( user.prefDefaultPartner.type );
      } else if ( this.selectedSearchTypeContainer.searchType.type === SearchTypeType.CCL_GIFT && user.prefDefaultCclPartner ) {
        this.searchForm.get ( SearchParameterValueType.PARTNER ).setValue ( user.prefDefaultCclPartner.type );
      }
    }
  }

  private setDefaultSessionClass (): void {
    if ( this.searchForm
      && this.searchForm.get ( SearchParameterValueType.SESSION_CLASS )
      && !this.selectedSearchTypeContainer.parameters.get ( SearchParameterValueType.SESSION_CLASS ) ) {
      //Auto-select a single option
      if ( this.sessionClassOptions.length === 1 ) {
        this.searchForm.get ( SearchParameterValueType.SESSION_CLASS ).setValue ( this.sessionClassOptions[ 0 ].name );
      }
      //Auto-select ALL if present
      else if ( this.securityService.hasPermission ( Permission.SEARCH_SESSIONS_ALL ) ) {
        this.searchForm.get ( SearchParameterValueType.SESSION_CLASS ).setValue ( 'ALL' );
      }
    }
  }

  private setSearchQueryParameters (): void {
    if ( this.selectedSearchTypeContainer ) {
      let queryParameters                                 = {};
      queryParameters[ UrlQueryParam.SEARCH_SEARCH_TYPE ] = this.selectedSearchTypeContainer.searchType.type;
      this.routingService.navigateTo ( [], queryParameters );
    }
  }

  private doValidation (): void {
    if ( !this.isValidationInProgress ) {
      this.isValidationInProgress = true;
      this.searchFormValidator.validateAndUpdate ( this.selectedSearchTypeContainer, this.searchForm )
        .subscribe ( {
          next: result => {
            this.highlightedParameters  = result.highlightedParameters;
            this.isValidationInProgress = false;
          }
        } );
    }
  }

  private subscribeToCustomerPartnerChanges (): void {
    if ( this.customerPartnerControlSubscription ) {
      this.customerPartnerControlSubscription.unsubscribe ();
      this.customerPartnerControlSubscription = null;
    }

    let control = this.searchForm.get ( SearchParameterValueType.PARTNER );
    if ( control ) {
      this.customerPartnerControlSubscription = control.valueChanges.subscribe ( ( partner: Partner ) => {
        //Conditionally show/hide controls based on partner
        if ( partner ) {
          switch ( partner.type ) {
            //TODO flesh this out when we combine VMS/CCL search types together
            default:
              break;
          }
        }
      } );

      this.addSubscription ( this.customerPartnerControlSubscription );
    }
  }

  private subscribeToSearchTypeChanges (): void {
    if ( this.searchTypeControlSubscription ) {
      this.searchTypeControlSubscription.unsubscribe ();
      this.searchTypeControlSubscription = null;
    }

    let control = this.searchForm.get ( SearchParameterValueType.ALDER_SEARCH_TYPE );
    if ( control ) {
      this.searchTypeControlSubscription = control.valueChanges.subscribe((option: AlderSearchType) => {
        this.selectedSearchTypeContainer.searchType.parameterGroups.forEach ( (group: SearchTypeParameterGroup) => {
          switch (option) {
            case AlderSearchType.CARD:
              if(group.name == "Recipient Information" || group.name == "Card Information") {
                group.isVisible = true;
              } else {
                group.isVisible = false;
              }
              break;
            case AlderSearchType.ORDER:
              if(!(group.name == "Recipient Information" || group.name == "Card Information")) {
                group.isVisible = true;
              } else {
                group.isVisible = false;
              }
              break;
            default:
              group.isVisible = false;
          }

        })
      });

      this.addSubscription ( this.searchTypeControlSubscription );
    }
  }

  private subscribeToOrderPartnerChanges (): void {
    if ( this.orderPartnerControlSubscription ) {
      this.orderPartnerControlSubscription.unsubscribe ();
      this.orderPartnerControlSubscription = null;
    }

    let control = this.searchForm.get ( SearchParameterValueType.BOL_PARTNER );
    if ( control ) {
      this.orderPartnerControlSubscription = control.valueChanges.subscribe ( ( partner: MaplesPartner ) => {
        // Enable all fields by default, and we'll disable them if needed in a moment
        this.selectedSearchTypeContainer.searchType.parameterGroups.forEach ( ( group: SearchTypeParameterGroup ) => {
          group.parameters.forEach ( ( parameter: SearchTypeParameterGroupParameter ) => {
            parameter.isVisible = true;

            // Conditionally show/hide/advanced controls based on partner
            switch ( partner ) {
              case MaplesPartner.VANILLA:
                switch ( parameter.parameter.value ) {
                  case SearchParameterValueType.BOL_CARD_NUMBER:
                    parameter.isVisible = false;
                    break;
                  case SearchParameterValueType.PROXY_NUMBER:
                    parameter.isAdvanced = true;
                    break;
                  default:
                    break;
                }
                break;
              case MaplesPartner.WALMART:
                switch ( parameter.parameter.value ) {
                  case SearchParameterValueType.BOL_CARD_NUMBER:
                    parameter.isAdvanced = true;
                    break;
                  case SearchParameterValueType.PROXY_NUMBER:
                  case SearchParameterValueType.SERIAL_NUMBER:
                    parameter.isVisible = false;
                  default:
                    break;
                }
                break;
              default:
                break;
            }
          } );
        } );
      } );

      this.addSubscription ( this.orderPartnerControlSubscription );
    }
  }

  private subscribeToSearchFormChanges (): void {
    if ( this.selectedSearchTypeContainer ) {
      this.doValidation ();
    }
    if ( this.searchFormSubscription ) {
      this.searchFormSubscription.unsubscribe ();
      this.searchFormSubscription = null;
    }
    this.searchFormSubscription = this.searchForm.valueChanges
      .pipe ( debounceTime ( 50 ) )
      .subscribe ( {
        next: value => {
          let rawValue = this.searchForm.getRawValue ();
          if ( !_.isEqual ( this.lastFormState, rawValue ) ) {
            if ( this.searchForm.valid ) {
              this.selectedSearchTypeContainer.updateFromForm ( rawValue );
            }
            this.lastFormState = _.clone ( rawValue );
            this.doValidation ();
          }
        }
      } );

    this.addSubscription (
      this.searchFormSubscription
    );
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            if ( searchState.selectedSearchType
              && (
                this.isCleared
                || !this.selectedSearchTypeContainer
                || this.selectedSearchTypeContainer.searchType.type !== searchState.selectedSearchType.searchType.type
                || !_.keys ( this.searchForm.controls ).length)
            ) {
              this.selectedSearchTypeContainer = _.cloneDeep ( searchState.selectedSearchType );
              this.buildFormGroup ();
              this.setSearchQueryParameters ();
              this.isCleared = false;
            }

            this.searching = searchState.searching;
          }
        }
      } )
    );
  }
}
