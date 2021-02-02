import {Component, OnInit} from '@angular/core';
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {ActionToolbarButtonStatus} from "../../../../core/action-toolbar/action-toolbar-button-status";
import {Selection} from "../../../../core/session/model/selection";
import {Session} from "../../../../core/session/model/session";
import {AppStateType} from "../../../../app-state-type.enum";
import {tap} from "rxjs/operators";
import {SessionState} from "../../../../core/session/session-state";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app-state";
import {ToastFactory} from "../../../../toast/toast-factory.service";

@Component({
  selector: 'cca-account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.scss']
})
export class AccountPersonalInfoComponent extends CcaBaseComponent implements OnInit {

  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = false;
  selection: Selection<any>;
  session: Session;

  constructor(private store: Store<AppState>,
              private toastService: ToastFactory) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();
  }

  copyToClipboard() {
    //could add a module or simply manipulate the DOM momentarily to copy to the clipboard - it has to be a textarea
    let tempContainer = document.createElement('textarea');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '0';
    tempContainer.style.top = '0';
    tempContainer.style.opacity = '0';
    //since it is only going to be used for username, we can pass the value directly from the selection
    tempContainer.value = this.selection.getCustomerAccount().customer.username;
    document.body.appendChild(tempContainer);
    tempContainer.focus();
    tempContainer.select();
    document.execCommand('copy');
    document.body.removeChild(tempContainer);

    this.toastService.success("Copied username to clipboard!");
  }

  private subscribeToSessionState(): void {
    this.buildingActions = true;
    const complete       = () => this.buildingActions = false;
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .pipe(tap(complete, complete))
        .subscribe((state: SessionState) => {
          if (state) {
            this.session   = state.session;
            this.selection = state.selection;

            //TODO add actions
          }
        })
    );
  }

}
