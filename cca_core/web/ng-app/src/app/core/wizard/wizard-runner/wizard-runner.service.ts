import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { AbstractWizard } from "../abstract-wizard";
import { WizardDialogComponent } from "../wizard-dialog/wizard-dialog.component";
import { SessionState } from "../../session/session-state";
import { snapshot } from "../../store-utils/store-utils";
import { AppStateType } from "../../../app-state-type.enum";
import { RoutingService } from "../../routing/routing.service";
import { RoutePath } from "../../routing/route-path.enum";
import { LoadSelectionsWorkflow } from "../../workflow/load-selections-workflow.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";

@Injectable ( {
  providedIn: 'root'
} )
export class WizardRunner {

  constructor ( private matDialog: MatDialog,
                private loadSelectionWorkflow: LoadSelectionsWorkflow,
                private routingService: RoutingService,
                private store: Store<AppState> ) {
  }

  run<T, S extends AbstractWizard<T>> ( wizard: S ): MatDialogRef<WizardDialogComponent, S> {
    let dialogRef: MatDialogRef<WizardDialogComponent, S> = this.matDialog.open ( WizardDialogComponent, {
      data: wizard,
      disableClose: true,
      hasBackdrop: true,
      id: wizard.key,
      panelClass: 'wizard'
    } );

    dialogRef.beforeClose ().subscribe ( {
      next: ( result: S ) => {
        if ( result.doRefresh ) {
          let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
          let selection                  = sessionState ? sessionState.selection : null;
          if ( selection && this.routingService.isOn ( RoutePath.DETAIL ) ) {
            this.loadSelectionWorkflow.refreshSelection ( selection )
              .subscribe ();
          }
        }
      }
    } );

    return dialogRef;
  }
}
