import { Component, Input, OnInit } from '@angular/core';
import { Selection, SelectionDataType } from "../../../model/selection";
import { CcaBaseComponent } from "../../../../cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { AppStateType } from "../../../../../app-state-type.enum";
import { SessionState } from "../../../session-state";
import { RemoveSelectionWizard } from "./remove-selection-wizard/remove-selection-wizard";
import { WizardRunner } from "../../../../wizard/wizard-runner/wizard-runner.service";
import { SecurityService } from "../../../../security/security.service";
import { Permission } from "../../../../auth/permission";
import { Session } from "../../../model/session";

@Component ( {
  selector: 'cca-selection-button',
  templateUrl: './selection-button.component.html',
  styleUrls: [ './selection-button.component.scss' ]
} )
export class SelectionButtonComponent extends CcaBaseComponent implements OnInit {

  description: string;
  hasRemoveSelectionPermission: boolean = false;
  isActiveSelection: boolean            = false;
  isSelectionMergeable: boolean         = false;

  @Input ()
  isEnabled: boolean = true;

  @Input ()
  selection: Selection<SelectionDataType>;

  private session: Session;

  constructor (
    private securityService: SecurityService,
    private store: Store<AppState>,
    private wizardRunner: WizardRunner,
  ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
    this.handleDescription ();
    this.hasRemoveSelectionPermission = this.securityService.hasPermission ( Permission.REMOVE_SELECTION );
  }

  openRemoveSelection (): void {
    let wizard             = new RemoveSelectionWizard ();
    wizard.model.isActiveSelection = this.isActiveSelection;
    wizard.model.selection = this.selection;
    wizard.model.session = this.session;
    this.wizardRunner.run(wizard);
  }

  private handleDescription (): void {
    let description = this.selection.description;
    if ( this.selection.selectedCard ) {
      description = `**${this.selection.selectedCard.identifiers.panLastFour} | ${description}`;
    }

    this.description = description;
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( {
          next: ( sessionState: SessionState ) => {
            if ( sessionState ) {
              this.session           = sessionState.session;
              this.isActiveSelection = sessionState.selection && sessionState.selection.id === this.selection.id;
              this.handleDescription ();
            }
          }
        } )
    );
  }
}
