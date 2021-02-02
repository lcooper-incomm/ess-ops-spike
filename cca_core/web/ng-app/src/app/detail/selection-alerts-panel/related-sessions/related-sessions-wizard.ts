import { Type } from "@angular/core";
import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import { RelatedSessionsPageComponent } from "./related-sessions-page/related-sessions-page.component";
import { Session } from "src/app/core/session/model/session";

export class RelatedSessionsWizard extends AbstractWizard<RelatedSessionsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'related-sessions';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new RelatedSessionsWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', RelatedSessionsPageComponent );
  }
}

export class RelatedSessionsWizardModel {
  sessions: Session[] = [];
  selectedSession: Session;
}
