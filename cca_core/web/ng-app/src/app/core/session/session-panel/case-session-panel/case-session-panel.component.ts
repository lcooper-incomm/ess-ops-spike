import {Component, Input, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app-state';
import {BaseSessionPanel} from '../base-session-panel';
import {SessionFeedbackService} from "../../session-feedback.service";
import {SessionService} from '../../session.service';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component ( {
  selector: 'cca-case-session-panel',
  templateUrl: './case-session-panel.component.html',
  styleUrls: [ './case-session-panel.component.scss' ]
} )
export class CaseSessionPanelComponent extends BaseSessionPanel {

  @Input ()
  form: FormGroup;

  isGeneralComponentValid: boolean = false;

  constructor ( store: Store<AppState>,
                private sessionFeedbackService: SessionFeedbackService) {
    super ( store );
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    if ( 'form' in changes && this.form ) {
      this.validateGeneralComponent ();
    }
  }

  private validateGeneralComponent (): void {
    const errorMessages: string[] = [];
    this.sessionFeedbackService.validateGeneralComponent ( this.session, errorMessages );
    this.isGeneralComponentValid = !errorMessages.length;
  }
}
