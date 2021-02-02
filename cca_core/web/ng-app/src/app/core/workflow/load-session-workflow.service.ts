import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SessionService} from '../session/session.service';
import {TransitionService} from '../transition/transition.service';
import {RoutingService} from '../routing/routing.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-state';
import {CloseDockTabAction} from '../dock/action/close-dock-tab-action';
import {finalize, flatMap, mapTo} from 'rxjs/operators';
import {UrlQueryParam} from '../routing/url-query-param.enum';
import {LoadSessionAction} from '../session/action/session-actions';
import {Session} from '../session/model/session';
import * as _ from 'lodash';
import {SelectionType} from '../session/model/selection-type.enum';
import {Logger} from '../../logging/logger.service';
import {LoadSelectionsWorkflow} from './load-selections-workflow.service';
import {ClearDockSelectionsTabAction} from '../dock/dock/selections-tab/dock-selections-tab-actions';
import {Selection, SelectionDataType} from '../session/model/selection';
import {ForwardingSearchWorkflow} from './forwarding-search-workflow.service';
import {SessionTypeType} from '../session/session-type-type.enum';

@Injectable ( {
  providedIn: 'root'
} )
export class LoadSessionWorkflow {

  constructor(private forwardingSearchWorkflow: ForwardingSearchWorkflow,
              private loadSelectionsWorkflow: LoadSelectionsWorkflow,
              private logger: Logger,
              private routingService: RoutingService,
              private sessionService: SessionService,
              private store: Store<AppState>,
              private transitionService: TransitionService ) {
  }

  loadSession ( session: Session ): Observable<any> {
    this.logger.debug('LoadSessionWorkflow: loadSession');

    this.store.dispatch ( new ClearDockSelectionsTabAction () );

    this.transitionService.on ();

    this.preProcessSession ( session );

    return this.delegateToNextStep ( session )
      .pipe (
        mapTo ( session ),
        finalize ( () => {
          this.logger.debug('LoadSessionWorkflow: Finalize loadSession');
        } )
      );
  }

  loadSessionFromId ( id: number | string, turnOffTransitionOnComplete: boolean = true ): Observable<any> {
    this.logger.debug('LoadSessionWorkflow: loadSessionFromId');

    this.store.dispatch ( new CloseDockTabAction () );
    this.transitionService.on ();

    return this.sessionService.findSession ( id )
      .pipe (
        flatMap ( ( session: Session ) => {
          return this.loadSession(session);
        } ),
        finalize ( () => {
          if ( turnOffTransitionOnComplete ) {
            this.transitionService.off ();
          }
          this.logger.debug('LoadSessionWorkflow: Finalize loadSessionFromId');
        } )
      );
  }

  /**
   * How exactly the session is loaded depends on whether it has selections.
   */
  private delegateToNextStep ( session: Session ): Observable<any> {
    this.logger.debug('LoadSessionWorkflow: delegateToNextStep');

    if ( session.selections.length ) {
      return this.loadSelectionsWorkflow.run ();
    } else if (session.sessionTypeType === SessionTypeType.CALL) {
      return this.forwardingSearchWorkflow.runForCallConnect();
    } else {
      this.logger.info ( 'Skipping Load Selections Workflow - No Selections Available' );
      return of ( null );
    }
  }

  /**
   * We do not want to allow legacy selections (defined by type) to appear in the UI, so we filter them out here before
   * loading the session's details any further.
   */
  private filterLegacySelections ( session: Session ): void {
    session.selections = _.reject ( session.selections, ( selection: Selection<SelectionDataType> ) => {
      return selection.type === SelectionType.JIRA;
    } );
  }

  private preProcessSession ( session: Session ): void {
    this.routingService.setQueryParam ( UrlQueryParam.SESSION_SESSION_ID, session.id );
    this.filterLegacySelections ( session );
    this.store.dispatch ( new LoadSessionAction ( session ) );
  }
}
