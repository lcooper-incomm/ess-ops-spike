import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { Subscription } from "rxjs";
import { AppStateType } from "../../../app-state-type.enum";
import { SupportState } from "../../../core/support/support-state";
import { Property } from "../../../core/model/property";
import * as _ from "lodash";
import { PropertyType } from "../../../core/model/property-type.enum";

@Component ( {
  selector: 'cca-dynamic-jira-portal',
  template: ''
} )
export class DynamicJiraPortalComponent extends CcaBaseComponent implements OnInit {

  private subscription: Subscription;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSupportState ();
  }

  private subscribeToSupportState (): void {
    this.subscription = this.store.select ( AppStateType.SUPPORT_STATE )
      .subscribe ( ( state: SupportState ) => {
        if ( state && state.properties && state.properties.length ) {
          let jiraUrl = this.findJiraCollectorUrlFromProperties ( state.properties );
          if (jiraUrl) {
            this.createScriptElementFromProperty ( jiraUrl );
            this.subscription.unsubscribe ();
          }
        }
      } );

    this.addSubscription (
      this.subscription
    );
  }

  private createScriptElementFromProperty(url:string): void {
    let jiraPortalElement = document.createElement ( 'script' );
    jiraPortalElement.src = url;
    document.body.appendChild(jiraPortalElement);
  }

  private findJiraCollectorUrlFromProperties ( properties: Property[] ): string {
    let property = _.find ( properties, ( property: Property ) => {
      return property.systemName === PropertyType.JIRA_COLLECTOR_URL;
    } );

    return property ? property.value : null;
  }

}
