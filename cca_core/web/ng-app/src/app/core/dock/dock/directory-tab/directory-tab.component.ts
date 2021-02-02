import { Component, OnInit } from '@angular/core';
import { RoboHelpTabComponent } from "../robo-help-tab/robo-help-tab.component";
import { AppState } from "../../../../app-state";
import { Store } from '@ngrx/store';
import { DomSanitizer } from "@angular/platform-browser";

@Component ( {
  selector: 'cca-directory-tab',
  templateUrl: './directory-tab.component.html',
  styleUrls: [ './directory-tab.component.scss' ]
} )
export class DirectoryTabComponent extends RoboHelpTabComponent implements OnInit {

  constructor ( protected sanitizer: DomSanitizer,
                protected store: Store<AppState> ) {
    super ( sanitizer, store );
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

}
