import { Component, OnInit } from '@angular/core';
import { AbstractDetailSummaryComponent } from "../abstract-detail-summary/abstract-detail-summary.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { DockState } from "../../../core/dock/dock-state";
import { SessionState } from "../../../core/session/session-state";
import { fromEvent } from "rxjs";
import * as $ from "jquery";
import { SelectionType } from "../../../core/session/model/selection-type.enum";
import { PlatformType } from "../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-vertical-detail-summary',
  templateUrl: './vertical-detail-summary.component.html',
  styleUrls: [ './vertical-detail-summary.component.scss' ]
} )
export class VerticalDetailSummaryComponent extends AbstractDetailSummaryComponent implements OnInit {

  isDockPinned: boolean       = false;
  isPinned: boolean           = false;
  isSessionCollapsed: boolean = false;
  PlatformType                = PlatformType;
  SelectionType               = SelectionType;

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.resizeComponentOnResize ();
    this.subscribeToDockState ();
    this.subscribeToSessionState2 ();
    this.subscribeToScrollEvents ();
    this.subscribeToResizeEvents ();
  }

  private repositionComponentOnScroll (): void {
    let detailTabsPanelComponent: JQuery = $ ( '.details-panel-container' );
    if ( detailTabsPanelComponent && detailTabsPanelComponent.offset () ) {
      let fixedOffset  = 80; //Height of navbar + session panel header
      let fixedPadding = 15; //Padding of router-outlet-container

      //Use the tabs component for reference, as it does not change positioning when scrolled
      let verticalOffset = detailTabsPanelComponent.offset ().top;
      this.isPinned      = verticalOffset <= (fixedOffset + fixedPadding);
    }
  }

  private resizeComponentOnResize (): void {
    let windowHeight = window.innerHeight;
    let fixedPadding = 15;

    let fixedOffset = 80; //Height of navbar
    fixedOffset += 40; //Height of action toolbar;

    //Adjust offset if collapsed session panel is present
    let sessionPanelComponent = $ ( '.session-panel-container' );
    if ( sessionPanelComponent && sessionPanelComponent.hasClass ( 'collapsed' ) ) {
      fixedOffset += 40; //Height of collapsed session panel
    }

    //Set the height of the vertical summary
    let dynamicHeight            = windowHeight - fixedOffset - (fixedPadding * 2);
    let summaryComponent: JQuery = $ ( '.vertical-summary' );
    summaryComponent.children ( '.card-container' ).css ( 'height', dynamicHeight );
    summaryComponent.children ( '.card-container' ).css ( 'max-height', dynamicHeight );

    /*
    Set the height of the vertical summary's container, so that regardless of the summary's current display setting, the
    page can still scroll appropriately. I *think* this is only an issue when the right-side container is smaller than
    the left...
     */
    let summaryContainerComponent: JQuery = $ ( '.detail-vertical-summary-container' );
    summaryContainerComponent.css ( 'height', dynamicHeight );
  }

  private subscribeToDockState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_STATE )
        .subscribe ( ( state: DockState ) => {
          this.isDockPinned = state.isPinned && state.isOpen;
        } )
    );
  }

  private subscribeToResizeEvents (): void {
    this.addSubscription (
      fromEvent ( window, 'resize' )
        .subscribe ( ( event ) => {
          this.resizeComponentOnResize ();
        } )
    );
  }

  private subscribeToScrollEvents (): void {
    this.addSubscription (
      fromEvent ( document.getElementsByClassName ( 'router-outlet-container' )[ 0 ], 'scroll' )
        .subscribe ( ( event ) => {
          this.repositionComponentOnScroll ();
          this.resizeComponentOnResize ();
        } )
    );
  }

  private subscribeToSessionState2 (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          this.isSessionCollapsed = state.isCollapsed;
          setTimeout ( () => {
            this.repositionComponentOnScroll ();
            this.resizeComponentOnResize ();
          }, 50 );
        } )
    );
  }
}
