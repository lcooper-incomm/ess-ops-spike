import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Logger } from "./logger.service";

@NgModule ( {
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    DatePipe,
    Logger
  ]
} )
export class CcaLoggingModule {
}
