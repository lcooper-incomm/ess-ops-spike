import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { CcaBaseComponent } from "../../cca-base-component";
import { interval } from "rxjs";
import { Logger } from "../../../logging/logger.service";

@Component ( {
  selector: 'cca-call-timer',
  templateUrl: './call-timer.component.html',
  styleUrls: [ './call-timer.component.scss' ],
  providers: [ DatePipe ]
} )
export class CallTimerComponent extends CcaBaseComponent implements OnInit {

  //TODO consider exposing an Observable to broadcast current duration?

  displayTime: string = '00:00';

  @Input ()
  endTime: Date;
  @Input ()
  startTime: Date;

  constructor ( private date: DatePipe,
                private logger: Logger ) {
    super ();
  }

  ngOnInit () {
    //By default, timer will count up
    if ( !this.endTime && !this.startTime ) {
      this.startTime = new Date ();
    }

    if ( this.endTime && this.startTime ) {
      this.logger.error ( 'Cannot provide both an endTime AND a startTime to Timer!' );
    }

    if ( this.startTime && !(this.startTime instanceof Date) ) {
      this.startTime = new Date ( this.startTime );
    } else if ( this.endTime && !(this.endTime instanceof Date) ) {
      this.endTime = new Date ( this.endTime );
    }

    this.updateDisplayTime ();
    this.startCounter ();
  }

  private startCounter (): void {
    this.addSubscription (
      interval ( 1000 ).subscribe ( {
        next: value => this.updateDisplayTime ()
      } )
    );
  }

  private updateDisplayTime (): void {
    const oneHour = 1000 * 60 * 60;

    let duration: number = this.endTime ? this.endTime.getTime () - new Date ().getTime () : new Date ().getTime () - this.startTime.getTime ();

    //Show "-" PREFIX for negative duration (countdown endTime has passed)
    let prefix: string = duration >= 0 ? '' : '-';

    //Show "+" POSTFIX if we've exceeded one hour
    let postfix: string = Math.abs ( duration ) > oneHour ? '+' : '';

    duration                      = Math.min ( Math.abs ( duration ), oneHour );
    let formattedDuration: string = duration === oneHour ? '60:00' : this.date.transform ( new Date ( duration ), 'mm:ss' );
    this.displayTime              = prefix + formattedDuration + postfix;
  }
}
