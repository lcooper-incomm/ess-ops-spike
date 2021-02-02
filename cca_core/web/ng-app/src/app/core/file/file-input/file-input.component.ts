import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { Logger } from 'src/app/logging/logger.service';

@Component ( {
  selector: 'cca-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: [ './file-input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class FileInputComponent implements OnChanges {
  @Input () uploader: FileUploader;
  @Input () label: string = 'Select File';

  @Output () selectFile: EventEmitter<void>        = new EventEmitter ();
  @Output () selectFileError: EventEmitter<string> = new EventEmitter ();

  @ViewChild ( 'fileInput' ) fileInput: ElementRef;

  fileSelectError: string;

  constructor ( private logger: Logger ) {
  }

  ngOnChanges ( changes: SimpleChanges ) {
    if ( 'uploader' in changes && this.uploader ) {
      this.uploader.onWhenAddingFileFailed = ( item: FileLikeObject, filter: any, options: any ) => {
        if ( filter.name === 'fileSize' ) {
          this.fileSelectError = 'File cannot exceed 10MB';
        } else {
          this.fileSelectError = 'An unexpected error occurred';
          this.logger.error ( 'Unknown file selection error', item, filter, options );
        }
        this.selectFileError.emit ( this.fileSelectError );
      };
    }
  }

  handleFileSelected (): void {
    //Only allow one file in the queue at a time
    if ( this.uploader.queue.length > 1 ) {
      this.uploader.queue.shift ();
    }
    if ( this.uploader.queue.length > 0 ) {
      this.selectFile.emit ();
    }
  }

  triggerFileSelect (): void {
    this.fileSelectError = null;
    this.fileInput.nativeElement.click ();
  }
}
