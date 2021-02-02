import {Component, Input, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {MaplesCard} from '@cscore/maples-client-model';
import {ActionToolbarButtonStatus} from '../../../../../core/action-toolbar/action-toolbar-button-status';
import {Selection} from '../../../../../core/session/model/selection';
import {Session} from '../../../../../core/session/model/session';
import {CodexService} from '../../../../../codex/codex.service';
import {SecurityService} from '../../../../../core/security/security.service';
import {AppState} from '../../../../../app-state';
import {AppStateType} from '../../../../../app-state-type.enum';
import {SessionState} from '../../../../../core/session/session-state';
import {CcaBaseComponent} from '../../../../../core/cca-base-component';
import {CardActionService} from '../../../../selection-action-toolbar/card-action.service';

@Component({
  selector: 'cca-customer-card-serve-toolbar',
  templateUrl: './customer-card-serve-toolbar.component.html',
  styleUrls: ['./customer-card-serve-toolbar.component.scss']
})
export class CustomerCardServeToolbarComponent extends CcaBaseComponent implements OnInit {

  @Input()
  card: MaplesCard;

  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = false;
  selection: Selection<any>;

  private session: Session;

  constructor(private codexService: CodexService,
              private cardActionService: CardActionService,
              private securityService: SecurityService,
              private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();
  }

  private buildActions(): void {
    this.buildingActions = true;

    forkJoin([
      this.cardActionService.checkActivateServeCard(this.session, this.selection, this.card),
      this.cardActionService.checkServeChangeCardStatus(this.selection, this.card)
    ]).pipe(
      finalize(() => this.buildingActions = false)
    ).subscribe((actions: ActionToolbarButtonStatus[]) => {
      this.actions = actions;
    });
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.session) {
            this.session = state.session;
          }

          if (state && state.selection) {
            this.selection = state.selection;

            if (this.selection.getCustomerAccount()) {
              this.buildActions();
            }
          }
        })
    );
  }
}
