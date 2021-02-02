import { AbstractWizard } from "../../wizard/abstract-wizard";
import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ViewSessionPageComponent } from "./view-session-page/view-session-page.component";
import { Session } from "../model/session";
import { User } from '../../user/user';
import { Selection } from '../model/selection';
import { SearchTypeContainer } from "../../search/search-type-container";

export class ViewSessionWizard extends AbstractWizard<ViewSessionWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'view-session';
  startingPageKey: string = 'page';

  constructor () {
    super ();
    this.model     = new ViewSessionWizardModel ();
    this.doRefresh = true;

  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
    }
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    super.buildPlaceholders ( user, selection );
    this.placeholderDictionary.addPlaceholder ( 'SESSION_ID', this.model.session.id.toString () );
    this.placeholderDictionary.addPlaceholder ( 'SESSION_TYPE', this.model.session.sessionType.displayName );
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'page', ViewSessionPageComponent );
  }
}

export class ViewSessionWizardModel {
  isUpdated: boolean = false;
  searchType: SearchTypeContainer;
  session: Session;
}
