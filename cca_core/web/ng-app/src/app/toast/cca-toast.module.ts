import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastManagerComponent } from './toast-manager/toast-manager.component';
import { ToastComponent } from "./toast-manager/toast/toast.component";
import { ToastFactory } from "./toast-factory.service";
import { CcaCoreModule } from '../core/cca-core.module';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const componentDeclarations = [
  ToastComponent,
  ToastManagerComponent
];

@NgModule ( {
  exports: componentDeclarations,
  imports: [
    FontAwesomeModule,
    CcaCoreModule,
    CommonModule
  ],
  declarations: componentDeclarations,
  providers: [
    ToastFactory
  ]
} )
export class CcaToastModule {
}
