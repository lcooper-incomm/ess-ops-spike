import { Component, OnInit } from '@angular/core';
import { RoboHelpTabComponent } from "../robo-help-tab/robo-help-tab.component";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";

@Component ( {
  selector: 'cca-services-tab',
  templateUrl: './services-tab.component.html',
  styleUrls: [ './services-tab.component.scss' ]
} )
export class ServicesTabComponent extends RoboHelpTabComponent implements OnInit {

  constructor ( protected sanitizer: DomSanitizer,
                protected store: Store<AppState> ) {
    super ( sanitizer, store );
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

}
