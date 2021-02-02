import { Injectable } from '@angular/core';
import { Session } from "../../core/session/model/session";
import { Selection } from "../../core/session/model/selection";
import { forkJoin, Observable, of } from "rxjs";
import { ActionToolbarButtonStatus } from "../../core/action-toolbar/action-toolbar-button-status";
import { ActionService } from "./action-service";
import { SecurityService } from "../../core/security/security.service";
import { Permission } from "../../core/auth/permission";
import { ChallengePasswordWizard } from "./challenge-password-wizard/challenge-password-wizard";
import { WizardRunner } from "../../core/wizard/wizard-runner/wizard-runner.service";
import { ActivateFastcardWizard } from '../fastcard-activation/activate-fastcard/activate-fastcard-wizard';
import { Location } from 'src/app/core/node/location/location';

@Injectable ( {
  providedIn: 'root'
} )
export class LocationActionService extends ActionService {

  constructor ( protected securityService: SecurityService,
                private wizardRunner: WizardRunner ) {
    super ( securityService )
  }

  checkActivateFastCard ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Activate Card';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      const wizard           = new ActivateFastcardWizard ();
      wizard.model.selection = selection;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.ACTIVATE_FAST_CARD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must have at least one terminal
      else if ( !selection.terminals.length ) {
        action.disabledReason = 'Location must have at least one Terminal to perform this action.';
      }
      //Must have a hierarchy with at least one Merchant
      else if ( !selection.hierarchy || !selection.hierarchy.merchants.length ) {
        action.disabledReason = 'Location must have at least one Merchant in its Hierarchy to perform this action.';
      }
      //Must have a name
      else if ( !selection.getLocation ().name ) {
        action.disabledReason = 'Location\'s name must be available to perform this action.';
      }
    }

    return of ( action );
  }

  checkChallengePassword ( session: Session, selection: Selection<Location> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Challenge Password';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      let wizard = new ChallengePasswordWizard ();
      this.wizardRunner.run ( wizard )
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.CHALLENGE_PASSWORD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
    }

    return of ( action );
  }

  doAllChecksForSelection ( session: Session, selection: Selection<Location> ): Observable<ActionToolbarButtonStatus[]> {
    return forkJoin (
      this.checkActivateFastCard ( session, selection ),
      this.checkChallengePassword ( session, selection )
    );
  }

}
