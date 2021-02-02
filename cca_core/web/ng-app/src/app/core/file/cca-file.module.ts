import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './file-input/file-input.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';

@NgModule ( {
  declarations: [ FileInputComponent ],
  imports: [
    CommonModule,
    FileUploadModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [ FileInputComponent ],
} )
export class CcaFileModule {
}
