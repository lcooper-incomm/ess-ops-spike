import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { AppStateType } from 'src/app/app-state-type.enum';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';
import { SessionHistoryItem } from '../models/session-history-item';
import { Page } from 'src/app/core/model/page';
import { SessionHistoryService } from '../session-history.service';
import { Session } from 'src/app/core/session/model/session';
import { AppendSessionHistoryAction } from 'src/app/core/session/action/session-actions';
import { finalize } from 'rxjs/operators';

@Component ( {
  selector: 'cca-session-history-tab',
  templateUrl: './session-history-tab.component.html',
  styleUrls: [ './session-history-tab.component.scss' ],
} )
export class SessionHistoryTabComponent extends CcaBaseComponent implements OnInit {

  history: Page<SessionHistoryItem>;
  loading: boolean = false;
  private session: Session;

  constructor ( private sessionHistoryService: SessionHistoryService, private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  get currentPage (): number {
    return this.history && this.history.number;
  }

  get totalPages (): number {
    return this.history && this.history.totalPages;
  }

  loadMore (): void {
    this.loading = true;
    this.addSubscription (
      this.sessionHistoryService.findBySessionId ( this.session.id, this.currentPage + 1, this.history.size )
        .pipe (
          finalize ( () => this.loading = false )
        )
        .subscribe ( history => {
          this.store.dispatch ( new AppendSessionHistoryAction ( history ) );
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( sessionState => {
          if ( sessionState && sessionState.history ) {
            this.session = sessionState.session;
            this.history = sessionState.history;
          }
        } )
    );
  }
}
