import { Component, Input, OnChanges } from '@angular/core';
import { Card } from 'src/app/core/card/card';
import { CsCoreCurrency } from "@cscore/gringotts";
import { CsCoreStatus } from 'src/app/core/model/cs-core-status';
import { Customer } from 'src/app/core/customer/customer';
import { PlatformType, isFsapiPlatform } from 'src/app/core/platform/platform-type.enum';
import { CardsComponentCard } from '../../model/cards-component-card';
import { Selection, SelectionDataType } from '../../model/selection';
import { Session } from '../../model/session';
import { Observable, of } from 'rxjs';
import { Workflow } from 'src/app/core/workflow/workflow.service';
import { mapTo, finalize } from 'rxjs/operators';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';
import { SessionState } from '../../session-state';
import { snapshot } from '../../../store-utils/store-utils';
import { AppStateType } from '../../../../app-state-type.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { EditCaseCardWizard } from '../edit-case-card/edit-case-card-wizard';
import * as _ from 'lodash';

@Component ( {
  selector: 'cca-case-card',
  templateUrl: './case-card.component.html',
  styleUrls: [ './case-card.component.scss' ]
} )
export class CaseCardComponent extends CcaBaseComponent implements OnChanges {
  @Input () card: CardsComponentCard;
  @Input () editable: boolean = false;
  @Input () session: Session;

  selection: Selection<Card | Customer>;

  private activeSelection: Selection<SelectionDataType>;
  private activeSession: Session;

  readonly PlatformType = PlatformType;

  loading: boolean = false;

  constructor ( private store: Store<AppState>, private wizardRunner: WizardRunner, private workflow: Workflow ) {
    super ();
  }

  ngOnChanges (): void {
    const sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    this.activeSession               = sessionState && sessionState.session;
    this.activeSelection             = sessionState.selection;

    this.loading = true;
    this.addSubscription (
      this.findSelection ()
        .pipe ( finalize ( () => this.loading = false ) )
        .subscribe ( selection => {
          this.selection = selection;
        } )
    );
  }

  get balance (): CsCoreCurrency {
    return this.selection && this.findCardBalance ();
  }

  edit (): void {
    if ( this.editable ) {
      const wizard           = new EditCaseCardWizard ();
      wizard.model.card      = _.cloneDeep ( this.card );
      wizard.model.selection = this.selection;
      wizard.model.session   = this.session;
      this.wizardRunner.run ( wizard );
    }
  }

  get isCurrentSelection (): boolean {
    if ( this.activeSession && this.activeSession.id === this.session.id && this.activeSelection && this.selection ) {
      const isActiveSelection = this.activeSelection.id === this.card.selectionId;
      const isSelectedCard    = !isFsapiPlatform ( this.selection.platform ) ||
        (this.selection.selectedCard && this.card.lastFour === this.selection.selectedCard.identifiers.panLastFour);
      return isActiveSelection && isSelectedCard;
    }
    return false;
  }

  get status (): CsCoreStatus {
    return this.selection && this.findCardStatus ();
  }

  private findCardBalance (): CsCoreCurrency {
    if ( isFsapiPlatform ( this.selection.platform ) ) {
      return this.selection.getCustomer ().accounts.spending.availableBalance;
    } else if ( this.selection.platform === PlatformType.GREENCARD ) {
      return this.selection.getCard ().amounts.availableBalance;
    } else {
      return this.selection.getCard ().amounts.denomination;
    }
  }

  private findCardStatus (): CsCoreStatus {
    if ( isFsapiPlatform ( this.selection.platform ) ) {
      const card = this.findMatchingFsapiCard ();
      return card && card.getStatusByPlatform ( this.selection.platform );
    } else {
      const card = this.selection.getCard ();
      // Fall back on INCOMM if we must
      return card.getStatusByPlatform ( this.selection.platform ) || card.getStatusByPlatform ( PlatformType.INCOMM );
    }
  }

  private findMatchingFsapiCard (): Card {
    return this.selection.getCustomer ().cards.find ( card => card.identifiers.panLastFour === this.card.lastFour );
  }

  private findSelection (): Observable<Selection<Card | Customer>> {
    const selection = this.session.selections.find ( selection => selection.id === this.card.selectionId ) as Selection<Card | Customer>;
    if ( selection && !selection.data ) {
      return this.workflow
        .loadSelection ( selection, true )
        .pipe ( mapTo ( selection ) );
    } else {
      return of ( selection );
    }
  }
}
