import { AbstractWizard } from "../../../../wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../wizard/wizard-page";
import { ViewCommentsFormPageComponent } from "./view-comments-form-page/view-comments-form-page.component";
import { Comment } from "../../../../model/comment";

export class ViewCommentsWizard extends AbstractWizard<ViewCommentsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'view-comments';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new ViewCommentsWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ViewCommentsFormPageComponent );
  }

}

export class ViewCommentsWizardModel {
  comments: Comment[] = [];
  selectedComment: Comment;
}
