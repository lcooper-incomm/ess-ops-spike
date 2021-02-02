import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LocationContactSectionComponent } from './sections/location-contact-section/location-contact-section.component';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import {EncorCustomerSectionComponent} from './sections/encor-customer-section/encor-customer-section.component';
import {EncorProgramSectionComponent} from './sections/encor-program-section/encor-program-section.component';
import {EncorProductsSectionComponent} from './sections/encor-products-section/encor-products-section.component';

@NgModule ( {
  declarations: [
    EncorCustomerSectionComponent,
    EncorProductsSectionComponent,
    EncorProgramSectionComponent,
    LocationContactSectionComponent
  ],
  exports: [
    EncorCustomerSectionComponent,
    EncorProductsSectionComponent,
    EncorProgramSectionComponent,
    LocationContactSectionComponent
  ],
  imports: [
    CcaKeyValueModule,
    CommonModule,
    FlexLayoutModule
  ]
} )
export class CcaSummaryModule {
}
