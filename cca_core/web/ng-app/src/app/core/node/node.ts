import { CsCoreAddress, CsCoreAddressType } from "@cscore/core-client-model";
import { CsCoreStatus } from "../model/cs-core-status";
import { PlatformType } from "../platform/platform-type.enum";
import * as _ from "lodash";
import { getNodeTypeByValue, getNodeTypeNameByValue, NodeType } from "./node-type.enum";
import { padLeft, truncate } from "../utils/string-utils";

export class Node {
  id: string;
  controlNumber: string;
  legacyId: string;
  legalName: string;
  name: string;
  tooltip: string;
  type: NodeType;

  addresses: CsCoreAddress[] = [];
  statuses: CsCoreStatus[]   = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.addresses = [];
      this.statuses  = [];

      if ( data.addresses ) {
        data.addresses.forEach ( address => this.addresses.push ( new CsCoreAddress ( address ) ) );
      }
      if ( data.statuses ) {
        data.statuses.forEach ( status => this.statuses.push ( new CsCoreStatus ( status ) ) );
      }
      if ( data.type ) {
        this.type = getNodeTypeByValue ( data.type );
      }
      this.generateEntityTooltip ();
    }
  }

  getAddressByNodeTypeName ( name: string ): CsCoreAddress {
    let addressType = CsCoreAddressType[ name ];
    if ( addressType ) {
      return this.getAddressByType ( addressType );
    }
    return null;
  }

  getAddressByType ( type: CsCoreAddressType ): CsCoreAddress {
    return _.find ( this.addresses, function ( address: CsCoreAddress ) {
      return address.type === type;
    } );
  }

  getStatusByPlatform ( platform: PlatformType ): CsCoreStatus {
    return _.find ( this.statuses, function ( status: CsCoreStatus ) {
      return status.platform === platform;
    } );
  }

  isLinkableEntity (): boolean {
    return _.includes ( [ NodeType.TERMINAL, NodeType.LOCATION ], this.type );
  }

  private generateEntityTooltip (): void {
    let tooltip: string;
    let address                    = this.getAddressByNodeTypeName ( getNodeTypeNameByValue ( this.type ) );
    let addressCityStatePostalCode = address ? `${address.city ? address.city : ''}, ${address.state ? address.state : ''} ${address.postalCode ? address.postalCode : ''}` : '';
    let addressLine1               = address ? address.line1 : 'Not Available';
    let addressLine2               = (address && address.line2) ? address.line2 : addressCityStatePostalCode;
    let addressLine3               = (address && address.line2) ? addressCityStatePostalCode : '';

    tooltip      = `
${padLeft ( 'ID', 12 )}${truncate ( this.id ? this.id : 'Not Available', 30 )}
${padLeft ( 'Legacy ID', 12 )}${truncate ( this.legacyId ? this.legacyId : 'Not Available', 30 )}
${padLeft ( 'Name', 12 )}${truncate ( this.name ? this.name : 'Not Available', 30 )}
${padLeft ( 'Type', 12 )}${truncate ( this.type ? getNodeTypeNameByValue ( this.type ) : 'Not Available', 30 )}
${padLeft ( 'Address', 12 )}${truncate ( addressLine1, 30 )}
${padLeft ( '', 12 )}${truncate ( addressLine2, 30 )}
${padLeft ( '', 12 )}${truncate ( addressLine3, 30 )}
        `;
    this.tooltip = tooltip;
  }

}
