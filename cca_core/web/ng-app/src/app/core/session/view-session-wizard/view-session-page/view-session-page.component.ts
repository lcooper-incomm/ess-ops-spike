import { Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ViewSessionWizard } from '../view-session-wizard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { SessionService } from '../../session.service';
import { SessionClassType } from '../../session-class-type.enum';
import { Workflow } from '../../../workflow/workflow.service';

@Component ( {
  selector: 'cca-view-session-page',
  templateUrl: './view-session-page.component.html',
  styleUrls: [ './view-session-page.component.scss' ],
} )
export class ViewSessionPageComponent extends WizardPage<ViewSessionWizard> {
  key: string           = 'page';
  wizardForm: FormGroup = new FormGroup ( {
    'comment': new FormControl ( null, [ Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ),
    'isPrivate': new FormControl ( false ),
  } );

  readonly SessionClassType = SessionClassType;

  constructor ( private sessionService: SessionService, private workflow: Workflow ) {
    super ();
    this.isCloseable = true;
    this.width       = WizardWidth.EXTRA_LARGE;

  }


  onCommentAdded () {
    let skipActivate = true;
    this.addSubscription (
      this.sessionService
        .findSession ( this.wizard.model.session.id, skipActivate )
        .subscribe ( session => {
          this.wizard.model.session   = session;
          this.wizard.model.isUpdated = true;
        } )
    );
  }
}
