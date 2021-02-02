import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { AppState } from 'src/app/app-state';
import { CardsComponent } from 'src/app/core/session/model/cards-component';
import { CardsComponentCard } from 'src/app/core/session/model/cards-component-card';
import { CustomerComponent } from 'src/app/core/session/model/customer-component';
import { MerchantComponent } from 'src/app/core/session/model/merchant-component';
import { SessionComponentType } from 'src/app/core/session/model/session-component-type.enum';
import {
  UpdateCardsComponentAction,
  UpdateCustomerComponentAction,
  UpdateMerchantComponentAction
} from 'src/app/core/session/action/session-actions';
import { WizardConfirmationPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { CardsComponentService } from '../../../../case-session-panel/cards-session-component-form/cards-component.service';
import { CustomerComponentService } from '../../../../case-session-panel/customer-session-component-form/customer-component.service';
import {
  MerchantComponentService,
  UpdateMerchantComponentRequest
} from '../../../../case-session-panel/merchant-session-component-form/merchant-component.service';
import { MergeSelectionPageType, MergeSelectionWizard } from '../merge-selection-wizard';

@Component ( {
  selector: 'cca-remove-selection-confirmation-page',
  templateUrl: './merge-selection-confirmation-page.component.html',
  styleUrls: [ './merge-selection-confirmation-page.component.scss' ]
} )
export class MergeSelectionConfirmationPageComponent extends WizardConfirmationPage<MergeSelectionWizard> {
  key: string                   = MergeSelectionPageType.CONFIRMATION;
  readonly SessionComponentType = SessionComponentType;
  cardsComponent: CardsComponent;

  constructor (
    private cardsComponentService: CardsComponentService,
    private customerComponentService: CustomerComponentService,
    private merchantComponentService: MerchantComponentService,
    private store: Store<AppState>,
  ) {
    super ();
    this.width = WizardWidth.LARGE;
  }

  onLoad (): Observable<any> {
    // Set width
    this.width = this.wizard.model.selectedComponent === SessionComponentType.CARDS ? WizardWidth.LARGE : WizardWidth.SMALL;

    // Add card to cards component
    const card          = this.wizard.model.component as CardsComponentCard;
    this.cardsComponent = _.cloneDeep ( this.wizard.model.session.cardsComponent );
    this.cardsComponent.addCard ( card );

    return of ( null );
  }

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    return this.updateComponent ().pipe (
      catchError ( () => {
        this.wizard.model.success = false;
        return of ( null );
      } ),
      mapTo ( MergeSelectionPageType.RESULT ),
    );
  }

  private updateComponent (): Observable<CardsComponent | CustomerComponent | MerchantComponent> {
    switch ( this.wizard.model.selectedComponent ) {
      case SessionComponentType.CARDS:
        return this.updateCardsComponent ();
      case SessionComponentType.CUSTOMER:
        return this.updateCustomerComponent ();
      case SessionComponentType.MERCHANT:
        return this.updateMerchantComponent ();
    }
  }

  private updateCardsComponent (): Observable<CardsComponent> {
    const component = this.wizard.model.session.cardsComponent;
    return this.cardsComponentService
      .addOneCard ( component.id, this.wizard.model.component as CardsComponentCard )
      .pipe (
        tap ( card => {
          component.addCard ( card );
          this.store.dispatch ( new UpdateCardsComponentAction ( component ) );
        } ),
        mapTo ( component ),
      );
  }

  private updateCustomerComponent (): Observable<CustomerComponent> {
    return this.customerComponentService
      .updateOne ( this.wizard.model.component as CustomerComponent )
      .pipe (
        tap ( component => this.store.dispatch ( new UpdateCustomerComponentAction ( component ) ) )
      );
  }

  private updateMerchantComponent (): Observable<MerchantComponent> {
    return this.merchantComponentService
      .updateOne ( this.wizard.model.component as UpdateMerchantComponentRequest )
      .pipe (
        tap ( component => this.store.dispatch ( new UpdateMerchantComponentAction ( component ) ) )
      );
  }
}
