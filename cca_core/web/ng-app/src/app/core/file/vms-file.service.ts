import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Customer } from '../customer/customer';
import { Selection } from '../session/model/selection';
import { Session } from '../session/model/session';
import { FileService } from './file.service';
import {
  VmsUploadReason,
  VmsUploadReasonFileType
} from '../action/vms-actions/vms-upload-document-wizard/vms-upload-reason';

@Injectable ( {
  providedIn: 'root'
} )
export class VmsFileService {

  constructor ( private fileService: FileService ) {
  }

  buildUploader (
    session: Session,
    selection: Selection<Customer>,
    fileType: VmsUploadReasonFileType,
    requestCode: number,
  ): FileUploader {
    const customerId                                   = selection.getCustomer ().id;
    const platform                                     = selection.platform;
    const partner                                      = selection.partner.type;
    const selectionId                                  = selection.id;
    const sessionId                                    = session.id;
    const basePath                                     = '/rest/vms-file-upload';
    const params: { [ key: string ]: string | number } = {
      customerId,
      fileType,
      requestCode,
      platform,
      partner,
      selectionId,
      sessionId,
    };
    const paramStr                                     = Object.entries ( params ).map ( ( [ key, value ] ) => `${key}=${value}` ).join ( '&' );
    const url                                          = `${basePath}?${paramStr}`;
    return this.fileService.buildUploader ( url );
  }

  static getReasons (): VmsUploadReason[] {
    return [
      {
        description: 'Address Override',
        fileType: VmsUploadReasonFileType.ADDRESS_OVERRIDE,
        reasonCode: 91,
      },
      {
        description: 'Authorize User Proof',
        fileType: VmsUploadReasonFileType.AUTHORIZE_USER_PROOF,
        reasonCode: 37,
      },
      {
        description: 'KYC',
        fileType: VmsUploadReasonFileType.KYC,
        reasonCode: 37,
      },
      {
        description: 'Proof of ID',
        fileType: VmsUploadReasonFileType.PROOF_OF_ID,
        reasonCode: 37,
      },
    ];
  }
}
