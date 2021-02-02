import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SessionHistoryService } from '../dock/dock/session-history/session-history.service';
import {
  LoadSessionAction,
  SetSessionHistoryAction,
  UpdateSessionStatusAction,
  SetPendingCommentAction,
  AddCommentAction
} from './action/session-actions';
import { SessionActionType } from './action/session-action-type.enum';

@Injectable ()
export class SessionEffects {

  constructor ( private actions: Actions, private sessionHistoryService: SessionHistoryService ) {
  }

  /**
   * Loads the session history when one of the following actions occur:
   * 1. Session is loaded for the first time
   * 2. Session status is updated
   */
  @Effect ()
  loadSessionHistory: Observable<SetSessionHistoryAction> = this.actions
    .pipe (
      ofType<LoadSessionAction | UpdateSessionStatusAction> ( SessionActionType.LOAD_SESSION, SessionActionType.UPDATE_SESSION_STATUS ),
      switchMap ( action => this.sessionHistoryService.findBySessionId ( action.payload.id ) ),
      map ( history => new SetSessionHistoryAction ( history ) )
    );

  /**
   * Clears the pending session comment whenever the comment is saved or a different session is loaded
   */
  @Effect ()
  clearPendingSessionComment: Observable<SetPendingCommentAction> = this.actions
    .pipe (
      ofType<AddCommentAction | LoadSessionAction> ( SessionActionType.ADD_COMMENT, SessionActionType.LOAD_SESSION ),
      map ( () => new SetPendingCommentAction ( null ) )
    )
}
