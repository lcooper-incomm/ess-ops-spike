import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable, Subscription } from "rxjs";
import { CcaBaseComponent } from "../../cca-base-component";

@Component ( {
  selector: 'cca-count-down-toggle-timer',
  templateUrl: './count-down-toggle-timer.component.html',
  styleUrls: [ './count-down-toggle-timer.component.scss' ]
} )
export class CountDownToggleTimerComponent extends CcaBaseComponent implements OnInit {

  refresh: boolean               = false;
  timerInterval: Observable<any> = interval ( 1000 );
  refreshSubscription: Subscription;
  secondsRemaining: number;

  @Input ()
  displayText: string = "Enable Auto-Refresh";

  @Input ()
  refreshTime: number = 30;

  @Output () timerComplete = new EventEmitter ();

  constructor () {
    super ();
  }

  ngOnInit () {
  }

  private emitTimerEvent () {
    this.timerComplete.emit ();
  }

  private manageTimer ( seconds: number ) {
    this.secondsRemaining = this.refreshTime - seconds;
    if ( this.secondsRemaining === 0 ) {
      this.secondsRemaining = 0;
      this.emitTimerEvent ();
      this.restartInterval ();
    }
  }

  private restartInterval () {
    this.stopRefreshInterval ();
    this.startRefreshInterval ();
  }

  private startRefreshInterval (): void {
    this.refreshSubscription = this.timerInterval.subscribe ( ( seconds ) => this.manageTimer ( seconds ) );
  }

  private stopRefreshInterval (): void {
    this.refreshSubscription.unsubscribe ();
  }

  public toggleRefresh () {
    this.refresh = !this.refresh;
    if ( this.refresh ) {
      this.startRefreshInterval ()
    } else {
      this.secondsRemaining = 0;
      this.stopRefreshInterval ()
    }
  }
}
