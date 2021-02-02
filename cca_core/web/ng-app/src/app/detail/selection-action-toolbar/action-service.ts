import { Session } from "../../core/session/model/session";
import { SecurityService } from "../../core/security/security.service";
import { Selection, SelectionDataType } from "../../core/session/model/selection";
import { ActionToolbarButtonStatus } from "../../core/action-toolbar/action-toolbar-button-status";

export abstract class ActionService {

  public static readonly NO_PERMISSION   = 'You do not have permission to perform this action.';
  public static readonly NOT_OWN_SESSION = 'Session must be assigned to you to perform this action.';

  constructor ( protected securityService: SecurityService ) {
  }

  isAbleToPerformActions ( session: Session, selection: Selection<any>, action: ActionToolbarButtonStatus ): boolean {
    if ( !this.isSessionAssignedToCurrentUser ( session ) ) {
      action.disabledReason = ActionService.NOT_OWN_SESSION;
    } else if ( !this.isSelectionDataLoaded ( selection ) ) {
      action.disabledReason = 'Card data must be loaded to perform this action.';
    }

    return !action.disabledReason;
  }

  isSelectionDataLoaded ( selection: Selection<SelectionDataType> ): boolean {
    return selection && !!selection.data;
  }

  isSessionAssignedToCurrentUser ( session: Session ): boolean {
    return session && this.securityService.isCurrentUser ( session.user );
  }

}
