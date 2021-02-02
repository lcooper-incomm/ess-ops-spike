import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Customer } from "src/app/core/customer/customer";
import { Card } from "src/app/core/card/card";
import { CardsComponentCard } from "../../model/cards-component-card";
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { Selection } from '../../model/selection';
import { Session } from '../../model/session';
import { EditCaseCardPageComponent } from './edit-case-card-page/edit-case-card-page.component';

export class EditCaseCardWizard extends AbstractWizard<EditCaseCardWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'edit-case-card';
  startingPageKey: string = 'page';

  constructor () {
    super ();
    this.model     = new EditCaseCardWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'page', EditCaseCardPageComponent );
  }
}

export class EditCaseCardWizardModel {
  card: CardsComponentCard;
  selection: Selection<Customer | Card>;
  session: Session;
}
