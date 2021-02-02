import { Injectable } from '@angular/core';
import { LoadSessionWorkflow } from "./load-session-workflow.service";
import { Session } from "../session/model/session";
import { Observable } from "rxjs";
import { ForwardingSearchWorkflow } from "./forwarding-search-workflow.service";
import { SearchTypeContainer } from "../search/search-type-container";
import { AddSelectionToSessionWorkflow } from "./add-selection-to-session-workflow.service";
import { Selection, SelectionDataType } from '../session/model/selection';
import { LoadSelectionsWorkflow } from "./load-selections-workflow.service";
import {finalize, map, tap} from "rxjs/operators";
import { CollapseSessionPanelAction } from "../session/action/session-actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { TransitionService } from "../transition/transition.service";
import { RoutingService } from "../routing/routing.service";
import { RoutePath } from "../routing/route-path.enum";
import {Logger} from '../../logging/logger.service';

/**
 * This service is meant to be a simple convenience facade in front of all the other workflow services, so it can be
 * injected alone wherever workflows need to be called, instead of having to inject multiple workflow services to
 * accomplish what needs to be done. Note that to avoid circular dependencies, the workflows themselves will not inject
 * this service, but will instead inject the specific workflow services they need to interact with.
 *
 * This is purely for convenience and cleanliness throughout the rest of the app.
 */
@Injectable ( {
  providedIn: 'root'
} )
export class Workflow {

  constructor ( private addSelectionToSessionWorkflow: AddSelectionToSessionWorkflow,
                private forwardingSearchWorkflow: ForwardingSearchWorkflow,
                private loadSelectionsWorkflow: LoadSelectionsWorkflow,
                private loadSessionWorkflow: LoadSessionWorkflow,
                private routingService: RoutingService,
                private store: Store<AppState>,
                private logger: Logger,
                private transitionService: TransitionService ) {
  }

  forwardingSearch ( searchTypeContainer: SearchTypeContainer, isUserInitiated: boolean = false ): Observable<any> {
    this.logger.debug('Workflow: forwardingSearch');

    if ( isUserInitiated && !this.routingService.isOn ( RoutePath.SEARCH ) ) {
      this.transitionService.on ();
    }
    return this.forwardingSearchWorkflow.run ( searchTypeContainer, isUserInitiated )
      .pipe (
        finalize ( () => this.transitionService.off () ),
        map ( () => {
          this.store.dispatch ( new CollapseSessionPanelAction () );
        } )
      );
  }

  forwardingSearchForCallConnect (): Observable<any> {
    this.logger.debug('Workflow: forwardingSearchForCallConnect');

    this.transitionService.on ();
    return this.forwardingSearchWorkflow.runForCallConnect ()
      .pipe(
        finalize(() => this.transitionService.off())
      );
  }

  loadSelection ( selection: Selection<any>, skipNavigation: boolean = false ): Observable<any> {
    this.logger.debug('Workflow: loadSelection');

    if ( skipNavigation ) {
      return this.loadSelectionsWorkflow.loadSelectionData ( selection );
    } else {
      return this.loadSelectionsWorkflow.runForSelection ( selection );
    }
  }

  loadSession ( session: Session ): Observable<any> {
    this.logger.debug('Workflow: loadSession');

    this.transitionService.on ();
    return this.loadSessionWorkflow.loadSession ( session )
      .pipe ( finalize ( () => this.transitionService.off () ) );
  }

  loadSessionFromId ( id: number | string, turnOffTransitionOnComplete: boolean = true ): Observable<any> {
    this.logger.debug('Workflow: loadSessionFromId');

    this.transitionService.on ();
    return this.loadSessionWorkflow.loadSessionFromId ( id, turnOffTransitionOnComplete );
  }

  selectSearchResult ( searchTypeContainer: SearchTypeContainer, result: SelectionDataType ): Observable<any> {
    this.logger.debug('Workflow: selectSearchResult');

    this.transitionService.on ();
    return this.addSelectionToSessionWorkflow.runForSearchResult ( searchTypeContainer, result )
      .pipe ( finalize ( () => this.transitionService.off () ) );
  }
}
