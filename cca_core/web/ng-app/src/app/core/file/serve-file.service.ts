import {Injectable} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Selection} from '../session/model/selection';
import {Session} from '../session/model/session';
import {FileService} from './file.service';
import {
  ServeUploadReason,
  ServeUploadReasonFileType
} from "../action/serve-actions/serve-upload-document-wizard/serve-upload-reason";

@Injectable({
  providedIn: 'root'
})
export class ServeFileService {

  constructor(private fileService: FileService) {
  }

  buildUploader(
    session: Session,
    selection: Selection<any>,
    fileType: ServeUploadReasonFileType,
    requestCode: string,
    description: string,
  ): FileUploader {
    const accountId                                  = selection.data.id;
    const platform                                   = selection.platform;
    const selectionId                                = selection.id;
    const sessionId                                  = session.id;
    const basePath                                   = '/rest/serve-file-upload';
    const params: { [key: string]: string | number } = {
      accountId,
      fileType,
      requestCode,
      description,
      platform,
      selectionId,
      sessionId,
    };
    const paramStr                                   = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
    const url                                        = `${basePath}?${paramStr}`;
    return this.fileService.buildUploader(url, {
      allowedMimeType: [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "application/pdf",
        "image/png"
      ]
    });
  }

  static getReasons(): ServeUploadReason[] {
    return [
      {
        description: 'State Driver License',
        fileType: ServeUploadReasonFileType.STATE_DRIVERS_LICENSE,
        reasonCode: 'State Driver License',
      },
      {
        description: 'State ID Card',
        fileType: ServeUploadReasonFileType.STATE_ID_CARD,
        reasonCode: 'State ID Card',
      },
      {
        description: 'SSN Card',
        fileType: ServeUploadReasonFileType.SSN_CARD,
        reasonCode: 'SSN Card',
      },
      {
        description: 'Bank Statement',
        fileType: ServeUploadReasonFileType.BANK_STATEMENT,
        reasonCode: 'Bank Statement',
      },
      {
        description: 'Credit Card Stmt',
        fileType: ServeUploadReasonFileType.CREDIT_CARD_STMT,
        reasonCode: 'Credit Card Stmt',
      },
      {
        description: 'Debit/Credit Card',
        fileType: ServeUploadReasonFileType.DEBIT_CREDIT_CARD,
        reasonCode: 'Debit/Credit Card',
      },
      {
        description: 'U.S. Passport',
        fileType: ServeUploadReasonFileType.US_PASSPORT,
        reasonCode: 'U.S. Passport',
      },
      {
        description: 'Non-U.S. Passport',
        fileType: ServeUploadReasonFileType.NON_US_PASSPORT,
        reasonCode: 'Non-U.S. Passport',
      },
      {
        description: 'Passport Cards',
        fileType: ServeUploadReasonFileType.PASSPORT_CARDS,
        reasonCode: 'Passport Cards',
      },
      {
        description: 'Other Govt ID cards',
        fileType: ServeUploadReasonFileType.OTHER_GOVT_ID_CARDS,
        reasonCode: 'Other Govt ID cards',
      },
      {
        description: 'Personal Image',
        fileType: ServeUploadReasonFileType.PERSONAL_IMAGE,
        reasonCode: 'Personal Image',
      },
      {
        description: 'Unacceptable - Dark',
        fileType: ServeUploadReasonFileType.UNACCEPTABLE_DARK,
        reasonCode: 'Unacceptable - Dark',
      },
      {
        description: 'Unacceptable - Light',
        fileType: ServeUploadReasonFileType.UNACCEPTABLE_LIGHT,
        reasonCode: 'Unacceptable - Light',
      },
      {
        description: 'Unacceptable - Othr',
        fileType: ServeUploadReasonFileType.UNACCEPTABLE_OTHR,
        reasonCode: 'Unacceptable - Othr',
      },
      {
        description: 'Unknown',
        fileType: ServeUploadReasonFileType.UNKNOWN,
        reasonCode: 'Unknown',
      },
      {
        description: 'Other',
        fileType: ServeUploadReasonFileType.DOC_TYPE_OTHER,
        reasonCode: 'Other',
      }
    ];
  }
}
