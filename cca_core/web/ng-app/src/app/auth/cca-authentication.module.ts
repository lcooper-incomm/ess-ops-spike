import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from "./authentication.service";
import { CcaCoreModule } from "../core/cca-core.module";
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CcaMaterialModule } from "../core/material/cca-material.module";

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CcaCoreModule,
    CcaMaterialModule
  ],
  declarations: [ LoginComponent ],
  providers: [
    AuthenticationService
  ]
} )
export class CcaAuthenticationModule {
}
