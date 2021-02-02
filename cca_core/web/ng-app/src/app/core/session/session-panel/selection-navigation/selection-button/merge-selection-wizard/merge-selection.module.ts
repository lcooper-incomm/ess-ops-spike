import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
  MatButtonModule,
  MatCardModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CcaPipesModule } from 'src/app/core/pipes/cca-pipes.module';
import { CcaSessionComponentsModule } from 'src/app/core/session/session-components/session-components.module';
import { CcaStatusModule } from 'src/app/core/status/status.module';
import { MergeSelectionConfirmationPageComponent } from './merge-selection-confirmation-page/merge-selection-confirmation-page.component';
import { MergeSelectionPopulateComponentPageComponent } from './merge-selection-populate-component-page/merge-selection-populate-component-page.component';
import { MergeSelectionSelectComponentPageComponent } from './merge-selection-select-component-page/merge-selection-select-component-page.component';
import { SelectionToCardsComponentComponent } from './selection-to-cards-component/selection-to-cards-component.component';
import { SelectionToCustomerComponentComponent } from './selection-to-customer-component/selection-to-customer-component.component';
import { SelectionToMerchantComponentComponent } from './selection-to-merchant-component/selection-to-merchant-component.component';
import { AssignCardSetFormComponent } from './assign-card-set-form/assign-card-set-form.component';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { MergeFieldComponent } from './merge-field/merge-field.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MergeSelectionResultPageComponent } from './merge-selection-result-page/merge-selection-result-page.component';
import { CcaAddressModule } from 'src/app/core/address/address.module';
import { MergeFieldListComponent } from './merge-field-list/merge-field-list.component';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { SelectionCardInformationComponent } from './selection-card-information/selection-card-information.component';

@NgModule ( {
  declarations: [
    AssignCardSetFormComponent,
    MergeFieldComponent,
    MergeSelectionConfirmationPageComponent,
    MergeSelectionPopulateComponentPageComponent,
    MergeSelectionResultPageComponent,
    MergeSelectionSelectComponentPageComponent,
    SelectionToCardsComponentComponent,
    SelectionToCustomerComponentComponent,
    SelectionToMerchantComponentComponent,
    MergeFieldListComponent,
    SelectionCardInformationComponent,
  ],
  entryComponents: [
    MergeSelectionConfirmationPageComponent,
    MergeSelectionPopulateComponentPageComponent,
    MergeSelectionResultPageComponent,
    MergeSelectionSelectComponentPageComponent,
  ],
  imports: [
    CcaAddressModule,
    CcaFormsModule,
    CcaKeyValueModule,
    CcaPipesModule,
    CcaSessionComponentsModule,
    CcaStatusModule,
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ]
} )
export class CcaMergeSelectionModule {
}
