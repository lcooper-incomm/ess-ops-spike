import {AbstractWizard} from "src/app/core/wizard/abstract-wizard";
import {WizardPage} from "src/app/core/wizard/wizard-page";
import {Type} from "@angular/core";
import {ViewDisputeFormPageComponent} from './view-dispute-form-page/view-dispute-form-page.component';
import {Transaction} from "src/app/core/transaction/transaction";
import {Selection} from "src/app/core/session/model/selection";
import {SelectionDataType} from '../../../session/model/selection';
import {PlatformType} from "../../../platform/platform-type.enum";
import {ViewGreencardDisputeFormPageComponent} from "../../greencard-actions/view-greencard-dispute/view-greencard-dispute-form-page/view-greencard-dispute-form-page.component";
import {Session} from "../../../session/model/session";
import {SessionQueue} from "../../../session/model/session-queue";

export class ViewDisputeWizard extends AbstractWizard<ViewDisputeWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'view-dispute';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new ViewDisputeWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    if(this.model.selection.platform == PlatformType.GREENCARD)
    {
      pageMap.set ( 'form-page', ViewGreencardDisputeFormPageComponent);
    }
    else {
      pageMap.set ( 'form-page', ViewDisputeFormPageComponent );
    }
  }
}

export class ViewDisputeWizardModel {
  selection: Selection<SelectionDataType>;
  transaction: Transaction;
  session: Session;
  dispute: any;

  get queue():SessionQueue {
    return this.session.queue;
  }
}
