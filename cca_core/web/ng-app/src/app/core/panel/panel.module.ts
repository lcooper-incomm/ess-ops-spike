import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CardPanelComponent} from './card-panel/card-panel.component';
import {SimplePanelComponent} from './simple-panel/simple-panel.component';
import {ExpansionPanelComponent} from './expansion-panel/expansion-panel.component';
import {ActionToolbarModule} from "../action-toolbar/action-toolbar.module";
import {DynamicExpansionPanelComponent} from './dynamic-expansion-panel/dynamic-expansion-panel.component';
import {CcaPipesModule} from "../pipes/cca-pipes.module";
import {CcaKeyValueModule} from "../key-value/key-value.module";

@NgModule ( {
  declarations: [
    CardPanelComponent,
    SimplePanelComponent,
    ExpansionPanelComponent,
    DynamicExpansionPanelComponent,
  ],
  exports: [
    CardPanelComponent,
    SimplePanelComponent,
    ExpansionPanelComponent,
    DynamicExpansionPanelComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatExpansionModule,
    ActionToolbarModule,
    CcaPipesModule,
    CcaKeyValueModule
  ]
} )
export class CcaPanelModule {
}
