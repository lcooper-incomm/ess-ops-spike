import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { CloseCardsOnOrderComponent } from "./close-cards-on-order/close-cards-on-order.component";
import { CloseCardsOnOrderReviewComponent } from "./close-cards-on-order-review/close-cards-on-order-review.component";
import { CloseCardsOnOrderConfirmationComponent } from "./close-cards-on-order-confirmation/close-cards-on-order-confirmation.component";
import { MaplesOrder, MaplesOrderItemCard } from "@cscore/maples-client-model";
import { Selection } from "../../../core/session/model/selection";
import { User } from "../../../core/user/user";
import { ChangeOrderCardStatusRequest } from "../../../core/order/change-order-card-status-request";
import { ReasonCode } from "../../../core/action/product-action-reason-code";

export class CloseCardsOnOrderWizard extends AbstractWizard<CloseCardsOnOrderWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'close-card-on-order';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new CloseCardsOnOrderWizardModel ();

  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    super.buildPlaceholders ( user, selection );
    this.placeholderDictionary.addPlaceholder ( "CARD_COUNT", this.model.cards.length.toString () );
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', CloseCardsOnOrderComponent );
    pageMap.set ( 'review-page', CloseCardsOnOrderReviewComponent );
    pageMap.set ( 'confirmation-page', CloseCardsOnOrderConfirmationComponent );
  }
}

export class CloseCardsOnOrderWizardModel {
  id: number;
  isFailed: boolean;
  jobId: number;
  cards: MaplesOrderItemCard[] = [];
  reason: string;
  reasonCode: ReasonCode[];
  request: ChangeOrderCardStatusRequest;
  selection: Selection<MaplesOrder>;
}
