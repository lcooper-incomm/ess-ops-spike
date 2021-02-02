import { AppStateType } from '../../../app-state-type.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { CcaBaseComponent } from '../../cca-base-component';
import { Session } from '../model/session';
import { AddCommentAction, SetPendingCommentAction } from '../action/session-actions';
import { Comment } from '../../model/comment';
import { CommentRequest } from '../../model/comment-request';
import { SessionState } from "../session-state";

export abstract class BaseSessionPanel extends CcaBaseComponent {

  session: Session;

  constructor ( private store: Store<AppState> ) {
    super ();
    this.subscribeToSessionState ();
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store
        .select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.session = state.session;
          }
        } )
    );
  }

  onCommentAdded ( comment: Comment ): void {
    this.store.dispatch ( new AddCommentAction ( comment ) );
  }

  onCommentChanged ( comment: CommentRequest ): void {
    // Save comment in state so that it is persisted when comment form is destroyed
    this.store.dispatch ( new SetPendingCommentAction ( comment ) );
  }
}
