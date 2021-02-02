import { CustomerAccountType } from '../../../customer/customer-account-type.enum';
import { FsapiGenericResponse } from 'src/app/core/model/fsapi-generic-response';
import { ChallengeInfo } from './vms-request-models';
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { VmsUploadReasonFileType } from '../vms-upload-document-wizard/vms-upload-reason';

export class FsapiAdjustBalanceResponse {
  adjustBalanceData: AdjustBalanceData;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.adjustBalanceData ) {
        this.adjustBalanceData = new AdjustBalanceData ( data.adjustBalanceData );
      }
    }
  }
}

export class AdjustBalanceData {
  responseCode: string;
  responseMessage: string;
  accountBalance: AccountBalance;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.accountBalance ) {
        this.accountBalance = new AccountBalance ( data.accountBalance );
      }
    }
  }
}

export class AccountBalance {
  type: CustomerAccountType;
  ledgerBalance: string;
  availableBalance: string;
  accountNumber: string;
  routingNumber: string;
  interestRate: string;
  remainingTransfers: string;
  completedTransfers: string;
  proxyNumber: string;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.type ) {
        this.type = CustomerAccountType[ <string>data.type ];
      }
    }
  }
}

export class RegisterVmsCardResponse {
  productRegistrationResponseData: RegisterVmsCardResponseData;
  aplsResponse: FsapiGenericResponse;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.aplsResponse ) {
        this.aplsResponse = new FsapiGenericResponse ( data.aplsResponse );
      }
      if ( data.productRegistrationResponseData ) {
        this.productRegistrationResponseData = new RegisterVmsCardResponseData ( data.productRegistrationResponseData );
      }
    }
  }
}

export class RegisterVmsCardResponseData {
  customerId: string;
  oldMaskedPAN: string;
  newMaskedPAN: string;
  responseCode: string;
  responseMessage: string;
  challengeInfo: ChallengeInfo;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export interface RaiseDisputeResponse {
  detailDisputeId: number;
}

export class EnhancedDispute {
  callAgentUsername: string;
  canResendDocuments: boolean   = false;
  caseNumber: string;
  comment: string;
  initiatedDate: CsCoreTimestamp;
  refundType: string;
  sessionId: string;
  status: string;
  transaction: EnhancedDisputeTransaction;
  documents: EnhancedDocument[] = [];

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.initiatedDate ) {
        this.initiatedDate = new CsCoreTimestamp ( data.initiatedDate );
      }

      if ( data.transaction ) {
        this.transaction = new EnhancedDisputeTransaction ( data.transaction );
      }

      if ( data.documents ) {
        this.documents = data.documents.map ( document => new EnhancedDocument ( document ) );
      }
    }
  }
}

export class EnhancedDisputeTransaction {
  id: string;
  date: CsCoreTimestamp;
  deliveryChannelCode: string;
  reason: string;
  requestCode: string;
  responseCode: string;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.date ) {
        this.date = new CsCoreTimestamp ( data.date );
      }
    }
  }
}

export class EnhancedDocument {
  id: string;
  date: CsCoreTimestamp;
  file: string;
  mimeType: string;
  name: string;
  type: VmsUploadReasonFileType;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.date ) {
        this.date = new CsCoreTimestamp ( data.date );
      }
    }
  }
}
