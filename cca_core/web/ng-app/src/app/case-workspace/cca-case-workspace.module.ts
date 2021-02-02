import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcaCoreModule } from "../core/cca-core.module";
import { CaseWorkspaceComponent } from './case-workspace.component';
import { EditCaseWizardComponent } from './edit-case-wizard/form-page/edit-case-wizard.component';
import { EditCaseReviewComponent } from './edit-case-wizard/review-page/edit-case-review.component';
import { EditCaseConfirmationComponent } from './edit-case-wizard/confirmation-page/edit-case-confirmation.component';

const componentDeclarations: any[]      = [
  EditCaseConfirmationComponent,
  EditCaseReviewComponent,
  EditCaseWizardComponent,
  CaseWorkspaceComponent
];
const entryComponentDeclarations: any[] = [
  EditCaseConfirmationComponent,
  EditCaseReviewComponent,
  EditCaseWizardComponent,
];

@NgModule ( {
  entryComponents: entryComponentDeclarations,
  exports: componentDeclarations,
  imports: [
    CommonModule,
    CcaCoreModule
  ],
  declarations: componentDeclarations
} )
export class CcaCaseWorkspaceModule {
}
