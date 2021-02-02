import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { WizardPage } from "../../wizard-page";
import { AbstractWizard } from "../../abstract-wizard";

@Component ( {
  selector: 'cca-wizard-progress',
  templateUrl: './wizard-progress.component.html',
  styleUrls: [ './wizard-progress.component.scss' ]
} )
export class WizardProgressComponent implements OnInit {

  @Input ()
  pages: Map<string, ComponentRef<WizardPage<any>>>;
  @Input ()
  wizard: AbstractWizard<any>;

  constructor () {
  }

  ngOnInit () {

  }

  getCurrentPage (): WizardPage<any> {
    return this.pages.get ( this.wizard.currentPageKey ).instance;
  }

  getPages (): WizardPage<any>[] {
    let pages: WizardPage<any>[] = [];

    this.pages.forEach ( ( page: ComponentRef<WizardPage<any>> ) => {
      pages.push ( page.instance );
    } );

    return pages;
  }

  skipToPage ( pageKey: string ): void {
    //TODO eventemitter or something here?
  }

}
