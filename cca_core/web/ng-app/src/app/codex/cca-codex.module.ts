import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { CscoreCodexModule } from "@cscore/codex";

const componentDeclarations: any[] = [];

const moduleDeclarations: any[] = [
  CommonModule,
  HttpClientModule,
  CscoreCodexModule
];

@NgModule ( {
  exports: moduleDeclarations
    .concat ( componentDeclarations ),
  imports: moduleDeclarations,
  declarations: componentDeclarations,
  providers: []
} )
export class CcaCodexModule {
}
