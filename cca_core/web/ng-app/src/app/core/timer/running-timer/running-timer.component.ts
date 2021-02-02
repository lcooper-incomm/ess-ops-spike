import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { interval } from "rxjs";

const SECOND_MS: number = 1000;
const MINUTE_MS: number = SECOND_MS * 60;
const HOUR_MS: number   = MINUTE_MS * 60;
const DAY_MS: number    = HOUR_MS * 24;

@Component ( {
  selector: 'cca-running-timer',
  templateUrl: './running-timer.component.html',
  styleUrls: [ './running-timer.component.scss' ]
} )
export class RunningTimerComponent extends CcaBaseComponent implements OnInit {

  displayTime: string;

  @Input ()
  start: Date;

  constructor () {
    super ();
  }

  ngOnInit () {
    if ( !this.start ) {
      this.start = new Date ();
    } else if ( !(this.start instanceof Date) ) {
      this.start = new Date ( this.start );
    }

    this.updateDisplayTime ();
    this.startCounter ();
  }

  startCounter (): void {
    this.addSubscription (
      interval ( 1000 ).subscribe ( {
        next: value => this.updateDisplayTime ()
      } )
    );
  }

  updateDisplayTime (): void {
    let now      = new Date ();
    let duration = Math.abs ( now.getTime () - this.start.getTime () );

    let days = Math.floor ( duration / DAY_MS );
    duration = duration % DAY_MS;

    let hours = Math.floor ( duration / HOUR_MS );
    duration  = duration % HOUR_MS;

    let minutes = Math.floor ( duration / MINUTE_MS );
    duration    = duration % MINUTE_MS;

    let seconds = Math.floor ( duration / SECOND_MS );

    let displayTimeWip = '';
    if ( days ) {
      displayTimeWip += days + 'd ';
    }
    if ( hours ) {
      displayTimeWip += hours + 'h ';
    }
    if ( minutes ) {
      displayTimeWip += minutes + 'm ';
    }
    /*
    Only show seconds if we aren't into the days/hours range, and we have at least one second

    Good:
    * 1s
    * 3m
    * 3m 1s

    Bad:
    * 0s
    * 3m 0s
    * 3h 2m 1s
    * 4d 0s
     */
    if ( !days && !hours && seconds ) {
      displayTimeWip += seconds + 's';
    }
    //Use this to show absolutely 0 seconds elapsed, instead of nothing at all
    else if ( !days && !hours && !minutes && !seconds ) {
      displayTimeWip = '<1s';
    }

    this.displayTime = displayTimeWip;
  }
}
