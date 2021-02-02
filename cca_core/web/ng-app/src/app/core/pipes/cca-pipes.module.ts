import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanPipe } from './boolean.pipe';
import { OrderByPipe } from './order-by.pipe';
import { LimitPipe } from './limit.pipe';
import { ReversePipe } from './reverse.pipe';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule ( {
  declarations: [
    BooleanPipe,
    LimitPipe,
    OrderByPipe,
    ReversePipe,
    EllipsisPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BooleanPipe,
    LimitPipe,
    OrderByPipe,
    ReversePipe,
    EllipsisPipe,
  ]
} )
export class CcaPipesModule {
}
