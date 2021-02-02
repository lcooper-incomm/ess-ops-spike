import {Component, OnInit} from '@angular/core';
import {AbstractSelectionAwareComponent} from "../../../abstract-selection-aware/abstract-selection-aware.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app-state";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {MaplesOrder, MaplesOrderItem} from "@cscore/maples-client-model";
import {SecurityService} from "../../../../core/security/security.service";
import {PlatformType} from "../../../../core/platform/platform-type.enum";
import {MaplesPartner} from "@cscore/maples-client-model";

@Component({
  selector: 'cca-order-details-section',
  templateUrl: './order-details-section.component.html',
  styleUrls: ['./order-details-section.component.scss']
})
export class OrderDetailsSectionComponent extends AbstractSelectionAwareComponent<MaplesOrder> implements OnInit {

  isSystemAdministrator: boolean = false;
  platform: string;
  quantity: number               = 0;

  constructor(private securityService: SecurityService,
              protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    super.init();
    this.subscribeToSessionState();
    this.isSystemAdministrator = this.securityService.getCurrentUser().isSystemAdministrator;
  }

  private setCardQuantity(): void {
    let quantity = 0;

    let items: MaplesOrderItem[] = [];

    if (this.selection) {
      //Prefer to use the full OrderItems list, if available
      if (this.selection.orderItems) {
        items = this.selection.orderItems;
      }
      //Else, use the partial list from the Order itself
      else if (this.selection.getOrder()) {
        items = this.selection.getOrder().items;
      }

      items.forEach((item: MaplesOrderItem) => {
        if (item.cards && item.cards.length) {
          quantity += item.cards.length;
        } else if (item.quantity) {
          quantity += item.quantity;
        }
      });
    }

    this.quantity = quantity;
  }

  private setOrderPlatform(): void {
    if (this.selection) {
      if (this.selection.platform === PlatformType.ECOMM) {
        this.platform = 'American Express';
      } else {
        switch (this.selection.simplePartner) {
          case MaplesPartner.AXBOL:
            this.platform = 'Amex';
            break;
          case MaplesPartner.MBOL:
            this.platform = 'Mastercard';
            break;
          case MaplesPartner.VANILLA:
            this.platform = 'Vanilla';
            break;
          case MaplesPartner.WALMART:
            this.platform = 'Walmart';
            break;
          default:
            this.platform = null;
            break;
        }
      }
    }
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.setCardQuantity();
            this.setOrderPlatform();
          }
        })
    );
  }
}
