import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionGroupItemComponent } from './selection-group-item/selection-group-item.component';
import { SelectionGroupItemPipe } from './selection-group-item.pipe';
import { SelectionGroupItemCustomerChildrenPipe } from './selection-group-item-customer-children.pipe';
import { SelectionGroupItemOrderChildrenPipe } from './selection-group-item-order-children.pipe';
import { SelectionGroupPipe } from './selection-group.pipe';
import { SelectionsTabComponent } from './selections-tab.component';
import { SelectionsGroupComponent } from './selections-group/selections-group.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule, MatTooltipModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CcaStatusModule } from 'src/app/core/status/status.module';
import { CcaSpinnerModule } from 'src/app/core/spinner/cca-spinner.module';
import { CcaPipesModule } from 'src/app/core/pipes/cca-pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { CcaClickSwallowerModule } from 'src/app/core/click-swallower/click-swallower.module';
import { SelectionChildCardComponent } from './selection-child-card/selection-child-card.component';
import { SelectionDrawerPaginatorComponent } from './selection-drawer-paginator/selection-drawer-paginator.component';
import { SelectionGroupItemAccountChildrenPipe } from './selection-group-item-account-children.pipe';
import { SelectionGroupItemStatusComponent } from './selection-group-item-status/selection-group-item-status.component';

@NgModule ( {
  declarations: [
    SelectionChildCardComponent,
    SelectionDrawerPaginatorComponent,
    SelectionGroupItemAccountChildrenPipe,
    SelectionGroupItemComponent,
    SelectionGroupItemCustomerChildrenPipe,
    SelectionGroupItemOrderChildrenPipe,
    SelectionGroupItemPipe,
    SelectionGroupItemStatusComponent,
    SelectionGroupPipe,
    SelectionsGroupComponent,
    SelectionsTabComponent,
  ],
  exports: [
    SelectionsTabComponent,
  ],
  imports: [
    CcaClickSwallowerModule,
    CcaFormsModule,
    CcaPipesModule,
    CcaSpinnerModule,
    CcaStatusModule,
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [
    SelectionGroupItemAccountChildrenPipe,
    SelectionGroupItemCustomerChildrenPipe,
    SelectionGroupItemOrderChildrenPipe,
    SelectionGroupItemPipe,
    SelectionGroupPipe,
  ]
} )
export class CcaSelectionsTabModule {
}
