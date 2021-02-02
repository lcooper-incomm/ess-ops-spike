import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import { FileItem, FileUploader, FileUploaderOptions } from "ng2-file-upload";
import { Observable, of, Subject } from "rxjs";
import {map, tap} from "rxjs/operators";
import {saveAs} from "file-saver";
import { Logger } from "../../logging/logger.service";

@Injectable ( {
  providedIn: 'root'
} )
export class FileService {

  constructor ( private logger: Logger,
                private http: HttpClient) {
  }

  base64ToArrayBuffer(base64: string): any {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  download(url: string, fileName: string, params: HttpParams = new HttpParams()): Observable<any> {
    params = params.set('fileName', fileName);
    let headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(url, {observe: 'response', responseType: 'blob', params: params, headers: headers})
      .pipe(map((response: HttpResponse<any>) => response.body))
      .pipe(tap((blob: any) => {
        saveAs(blob, fileName);
      }));
  }

  buildUploader ( url: string, options: FileUploaderOptions = {} ): FileUploader {
    options.url = url;
    if ( !options.maxFileSize ) {
      options.maxFileSize = 10 * 1024 * 1024 //10MB
    }
    return new FileUploader ( options );
  }

  upload ( uploader: FileUploader ): Observable<FileItem> {
    if ( uploader && uploader.queue.length ) {
      const observable = new Subject<FileItem> ();

      uploader.onSuccessItem = ( item: FileItem ) => {
        observable.next ( item );
      };
      uploader.onErrorItem   = ( item: FileItem, response: any ) => {
        this.logger.error ( 'Failed to upload file', item, response );
        observable.error ( response );
      };
      uploader.onCompleteAll = () => {
        observable.complete ();
      };

      uploader.uploadAll ();

      return observable;
    } else {
      return of ( null );
    }
  }
}
