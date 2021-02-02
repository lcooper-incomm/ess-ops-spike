import { Acquirer } from "../node/acquirer";
import { Node } from "../node/node";
import { Merchant } from "../node/merchant";
import { Terminal } from "../node/terminal/terminal";
import { NodeType } from "../node/node-type.enum";

export class TransactionNodes {

  acquirer: Acquirer;
  customer: Node;
  global: Node;
  location: Node;
  merchant: Merchant;
  terminal: Terminal;
  unknown: Node;
  vendor: Node;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.acquirer ) {
        this.acquirer = new Acquirer ( {
          ...data.acquirer,
          type: NodeType.ACQUIRER //APLS isn't returning the type properly for these nodes, so we'll set them ourselves...
        } );
      }
      if ( data.customer ) {
        this.customer = new Node ( {
          ...data.customer,
          type: NodeType.CUSTOMER
        } );
      }
      if ( data.global ) {
        this.global = new Node ( {
          ...data.global,
          type: NodeType.GLOBAL
        } );
      }
      if ( data.location ) {
        this.location = new Node ( {
          ...data.location,
          type: NodeType.LOCATION
        } );
      }
      if ( data.merchant ) {
        this.merchant = new Merchant ( {
          ...data.merchant,
          type: NodeType.MERCHANT
        } );
      }
      if ( data.terminal ) {
        this.terminal = new Terminal ( {
          ...data.terminal,
          type: NodeType.TERMINAL
        } );
      }
      if ( data.unknown ) {
        this.unknown = new Node ( {
          ...data.unknown,
          type: NodeType.UNKNOWN
        } );
      }
      if ( data.vendor ) {
        this.vendor = new Node ( {
          ...data.vendor,
          type: NodeType.VENDOR
        } );
      }
    }
  }

}
