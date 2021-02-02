import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { JobDetailsFormPageComponent } from "./job-details-form-page/job-details-form-page.component";

export class JobDetailsWizard extends AbstractWizard<JobDetailsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'job-details';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new JobDetailsWizardModel();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', JobDetailsFormPageComponent );
  }
}

export class JobDetailsWizardModel {
  jobId: number;
}
