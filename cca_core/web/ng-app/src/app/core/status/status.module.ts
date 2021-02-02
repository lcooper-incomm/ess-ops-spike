import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material';
import { FsapiStatusComponent } from './fsapi-status/fsapi-status.component';
import { GreencardStatusComponent } from './greencard-status/greencard-status.component';
import { IncommStatusComponent } from './incomm-status/incomm-status.component';
import { SessionStatusComponent } from './session-status/session-status.component';
import { CardStatusComponent } from './card-status/card-status.component';
import { OrderPaymentStatusComponent } from "./order-payment-status/order-payment-status.component";
import { ServeAccountStatusComponent } from './serve-account-status/serve-account-status.component';
import { ServeCardStatusComponent } from './serve-card-status/serve-card-status.component';
import { VanillaDirectStatusComponent } from './vanilla-direct-status/vanilla-direct-status.component';
import { StatusComponent } from './status/status.component';
import { LocationStatusComponent } from './location-status/location-status.component';
import { EcommOrderStateComponent } from './ecomm-order-state/ecomm-order-state.component';
import { DdpStatusComponent } from './ddp-status/ddp-status.component';
import { BooleanStatusComponent } from './boolean-status/boolean-status.component';
import {AlderOrderStatusComponent} from './alder-order-status/alder-order-status.component';

const components = [
  AlderOrderStatusComponent,
  BooleanStatusComponent,
  CardStatusComponent,
  DdpStatusComponent,
  EcommOrderStateComponent,
  FsapiStatusComponent,
  GreencardStatusComponent,
  IncommStatusComponent,
  LocationStatusComponent,
  OrderPaymentStatusComponent,
  ServeAccountStatusComponent,
  ServeCardStatusComponent,
  SessionStatusComponent,
  StatusComponent,
  VanillaDirectStatusComponent,
];

@NgModule ( {
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    MatTooltipModule,
  ]
} )
export class CcaStatusModule {
}
