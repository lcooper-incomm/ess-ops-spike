import { Component, Input } from '@angular/core';
import { MaplesOrderShipment } from "@cscore/maples-client-model";
import { CsCoreAddressType, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { Selection } from "../../../../core/session/model/selection";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { getShippingMethod, linkToFedex } from '../order-deliveries-util';

@Component ( {
  selector: 'cca-order-delivery-detail',
  templateUrl: './order-delivery-detail.component.html',
  styleUrls: [ './order-delivery-detail.component.scss' ]
} )
export class OrderDeliveryDetailComponent {

  @Input ()
  selection: Selection<any>;
  @Input ()
  shipment: MaplesOrderShipment;

  CsCoreAddressType     = CsCoreAddressType;
  CsCorePhoneNumberType = CsCorePhoneNumberType;
  PlatformType          = PlatformType;

  getShippingMethod (): string {
    return getShippingMethod ( this.shipment, this.selection.getOrder (), this.selection.platform );
  }

  linkToFedex ( trackingNumber: string ): void {
    linkToFedex ( trackingNumber );
  }

}
