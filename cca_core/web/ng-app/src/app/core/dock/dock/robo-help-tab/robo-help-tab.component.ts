import { Component } from '@angular/core';
import { CcaBaseComponent } from "../../../cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component ( {
  selector: 'cca-robo-help-tab',
  template: ''
} )
export class RoboHelpTabComponent extends CcaBaseComponent {

  directoryRoboHelpUrl: SafeResourceUrl;
  linksRoboHelpUrl: SafeResourceUrl;
  queueRoboHelpUrl: SafeResourceUrl;
  servicesRoboHelpUrl: SafeResourceUrl;

  private currentLocale: string;
  private roboHelpId: number;
  private roboHelpUrl: string = 'https://jaxintranet.incomm.com/CCA/'; //TODO add this to properties instead

  constructor ( protected sanitizer: DomSanitizer,
                protected store: Store<AppState> ) {
    super ();
  }

  private setDirectoryUrl (): void {
    let url: string           = this.roboHelpUrl + this.currentLocale + '.directory.htm';
    this.directoryRoboHelpUrl = this.trust ( url );
  }

  private setLinksUrl (): void {
    let url: string       = this.roboHelpUrl + this.currentLocale + '.links.htm';
    this.linksRoboHelpUrl = this.trust ( url );
  }

  private setQueueUrl (): void {
    let url: string       = this.roboHelpUrl + this.currentLocale + this.roboHelpId + '/startMenu.htm';
    this.queueRoboHelpUrl = this.trust ( url );
  }

  private setServicesUrl (): void {
    let url: string          = this.roboHelpUrl + this.currentLocale + '.services.htm';
    this.servicesRoboHelpUrl = this.trust ( url );
  }

  subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
        next: sessionState => {
          if ( sessionState
            && sessionState.session
            && sessionState.session.queue ) {
            this.currentLocale = sessionState.session.queue.locale;
            this.roboHelpId    = sessionState.session.queue.roboHelpId;
            this.setDirectoryUrl ();
            this.setLinksUrl ();
            this.setQueueUrl ();
            this.setServicesUrl ();
          } else {
            this.currentLocale        = null;
            this.directoryRoboHelpUrl = null;
            this.linksRoboHelpUrl     = null;
            this.queueRoboHelpUrl     = null;
            this.roboHelpId           = null;
            this.servicesRoboHelpUrl  = null;
          }
        }
      } )
    );
  }

  private trust ( url: string ): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl ( url );
  }

}
