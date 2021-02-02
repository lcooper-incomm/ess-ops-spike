export interface VmsUploadReason {
  description: string;
  reasonCode: number;
  fileType: VmsUploadReasonFileType;
}

export enum VmsUploadReasonFileType {
  KYC                  = 'KYC',
  DISPUTE              = 'DISPUTE',
  AUTHORIZE_USER_PROOF = 'AUTHORIZE_USER_PROOF',
  PREAUTH              = 'PREAUTH',
  PROOF_OF_ID          = 'PROOF_OF_ID',
  ADDRESS_OVERRIDE     = 'ADDRESS_OVERRIDE'
}
