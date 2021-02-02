import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SpinnerComponent } from "../../spinner/spinner.component";
import Timer = NodeJS.Timer;

@Component ( {
  selector: 'cca-confirmable-button',
  templateUrl: './confirmable-button.component.html',
  styleUrls: [ './confirmable-button.component.scss' ]
} )
export class ConfirmableButtonComponent implements OnInit {

  @Input ()
  color: string;
  @Input ()
  label: string;
  @Output ()
  onConfirm: EventEmitter<any> = new EventEmitter<any> ();
  timer: Timer;

  @ViewChild ( SpinnerComponent )
  spinner: SpinnerComponent;

  constructor () {
  }

  ngOnInit () {
  }

  handleClick (): void {
    if ( this.timer ) {
      this.confirm ();
    } else {
      this.wait ();
    }
  }

  private cancelTimer (): void {
    if ( this.timer ) {
      clearTimeout ( this.timer );
      this.timer = null;
    }
  }

  private confirm (): void {
    this.onConfirm.emit ();
    this.spinner.start ();
    this.cancelTimer ();
  }

  private wait (): void {
    this.timer = setTimeout ( () => {
      this.cancelTimer ();
    }, 1000 );
  }

}
