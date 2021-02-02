import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { MaplesOrder, MaplesOrderNotification } from "@cscore/maples-client-model";
import { NotificationDetailsComponent } from "./notification-details/notification-details.component";
import { Selection } from "../../../../core/session/model/selection";

export class NotificationWizard extends AbstractWizard<NotificationWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'notification-details';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new NotificationWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', NotificationDetailsComponent );
  }
}

export class NotificationWizardModel {
  data: MaplesOrderNotification;
  selection: Selection<MaplesOrder>;
}
