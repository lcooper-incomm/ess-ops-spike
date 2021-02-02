import {AbstractWizard} from "../../../../../wizard/abstract-wizard";
import {Type} from "@angular/core";
import {WizardPage} from "../../../../../wizard/wizard-page";
import {SessionComponentType} from "../../../../model/session-component-type.enum";
import {Session} from "../../../../model/session";
import {Selection} from "../../../../model/selection";
import {MergeSelectionSelectComponentPageComponent} from "./merge-selection-select-component-page/merge-selection-select-component-page.component";
import {MergeSelectionConfirmationPageComponent} from "./merge-selection-confirmation-page/merge-selection-confirmation-page.component";
import {MergeSelectionPopulateComponentPageComponent} from "./merge-selection-populate-component-page/merge-selection-populate-component-page.component";
import {CardsComponentCardSet} from "../../../../model/cards-component-card-set";
import {SelectionType} from "../../../../model/selection-type.enum";
import {PlatformType} from "../../../../../platform/platform-type.enum";
import {Observable, of} from "rxjs";
import {Card} from "../../../../../card/card";
import {GenericOption} from "src/app/core/model/generic-option";
import {CustomerComponent} from "src/app/core/session/model/customer-component";
import {MergeSelectionResultPageComponent} from "./merge-selection-result-page/merge-selection-result-page.component";
import {Workflow} from "src/app/core/workflow/workflow.service";
import {tap} from "rxjs/operators";
import {CardsComponentCard} from "src/app/core/session/model/cards-component-card";
import {UpdateMerchantComponentRequest} from "../../../case-session-panel/merchant-session-component-form/merchant-component.service";

export enum MergeSelectionPageType {
  SELECT_COMPONENT   = 'select-component-page',
  POPULATE_COMPONENT = 'populate-component-page',
  CONFIRMATION       = 'confirmation-page',
  RESULT             = 'result-page',
}

export class MergeSelectionWizard extends AbstractWizard<MergeSelectionWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'merge-selection';
  startingPageKey: string = MergeSelectionPageType.SELECT_COMPONENT;

  constructor ( private workflow: Workflow ) {
    super ();
    this.model = new MergeSelectionWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
      'isCardInGrid': formValue.componentType === SessionComponentType.CARDS && this.model.isCardInGrid,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( MergeSelectionPageType.SELECT_COMPONENT, MergeSelectionSelectComponentPageComponent );
    pageMap.set ( MergeSelectionPageType.POPULATE_COMPONENT, MergeSelectionPopulateComponentPageComponent );
    pageMap.set ( MergeSelectionPageType.CONFIRMATION, MergeSelectionConfirmationPageComponent );
    pageMap.set ( MergeSelectionPageType.RESULT, MergeSelectionResultPageComponent );
  }

  preProcess (): Observable<any> {
    return this.maybeLoadSelectionData ()
      .pipe (
        tap ( () => {
          this.initComponentOptions ();
          this.buildCandidateCards ();

          //If we're able to auto-select an option, we don't need to show the select-component-page at all
          if ( this.autoSelectSingleComponentOption () && this.canAutoSelectCard () ) {
            this.pages.get ( MergeSelectionPageType.SELECT_COMPONENT ).instance.isIgnored = true;
            this.startingPageKey                                                          = MergeSelectionPageType.POPULATE_COMPONENT;
          }
        } )
      );
  }

  private maybeLoadSelectionData (): Observable<any> {
    if ( !this.model.selection.data ) {
      return this.workflow.loadSelection ( this.model.selection, true );
    } else {
      return of ( null );
    }
  }

  private autoSelectSingleComponentOption (): boolean {
    if ( this.model.componentOptions.length === 1 ) {
      this.model.selectedComponent = this.model.componentOptions[ 0 ].value;
      return true;
    } else {
      return false;
    }
  }

  private buildCandidateCards (): void {
    //TODO switch over to use this list instead of the selection cards list
  }

  private canAutoSelectCard (): boolean {
    return this.model.selectedComponent !== SessionComponentType.CARDS
      || (this.model.selection.getCustomer () && this.model.selection.getCustomer ().cards.length === 1);
  }

  private initCardsComponentOption (): void {
    //If selection is a card or customer, and we have a cardsComponent, add cardsComponent option
    if ((this.model.selection.type === SelectionType.CUSTOMER || this.model.selection.type === SelectionType.CARD)
      && this.model.session.cardsComponent ) {
      this.model.componentOptions.push ( {
        value: SessionComponentType.CARDS,
        displayValue: 'Cards Information',
      } );
    }
  }

  private initComponentOptions (): void {
    this.initCardsComponentOption ();
    this.initCustomerComponentOption ();
    this.initMerchantComponentOption ();
  }

  private initCustomerComponentOption (): void {
    //If selection is Greecard card or customer, and we have a customerComponent, add customerComponent option
    if ( (this.model.selection.type === SelectionType.CUSTOMER || this.model.selection.platform === PlatformType.GREENCARD)
      && this.model.session.customerComponent ) {
      this.model.componentOptions.push ( {
        value: SessionComponentType.CUSTOMER,
        displayValue: 'Customer Information',
      } );
    }
  }

  private initMerchantComponentOption (): void {
    //If selection is a location, and we have a merchantComponent, add merchantComponent option
    if ( this.model.selection.type === SelectionType.LOCATION && this.model.session.merchantComponent ) {
      this.model.componentOptions.push ( {
        value: SessionComponentType.MERCHANT,
        displayValue: 'Merchant Information',
      } );
    }
  }
}

export class MergeSelectionWizardModel {
  candidateCards: Card[]                                  = [];
  cardSetOptions: CardsComponentCardSet[]                 = [];
  componentOptions: GenericOption<SessionComponentType>[] = [];
  isCardInGrid: boolean                                   = false;
  selectedCard: Card;
  selectedCardSetNumber: number;
  selectedComponent: SessionComponentType;
  component: ComponentUpdate;
  selection: Selection<any>;
  session: Session;
  success: boolean                                        = true;
}

export type ComponentUpdate = CardsComponentCard | CustomerComponent | UpdateMerchantComponentRequest;

