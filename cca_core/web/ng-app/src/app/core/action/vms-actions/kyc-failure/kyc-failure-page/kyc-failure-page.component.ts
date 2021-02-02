import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppState } from 'src/app/app-state';
import { AppStateType } from 'src/app/app-state-type.enum';
import { CardService } from 'src/app/core/card/card.service';
import { Customer } from 'src/app/core/customer/customer';
import { CustomerSearchService } from 'src/app/core/search/customer-search.service';
import { SearchParameterValueType } from 'src/app/core/search/search-type/search-parameter-value-type.enum';
import { SearchState } from 'src/app/core/search/search-state';
import { SearchTypeContainer } from 'src/app/core/search/search-type-container';
import { SearchTypeType } from 'src/app/core/search/search-type/search-type-type.enum';
import { snapshot } from 'src/app/core/store-utils/store-utils';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { KycFailureWizard } from '../kyc-failure-wizard';
import { Selection } from 'src/app/core/session/model/selection';

@Component ( {
  selector: 'cca-kyc-failure-page',
  templateUrl: './kyc-failure-page.component.html',
  styleUrls: [ './kyc-failure-page.component.scss' ]
} )
export class KycFailurePageComponent extends WizardPage<KycFailureWizard> {
  key: string           = 'page';
  wizardForm: FormGroup = new FormGroup ( {} );

  data: Customer[] = [];

  constructor (
    private cardService: CardService,
    private customerSearchService: CustomerSearchService,
    private store: Store<AppState>,
  ) {
    super ();
    this.isCloseable = true;
    this.width       = WizardWidth.EXTRA_LARGE;
  }

  onLoad (): Observable<any> {
    return this.unmaskPan ()
      .pipe (
        switchMap ( unmaskedPan => this.searchKyc ( unmaskedPan ) ),
        tap ( results => this.data = results ),
      );
  }

  onRetry (): void {
    this.close ();
  }

  get selection (): Selection<Customer> {
    return this.wizard.model.selection;
  }

  private getSearchTypeContainer (): SearchTypeContainer {
    const searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.cloneDeep ( searchState.searchTypeContainers.find ( searchTypeContainer => searchTypeContainer.searchType.type === SearchTypeType.VMS_GPR ) );
  }

  private searchKyc ( unmaskedPan: string ): Observable<Customer[]> {
    const selection           = this.wizard.model.selection;
    const searchTypeContainer = this.getSearchTypeContainer ();
    searchTypeContainer.clear ();

    searchTypeContainer.parameters.set ( SearchParameterValueType.PAN_GPR, unmaskedPan );
    searchTypeContainer.parameters.set ( SearchParameterValueType.PLATFORM, selection.platform );
    searchTypeContainer.parameters.set ( SearchParameterValueType.PARTNER, selection.partner.type );
    searchTypeContainer.parameters.set ( SearchParameterValueType.SEARCH_TYPE, 'kyc' );

    return this.customerSearchService.search ( searchTypeContainer )
  }

  private unmaskPan (): Observable<string> {
    const result = this.selection.getCustomer ();
    const card   = this.selection.selectedCard;
    return this.cardService.decryptFsapiPan ( result.id, card.identifiers.pan )
  }
}
