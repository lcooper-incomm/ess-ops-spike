import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycFailurePageComponent } from './kyc-failure-page/kyc-failure-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatButtonModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { CcaSearchModule } from 'src/app/search/cca-search.module';

@NgModule ( {
  declarations: [ KycFailurePageComponent ],
  entryComponents: [ KycFailurePageComponent ],
  imports: [
    CcaSearchModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ]
} )
export class CcaKycFailureModule {
}
