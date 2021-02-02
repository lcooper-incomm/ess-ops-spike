import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";
import { WizardPage } from '../../wizard-page';

@Pipe ( {
  name: 'wizardProgressPages'
} )
export class WizardProgressPagesPipe implements PipeTransform {

  transform ( pages: WizardPage<any>[], args?: any ): WizardPage<any>[] {
    let results = _.reject ( pages, function ( page: WizardPage<any> ) {
      return page.isIgnored;
    } );

    //Only allow a Step to take up to a maximum of 25% of the Wizard Progress' space
    let width = Math.min ( 25, Math.floor ( 100 / pages.length ) );
    for ( let result of results ) {
      result.stepperWidth = width + '%';
    }

    return results;
  }
}
