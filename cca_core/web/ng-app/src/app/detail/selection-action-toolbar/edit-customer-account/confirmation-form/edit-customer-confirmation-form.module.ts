import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCustomerConfirmationFormComponent } from './edit-customer-confirmation-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CcaPipesModule } from 'src/app/core/pipes/cca-pipes.module';

@NgModule ( {
  declarations: [ EditCustomerConfirmationFormComponent ],
  exports: [ EditCustomerConfirmationFormComponent ],
  imports: [
    CcaFormsModule,
    CcaKeyValueModule,
    CcaPipesModule,
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
} )
export class CcaEditCustomerConfirmationFormModule {
}
