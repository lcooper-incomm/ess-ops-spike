import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailSupportFormPageComponent } from "./email-support-wizard/email-support-form-page/email-support-form-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CcaCoreModule } from "../core/cca-core.module";
import { CcaMaterialModule } from "../core/material/cca-material.module";
import { DynamicJiraPortalComponent } from "./dynamic-jira-portal/dynamic-jira-portal/dynamic-jira-portal.component";

const componentDeclarations: any[] = [
  DynamicJiraPortalComponent,
  EmailSupportFormPageComponent
];

const entryComponentDeclarations: any[] = [
  EmailSupportFormPageComponent
];

@NgModule({
  exports: componentDeclarations,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CcaCoreModule,
    CcaMaterialModule
  ],
  declarations: componentDeclarations,
  entryComponents: entryComponentDeclarations
})
export class CcaUserMenuModule { }
