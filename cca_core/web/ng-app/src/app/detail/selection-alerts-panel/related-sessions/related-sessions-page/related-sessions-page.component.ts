import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RelatedSessionsWizard } from '../related-sessions-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FormGroup } from '@angular/forms';
import { Session } from 'src/app/core/session/model/session';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { Workflow } from 'src/app/core/workflow/workflow.service';
import { SearchParameterValueType } from "../../../../core/search/search-type/search-parameter-value-type.enum";
import { SecurityService } from "../../../../core/security/security.service";
import { Observable, of } from "rxjs";
import { SessionClassType } from "../../../../core/session/session-class-type.enum";
import { Permission } from "../../../../core/auth/permission";
import { SearchTypeContainer } from "../../../../core/search/search-type-container";
import { SearchState } from "../../../../core/search/search-state";
import { snapshot } from "../../../../core/store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";
import { SearchTypeType } from "../../../../core/search/search-type/search-type-type.enum";
import * as _ from "lodash";
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-related-sessions-page',
  templateUrl: './related-sessions-page.component.html',
  styleUrls: [ './related-sessions-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class RelatedSessionsPageComponent extends WizardPage<RelatedSessionsWizard> {

  isCloseable: boolean         = true;
  isSessionSearchable: boolean = false;
  key: string                  = 'form-page';
  wizardForm: FormGroup        = new FormGroup ( {} );

  constructor ( private securityService: SecurityService,
                private store: Store<AppState>, private workflow: Workflow ) {
    super ();
    this.width = WizardWidth.LARGE;
  }

  ngOnInit (): void {
  }

  isSelected ( session: Session ) {
    return this.wizard.model.selectedSession && this.wizard.model.selectedSession.id === session.id;
  }

  onLoad (): Observable<any> {
    this.setIsSessionSearchable ();
    return of ( null );
  }

  searchForSession ( session: Session ): void {
    //Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer ();
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.SESSION_CLASS, session.sessionClassType );
    searchTypeContainer.parameters.set ( SearchParameterValueType.SID, session.id );

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();

    this.close ()
      .subscribe ();
  }

  selectSession ( session: Session ): void {
    this.wizard.model.selectedSession = session;
  }

  private getSearchTypeContainer (): SearchTypeContainer {
    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.cloneDeep ( _.find ( searchState.searchTypeContainers, ( searchTypeContainer: SearchTypeContainer ) => {
      return searchTypeContainer.searchType.type === SearchTypeType.SESSION;
    } ) );
  }

  private setIsSessionSearchable (): void {
    let permission: string;
    switch ( this.wizard.model.selectedSession.sessionClassType ) {
      case SessionClassType.CALL_CENTER:
        permission = Permission.SEARCH_SESSIONS_CALL_CENTER;
        break;
      case SessionClassType.CASE:
        permission = Permission.SEARCH_SESSIONS_CASE;
        break;
      case SessionClassType.GENERAL:
        permission = Permission.SEARCH_SESSIONS_GENERAL;
        break;
      default:
        break;
    }

    this.isSessionSearchable = this.securityService.hasAnyPermission ( [ permission, Permission.SEARCH_SESSIONS_ALL ] );
  }
}
