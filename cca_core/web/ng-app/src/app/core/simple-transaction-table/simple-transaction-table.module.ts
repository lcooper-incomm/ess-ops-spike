import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTransactionTableComponent } from './simple-transaction-table.component';
import { MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule ( {
  declarations: [ SimpleTransactionTableComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
  ],
  exports: [ SimpleTransactionTableComponent ]
} )
export class SimpleTransactionTableModule {
}
