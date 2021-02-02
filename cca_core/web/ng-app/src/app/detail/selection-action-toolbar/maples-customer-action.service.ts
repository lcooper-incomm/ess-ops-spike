import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {forkJoin, Observable, of} from 'rxjs';
import {MaplesCustomer, MaplesIdentificationType} from '@cscore/maples-client-model';
import {ActionService} from './action-service';
import {SecurityService} from '../../core/security/security.service';
import {Session} from '../../core/session/model/session';
import {Selection} from '../../core/session/model/selection';
import {ActionToolbarButtonStatus} from '../../core/action-toolbar/action-toolbar-button-status';
import {AppState} from '../../app-state';
import {snapshot} from '../../core/store-utils/store-utils';
import {AppStateType} from '../../app-state-type.enum';
import {AuthenticationState} from '../../auth/authentication-state';
import {ToastFactory} from '../../toast/toast-factory.service';
import {Permission} from '../../core/auth/permission';

@Injectable({
  providedIn: 'root'
})
export class MaplesCustomerActionService extends ActionService {

  constructor(protected securityService: SecurityService,
              private http: HttpClient,
              private store: Store<AppState>,
              private toast: ToastFactory) {
    super(securityService);
  }

  doAllChecksForSelection(session: Session, selection: Selection<MaplesCustomer>): Observable<ActionToolbarButtonStatus[]> {
    return forkJoin([
      this.checkEmsLink(session, selection),
      this.checkPolarisLink(session, selection),
      this.checkSymphonyLink(session, selection)
    ]);
  }

  checkEmsLink(session: Session, selection: Selection<MaplesCustomer>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Open new browser tab to EMS';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      window.open('https://ems.meridianloyalty.com/', '_blank');
    };

    return of(action);
  }

  checkPolarisLink(session: Session, selection: Selection<MaplesCustomer>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Open new browser tab to Polaris';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      window.open('https://awlservice.epsilon.com/security/logon.aspx', '_blank');
    };

    return of(action);
  }

  checkSymphonyLink(session: Session, selection: Selection<MaplesCustomer>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Impersonate User in Symphony';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      const authState: AuthenticationState = snapshot(this.store, AppStateType.AUTHENTICATION_STATE);
      const emsUserEmailAddress: string = authState && authState.user ? authState.user.email : null;
      const memberExtNumber: string = selection.getMaplesCustomer().getIdentification(MaplesIdentificationType.MEMBER_EXT_NUMBER);
      const programExtNumber: string = selection.getMaplesCustomer().program ? selection.getMaplesCustomer().program.programExtNumber : null;
      if (emsUserEmailAddress && memberExtNumber && programExtNumber) {
        const request: any = {
          emsUserEmailAddress: emsUserEmailAddress.toLowerCase(),
          memberExtNumber: memberExtNumber,
          programExtNumber: programExtNumber
        };
        this.http.post('/rest/encor/symphony-link', request)
          .subscribe((response: any) => {
            if ((response.responseObject && response.responseObject.redirectURL && response.responseObject.redirectURL.startsWith('http'))) {
              window.open(response.responseObject.redirectURL, '_blank');
            } else {
              this.toast.error('Could not generate a Symphony link.');
            }
          });
      } else {
        this.toast.error('Some required parameters are missing');
      }
    };

    if (!this.securityService.hasPermission(Permission.ENCOR_IMPERSONATE_USER)) {
      action.disabledReason = 'You do not have permission.';
    }

    return of(action);
  }
}
