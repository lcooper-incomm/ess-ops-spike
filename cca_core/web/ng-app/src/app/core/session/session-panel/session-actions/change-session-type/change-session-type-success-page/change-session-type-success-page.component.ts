import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ChangeSessionTypeWizard } from "../change-session-type-wizard";
import { FormGroup } from "@angular/forms";
import { Workflow } from "../../../../../workflow/workflow.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../app-state";
import { DismissSessionAction } from "../../../../action/session-actions";
import { Observable, of } from 'rxjs';
import { SessionState } from "../../../../session-state";
import { snapshot } from "../../../../../store-utils/store-utils";
import { AppStateType } from "../../../../../../app-state-type.enum";
import { map } from 'rxjs/operators';
import { Session } from "../../../../model/session";
import { Selection } from "../../../../model/selection";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-change-session-type-success-page',
  templateUrl: './change-session-type-success-page.component.html',
  styleUrls: [ './change-session-type-success-page.component.scss' ]
} )
export class ChangeSessionTypeSuccessPageComponent extends WizardPage<ChangeSessionTypeWizard> implements OnInit {

  isCloseable: boolean  = true;
  key: string           = 'success-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private store: Store<AppState>,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
  }

  onClose (): Observable<any> {
    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    let currentSelection           = sessionState.selection;

    this.store.dispatch ( new DismissSessionAction () );
    this.workflow.loadSessionFromId ( this.wizard.model.session.id )
      .pipe ( map ( ( session: Session ) => {
        if ( currentSelection ) {
          let selectionIndex = _.findIndex ( session.selections, ( selection: Selection<any> ) => {
            return selection.id === currentSelection.id;
          } );

          if ( selectionIndex >= 0 ) {
            let selection = session.selections[ selectionIndex ];
            this.workflow.loadSelection ( selection )
              .subscribe ();
          }
        }
      } ) )
      .subscribe ();
    return of ( null );
  }
}
