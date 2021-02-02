import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { BaseSessionPanel } from '../base-session-panel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';

@Component ( {
  selector: 'cca-default-session-panel',
  templateUrl: './default-session-panel.component.html',
  styleUrls: [ './default-session-panel.component.scss' ]
} )
export class DefaultSessionPanelComponent extends BaseSessionPanel {

  @Input ()
  form: FormGroup;

  constructor ( store: Store<AppState> ) {
    super ( store );
  }
}
