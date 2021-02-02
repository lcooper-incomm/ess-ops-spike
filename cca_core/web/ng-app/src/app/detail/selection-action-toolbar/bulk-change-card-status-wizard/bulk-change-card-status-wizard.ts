import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { BulkChangeCardStatusComponent } from "./bulk-change-card-status/bulk-change-card-status.component";
import { BulkChangeCardStatusReviewComponent } from "./bulk-change-card-status-review/bulk-change-card-status-review.component";
import { BulkChangeCardStatusConfirmationComponent } from "./bulk-change-card-status-confirmation/bulk-change-card-status-confirmation.component";
import { MaplesOrder, MaplesOrderItemCard } from "@cscore/maples-client-model";
import { Selection } from "../../../core/session/model/selection";
import { Job } from "../../../core/model/minion/job";
import { FsapiStatusType } from "../../../core/status/fsapi-status/fsapi-status-type.enum";

export class BulkChangeCardStatusWizard extends AbstractWizard<BulkChangeCardStatusWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'bulk-change-status';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new BulkChangeCardStatusWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', BulkChangeCardStatusComponent );
    pageMap.set ( 'review-page', BulkChangeCardStatusReviewComponent );
    pageMap.set ( 'confirmation-page', BulkChangeCardStatusConfirmationComponent );
  }
}

export class BulkChangeCardStatusWizardModel {
  cards: MaplesOrderItemCard[] = [];
  isFailed: boolean      = false;
  jobId: number;
  request: Job;
  selection: Selection<MaplesOrder>;
  targetStatus: FsapiStatusType;
}
