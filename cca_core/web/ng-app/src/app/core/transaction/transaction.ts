import { CsCoreCode, CsCoreCodeType, CsCoreTimestamp } from "@cscore/core-client-model";
import { TransactionFee } from "./transaction-fee";
import { OpCode } from "./op-code";
import { PlatformType } from "../platform/platform-type.enum";
import { TransactionRequest } from "./transaction-request";
import { TransactionResponse } from "./transaction-response";
import { TransactionSettlement } from "./transaction-settlement";
import { TransactionToken } from "./transaction-token";
import { TransactionAmounts } from "./transaction-amounts";
import { TransactionFlags } from "./transaction-flags";
import { TransactionIdentifiers } from "./transaction-identifiers";
import { TransactionNodes } from "./transaction-nodes";
import { Node } from "../node/node";
import * as _ from "lodash";
import { UUID } from "../uuid/uuid";
import { CreditDebitFlagType } from "./credit-debit-flag-type.enum";
import { TransactionType } from "./transaction-type.enum";
import { OriginalTransaction } from "./original-transaction";

export class Transaction {

  id: string;
  amounts: TransactionAmounts;
  businessDate: CsCoreTimestamp;
  chargeBackRightsIndicator: boolean;
  comment: string;
  createDate: CsCoreTimestamp;
  description: string;
  device: CsCoreCode;
  disputeId: number;
  fee: TransactionFee;
  flags: TransactionFlags;
  identifiers: TransactionIdentifiers;
  institution: string;
  isArchive: boolean                = false;
  isDebit: boolean                  = false;
  isHighlightableAsPending: boolean = false;
  isSelected: boolean               = false;
  isSerialNumberLinkable: boolean   = false;
  isUserCodeDisplayable: boolean    = false;
  manualNotes: string;
  manualReason: string;
  nodes: TransactionNodes;
  opCode: OpCode;
  originalTransaction: OriginalTransaction;
  platform: PlatformType;
  request: TransactionRequest;
  response: TransactionResponse;
  settlement: TransactionSettlement;
  source: string;
  token: TransactionToken;
  transactionDate: CsCoreTimestamp;
  transmissionDate: CsCoreTimestamp;
  uuid: string;
  status: string;

  codes: CsCoreCode[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.codes = [];

      this.amounts          = new TransactionAmounts ( data.amounts );
      this.flags            = new TransactionFlags ( data.flags );
      this.flags.isPassThru = (this.source && this.source.toLowerCase () === 'passthru');
      this.identifiers      = new TransactionIdentifiers ( data.identifiers );
      this.nodes            = new TransactionNodes ( data.nodes );

      if ( data.businessDate ) {
        this.businessDate = new CsCoreTimestamp ( data.businessDate );
      }
      if ( data.createDate ) {
        this.createDate = new CsCoreTimestamp ( data.createDate );
      }
      if ( data.device ) {
        this.device = new CsCoreCode ( data.device );
      }
      if ( data.fee ) {
        this.fee = new TransactionFee ( data.fee );
      }
      if ( data.opCode ) {
        this.opCode = new OpCode ( data.opCode );
      }
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.originalTransaction ) {
        this.originalTransaction = new OriginalTransaction ( data.originalTransaction );
      }
      if ( data.request ) {
        this.request = new TransactionRequest ( data.request );
      }
      if ( data.response ) {
        this.response = new TransactionResponse ( data.response );
      }
      if ( data.settlement ) {
        this.settlement = new TransactionSettlement ( data.settlement );
      }
      if ( data.token ) {
        this.token = new TransactionToken ( data.token );
      }
      if ( data.transactionDate ) {
        this.transactionDate = new CsCoreTimestamp ( data.transactionDate );
      }
      if ( data.transmissionDate ) {
        this.transmissionDate = new CsCoreTimestamp ( data.transmissionDate );
      }
      if ( data.codes ) {
        data.codes.forEach ( code => this.codes.push ( new CsCoreCode ( code ) ) );
      }
      if ( data.disputeId ) {
        this.disputeId = data.disputeId;
      }

      if ( !this.uuid ) {
        this.uuid = UUID.generate ();
      }

      if ( data.status ) {
        this.status = data.status;
      }

      this.isHighlightableAsPending = this.flags.isPending
        && this.response
        && this.response.code === '509';

      this.isUserCodeDisplayable = _.includes ( [ PlatformType.CCL, PlatformType.VMS ], this.platform )
        && !!this.nodes
        && !!this.nodes.merchant
        && !!this.nodes.merchant.name
        && this.nodes.merchant.name.toLowerCase () === 'customer service'
        && !!this.request
        && !!this.request.userCode;

      this.isSerialNumberLinkable = !this.flags.isPassThru
        && this.identifiers.serialNumber
        && this.identifiers.serialNumber !== '-1'
        && this.identifiers.serialNumber.indexOf ( '*' ) === -1;

      this.isDebit = (this.amounts.crdrFlag === CreditDebitFlagType.DEBIT)
        || (this.request && this.request.descriptor && this.request.descriptor.transactionType === TransactionType.DEBIT)
        || (this.opCode && this.opCode.descriptor && this.opCode.descriptor.transactionType === TransactionType.DEBIT);
    }
  }

  getCodeByType ( type: CsCoreCodeType ): CsCoreCode {
    return _.find ( this.codes, ( code: CsCoreCode ) => {
      return code.type === type;
    } );
  }

  getPreferredEntityNode (): Node {
    let node: Node;

    if ( this.nodes ) {
      if ( this.platform === PlatformType.GREENCARD ) {
        node = this.nodes.acquirer;
      } else if ( this.nodes.terminal ) {
        node = this.nodes.terminal;
      } else if ( this.nodes.location ) {
        node = this.nodes.location;
      } else if ( this.nodes.merchant ) {
        node = this.nodes.merchant;
      } else if ( this.nodes.customer ) {
        node = this.nodes.customer;
      }
    }

    return node;
  }

  getRequestDisplayValue (): string {
    let value: string;

    if ( _.includes ( [ PlatformType.CCL, PlatformType.GREENCARD, PlatformType.VMS ], this.platform ) ) {
      //TODO handle mapped request value
      if ( this.request && this.request.description ) {
        value = this.request.description;

        if ( this.request.code ) {
          value = `${value} (${this.request.code})`;
        }
      }
    }
    //TODO handle mapped opcode value
    else {
      value = `${this.opCode.code} - ${this.opCode.description} (${this.opCode.flag})`;
    }

    return value;
  }

  getResponseDisplayValue (): string {
    let value: string;

    if ( _.includes ( [ PlatformType.CCL, PlatformType.GREENCARD, PlatformType.VMS ], this.platform ) ) {
      //TODO handle mapped response value
      if ( this.response && this.response.description ) {
        value = this.response.description;

        if ( this.response.code ) {
          value = `${value} (${this.response.code})`;
        }
      }
    } else if ( this.platform === PlatformType.CASHTIE ) {
      value = !!this.response ? `${this.response.code}\u00A0-\u00A0${this.response.message}` : null;
    }
    //TODO handle mapped opcode value
    else {
      value = `${this.opCode.code} - ${this.opCode.description} (${this.opCode.flag})`;
    }

    return value;
  }
}
