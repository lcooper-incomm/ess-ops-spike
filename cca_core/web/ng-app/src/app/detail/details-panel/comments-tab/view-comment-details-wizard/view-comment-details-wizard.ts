import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { Type } from "@angular/core";
import { ViewCommentDetailComponent } from "./view-comment-detail/view-comment-detail.component";
import { Comment } from "../../../../core/model/comment";

export class ViewCommentDetailsWizard extends AbstractWizard<ViewCommentDetailsWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'comment-details';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new ViewCommentDetailsWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ViewCommentDetailComponent );
  }

}

export class ViewCommentDetailsWizardModel {
  comment: Comment;
  customerId: string;
}
