import { MaplesOrderShipment, MaplesOrder } from '@cscore/maples-client-model';
import { PlatformType } from '../../../core/platform/platform-type.enum';

export function linkToFedex ( trackingNumber: string ): void {
  let url = `https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=${trackingNumber}`;
  window.open ( url, "_blank" );
}

export function getShippingMethod ( shipment: MaplesOrderShipment, order: MaplesOrder, platform: PlatformType ): string {
  if ( platform === PlatformType.ECOMM ) {
    // For ECOMM orders, the shipment has no shipping method, so use the shipping method from the order instead
    // (it's actually the shipping method that was used to place the order)
    return order && order.recipients[ 0 ] && order.recipients[ 0 ].shippingMethod;
  } else {
    return shipment && shipment.recipient && shipment.recipient.shippingMethod;
  }
}
